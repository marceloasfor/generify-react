import { Link } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs';
import React, { useEffect, useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from "react-bootstrap";
import { Context } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;

const MyJamList = () => {
    const { authenticated, currentUser } = useContext(Context);
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);

    const new_plyalist = { // Playlist values structure
        id: -1,
        name: "qwerty",
        cover: "",
        about: "",
        user_id: "",
        songs: [
            {
                id: "",
                artist: "",
                name: "",
                file: ""
            }
        ]
    };
    useEffect(() => {
        if (!authenticated) navigate("/login");
    }, [authenticated, navigate]);

    useEffect(() => {
        if (authenticated) {
            axios.get(`http://localhost:8080/api/playlists/?user_id=${currentUser.id}`)
                .then(
                    (response) => {
                        response.data.push(new_plyalist);
                        setPlaylists(response.data);
                    }
                )
        }
    }, [authenticated]);

    const dados = playlists.map((p) => {
        if (p.id !== -1) {
            return (
                <Col className="flex-fill mb-3" key={p.id}>
                    <Link to={`/users/${currentUser.id}/playlist/?pname=${p.id}`}>
                        <img className="card-img-top" src={`http://localhost:8080/api/playlists/${p.id}/cover/`} alt="" />
                    </Link>
                </Col>

            )
        } else {
            return (
                <Col className="flex-fill mb-3" key={p.id}>
                    <Link to={`/users/${currentUser.id}/new_playlist/`}>
                        <Button style={{
                            margin: "auto",
                            width: "100%",
                            height: "265px",
                            backgroundColor: "#10012b"
                        }}>
                            <BsPlusCircle style={{ fontSize: "100px", color: "#9e4dde" }} />
                        </Button>
                    </Link>
                </Col>
            )
        }
    })

    return (
        <div className="pg-faq container" >
            <div className="row">
                <span style={{ textAlign: 'center', paddingBottom: '20px' }}><b className="main-font">Generi - Jam</b></span>
            </div>
            <Container>
                <Row md={4}>
                    {dados}
                </Row>
            </Container>
        </div>
    );
}

export default MyJamList