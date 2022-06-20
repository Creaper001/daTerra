import React, { Component } from "react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import api from "../services/api";

class Bancas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [],
    };
  }

  async componentDidMount() {
    const response = await api.get("/addresses");
    this.setState({ address: response.data });
  }

  async deleteAddress(code) {
    await api.delete(`/addresses/${code}`);
    const address = this.state.address.filter(
      (address) => address.code !== code
    );
    this.setState({ address });
  }

  async mainAddress(code) {
    await api.patch(`/addresses/${code}`);
    const response = await api.get("/addresses");
    this.setState({ address: response.data });
  }

  render() {
    return (
      <NavBar>
        <section className="s-config bg">
          <div className="container">
            <div className="breadcrumb">
              <NavLink to="/dashboard">Configurações</NavLink>
              <NavLink to="/address">Endereços</NavLink>
            </div>

            <ul className="address list content">
              {this.state.address.map((address) => (
                <li key={address.code}>
                  <div className="text">
                    <h6>{address.street}</h6>
                    <p>
                      CEP {address.cep} - {address.state} -{" "}
                      {address.neighborhood}
                    </p>
                  </div>
                  <div className="itens">
                    {!address.main && (
                      <p
                        onClick={() => this.mainAddress(address.code)}
                        style={{ cursor: "pointer" }}
                      >
                        Envie nesse endereço
                      </p>
                    )}
                    <svg
                      data-src="./icone/map-pin.svg"
                      fill={address.main ? "#7F8A92" : "transparent"}
                    ></svg>
                    <svg data-src="./icone/edit.svg"></svg>
                    <svg
                      data-src="./icone/trash.svg"
                      onClick={() => this.deleteAddress(address.code)}
                    ></svg>
                  </div>
                </li>
              ))}

              <button className="btn btn-secondary-transparent">
                <svg data-src="./icone/plus.svg"></svg>
                <p>Adicionar novo</p>
              </button>
            </ul>
          </div>
        </section>
      </NavBar>
    );
  }
}

export default Bancas;
