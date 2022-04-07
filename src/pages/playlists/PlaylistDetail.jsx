import React from "react";
import { useParams } from "react-router-dom";

const PlaylistDetail = () => {
    const { id } = useParams();
    return (
        <h2>{id}</h2>
    );
}

export default PlaylistDetail;