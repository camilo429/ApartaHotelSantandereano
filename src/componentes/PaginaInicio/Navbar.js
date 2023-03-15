import React from "react";

import "../estilos/style.css";
import "../../css/responsive.css";

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="header_area">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <img
              src="/assets/img/logo.jpg"
              alt="Es el logo del aparta hotel"
              style={{ width: "120px", height: "90px" }}
            ></img>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div
              className="collapse navbar-collapse offset"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav menu_nav ml-auto">
                <li className="nav-item active">
                  <NavLink
                    className="nav-link"
                    to="/Inicio"
                    exact="true"
                    activeclassname="active"
                  >
                    Inicio
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/QuienesSomos"
                    exact="true"
                    activeclassname="active"
                  >
                    Sobre Nosotros
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Lugares"
                    exact="true"
                    activeclassname="active"
                  >
                    Lugares Cerca
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Contactanos"
                    exact="true"
                    activeclassname="active"
                  >
                    Contactanos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Login"
                    exact="true"
                    activeclassname="active"
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
