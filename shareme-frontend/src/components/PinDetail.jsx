import React, { useCallback, useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import { MasonryLayout, Spinner } from "../components";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";

const PinDetail = ({ user }) => {
    const [pins, setPins] = useState(null);
    const [pinDetail, setPinDetail] = useState(null);
    const [comment, setComment] = useState("");
    const [addingComment, setAddingComment] = useState(false);
    const { pinId } = useParams();

    const fetchPinDetails = useCallback(() => {
        let query = pinDetailQuery(pinId);
        if (query) {
            client.fetch(query).then(data => {
                setPinDetail(data[0]);
                if (data[0]) {
                    query = pinDetailMorePinQuery(data[0]);
                    client.fetch(query).then(res => {
                        setPins(res);
                    });
                }
            });
        }
    }, [pinId]);

    useEffect(() => {
        fetchPinDetails();
    }, [fetchPinDetails, pinId]);

    const addComment = () => {
        if (comment) {
            setAddingComment(true);

            client
                .patch(pinId)
                .setIfMissing({ comments: [] })
                .insert("after", "comments[-1]", [
                    {
                        comment,
                        _key: uuidv4(),
                        postedBy: { _type: "postedBy", _ref: user._id },
                    },
                ])
                .commit()
                .then(() => {
                    fetchPinDetails();
                    setComment("");
                    setAddingComment(false);
                });
        }
    };

    if (!pinDetail) return <Spinner message="Loading pin ..." />;

    return (
        <>
            <div
                className="m-auto flex flex-col bg-white xl:flex-row"
                style={{ maxWidth: "1500px", borderRadius: "32px" }}>
                <div className="flex flex-initial items-center justify-center md:items-start">
                    <img
                        className="rounded-t-3xl rounded-b-lg"
                        src={pinDetail?.image && urlFor(pinDetail?.image).url()}
                        alt="user-post"
                    />
                </div>
                <div className="w-full flex-1 p-5 xl:min-w-620">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <a
                                href={`${pinDetail.image.asset.url}?dl=`}
                                download
                                className="text-dark flex items-center justify-center rounded-full bg-secondaryColor p-2 text-xl opacity-75 hover:opacity-100">
                                <MdDownloadForOffline />
                            </a>
                        </div>
                        <a
                            href={pinDetail.destination}
                            target="_blank"
                            rel="noreferrer">
                            {pinDetail.destination}
                        </a>
                    </div>
                    <div>
                        <h1 className="mt-3 break-words text-4xl font-bold">
                            {pinDetail.title}
                        </h1>
                        <p className="mt-3">{pinDetail.about}</p>
                    </div>
                    <Link
                        to={`/user-profile/${pinDetail?.postedBy._id}`}
                        className="mt-5 flex items-center gap-2 rounded-lg bg-white ">
                        <img
                            src={pinDetail?.postedBy.image}
                            className="h-10 w-10 rounded-full"
                            alt="user-profile"
                        />
                        <p className="font-bold">
                            {pinDetail?.postedBy.userName}
                        </p>
                    </Link>
                    <h2 className="mt-5 text-2xl">Comments</h2>
                    <div className="max-h-370 overflow-y-auto">
                        {pinDetail?.comments?.map(comment => (
                            <div
                                className="mt-5 flex items-center gap-2 rounded-lg bg-white"
                                key={comment.comment}>
                                <img
                                    src={comment.postedBy?.image}
                                    className="h-10 w-10 cursor-pointer rounded-full"
                                    alt="user-profile"
                                />
                                <div className="flex flex-col">
                                    <p className="font-bold">
                                        {comment.postedBy?.userName}
                                    </p>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link to={`/user-profile/${pinDetail.postedBy?._id}`}>
                            <img
                                src={pinDetail.postedBy?.image}
                                className="h-10 w-10 cursor-pointer rounded-full"
                                alt="user-profile"
                            />
                        </Link>
                        <input
                            className=" flex-1 rounded-2xl border-2 border-gray-100 p-2 outline-none focus:border-gray-300"
                            type="text"
                            placeholder="Add a comment"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <button
                            type="button"
                            className="rounded-full bg-red-500 px-6 py-2 text-base font-semibold text-white outline-none"
                            onClick={addComment}>
                            {addingComment ? "Posting the comment..." : "Post"}
                        </button>
                    </div>
                </div>
            </div>
            {pins?.length > 0 ? (
                <>
                    <h2 className="mt-8 mb-4 text-center text-2xl font-bold">
                        More like this
                    </h2>
                    <MasonryLayout pins={pins} />
                </>
            ) : (
                <Spinner message="Loading more pins..." />
            )}
        </>
    );
};

export default PinDetail;
