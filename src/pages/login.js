import React from "react";

const Login = () => {
	return (
		<div className="pg-form" >
      
      <div className="container">
        <form className="row g-3 needs-validation" novalidate>
          <div className="col-md-4">
            <label for="validationCustom01" className="form-label">Nome</label>
            <input type="text" className="form-control" id="validationCustom01" required/>
            <div className="valid-feedback">
              Válido!
            </div>
          </div>
          <div className="col-md-4">
            <label for="validationCustom02" className="form-label">Sobrenome</label>
            <input type="text" className="form-control" id="validationCustom02" required/>
            <div className="valid-feedback">
              Válido!
            </div>
          </div>
          <div className="col-md-4">
            <label for="validationCustomUsername" className="form-label">Nome de usuário</label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">@</span>
              <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
              <div className="invalid-feedback">
                Por favor, insira um nome de usuário.
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <label for="userEmail" className="form-label">Email</label>
            <input type="email" className="form-control" id="userEmail" required/>
            <div className="invalid-feedback">
              Por favor, insira um email válido.
            </div>
          </div>
          <div className="col-md-3">
            <label for="validationCustom03" className="form-label">Cidade</label>
            <input type="text" className="form-control" id="validationCustom03" required/>
            <div className="invalid-feedback">
              Por favor, insira uma cidade válida.
            </div>
          </div>
          <div className="col-md-3">
            <label for="validationCustom04" className="form-label">Estado</label>
            <select className="form-select" id="validationCustom04" required>
              <option selected disabled value="">Selecione o Estado (UF)</option>
              <option value="Acre">Acre</option>
              <option value="Alagoas">Alagoas</option>
              <option value="Amapá">Amapá</option>
              <option value="Amazonas">Amazonas</option>
              <option value="Bahia">Bahia</option>
              <option value="Ceará">Ceará</option>
              <option value="Distrito Federal">Distrito Federal</option>
              <option value="Espírito Santo">Espírito Santo</option>
              <option value="Goiás">Goiás</option>
              <option value="Maranhão">Maranhão</option>
              <option value="Mato Grosso">Mato Grosso</option>
              <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Pará">Pará</option>
              <option value="Paraíba">Paraíba</option>
              <option value="Paraná">Paraná</option>
              <option value="Pernambuco">Pernambuco</option>
              <option value="Piauí">Piauí</option>
              <option value="Rio de Janeiro">Rio de Janeiro</option>
              <option value="Rio Grande do Sul">Rio Grande do Sul</option>
              <option value="Rio Grande do Norte">Rio Grande do Norte</option>
              <option value="Rondônia">Rondônia</option>
              <option value="Roraima">Roraima</option>
              <option value="Santa Catarina">Santa Catarina</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Sergipe">Sergipe</option>
              <option value="Tocantins">Tocantins</option>
            </select>
            <div className="invalid-feedback">
              Por favor, insira uma estado.
            </div>
          </div>
          <div className="col-md-2">
            <label for="id_cep" className="form-label">CEP</label>
            <input type="text" className="form-control" id="id_cep" maxlength="8" required/>
            <div className="invalid-feedback">
              Por favor, insira um CEP válido.
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
              <label className="form-check-label" for="invalidCheck">
                Concordo com os termos e condições de uso do Generify&trade;.
              </label>
              <div className="invalid-feedback">
                Você precisa concordar com os temos e condições de uso antes de continuar.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
      </div>
      
    </div>
	);
};

export default Login;
