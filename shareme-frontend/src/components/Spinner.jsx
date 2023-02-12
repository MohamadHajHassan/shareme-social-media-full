import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Spinner = ({ message }) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <ThreeCircles
                type="circles"
                color="00BFFF"
                height={50}
                width={200}
                className="m-5"
            />
            <p className="px-2 text-center text-lg">{message}</p>
        </div>
    );
};

export default Spinner;
