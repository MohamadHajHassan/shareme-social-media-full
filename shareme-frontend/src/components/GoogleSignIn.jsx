import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { client } from "../client";

const GoogleSignIn = () => {
    const navigate = useNavigate();
    
    const responseGoogle = response => {
        const decoded = jwt_decode(response.credential);
        localStorage.setItem("user", JSON.stringify(decoded));
        const { name, sub, picture } = decoded;

        const doc = {
            _id: sub,
            _type: "user",
            userName: name,
            image: picture,
        };

        client.createIfNotExists(doc).then(() => {
            navigate("/", { replace: true });
        });
    };
    return (
        <GoogleOAuthProvider
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
            <GoogleLogin
                render={renderProps => (
                    <button
                        type="button"
                        className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}>
                        <FcGoogle className="mr-4" /> Sign in with Google
                    </button>
                )}
                onSuccess={responseGoogle}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleSignIn;
