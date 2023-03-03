import React, { useState } from "react";
import "../../App.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
        <NavbarBrand href="/">Administrador</NavbarBrand>
        <NavbarToggler onClick={toggle} className="me-2"/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>Camilo Ahumada</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem><BsPerfil.BsFillPersonFill className="me-2"/>Administrador</DropdownItem>
                  <DropdownItem><GrConfiguration.GrConfigure className="me-2"/>Configuaciones</DropdownItem>
                  <DropdownItem />
                  <DropdownItem><GiExit.GiExitDoor className="me-2"/>Salir</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
      </Navbar>
    </div>
  );
};
export default NavbarA;
