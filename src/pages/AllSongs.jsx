import React, { useEffect, useContext, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Context } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;

const AllSongs = () => {
    const { authenticated, currentUser } = useContext(Context);
    const navigate = useNavigate();

    const userId = currentUser.id;
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${userId}`)
                .then(
                    (response) => {
                        setUser(response.data);
                    }
                )
    });
    const allSongsTemplate = [
        {
            id: 21,
            artist: "artista",
            name: "eu sou o artista",
            file: ""
        }
    ];

    const [allSongs, setallSongs] = useState(allSongsTemplate);

    
    useEffect(() => {
        if (authenticated) {
            axios.get(`http://localhost:8080/playlists`)
                .then(
                    (response) => {
                        const playlistSongs = []
                        for (const playlist in response.data){
                            for (const song in response.data[playlist].songs){
                                playlistSongs.push(response.data[playlist].songs[song]);
                            }
                        }
                        setallSongs(playlistSongs);
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
        var found = false;

        for (let el in addSongs){
            if (addSongs[el] === id) {
                addSongs.splice(el, 1);
                setMarkedToAdd(addSongs);
                element.style.backgroundColor = "#10012b";
                element.style.color= "#e1aaff";
                element.textContent = "+";
                found = true;
                break;
            }
        }
        if(!found) {
            addSongs.push(id);
            setMarkedToAdd(addSongs);
            element.style.backgroundColor = "#BD2823";
            element.style.color= "#10012b";
            element.textContent = "-";
            found = false;
        }
    };
    const songsArray = allSongs.map((p) => {return (
        
            <tr key={p.id}>
                <td>
                    <button
                        type="button" 
                        id={allSongs.indexOf(p)}
                        onClick={() => AddSong(allSongs.indexOf(p))}
                        style={{
                            backgroundColor: "#10012b",
                            color: "#e1aaff"
                        }}
                    >+</button>
                    <span style={{padding: "1px"}}>{p.artist} - {p.name}</span>
                </td>
            </tr>
        )
    });

    const createPlaylist = () => {
        const playlistName = document.getElementById('PlaylistName').value;
        let personalSongs = []
        markedToAdd.forEach((index) => {
            personalSongs.push(allSongs[index]);
        });

        let playlistId = 1;
        if(user.playlists.length) {
            playlistId = user.playlists[user.playlists.length - 1].id + 1
        }

        const playlist = {
            id: playlistId,
            name: playlistName,
            cover: "rock.jpg",
            about: "Melhores músicas do momento, aperte play e entre no clima!",
            songs: personalSongs
        }
        let playlists = user.playlists;
        playlists.push(playlist);
        const updatedUser = {
            ...user,
            playlists
        }
        axios.patch(`http://localhost:8080/users/${userId}`, updatedUser);
        setUser(updatedUser);
        
        navigate(`/users/${userId}/playlists/`)
    };

    return (
        <Form>
        <Container>
            <Row className="justify-content-md-center" style={{paddingTop: "100px"}}>
                <Col md={3}></Col>
                <Col md={4}><Form.Group>
                    <Form.Control type="text" placeholder="Nome da Playlist" id="PlaylistName"/>
                </Form.Group></Col>
                <Col md={3}><Button variant="primary" type="button" onClick={() => createPlaylist()}>
                    Criar Playlist
                </Button></Col>
                <Col md={2}></Col>
            </Row>
            <Row md={2} className="justify-content-md-center" style={{paddingTop: "10px"}}>
                <Col>
                    <Table borderless hover size="lg" style={{ borderRadius: "10px", backgroundColor: "#b27cde", color: "#491d6c", fontWeight: "bold" }}>
                        <tbody>
                            {songsArray}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        </Form>
    );
}

export default AllSongs