import playlistsMock from "./playlistsMock";
import { Link } from 'react-router-dom';
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const PlaylistList = () => {

    const dados = playlistsMock.map
        ((p) => {
            return (
                <Col className="flex-fill mb-3" key={p.id}>
                    <Link to={`/playlists/${p.id}`}>
                        <img className="card-img-top" src={p.cover} alt="" />
                    </Link>
                </Col>

            )
        })

    return (
        <div className="pg-faq container" >
            <div className="row">
                <span style={{ textAlign: 'center', paddingBottom: '20px' }}><b className="main-font">Generi - Lists</b></span>
            </div>
            <Container>
                <Row md={4}>
                    {dados}
                </Row>
            </Container>
        </div>
    );
}

export default PlaylistList