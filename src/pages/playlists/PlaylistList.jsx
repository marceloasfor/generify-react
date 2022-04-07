import playlistsMock from "./playlistsMock";
import React from "react";

const PlaylistList = () => {

    const dados = playlistsMock.map
        ((p) => {
            return (
                <Link to={`/playlists/${p.id}`}>
                    <div className="card" style={{ width: '400px' }}>
                        <img className="card-img-top" src={p.cover} alt="Card image" />
                        <div className="card-body">
                            <h4 className="card-title">{p.name}</h4>
                        </div>
                    </div>
                </Link>

            )
        })

    return (
        <ul>
            {dados}
        </ul>
    );
}

export default PlaylistList