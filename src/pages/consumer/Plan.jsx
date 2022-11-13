import { useState, useEffect, useContext } from "react";
import { MenuIn } from "../../components/MenuIn";
import { Plans } from "../../components/Plans";
import "../../assets/pages/Plan.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth";
import Api from "../../Api";
import { Breadcrumbs } from "../../components/Breadcrumbs";

export default () => {
  const links = [
    {
      name: "CONFIGURAÇÕES",
      url: "/consumer",
    },
    {
      name: "ASSINATURA",
      url: "#",
    },
  ];

  const authContext = useContext(AuthContext);
  const [defaultPlan, DefaultPlan] = useState(0);
  const [myPlan, MyPlan] = useState(defaultPlan);
  const [allPlans, AllPlans] = useState([]);

  async function ApiPlans() {
    const response = await Api.get("/plans");
    AllPlans(response.data);
  }
  function UserPlan() {
    const consumer = authContext.consumer;
    if (consumer) DefaultPlan(consumer.plan_id);
  }

  useEffect(() => {
    ApiPlans();
    UserPlan();
  }, []);

  function onSubmit() {}

  return (
    <div>
      <MenuIn select={1} />
      <section className="center">
        <Breadcrumbs links={links} />
        <br />
        <Link className="box_history" to="/">
          <div>
            <img src="/icons/clock.svg" />
            <p>Histórico de assinaturas</p>
          </div>
          <img src="/icons/arrow-right-white.svg" />
        </Link>
        <br />
        <form className="box" onSubmit={(e) => onSubmit(e, myPlan)}>
          <p className="form_title">SELECIONE O PLANO</p>
          <div className="field">
            <Plans
              plans={allPlans}
              onChange={(plan) => MyPlan(plan)}
              defaultPlan={defaultPlan}
            />
          </div>
          <br />
          <button className="button button_big">Atualizar plano</button>
        </form>
      </section>
    </div>
  );
};
