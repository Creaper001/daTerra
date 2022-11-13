import { Link } from "react-router-dom";
import "../assets/components/Breadcrumbs.css";

export const Breadcrumbs = ({ links }) => {
  return (
    <ul className="menu_list">
      {links.map((link, index) => (
        <div className="breadcrumbs" key={link.name}>
          <li
            className={index === links.length - 1 ? "link_icon_select" : null}
          >
            <Link to={link.url}>{link.name}</Link>
          </li>
          {index < links.length - 1 ? <li>|</li> : null}
        </div>
      ))}
    </ul>
  );
};
