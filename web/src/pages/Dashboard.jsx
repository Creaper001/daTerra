import React, { Component } from "react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import api from "../services/api";

class Dashboard extends Component {
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
      <NavBar>
        <section class="s-config bg">
          <div class="container">
            <div class="breadcrumb">
              <a href="./index.html">Configurações</a>
            </div>

            <div class="perfil">
              <div class="text">
                <h6>{this.state.user.name}</h6>
                <p>10 caixas recebidas</p>
              </div>
            </div>

            <ul class="config content">
              <li>
                <NavLink to="/perfil">
                  <div class="item">
                    <svg data-src="./icone/user.svg"></svg>
                    <div class="text">
                      <h6>Dados</h6>
                      <p>Gerencie seus dados</p>
                    </div>
                  </div>
                  <svg data-src="./icone/chevron-right.svg"></svg>
                </NavLink>
              </li>
              <li>
                <a href="">
                  <div class="item">
                    <svg data-src="./icone/card.svg"></svg>
                    <div class="text">
                      <h6>Cartões</h6>
                      <p>Gerencie seus cartões</p>
                    </div>
                  </div>

                  <svg data-src="./icone/chevron-right.svg"></svg>
                </a>
              </li>
              <li>
                <a href="./signature.html">
                  <div class="item">
                    <svg data-src="./icone/file-text.svg"></svg>
                    <div class="text">
                      <h6>Assinatura</h6>
                      <p>Quer receber mais produtos?</p>
                    </div>
                  </div>

                  <svg data-src="./icone/chevron-right.svg"></svg>
                </a>
              </li>
              <li>
                <NavLink to="/address">
                  <div class="item">
                    <svg data-src="./icone/map.svg"></svg>
                    <div class="text">
                      <h6>Endereço</h6>
                      <p>Veja os endereços cadastrados</p>
                    </div>
                  </div>

                  <svg data-src="./icone/chevron-right.svg"></svg>
                </NavLink>
              </li>

              <li>
                <NavLink to="/interest">
                  <div class="item">
                    <svg data-src="./icone/check-square.svg"></svg>
                    <div class="text">
                      <h6>Interesses</h6>
                      <p>Começou a gostar de um alimento novo?</p>
                    </div>
                  </div>
                  <svg data-src="./icone/chevron-right.svg"></svg>
                </NavLink>
              </li>
            </ul>
          </div>
        </section>
      </NavBar>
    );
  }
}

export default Dashboard;
