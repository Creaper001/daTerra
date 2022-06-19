import React, { Component } from "react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import api from "../services/api";

class Signature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      keys: [],
      products: [],
      renovation: false,
      sum: {},
    };
  }

  setProducts(products = []) {
    let data = {};
    products.forEach((product) => {
      if (data[product.type] === undefined) data[product.type] = [];
      data[product.type].push([product.code, 0, product.name]);
    });
    this.setState({ keys: Object.keys(data), products: data });
  }

  setSignature(signature, plans) {
    const signatures = signature.map((s) => s.plan_id);
    const newPlans = plans.map((plan) => {
      if (signatures.includes(Number(plan.code))) plan.active = true;
      else plan.active = false;
      return plan;
    });
    this.setState({ plans: newPlans, renovation: signature[0].renovation });
  }

  async renovation() {
    const plan = this.state.plans.find((plan) => plan.active);
    await api.post("/consumers/signature/renovation", {
      plan: plan.code,
      renovation: !this.state.renovation,
    });
    this.setState({ renovation: !this.state.renovation });
  }

  async saveSignature() {
    const plans = this.state.plans;
    const data = plans.map((plan) => [plan.code, plan.active]);
    await api.post("/consumers/signature", {
      plans: data,
    });
  }

  async setActive(active) {
    console.log(active);
    const newPlans = this.state.plans.map((plan) => {
      if (plan.code === active) plan.active = true;
      else plan.active = false;
      return plan;
    });
    this.setState({ plans: newPlans });
    await this.saveSignature();
  }

  async componentDidMount() {
    const products = await api.get("/products");
    const plans = await api.get("/plans");
    const signature = await api.get("/consumers/signature");
    this.setProducts(products.data);
    this.setSignature(signature.data, plans.data);
    const items = await api.get("/consumers/signature/items");
    let product = this.state.products;
    items.data.forEach((item) => {
      Object.keys(this.state.products).forEach((key) => {
        const x = product[key].findIndex((p) => {
          return Number(p[0]) === item.product_id;
        });
        if (x !== -1) product[key][x][1] = item.units;
      });
    });
    this.setState({ products: product });
  }

  async setQuantity(product, number) {
    const products = this.state.products;
    for (let x of products[product]) {
      if (x[1] + number < 0) continue;
      x[1] = x[1] + number;
      this.setState({ products });
      break;
    }

    let list = [];
    Object.values(products).forEach((value) => {
      list.push(...value);
    });
    await api.post("/consumers/signature/items", { itens: list });
  }

  sum(product) {
    const products = this.state.products[product];
    return products.map((product) => product[1]).reduce((a, b) => a + b, 0);
  }

  render() {
    return (
      <NavBar>
        <section className="s-config bg">
          <div className="container">
            <div className="breadcrumb">
              <NavLink to="/dashboard">Configurações</NavLink>
              <NavLink to="/address">Assinatura</NavLink>
            </div>

            <div className="signature">
              <NavLink to="/history" className="history">
                <div className="title">
                  <svg data-src="./icone/clock.svg"></svg>
                  <p>Histórico de assinaturas</p>
                </div>
                <svg data-src="./icone/chevron-right.svg"></svg>
              </NavLink>

              <div className="renovacao">
                <div className="text">
                  <h6>Renovação de assinatura</h6>
                  <p>Permitir renovação de assinatura semanal automática?</p>
                </div>
                <div className="switch__container">
                  <input
                    id="switch-flat"
                    className="switch switch--flat"
                    type="checkbox"
                    checked={this.state.renovation}
                    onChange={() => this.renovation()}
                  />
                  <label htmlFor="switch-flat"></label>
                </div>
              </div>

              <div className="config-signature content">
                <span className="subtitle">Selecione o plano</span>
                <div className="planos">
                  {this.state.plans.map((plan, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        name="plano"
                        id={plan.name}
                        checked={plan.active}
                        onChange={() => this.setActive(plan.code)}
                      />
                      <label className="item" htmlFor={plan.name}>
                        <div className="text">
                          <h6>{plan.name}</h6>
                          <p>
                            R${plan.price} / {plan.units}un
                          </p>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                <span className="subtitle">Selecione as quantidades</span>
                <div className="interesses-qtd">
                  {this.state.keys.map((product, index) => (
                    <div className="item" key={index}>
                      <img src="./temperos.png" alt="" />
                      <div className="info">
                        <h6>{product}</h6>
                        <div className="qtd">
                          <button onClick={() => this.setQuantity(product, -1)}>
                            <svg data-src="./icone/minus.svg"></svg>
                          </button>
                          <p>{this.sum(product)}</p>
                          <button onClick={() => this.setQuantity(product, +1)}>
                            <svg data-src="./icone/plus.svg"></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </NavBar>
    );
  }
}

export default Signature;
