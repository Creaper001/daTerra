import { useState } from "react";
import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth";

export const MenuIn = ({ select = 1, inicio = false }) => {
  const navegate = useNavigate();
  const authContext = useContext(AuthContext);
  const [name, Name] = useState("...");
  const [isProducer, IsProducer] = useState(false);

  function isAuth() {
    const { producer, consumer } = authContext;
    if (!consumer && !producer) navegate("/");
  }
  function User() {
    const user = authContext.user;
    if (user) Name(user.name);
    IsProducer(authContext?.producer);
  }
  function Logout() {
    authContext.User(undefined);
    authContext.Token(undefined);
    authContext.Consumer(undefined);
    authContext.Producer(undefined);
    navegate("/signin");
  }

  useEffect(() => {
    isAuth();
    User();
  }, []);

  return (
    <header className="menu">
      <nav className="menu_nav">
        <a href="#">
          <img src="/daterra.svg" alt="DaTerra" />
        </a>
        <ul className="menu_list">
          {inicio ? (
            <li className="link_icon">
              <Link to={isProducer ? "/producer" : "/consumer"}>
                <img src="/icons/cog.svg" />
                <span>Inicio</span>
              </Link>
            </li>
          ) : null}

          <li className={`link_icon ${select === 0 ? "link_icon_select" : ""}`}>
            {isProducer ? (
              <Link to="/producer/requests">
                <img
                  src={`/icons/${select === 0 ? "box.svg" : "package.svg"}`}
                />
                <span>Pedidos</span>
              </Link>
            ) : (
              <Link to="/consumer/boxes">
                <img
                  src={`/icons/${select === 0 ? "box.svg" : "package.svg"}`}
                />
                <span>Caixas</span>
              </Link>
            )}
          </li>

          <li className={`link_icon ${select === 1 ? "link_icon_select" : ""}`}>
            <Link to={isProducer ? "/producer" : "/consumer"}>
              <img
                src={`/icons/${select === 1 ? "settings.svg" : "cog.svg"}`}
              />
              <span>Configurações</span>
            </Link>
          </li>
        </ul>
        <ul className="menu_list">
          <li>{name}</li>
          <li>|</li>
          <li className="logout">
            <a onClick={Logout}>Sair</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
