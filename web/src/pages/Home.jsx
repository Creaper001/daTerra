import { useState, useEffect, useContext } from "react";
import { MenuOut } from "../components/MenuOut";
import { Link, useNavigate } from "react-router-dom";
import "../assets/pages/Home.css";
import Api from "../Api";
import { AuthContext } from "../Auth";

export default () => {
  const plansImages = ["/plan_small.png", "/plan_medium.png", "/plan_big.png"];
  const authContext = useContext(AuthContext);
  const navegate = useNavigate();
  const [plans, Plans] = useState([]);

  async function ApiPlans() {
    const response = await Api.get("/plans");
    Plans(response.data);
  }
  function isAuth() {
    const { producer, consumer } = authContext;
    if (consumer) navegate("/consumer");
    if (producer) navegate("/producer");
  }

  useEffect(() => {
    isAuth();
    ApiPlans();
  }, []);

  return (
    <main className="home">
      <MenuOut />
      <section className="center">
        <h1>Escolha a caixa que se encaixa na sua alimentação!</h1>
        <h2>
          Evite desperdicios, escolha a caixa que se adequa a sua necessidade
          semanal!
        </h2>
        <div className="plans">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`plan ${plan.master ? "plan_master" : ""}`}
            >
              <p>{plan.name}</p>
              <img src={plansImages[index]} />
              <Link to="/consumer/signup" className="plan_button">
                Quero este!
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
