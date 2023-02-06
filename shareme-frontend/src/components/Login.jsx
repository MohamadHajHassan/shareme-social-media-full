import React from "react";
import shareVideo from "../assets/share.mp4";

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
        </div>
    );
};

export default Login;
