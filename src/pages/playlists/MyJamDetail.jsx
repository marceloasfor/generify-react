import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useParams, useSearchParams } from 'react-router-dom';
import Player from "../../components/Player/Player";
import { Context } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;

const MyJamDetail = () => {
  const { id } = useParams();

  const playlistFormat = { // Playlist values structure
    id: "",
    name: "",
    cover: "",
    about: "",
    user_id: "",
    song: [
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

  const { authenticated, currentUser } = useContext(Context);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  let pId = searchParams.get('pname');

  useEffect(() => {
    if (authenticated) {
      axios.get(`http://localhost:8080/api/playlists/${pId}/?user_id=${currentUser.id}`)
        .then(
          (response) => {
            setPlaylist(response.data);
          }
        )
    }
  }, [id, authenticated, pId, currentUser.id]);

  useEffect(() => {
    if (!authenticated) navigate("/login");
  }, [authenticated, navigate]);

  function removeSong(index) {
    let updated_songs = [...playlist.song];
    let playlist_ = {...playlist};
    updated_songs.splice(index, 1);
    playlist_.song = updated_songs;

    if(playlist_.song ==  0) {
      setPlaylist(playlistFormat);
      axios.delete(`http://localhost:8080/api/playlists/${pId}/?user_id=${currentUser.id}`);
      navigate(`/users/${currentUser.id}/playlists/`);
    } else {
      setPlaylist(playlist_);
      delete playlist_.cover;
      axios.patch(`http://localhost:8080/api/playlists/${pId}/?user_id=${currentUser.id}`, playlist_);
    }
  }

  const renderSongs = playlist && playlist?.song.map((p) => {
    return (
      <tr key={p.id}>
        <td>
          <Row>
            <Col md={1}>
              <Button variant="danger" onClick={() => { removeSong(playlist.song.indexOf(p)) }}>-</Button>
            </Col>
            <Col md={11}>
              <Button variant="clear" className="w-100" onClick={() => { setCurrentSongIndex(playlist.song.indexOf(p)) }}>
                {p.artist} - {p.name}
              </Button>
            </Col>
            </Row>
        </td>
      </tr>
    )
  });


  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > playlist.song.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, playlist]);

  return (
    <div className="pg-faq container" >
      <div className="row" >

        <span style={{ textAlign: 'center', paddingBottom: '20px' }}><b className="main-font">Generi - {playlist.name}</b></span>
        <p className="text-center text-muted">{playlist.about}</p>
        <p className="text-center font-weight-bold">Tocando: {playlist.song[currentSongIndex]?.artist} - {playlist.song[currentSongIndex]?.name}</p>
        <Player songs={playlist.song} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} nextSongIndex={nextSongIndex} />

        <Container>
          <Row md={2} className="justify-content-md-center">
            <Col className="justify-content-md-center">
            <img className="w-75" src={playlist.id && `http://localhost:8080/api/playlists/${playlist.id}/cover/ `} alt="" />
            </Col>
            <Col>
              <Table borderless hover size="lg" style={{ borderRadius: "10px", backgroundColor: "#b27cde", color: "#491d6c", fontWeight: "bold" }}>
                <tbody>
                  {renderSongs}
                  <tr>
                    <td>
                      <Row>
                        <Col md={1}>
                            <Button onClick={() => { navigate(`/users/${currentUser.id}/edit_playlist/?playlist_id=${pId}`) }}>+</Button>
                        </Col>
                        <Col md={11}>
                        </Col>
                        </Row>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </div >
  );
};

export default MyJamDetail;