import React from "react";
import { Nav, NavLink, LogoLink } from "./NavbarElements";
import logo from '../../images/notas-musicais.png'

const Navbar = () => {
    return (
        <Nav className="navbar navbar-expand-sm navbar-dark fixed-top">
            <div className="container-fluid">
                <img src={logo} alt="Generify Music Logo" style={{ width: '50px', height: 'auto', paddingRight: '10px' }} />
                <LogoLink className="navbar-brand" to="/" ><b className="main-font">Generify</b></LogoLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar" >
                    <ul className="navbar-nav ms-auto"  >
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" >
                                Início
                            </NavLink>
                        </li>
                        <li className="nav-item" >
                            <NavLink className="nav-link" to="/form" >
                                Cadastro
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login" >
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/faq" >
                                FAQ
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </Nav>
    );
};

export default Navbar;