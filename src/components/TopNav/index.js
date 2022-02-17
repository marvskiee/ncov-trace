import React from "react";
import { Link } from "react-router-dom";

function TopNav({ toggle, setToggle }) {
  return (
    <nav>
      <div>
        <img
          className="nav-logo"
          alt="logo"
          src={require("../../assets/logo.png")}
        />
        <p className="nav-text">nCov-Trace</p>
      </div>
      <div className="nav-menu">
        <div className={`menu-list ${toggle}`}>
          <ul>
            <li onClick={() => setToggle("")}>
              <Link to="/tracker">Tracker</Link>
            </li>
            <li onClick={() => setToggle("")}>
              <Link to="/about-covid19">About Covid19</Link>
            </li>
          </ul>
        </div>
        <img
          onClick={() => setToggle(toggle === "" ? "active" : "")}
          className="menu-toggle"
          alt="menu-toggle"
          src={require("../../assets/menu.png")}
        />
      </div>
    </nav>
  );
}

export default TopNav;
