import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";

const GoogleSignIn = () => {
    const responseGoogle = response => {
        const decoded = jwt_decode(response.credential);
        console.log(decoded);
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
