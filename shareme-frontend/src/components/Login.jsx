import React from "react";

import Video from "./Video";
import Logo from "./Logo";

const Login = () => {
    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <Video />
            </div>
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
                <Logo />
            </div>
        </div>
    );
};

export default Login;
