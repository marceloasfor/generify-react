import Button from 'react-bootstrap/Button';
import React, { useContext, useEffect } from "react";
import { Context } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const { handleLogout, authenticated } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) navigate("/login");
    }, [authenticated, navigate]);

    return (
        <div className="pg-form container">
            <Button onClick={handleLogout}>LOGOUT</Button>
            <Button onClick={() => navigate("/playlists")}>Playlists</Button>
        </div>
    );
};

export default Home;