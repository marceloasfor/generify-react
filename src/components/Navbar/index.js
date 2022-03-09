import React from "react";
import { Nav, NavLink, NavMenu} from "./NavbarElements";

const Navbar = () => {
    return (
        <Nav>
            <NavMenu>
                <NavLink to="/home" activeStyle>
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
            </NavMenu>
        </Nav>
    );
};

export default Navbar;