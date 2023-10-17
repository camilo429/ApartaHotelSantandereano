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
} from "reactstrap";

import * as BsPerfil from "react-icons/bs";
import * as GrConfiguration from "react-icons/gr";
import * as GiExit from "react-icons/gi";

const NavbarA = ({ name, lastName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" style={{ width: "85%" }}>
        {/* <div className="topbar-divider d-none d-sm-block"></div> */}
        <hr
          className="topbar-divider d-none d-sm-block"
          style={{ borderTop: "1px solid white" }}
        />

        <div className="w-30">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar className="w-40">
            <Nav className="ms-auto w-40" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {name + lastName}
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
