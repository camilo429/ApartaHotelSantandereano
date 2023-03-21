import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
function Login() {
  return (
    <div>
      <Navbar />
      <div className="container" style={{marginLeft:"40%", marginBottom:"10%"}}>
        <div style={{ marginTop: "20%" }}>
          <label>Correo electronico</label>
          <input type="email" className="input-group-text" placeholder="Email" />
          <label>Contraseña</label>
          <input type="password" className="input-group-text" placeholder="Password" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Login;
