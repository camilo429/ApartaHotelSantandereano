import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MenuLateral from "./MenuLateral";
import "./css/style.css";

function PanelAdministrador() {
  return (
    <div>
      <MenuLateral data-bs-theme="dark" />
    </div>
  );
}
export default PanelAdministrador;