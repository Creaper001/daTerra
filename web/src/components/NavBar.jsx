import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import api from "../services/api";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",

      error: null,
    };
  }

  async componentDidMount() {
    const response = await api.get("/users");
    this.setState({ user: response.data });
  }

  render() {
    return (
      <main>
        <nav>
          <div className="container">
            <svg data-src="./logo-branca.svg" alt="" className="logo" />

            <ul>
              <li>
                <NavLink to="/signin">
                  <svg data-src="../icone/box.svg"></svg>
                  Caixas
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">
                  <svg data-src="./icone/cog.svg"></svg>
                  Configurações
                </NavLink>
              </li>

              <li className="perfil">
                <p>{this.state.user.name}</p>
              </li>
              <li>
                <NavLink to="/logout" className="out">
                  Sair
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </main>
    );
  }
}

export default NavBar;
