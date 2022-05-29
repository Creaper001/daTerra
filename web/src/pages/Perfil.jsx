import React, { Component } from "react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import api from "../services/api";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      name: "",
      email: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
      phone: "",

      error: null,
    };
  }

  async componentDidMount() {
    const response = await api.get("/users");
    this.setState({
      user: response.data,
      name: response.data.name,
      email: response.data.email,
      phone: response.data.phone,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, newPassword, confirmPassword, phone } =
      this.state;

    if (newPassword !== confirmPassword) {
      this.setState({ error: "Senhas não conferem" });
    } else {
      await api.put("/users", {
        name,
        email,
        password,
        newPassword,
        phone,
      });
      const response = await api.get("/users");
      this.setState({ user: response.data });
    }
  }

  render() {
    return (
      <NavBar>
        <section className="s-config bg">
          <div className="container">
            <div className="breadcrumb">
              <NavLink to="/dashboard">Configurações</NavLink>
              <NavLink to="/perfil">Dados</NavLink>
            </div>

            <div className="perfil">
              <div className="text">
                <h6>{this.state.user.name}</h6>
              </div>
            </div>

            <form className="content form" onSubmit={this.handleSubmit}>
              <span className="subtitle">Perfil</span>
              <div className="row">
                <div className="col-5">
                  <div className="campo">
                    <div className="input">
                      <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                      <label htmlFor="">Nome</label>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <div className="campo">
                    <div className="input">
                      <input
                        type="email"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                      <label htmlFor="">Email</label>
                    </div>
                  </div>
                </div>
              </div>
              <span className="subtitle">Senha</span>
              <div className="row">
                <div className="col-5">
                  <div className="campo">
                    <div className="input">
                      <input
                        type="password"
                        placeholder="Digite sua senha atual"
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                        autoComplete="none"
                      />
                      <svg data-src="./icone/eye.svg"></svg>
                      <label htmlFor="">Senha atual</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <div className="campo">
                    <div className="input">
                      <input
                        type="password"
                        placeholder="Digite sua nova senha"
                        onChange={(e) =>
                          this.setState({ newPassword: e.target.value })
                        }
                        autoComplete="none"
                      />
                      <svg data-src="./icone/eye.svg"></svg>
                      <label htmlFor="">Nova senha</label>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <div className="campo">
                    <div className="input">
                      <input
                        type="password"
                        placeholder="Confirme sua nova senha"
                        onChange={(e) =>
                          this.setState({ confirmPassword: e.target.value })
                        }
                        autoComplete="none"
                      />
                      <svg data-src="./icone/eye.svg"></svg>
                      <label htmlFor="">Confirme sua senha</label>
                    </div>
                  </div>
                </div>
              </div>
              <span className="subtitle">Contato</span>
              <div className="row">
                <div className="col-5">
                  <div className="campo">
                    <div className="input">
                      <input
                        type="text"
                        value={this.state.phone}
                        onChange={(e) =>
                          this.setState({ phone: e.target.value })
                        }
                      />
                      <label htmlFor="">Telefone</label>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-secondary">Atualizar dados</button>
            </form>
          </div>
        </section>
      </NavBar>
    );
  }
}

export default Dashboard;
