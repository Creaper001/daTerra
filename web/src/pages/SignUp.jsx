import { Component } from "react";
import api from "../services/api";
import { login } from "../services/auth";

class SignIn extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone: "",

    cep: "",
    number: "",
    complement: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "AC",

    etapa: 1,

    plans: [],
    keys: [],
    productsPlan: [],
    sum: {},

    products: {},
    selected: "Temperos",
    search: "",
  };

  searchInterest() {
    if (this.state.products[this.state.selected] === undefined) return [];
    return this.state.products[this.state.selected].filter((item) => {
      return this.state.search !== ""
        ? item[2].includes(this.state.search)
        : true;
    });
  }

  setProductsIn(products = [], interests = []) {
    let data = {};
    products.forEach((product) => {
      const active = interests
        .map((interest) => interest.product_id)
        .includes(Number(product.code));
      if (data[product.type] === undefined) data[product.type] = [];
      data[product.type].push([product.code, active, product.name]);
    });
    this.setState({ products: data, selected: data[products[0].type] });
  }

  async didMountIn() {
    const products = await api.get("/products");
    const interest = await api.get("/consumers/interests");
    this.setProductsIn(products.data, interest.data);
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

  setProducts(products = []) {
    let data = {};
    products.forEach((product) => {
      if (data[product.type] === undefined) data[product.type] = [];
      data[product.type].push([product.code, 0, product.name]);
    });
    this.setState({ keys: Object.keys(data), productsPlan: data });
  }

  setSignature(signature, plans) {
    const signatures = signature.map((s) => s.plan_id);
    const newPlans = plans.map((plan) => {
      if (signatures.includes(Number(plan.code))) plan.active = true;
      else plan.active = false;
      return plan;
    });
    this.setState({ plans: newPlans });
  }

  async didMouth() {
    const products = await api.get("/products");
    const plans = await api.get("/plans");
    const signature = await api.get("/consumers/signature");
    this.setProducts(products.data);
    this.setSignature(signature.data, plans.data);
  }

  async setQuantity(product, number) {
    const products = this.state.productsPlan;
    for (let x of products[product]) {
      if (x[1] + number < 0) continue;
      x[1] = x[1] + number;
      this.setState({ productsPlan: products });
      break;
    }

    let list = [];
    Object.values(products).forEach((value) => {
      list.push(...value);
    });
    await api.post("/consumers/signature/items", { itens: list });
  }

  sum(product) {
    const products = this.state.productsPlan[product];
    return products.map((product) => product[1]).reduce((a, b) => a + b, 0);
  }

  next(n) {
    this.setState({ etapa: this.state.etapa + n });
  }

  async saveSignature() {
    const plans = this.state.plans;
    const data = plans.map((plan) => [plan.code, plan.active]);
    await api.post("/consumers/signature", {
      plans: data,
    });
  }

  async setActive(active) {
    const newPlans = this.state.plans.map((plan) => {
      if (plan.code === active) plan.active = true;
      else plan.active = false;
      return plan;
    });
    this.setState({ plans: newPlans });
    await this.saveSignature();
  }

  async create() {
    await api.post("/users", {
      name: this.state.nome,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
    });

    const response = await api.post("/users/login", {
      email: this.state.email,
      password: this.state.password,
    });
    login(response.data.token);

    this.next(+1);
  }

  async address() {
    console.log(this.state.state);
    await api.post("/addresses", {
      cep: this.state.cep,
      state: this.state.state,
      city: this.state.city,
      neighborhood: this.state.neighborhood,
      street: this.state.street,
      number: this.state.number,
      complement: this.state.complement,
    });

    await this.didMouth();

    this.next(+1);
  }

  async plan() {
    await this.didMountIn();

    this.next(+1);
  }

  end() {
    this.props.history.push("/");
  }

  render() {
    return (
      <section className="s-config bg steps">
        <div className="container">
          <ul className="step">
            <li>
              <div className="circle">
                <p>1</p>
              </div>
              <h6>Crie sua conta</h6>
            </li>
            <img src="./icone/chevron-right.svg" alt="" />
            <li>
              <div className="circle">
                <p>2</p>
              </div>
              <h6>Adicione um endereço</h6>
            </li>
            <img src="./icone/chevron-right.svg" alt="" />
            <li>
              <div className="circle">
                <p>3</p>
              </div>
              <h6>Selecione seus interreses</h6>
            </li>
            <img src="./icone/chevron-right.svg" alt="" />
            <li>
              <div className="circle">
                <p>4</p>
              </div>
              <h6>Escolha seu plano</h6>
            </li>
          </ul>

          {this.state.etapa === 1 ? (
            <div className="content-3">
              <div className="content form">
                <span className="subtitle">Perfil</span>
                <div className="row">
                  <div className="col-5">
                    <div className="campo">
                      <div className="input">
                        <input
                          type="text"
                          value={this.state.nome}
                          onChange={(e) =>
                            this.setState({ nome: e.target.value })
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
                          value={this.state.password}
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                        />
                        <label htmlFor="">Senha</label>
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

                <button
                  className="btn btn-secondary"
                  onClick={() => this.create()}
                >
                  Criar conta
                </button>
              </div>
            </div>
          ) : null}

          {this.state.etapa === 2 ? (
            <div className="content-3">
              <div className="content form">
                <span className="subtitle">Endereço</span>
                <div className="row">
                  <div className="col-5">
                    <div className="campo">
                      <div className="input">
                        <input
                          type="text"
                          value={this.state.cep}
                          onChange={(e) =>
                            this.setState({ cep: e.target.value })
                          }
                        />
                        <label htmlFor="">CEP</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <div className="campo">
                      <div className="input">
                        <input
                          type="text"
                          value={this.state.street}
                          onChange={(e) =>
                            this.setState({ street: e.target.value })
                          }
                        />
                        <label htmlFor="">Rua</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="campo">
                      <div className="input">
                        <input
                          type="text"
                          value={this.state.number}
                          onChange={(e) =>
                            this.setState({ number: e.target.value })
                          }
                        />
                        <label htmlFor="">Número</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-5">
                    <div className="campo">
                      <div className="input">
                        <input
                          type="text"
                          value={this.state.complement}
                          onChange={(e) =>
                            this.setState({ complement: e.target.value })
                          }
                        />
                        <label htmlFor="">Complemento</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="campo">
                      <div className="input">
                        <input
                          type="text"
                          value={this.state.neighborhood}
                          onChange={(e) =>
                            this.setState({ neighborhood: e.target.value })
                          }
                        />
                        <label htmlFor="">Bairro</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-5">
                    <div className="campo">
                      <div className="input">
                        <input
                          type="text"
                          value={this.state.city}
                          onChange={(e) =>
                            this.setState({ city: e.target.value })
                          }
                        />
                        <label htmlFor="">Cidade</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="campo">
                      <div className="input">
                        <select
                          id="estado"
                          name="estado"
                          value={this.state.state}
                          onChange={(e) =>
                            this.setState({ state: e.target.value })
                          }
                        >
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                          <option value="EX">Estrangeiro</option>
                        </select>
                        <label htmlFor="">Estado</label>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-secondary"
                  onClick={() => this.address()}
                >
                  Salvar endereço
                </button>
              </div>
            </div>
          ) : null}

          {this.state.etapa === 3 ? (
            <div className="content">
              <div className="content form config-signature content">
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

                <button
                  className="btn btn-secondary"
                  onClick={() => this.plan()}
                >
                  Salvar plano
                </button>
              </div>
            </div>
          ) : null}

          {this.state.etapa === 4 ? (
            <div className="content-2">
              <span className="subtitle">Selecione seus interesses</span>
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

              <button className="btn btn-secondary" onClick={() => this.end()}>
                Finalizar
              </button>
            </div>
          ) : null}
        </div>
      </section>
    );
  }
}

export default SignIn;
