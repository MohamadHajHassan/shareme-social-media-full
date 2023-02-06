import React from "react";
import shareVideo from "../assets/share.mp4";
import Logo from "./Logo";

const Login = () => {
    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    autoPlay
                    loop
                    muted
                    controls={false}
                />
            </div>
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
                <Logo />
            </div>
        </div>
    );
};

export default Login;
