import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import playlistsMock from './playlistsMock';

const PlaylistDetail = () => {
    const { id } = useParams();

    const selectedPlaylist = playlistsMock[id - 1];
    const renderSongs = selectedPlaylist.songs.map
        ((p) => {
            return (
                <tr key={p.id}>
                    <td>
                        <Link to="">
                            {p.artist} - {p.name}
                        </Link>
                    </td>
                </tr>
            )
        })

    return (
        <div className="pg-faq container" >
            <div className="row" >

                <span style={{ textAlign: 'center', paddingBottom: '20px' }}><b className="main-font">Generi - {selectedPlaylist.name}</b></span>
                <p className="text-center text-muted">{selectedPlaylist.about}</p>
                <Container>
                    <Row md={2} className="justify-content-md-center">
                        <Col className="justify-content-md-center">
                            <img className="w-75" src={`../${selectedPlaylist.cover} `} alt="" />

                        </Col>
                        <Col>
                            <Table borderless hover variant="dark" size="lg">
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