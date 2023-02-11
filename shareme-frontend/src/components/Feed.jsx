import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { MasonryLayout, Spinner } from "../components";
import { searchQuery, feedQuery } from "../utils/data";

const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { catageoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        if (catageoryId) {
            const query = searchQuery(catageoryId);
            client.fetch(query).then(data => {
                setPins(data);
                setLoading(false);
            });
        } else {
            client.fetch(feedQuery).then(data => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [catageoryId]);

    if (loading)
        return <Spinner message="We are adding new ideas to your feed!" />;

    return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
