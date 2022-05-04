import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Player from "../../components/Player/Player";
import { Context } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;

const PlaylistDetail = () => {
    const { id } = useParams();

    const playlistFormat = { // Playlist values structure
        id: "",
        name: "",
        cover: "",
        about: "",
        songs: [
            {
                id: "",
                artist: "",
                name: "",
                file: ""
            }
        ]
    };

    const [playlist, setPlaylist] = useState(playlistFormat);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

    const { authenticated, currentUser, updateUser } = useContext(Context);
    const navigate = useNavigate();
    const [follow, setFollow] = useState(false);

    const handleFollow = () => {
        const newUserPlaylists = [...currentUser.playlists, playlist];
        const newUser = {
            ...currentUser,
            playlists: newUserPlaylists
        }
        axios.patch(`http://localhost:8080/users/${currentUser.id}`, newUser);
        setFollow(true);
        updateUser();
    }

    const handleUnfollow = () => {
        const newUserPlaylists = currentUser.playlists.filter((playlists) => playlists.id !== playlist.id && playlists.name !== playlist.id);
        const newUser = {
            ...currentUser,
            playlists: newUserPlaylists
        }
        axios.patch(`http://localhost:8080/users/${currentUser.id}`, newUser);
        setFollow(false);
        updateUser();
    }

    useEffect(() => {
        if (authenticated) {
            axios.get(`http://localhost:8080/playlists/${id}`)
                .then(
                    (response) => {
                        setPlaylist(response.data);
                        if (currentUser.playlists.length > 0) {
                            if (currentUser.playlists.some(data => data.id === response.data.id && data.name === response.data.name)) {
                                setFollow(true);
                            }
                        }
                    }
                )
        }
    }, [id, authenticated, currentUser]);

    useEffect(() => {
        if (!authenticated) navigate("/login");
    }, [authenticated, navigate]);

    const renderSongs = playlist.songs.map((p) => {
        return (
            <tr key={p.id}>
                <td>
                    <Button variant="clear" className="w-100" onClick={() => { setCurrentSongIndex(playlist.songs.indexOf(p)) }}>
                        {p.artist} - {p.name}
                    </Button>
                </td>
            </tr>
        )
    });


    useEffect(() => {
        setNextSongIndex(() => {
            if (currentSongIndex + 1 > playlist.songs.length - 1) {
                return 0;
            } else {
                return currentSongIndex + 1;
            }
        });
    }, [currentSongIndex, playlist]);

    return (
        <div className="pg-faq container" >
            {authenticated && <div className="row" >

                <span style={{ textAlign: 'center', paddingBottom: '20px' }}>
                    <b className="main-font">Generi - {playlist.name}</b>
                    {follow
                        ? <Button className="ml-5" variant="danger" onClick={handleUnfollow}>Remover</Button>
                        : <Button className="ml-5" variant="primary" onClick={handleFollow}>Salvar</Button>}
                </span>
                <p className="text-center text-muted">{playlist.about}</p>
                <p className="text-center font-weight-bold">Tocando: {playlist.songs[currentSongIndex].artist} - {playlist.songs[currentSongIndex].name}</p>
                <Player songs={playlist.songs} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} nextSongIndex={nextSongIndex} />

                <Container>
                    <Row md={2} className="justify-content-md-center">
                        <Col className="justify-content-md-center">
                            <img className="w-75" src={`../${playlist.cover} `} alt="" />

                        </Col>
                        <Col>
                            <Table borderless hover size="lg" style={{ borderRadius: "10px", backgroundColor: "#b27cde", color: "#491d6c", fontWeight: "bold" }}>
                                <tbody>
                                    {renderSongs}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>}
        </div >
    );
};

export default PlaylistDetail;