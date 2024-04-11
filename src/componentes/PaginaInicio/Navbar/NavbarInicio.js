import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../image/logo.jpg";

function NavbarInicio() {
  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="Inicio.html">
            <img src={logo} alt="logo" width={"90px"} style={{ margin: ("0px", "5px") }} />
            Aparta Hotel Santandereano
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={`/Inicio`}> Inicio </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/SobreNosotros`}> Nosotros </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/Contactanos`}> Contacto </Link>
              </li>
              {/* <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="Informacion.html" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Información
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to={`/Servicios`}> Habitaciones </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/Contactanos`}> Contacto </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/Login`}> Login </Link>
                  </li>
                </ul>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={`/Login`}> Login </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav >
    </div >
  );
}
export default NavbarInicio;