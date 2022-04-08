import React from "react";
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'


const Faq = () => {
  return (
    <div className="pg-faq container" >
      <div className="row">
        <span style={{ textAlign: 'center', paddingBottom: '20px' }}><b className="main-font">GeneriFAQ</b></span>
      </div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Como criar uma conta?
          </Accordion.Header>
          <Accordion.Body>
            <strong>Sua conta conosco é gratuita!</strong> Basta clicar no link de <Link to="/form" activeStyle>cadastro</Link> e submeter o formulário com todos os campos obrigatórios preenchidos.
            Você receberá um email de validação da conta. Após do link de confirmação no email, sua conta estará pronta para uso!
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Como encontrar uma música?
          </Accordion.Header>
          <Accordion.Body>
            <strong>Os maiores artistas estão no nosso player.</strong> Para encontrar suas músicas preferidas, basta fazer o <Link to="/login" activeStyle>login</Link> com sua conta de cadastro,
            clicar na barra de busca e então pesquisar por artista, música ou álbum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Posso remover as propagandas?
          </Accordion.Header>
          <Accordion.Body>
            <strong>Use o Generify&trade; do seu jeito.</strong> Através do nosso plano de assinaturas, você pode criar diversas playlists, remover as propagandas e muito mais.
            Para acessar as opções de plano, acesse <Link to="/login" activeStyle>Minha Conta</Link> na área logada.
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Free</th>
                  <th scope="col">Individual</th>
                  <th scope="col">Familia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>R$ 0,00</td>
                  <td>R$ 9,99</td>
                  <td>R$ 29,99</td>
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Faq;
