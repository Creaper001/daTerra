import { Link } from "react-router-dom";

export const MenuBack = () => {
  return (
    <header className="menu">
      <nav className="menu_nav">
        <a href="#">
          <img src="/daterra.svg" alt="DaTerra" />
        </a>
        <ul className="menu_list">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
