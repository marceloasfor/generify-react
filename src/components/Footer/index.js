import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer>

        <div className="container mt-3" style={{paddingBottom: '20px'}}>
          <div className="row">

                <div className="col-sm-4">
                  <p className="p-footer" >Generify</p>
                  <ul>
                    <li> <Link className="a-footer" to="/" activeStyle>Sobre</Link>  </li>
                    <li> <Link className="a-footer" to="/" activeStyle>Trabalhe conosco</Link>  </li>
                    <li> <Link className="a-footer" to="/" activeStyle>Doação</Link>  </li>
                    <li> <Link className="a-footer" to="/" activeStyle>Contato</Link>  </li>
                  </ul>
                </div>

                <div className="col-sm-4">
                  <p className="p-footer">Links Úteis</p>
                  <ul>
                    <li> <Link className="a-footer" to="/" activeStyle>Suporte</Link> </li>
                    <li> <Link className="a-footer" to="/" activeStyle>Web Player</Link> </li>
                    <li> <Link className="a-footer" to="/" activeStyle>Aplicativos mobile</Link> </li>
                    <li> <Link className="a-footer" to="/" activeStyle>Anúncios</Link> </li>
                  </ul>
                </div>

                <div className="col-sm-4">
                  <p className="main-font" style={{fontSize: '30pt', letterSpacing: '0px', fontWeight: 'normal', marginTop: '30px'}}>Generify</p>
                </div>

          </div>
        </div>
      </footer>
    );
};

export default Footer;