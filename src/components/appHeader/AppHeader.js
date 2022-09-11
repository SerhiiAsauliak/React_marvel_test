import "./appHeader.scss";
import { NavLink } from "react-router-dom";

export const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <NavLink to="/">
          <span>Marvel</span> information portal
        </NavLink>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink
              end
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "red" : "inherit",
              })}
            >
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink
              to="/comics"
              style={({ isActive }) => ({ color: isActive ? "red" : "" })}
            >
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
