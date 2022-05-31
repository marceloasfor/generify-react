import React, { useEffect, useContext, useState, useRef } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Context } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";


const axios = require('axios').default;

const EditPlaylist = () => {
  const { authenticated, currentUser } = useContext(Context);
  const navigate = useNavigate();

  const userId = authenticated ? currentUser.id : 1;
  const inputEl = useRef("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();

  let playlist_id = searchParams.get('playlist_id');

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
  useEffect(() => {
    axios.get(`http://localhost:8080/api/playlists/${playlist_id}/?user_id=${userId}`)
      .then(
        (response) => {
          const playlist_ = response.data;
          for (let i in playlist_.song) {
            AddSong(playlist_.song[i].id);
          }
          document.getElementById('PlaylistName').value = playlist_.name;
          setPlaylist(response.data);
        }
      )
  }, [authenticated]);

  const allSongsTemplate = [
    {
      id: "",
      artist: "",
      name: "",
      file: ""
    }
  ];

  const [allSongs, setallSongs] = useState(allSongsTemplate);

  useEffect(() => {
    if (authenticated) {
      axios.get(`http://localhost:8080/api/songs/`)
        .then(
          (response) => {
            setallSongs(response.data);
          }
        )
    }
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated) navigate("/login");
  }, [authenticated, navigate]);

  const [markedToAdd, setMarkedToAdd] = useState([]);
  function AddSong(id) {
    let addSongs = markedToAdd;
    const element = document.getElementById(id);
    if(!element){
      return;
    }
    var found = false;

    for (let el in addSongs) {
      if (addSongs[el] === id) {
        addSongs.splice(el, 1);
        setMarkedToAdd(addSongs);
        element.style.backgroundColor = "#10012b";
        element.style.color = "#e1aaff";
        element.textContent = "+";
        found = true;
        break;
      }
    }
    if (!found) {
      addSongs.push(id);
      setMarkedToAdd(addSongs);
      element.style.backgroundColor = "#BD2823";
      element.style.color = "#10012b";
      element.textContent = "-";
      found = false;
    }
  };

  useEffect(() => {
    for (let el in markedToAdd) {
      let element = document.getElementById(markedToAdd[el]);
      if (element){
        element.style.backgroundColor = "#BD2823";
        element.style.color = "#10012b";
        element.textContent = "-";
      }
    }
  }, [searchResults]);

  const songsArray = allSongs.map((p) => {
    return (
      <tr key={p.id}>
        <td>
          <button
            type="button"
            id={p.id}
            onClick={() => AddSong(p.id)}
            style={{
                backgroundColor: "#10012b",
                color: "#e1aaff"
            }}
          >+</button>
          <span style={{ padding: "1px" }}>{p.artist} - {p.name}</span>
        </td>
      </tr>
    )
  });

  const updatePlaylist = () => {
    let playlistName = document.getElementById('PlaylistName').value;
    let personalSongs = []
    for(let index in markedToAdd) {
      const getSong = allSongs.find(song => song.id === markedToAdd[index]);
      personalSongs.push(getSong);
    }

    const playlist_ = {
      name: playlistName,
      about: "Melhores músicas do momento, aperte play e entre no clima!",
      user_id: userId,
      song: personalSongs
    }

    axios.put(`http://localhost:8080/api/playlists/${playlist_id}/?user_id=${userId}`, playlist_);
    navigate(`/playlists`);
  };

  const getSearchTerm = () => {
    setSearchTerm(inputEl.current.value);
    if (inputEl.current.value !== "") {
      const filteredSongs = songsArray.filter((song) => {
        return song.props.children.props.children[1].props.children.join(" ").toLowerCase()
          .includes(inputEl.current.value.toLowerCase())
      });
      setSearchResults(filteredSongs);
    } else {
      setSearchResults(songsArray);
    }
  }

  return (
    <Form>
      <Container>
        <Row className="justify-content-md-center" style={{ paddingTop: "100px" }}>
          <Col md={3}></Col>
          <Col md={4}><Form.Group>
            <Form.Control type="text" placeholder="Nome da Playlist" id="PlaylistName" />
          </Form.Group></Col>
          <Col md={3}><Button variant="primary" type="button" onClick={() => updatePlaylist()}>
            Salvar Playlist
          </Button></Col>
          <Col md={2}></Col>
        </Row>
        <Row md={2} className="justify-content-md-center" style={{ paddingTop: "10px" }}>
          <Col>
            <Form.Group className="m-2">
              <Form.Control ref={inputEl} type="text" placeholder="Buscar músicas..." id="searchSongs" onChange={getSearchTerm} value={searchTerm} />
            </Form.Group>
            <Table borderless hover size="lg" style={{ borderRadius: "10px", backgroundColor: "#b27cde", color: "#491d6c", fontWeight: "bold" }}>
              <tbody>
                {searchTerm.length < 1 ? songsArray : (searchResults.length > 0 ? searchResults : <tr><td><span>Não encontrei nenhuma música...</span></td></tr>)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default EditPlaylist