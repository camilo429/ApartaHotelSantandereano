import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import "../../vendor/fontawesome-free/css/all.min.css";

function AdministradorComponent() {
  const [dropdown, setDropdown] = useState(false);

  const abrirCerrarDropdown = () => {
    setDropdown(!dropdown);
  };
  return (
    <div className="AdministradorComponent">
      <div id="page-top">
        <div id="wrapper">
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.html"
            >
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
              </div>

              <div className="sidebar-brand-text mx-3">
                SB Admin <sup>2</sup>
              </div>
            </a>

            <li className="nav-item active">
              <a className="nav-link" href="index.html">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>

            <div className="sidebar-heading">Interface</div>

            <li className="nav-item">
              <a
                className="btn btn-primary"
                data-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i className="fas fa-fw fa-cog"></i>
                <span>Components</span>
              </a>
              <div className="collapse" id="collapseExample">
                <div className="card card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </div>
            </li>

            <li className="nav-item">
              <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown}>
                <a
                  className="nav-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                  href="/Home"
                >
                  <i className="fas fa-fw fa-cog"></i>
                  <DropdownToggle>Components</DropdownToggle>
                </a>

                <DropdownMenu>
                  <DropdownItem header>Opciones</DropdownItem>
                  <DropdownItem className="collapse-item">Buttons</DropdownItem>
                  <DropdownItem className="collapse-item">Cards</DropdownItem>
                </DropdownMenu>
              </Dropdown>

            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdministradorComponent;
