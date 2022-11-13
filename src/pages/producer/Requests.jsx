import { MenuIn } from "../../components/MenuIn";
import "../../assets/pages/Requests.css";
import Api from "../../Api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Auth";

export default () => {
  const authContext = useContext(AuthContext);
  const [boxes, Boxes] = useState([]);

  async function ApiBoxes() {
    const response = await Api.get("/producers/boxes", {
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

  return (
    <main>
      <MenuIn select={0} inicio={true} />
      <section className="center">
        <div className="header">
          <p className="title">Pedidos</p>
          <div className="search">
            <input type="text" placeholder="Buscar aqui" />
            <img src="/icons/search.svg" />
          </div>
          <div className="requests_modes">
            <div className="select">
              <p>Pedidos</p>
            </div>
            <div>
              <p>A entregar</p>
            </div>
            <div>
              <p>Entregue</p>
            </div>
          </div>
        </div>
        <br />
        <div>
          {boxes.map((box) => (
            <div className="box_list" key={box.id}>
              <div className="main">
                <div className="first">
                  <img src="/box.svg" />
                  <div>
                    <p className="title">{box.consumer.user.name}</p>
                    <span className="subtitle">
                      {box.consumer.user.address.street},{" "}
                      {box.consumer.user.address.number}
                      <br />
                      {box.consumer.user.address.neighborhood} -{" "}
                      {box.consumer.user.address.city},{" "}
                      {box.consumer.user.address.state}
                    </span>
                  </div>
                </div>
                <div>
                  {box.box_status_id === 1 ? (
                    <>
                      <p className="date">
                        {new Date(
                          box.delivery_estimated_date
                        ).toLocaleDateString()}
                      </p>
                      <span className="date_label">previsão de entrega</span>
                    </>
                  ) : null}
                </div>
                <button className="link_button">Montar caixa</button>
              </div>
              <hr />
              {box.box_status_id === 1 ? (
                <div className="sub">
                  <p>Interreses correspondentes aos produtos desta semana</p>
                  <p>
                    Cesta {low(box.plan.name)} - {box.plan.units} variedades
                  </p>
                  <br />
                  <ul>
                    {box.consumer.interests.map((interest) => (
                      <li>{interest.product.name}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
