import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Auth";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { MenuIn } from "../../components/MenuIn";
import { Link } from "react-router-dom";
import "../../assets/pages/Index.css";
import Api from "../../Api";

export default () => {
  const links = [
    {
      name: "CONFIGURAÇÕES",
      url: "/consumer",
    },
  ];

  const authContext = useContext(AuthContext);
  const [name, Name] = useState("...");
  const [boxes, Boxes] = useState([]);

  function Consumer() {
    const user = authContext.user;
    if (user) Name(user.name);
  }

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
      Consumer();
      ApiBoxes();
    }
  }, []);

  return (
    <main>
      <MenuIn select={1} inicio={true} />
      <section className="center">
        <Breadcrumbs links={links} />
        <br />
        <div className="box_user">
          <p>{name}</p>
          <span>{boxes.length} caixas enviadas</span>
        </div>
        <div className="box_user">
          <ul className="list_nav">
            <li>
              <Link to="/consumer/account">
                <div className="info">
                  <img src="/icons/user.svg" />
                  <div>
                    <p>Dados</p>
                    <span>Gerencie seus dados</span>
                  </div>
                </div>
                <img src="/icons/arrow-right.svg" />
              </Link>
            </li>
            <li>
              <Link to="/consumer/plan">
                <div className="info">
                  <img src="/icons/file-text.svg" />
                  <div>
                    <p>Fazenda</p>
                    <span>Conte sua historia</span>
                  </div>
                </div>
                <img src="/icons/arrow-right.svg" />
              </Link>
            </li>
            <li>
              <a href="#">
                <div className="info">
                  <img src="/icons/map.svg" />
                  <div>
                    <p>Endereço</p>
                    <span>Veja o endereço cadastrado</span>
                  </div>
                </div>
                <img src="/icons/arrow-right.svg" />
              </a>
            </li>
            <li>
              <Link to="/consumer/interests">
                <div className="info">
                  <img src="/icons/check-square.svg" />
                  <div>
                    <p>Produtos</p>
                    <span>Novo produto para adicionar?</span>
                  </div>
                </div>
                <img src="/icons/arrow-right.svg" />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};
