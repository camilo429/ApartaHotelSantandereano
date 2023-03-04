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
  NavItem,
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
          <div className="input-group">
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

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <Form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    class="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i class="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </li>

          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="#"
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

          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="messagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-envelope fa-fw"></i>
            </a>

            <div
              className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="messagesDropdown"
            >
              <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="dropdown-list-image mr-3">
                  <img
                    className="rounded-circle"
                    src="img/undraw_profile_1.svg"
                    alt="..."
                  />
                  <div className="status-indicator bg-success"></div>
                </div>
              </a>
            </div>
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>
        </ul>

        <NavbarToggler onClick={toggle} className="me-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Camilo Ahumada
              </DropdownToggle>
              <DropdownMenu right>
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
      </Navbar>
    </div>
  );
};
export default NavbarA;
