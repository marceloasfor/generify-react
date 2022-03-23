import React from "react";
import { Nav, NavLink, NavMenu} from "./NavbarElements";

const Navbar = () => {
    return (
        <Nav className="navbar navbar-expand-sm navbar-dark fixed-top">
            <div className="container-fluid">
            <img src="/images/notas-musicais.png" alt="Generify Music Logo" style={"width: 50px; height: auto; padding-right: 10px;"}/>
                <NavLink to="/" activeStyle>
                    Início
                </NavLink>
                <NavLink to="/form" activeStyle>
                    Cadastro
                </NavLink>
                <NavLink to="/login" activeStyle>
                    Login
                </NavLink>
                <NavLink to="/faq" activeStyle>
                    FAQ
                </NavLink>
            </div>
        </Nav>
    );
};

export default Navbar;