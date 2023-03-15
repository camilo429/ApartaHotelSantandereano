import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Login() {
  return (
    <div>
      <Navbar />
      <div style={{marginTop:"50%"}}>
        <label>Correo electronico</label>
        <input type="email" className="" placeholder="Email" />
        <label>Contraseña</label>
        <input type="password" className="" placeholder="Password" />
      </div>
      <Footer />
    </div>
  );
}
export default Login;
