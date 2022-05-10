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

  const { authenticated, currentUser } = useContext(Context);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState({});

  let pId = searchParams.get('pname');

  useEffect(() => {
    if (authenticated) {
      axios.get(`http://localhost:8080/users/${currentUser.id}`)
        .then(
          (response) => {
            setUser(response.data)
            setPlaylist(response.data.playlists[pId - 1]);
          }
        )
    }
  }, [id, authenticated]);

  useEffect(() => {
    if (!authenticated) navigate("/login");
  }, [authenticated, navigate]);

  function removeSong(index) {
    let updated_songs = playlist.songs;
    updated_songs.splice(index, 1);

    let playlists = user.playlists;
    if(updated_songs == 0) {
      playlists.splice(pId - 1, 1)
    } else {
      playlists[pId - 1].songs = updated_songs;
    }

    const updatedUser = {
      ...user,
      playlists
    }

    if(updated_songs ==  0) {
      axios.patch(`http://localhost:8080/users/${currentUser.id}`, updatedUser);
      setUser(updatedUser);
      navigate(`/users/${currentUser.id}/playlists/`);
    } else {
      axios.patch(`http://localhost:8080/users/${currentUser.id}`, updatedUser);
      setUser(updatedUser);
    }
  }

  const renderSongs = playlist.songs.map((p) => {
    return (
      <tr key={p.id}>
        <td>
          <Row>
            <Col md={1}>
              <Button variant="danger" onClick={() => { removeSong(playlist.songs.indexOf(p)) }}>-</Button>
            </Col>
            <Col md={11}>
              <Button variant="clear" className="w-100" onClick={() => { setCurrentSongIndex(playlist.songs.indexOf(p)) }}>
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
      if (currentSongIndex + 1 > playlist.songs.length - 1) {
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
        <p className="text-center font-weight-bold">Tocando: {playlist.songs[currentSongIndex].artist} - {playlist.songs[currentSongIndex].name}</p>
        <Player songs={playlist.songs} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} nextSongIndex={nextSongIndex} />

        <Container>
          <Row md={2} className="justify-content-md-center">
            <Col className="justify-content-md-center">
              <img className="w-75" src={`/${playlist.cover} `} alt="" />
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

export default MyJamDetail;