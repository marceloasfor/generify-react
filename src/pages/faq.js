import React from "react";
import { Link } from "react-router-dom";

const Faq = () => {
	return (
		<div className="pg-form container" >
      <div className="row">
          <span style={{textAlign: 'center', paddingBottom: '20px'}}><b className="main-font">GeneriFAQ</b></span>
      </div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Como criar uma conta?
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Sua conta conosco é gratuita!</strong> Basta clicar no link de <Link to="/form" activeStyle>cadastro</Link> e submeter o formulário com todos os campos obrigatórios preenchidos.
              Você receberá um email de validação da conta. Após do link de confirmação no email, sua conta estará pronta para uso!
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Como encontrar uma música?
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Os maiores artistas estão no nosso player.</strong> Para encontrar suas músicas preferidas, basta fazer o <Link to="/login" activeStyle>login</Link> com sua conta de cadastro,
              clicar na barra de busca e então pesquisar por artista, música ou álbum.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Posso remover as propagandas?
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
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
            </div>
          </div>
        </div>
      </div>
    </div>
	);
};

export default Faq;
