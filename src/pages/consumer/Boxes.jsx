import { MenuIn } from "../../components/MenuIn";
import "../../assets/pages/Requests.css";
import { Link } from "react-router-dom";
import Api from "../../Api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Auth";

export default () => {
  const statusColor = ["#00C294", "#326463", "#FF8B20"];

  const authContext = useContext(AuthContext);
  const [boxes, Boxes] = useState([]);

  async function ApiBoxes() {
    const response = await Api.get("/consumer/boxes", {
      headers: {
        Authorization: `Bearer ${authContext.token.token}`,
      },
    });
    Boxes(response.data);
  }

  useEffect(() => {
    if (authContext.token) {
      ApiBoxes();
    }
  }, []);

  function low(string) {
    return string.toLowerCase();
  }
  function date(string) {
    const d = new Date(string);
    return d.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  function estimated(string) {
    const d = new Date(string);
    const init = d.getDate();
    d.setDate(d.getDate() + 2);
    const end = d.toLocaleDateString("pt-BR", {
      month: "long",
      day: "numeric",
    });
    return `${init} e ${end}`;
  }
  function delivery(string) {
    const d = new Date(string);
    return d.toLocaleDateString("pt-BR", {
      month: "long",
      day: "numeric",
    });
  }

  return (
    <main>
      <MenuIn select={0} />
      <section className="center">
        <div className="header">
          <p className="title">Caixas</p>
          <div className="search">
            <input type="text" placeholder="Buscar aqui" />
            <img src="/icons/search.svg" />
          </div>
          <Link className="button" to="/consumer/plan">
            Assinar caixa
          </Link>
        </div>
        <br />
        <div>
          {boxes.map((box) => (
            <div className="box_list" key={box.id}>
              <div className="top">
                <button
                  style={{ background: statusColor[box.box_status_id - 1] }}
                >
                  {box.boxStatus.name}
                </button>
                <p>{date(box.created_at)}</p>
              </div>
              <hr />
              <div className="main">
                <div className="first">
                  <img src="/box.svg" />
                  <div>
                    {box.box_status_id === 1 ? (
                      <>
                        <p className="title">
                          Chega entre {estimated(box.delivery_estimated_date)}
                        </p>
                        <span className="info">
                          O produtor está preparando seu pacote
                        </span>
                      </>
                    ) : box.box_status_id === 2 ? (
                      <>
                        <p className="title">
                          Chegou no dia {delivery(box.delivery_date)}
                        </p>
                        <span className="info_link">Visualizar produtos</span>
                      </>
                    ) : (
                      <p className="title">Pacote cancelado</p>
                    )}
                    <br />
                    <span className="subtitle">
                      Pacote {low(box.plan.name)} ({box.plan.units} unidades)
                    </span>
                  </div>
                </div>
                <div>
                  <p className="date">{box.producer.user.name}</p>
                  <span className="date_label">Produtor</span>
                </div>
                {box.box_status_id === 1 ? (
                  <button className="link_button">O que pode conter?</button>
                ) : box.box_status_id === 2 ? (
                  <button className="link_button">Avaliar</button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
