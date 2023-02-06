import React from "react";
import shareVideo from "../assets/share.mp4";

const Video = () => {
    return (
        <video
            src={shareVideo}
            type="video/mp4"
            autoPlay
            loop
            muted
            controls={false}
            className="w-full h-full object-cover"
        />
    );
};

export default Video;
