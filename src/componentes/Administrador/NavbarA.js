import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import * as GiExit from "react-icons/gi";
import { Apiurl } from "../../services/userService";

const NavbarA = ({ name, lastName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  let user = sessionStorage.getItem("access_token");
  function logOUt() {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <div>
      <Navbar color="light" light expand="md" style={{ width: "85%" }}>
        {/* <div className="topbar-divider d-none d-sm-block"></div> */}
        <hr className="topbar-divider d-none d-sm-block" style={{ borderTop: "1px solid white" }} />
        <div className="w-30">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar className="w-40">
            {sessionStorage.getItem("acces_token") ? (
              <>
                <Link to={Apiurl}></Link>
              </>
            ) : (
              <>
                <Link to={Apiurl}></Link>
              </>
            )}
            {sessionStorage.getItem("access_token") ? (
              <Nav className="ms-auto w-40" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {user && user.nombre}
                  </DropdownToggle>

                  <DropdownMenu end>
                    <DropdownItem onClick={logOUt}>
                      <GiExit.GiExitDoor className="me-2" />
                      Salir
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            ) : null}
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};
export default NavbarA;
