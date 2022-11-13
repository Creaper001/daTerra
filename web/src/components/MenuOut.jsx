import { Link } from "react-router-dom";

export const MenuOut = () => {
  return (
    <header className="menu">
      <nav className="menu_nav">
        <a href="#">
          <img src="/daterra.svg" alt="DaTerra" />
        </a>
        <ul className="menu_list">
          <li>
            <Link to="/">O que fazemos?</Link>
          </li>
          <li>
            <Link to="/">Perguntas frequentes</Link>
          </li>
          <li>
            <Link to="/producer/signup">Seja um produtor</Link>
          </li>
          <li>
            <Link to="/consumer/signup" className="button">
              Assine aqui
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
