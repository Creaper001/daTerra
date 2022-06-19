import React, { Component } from "react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import api from "../services/api";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      selected: "Temperos",
      search: "",
    };
  }

  searchInterest() {
    if (this.state.products[this.state.selected] === undefined) return [];
    return this.state.products[this.state.selected].filter((item) => {
      return this.state.search !== "" ? item[2].includes(this.state.search) : true;
    });
  }

  setProducts(products = [], interests = []) {
    let data = {};
    products.forEach((product) => {
      const active = interests.map((interest) => interest.product_id).includes(Number(product.code));
      if (data[product.type] === undefined) data[product.type] = [];
      data[product.type].push([product.code, active, product.name]);
    });
    this.setState({ products: data, selected: data[products[0].type] });
  }

  async componentDidMount() {
    const products = await api.get("/products");
    const interest = await api.get("/consumers/interests");
    this.setProducts(products.data, interest.data);
  }

  async saveInterest() {
    const interests = [];
    Object.values(this.state.products).forEach((product) => {
      product.forEach((item) => {
        interests.push(item);
      });
    });
    await api.post(`/consumers/interests`, { interests });
  }

  setInterests(index, status) {
    const products = this.state.products;
    products[this.state.selected][index][1] = status;
    this.setState({ products });
    this.saveInterest();
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
                {Object.keys(this.state.products).map((interest) => (
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
                    {item[2]}
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
