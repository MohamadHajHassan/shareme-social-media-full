import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin }) => {
    const [postHovered, setPostHovered] = useState(false);

    const navigate = useNavigate();

    const { postedBy, image, _id, destination, save } = pin;

    const user = fetchUser();

    const alreadySaved = !!save?.filter(item => item.postedBy._id === user.sub)
        ?.length;
    const savePin = id => {
        if (!alreadySaved) {
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert("after", "save[-1]", [
                    {
                        _key: uuidv4(),
                        userId: user.sub,
                        postedBy: {
                            _type: "postedBy",
                            _ref: user.sub,
                        },
                    },
                ])
                .commit()
                .then(() => {
                    window.location.reload();
                });
        }
    };

    const deletePin = id => {
        client.delete(id).then(() => {
            window.location.reload();
        });
    };

    return (
        <div className="m-2">
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className="relative w-auto cursor-zoom-in overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:shadow-lg">
                {image && (
                    <img
                        className="w-full rounded-lg"
                        alt="user-post"
                        src={urlFor(image).width(250).url()}
                    />
                )}

                {postHovered && (
                    <div
                        className="absolute top-0 z-50 flex h-full w-full flex-col justify-between p-1 pr-2 pt-2 pb-2"
                        style={{ height: "100%" }}>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={e => e.stopPropagation()}
                                    className="text-dark flex h-9 w-9 items-center justify-center rounded-full bg-white p-2 text-xl opacity-75 outline-none hover:opacity-100 hover:shadow-md">
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button
                                    type="button"
                                    className="rounded-3xl bg-red-500 px-5 py-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100 hover:shadow-md">
                                    {save?.length} Saved
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="rounded-3xl bg-red-500 px-5 py-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100 hover:shadow-md"
                                    onClick={e => {
                                        e.stopPropagation();
                                        savePin(_id);
                                    }}>
                                    Save
                                </button>
                            )}
                        </div>
                        <div className=" flex w-full items-center justify-between gap-2">
                            {destination && (
                                <a
                                    href={destination}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 rounded-full bg-white p-2 pl-4 pr-4 font-bold text-black opacity-70 hover:opacity-100 hover:shadow-md">
                                    <BsFillArrowUpRightCircleFill />
                                    {destination.length > 12
                                        ? `${destination.slice(0, 12)}...`
                                        : destination}
                                </a>
                            )}
                            {postedBy?._id === user.sub && (
                                <button
                                    type="button"
                                    className="text-dark flex h-8 w-8 items-center justify-center rounded-full bg-white p-2 opacity-75 outline-none hover:opacity-100"
                                    onClick={e => {
                                        e.stopPropagation();
                                        deletePin(_id);
                                    }}>
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link
                to={`user-profile/${postedBy?._id}`}
                className="mt-2 flex items-center gap-2">
                <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={postedBy?.image}
                    alt="user-profile"
                />
                <p className="font-semibold capitalize">{postedBy?.userName}</p>
            </Link>
        </div>
    );
};

export default Pin;
