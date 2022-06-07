import React, { Component } from "react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import api from "../services/api";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: {
        Temperos: [
          ["1", false],
          ["2", false],
          ["3", false],
        ],
        Verduras: [
          ["4", false],
          ["5", false],
          ["6", false],
        ],
        Legumes: [
          ["7", false],
          ["8", false],
          ["9", false],
        ],
        Frutas: [
          ["11", false],
          ["12", false],
          ["13", false],
        ],
      },

      selected: "Temperos",
      search: "",
    };
  }

  searchInterest() {
    return this.state.interests[this.state.selected].filter((item) => {
      return this.state.search !== "" ? item.includes(this.state.search) : true;
    });
  }

  async componentDidMount() {
    const response = await api.get("/interests");
    this.setState({ interests: response.data });
  }

  async saveInterest() {
    await api.patch(`/interests`, this.state.interests);
    const response = await api.get("/interests");
    this.setState({ interests: response.data });
  }

  setInterests(index, status) {
    const interests = this.state.interests;
    interests[this.state.selected][index][1] = status;
    this.setState({ interests });
    console.log(interests);
  }

  render() {
    return (
      <NavBar>
        <section className="s-config bg">
          <div className="container">
            <div className="breadcrumb">
              <NavLink to="/dashboard">Configurações</NavLink>
              <NavLink to="/interest">Interesses</NavLink>
            </div>

            <div className="campo search">
              <div className="input">
                <input
                  type="search"
                  placeholder="Buscar aqui"
                  onChange={(e) => this.setState({ search: e.target.value })}
                />
                <svg data-src="./icone/search.svg"></svg>
              </div>
            </div>

            <ul className="interest-list">
              <ul className="menu">
                {Object.keys(this.state.interests).map((interest) => (
                  <li key={interest}>
                    <button
                      onClick={() => this.setState({ selected: interest })}
                    >
                      {interest}
                    </button>
                  </li>
                ))}
              </ul>
              {this.searchInterest().map((item, index) => (
                <li key={index}>
                  <label htmlFor={item[0]} className="check">
                    {item[0]}
                    <input
                      type="checkbox"
                      id={item[0]}
                      onChange={(e) =>
                        this.setInterests(index, e.target.checked)
                      }
                      checked={item[1]}
                    />
                    <span className="checkmark"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </NavBar>
    );
  }
}

export default Dashboard;
