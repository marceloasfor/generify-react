import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import playlistsMock from './playlistsMock';
import Player from "../../components/Player/Player";
import { Context } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";


const PlaylistDetail = () => {
    const { id } = useParams();

    const selectedPlaylist = playlistsMock[id - 1];

    const [songs] = useState(selectedPlaylist.songs);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

    const { authenticated } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (!authenticated) navigate("/login");
    }, [authenticated, navigate]);

    const renderSongs = selectedPlaylist.songs.map
        ((p) => {
            return (
                <tr key={p.id}>
                    <td>
                        <Button variant="clear" className="w-100" onClick={() => { setCurrentSongIndex(selectedPlaylist.songs.indexOf(p)) }}>
                            {p.artist} - {p.name}
                        </Button>
                    </td>
                </tr>
            )
        });


    useEffect(() => {
        setNextSongIndex(() => {
            if (currentSongIndex + 1 > songs.length - 1) {
                return 0;
            } else {
                return currentSongIndex + 1;
            }
        });
    }, [currentSongIndex, songs]);

    return (
        <div className="pg-faq container" >
            <div className="row" >

                <span style={{ textAlign: 'center', paddingBottom: '20px' }}><b className="main-font">Generi - {selectedPlaylist.name}</b></span>
                <p className="text-center text-muted">{selectedPlaylist.about}</p>
                <p className="text-center font-weight-bold">Tocando: {songs[currentSongIndex].artist} - {songs[currentSongIndex].name}</p>
                <Player songs={songs} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} nextSongIndex={nextSongIndex} />

                <Container>
                    <Row md={2} className="justify-content-md-center">
                        <Col className="justify-content-md-center">
                            <img className="w-75" src={`../${selectedPlaylist.cover} `} alt="" />

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
            </div>
        </div >
    );
};

export default PlaylistDetail;