import { Component } from "react";
import api from "../services/api";
import { login } from "../services/auth";

class SignIn extends Component {
  state = {
    email: null,
    password: null,

    error: null,
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });
      if (response.data.token) {
        login(response.data.token);
        this.props.history.push("/");
      } else {
        console.log(response.data);
      }
    } catch (err) {
      this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
    }
  };

  render() {
    return (
      <section className="login">
        <div className="header">
          <img src="./logo.svg" alt="" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>
        </div>
        <form onSubmit={this.handleSignIn}>
          <div className="campo">
            <div className="input">
              <input
                type="email"
                placeholder="Digite aqui seu email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <label htmlFor="">E-mail</label>
            </div>
          </div>
          <div className="campo">
            <div className="input">
              <input
                type="password"
                placeholder="Digite sua senha"
                onChange={(e) => this.setState({ password: e.target.value })}
                autoComplete="none"
              />
              <label htmlFor="">Senha</label>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

export default SignIn;
