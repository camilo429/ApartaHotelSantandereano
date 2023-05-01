import React, { useState } from "react";
import "../../App.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
  Form,
} from "reactstrap";

import * as BsPerfil from "react-icons/bs";
import * as GrConfiguration from "react-icons/gr";
import * as GiExit from "react-icons/gi";

const NavbarA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-md-0 mw-100 navbar-search">
          <div className="input-group" style={{marginTop:"10px"}}>
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Buscar Empleado"
              
            />
            <div className="input-group-append">
              <NavLink className="btn btn-primary ">
                <i className="fas fa-search fa-sm"></i>
              </NavLink>
            </div>
          </div>
        </Form>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown no-arrow mx-1 flex">
            <a
              className="nav-link dropdown-toggle"
              href="/index.html"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-bell fa-fw"></i>
              <span className="badge badge-danger badge-counter">3+</span>
            </a>
            </li>
            <li className="nav-item dropdown no-arrow mx-1 flex">
              <a
                className="nav-link dropdown-toggle"
                href="/index.html"
                id="alertsDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-envelope fa-fw"></i>
                <span className="badge badge-danger badge-counter">3+</span>
              </a>
            </li>
         
        </ul>

        {/* <div className="topbar-divider d-none d-sm-block"></div> */}
        <hr className="topbar-divider d-none d-sm-block" style={{ borderTop: "1px solid white" }} />

        <div className="w-30">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="w-40">
          <Nav className="ms-auto w-40" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Camilo Ahumada
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <BsPerfil.BsFillPersonFill className="me-2" />
                  Administrador
                </DropdownItem>
                <DropdownItem>
                  <GrConfiguration.GrConfigure className="me-2" />
                  Configuaciones
                </DropdownItem>
                <DropdownItem />
                <DropdownItem>
                  <GiExit.GiExitDoor className="me-2" />
                  Salir
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
        </div>
      </Navbar>
    </div>
  );
};
export default NavbarA;
