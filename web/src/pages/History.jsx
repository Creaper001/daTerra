import React, { Component } from "react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import api from "../services/api";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
    };
  }

  async componentDidMount() {
    const plans = await api.get("/plans");
    const signature = await api.get("/consumers/signature/all");
    this.setSignature(signature.data, plans.data);
  }

  setSignature(signature, plans) {
    let newPlans = signature.map((s) =>
      plans.find((plan) => Number(plan.code) === s.plan_id)
    );
    newPlans = newPlans.map((plan, index) =>{
      plan.created_at = signature[index].created_at;
      return plan;
    });
    this.setState({ plans: newPlans });
  }

  render() {
    return (
      <NavBar>
        <section className="s-config bg">
          <div className="container">
            <div className="breadcrumb">
              <NavLink to="/dashboard">Configurações</NavLink>
              <NavLink to="/signature">Assinatura</NavLink>
              <NavLink to="/historico">Histórico</NavLink>
            </div>

            <ul className="history list content">
              {this.state.plans.map((plan, index) => (
                <li key={index}>
                  <div className="text">
                    <h6>Pacote {plan.name}</h6>
                    <p>
                      {new Date(plan.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <h6>R$ {plan.price}</h6>
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
