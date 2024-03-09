import React from "react";
//css
import "../../css/Login.css";
//servicios
import { Apiurl } from "../../services/userService";
//librerias
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
//Componentenes
import NavbarInicio from "./Navbar/NavbarInicio";
import Footer from "./Footer";
import { WindowSharp } from "@mui/icons-material";
class Login extends React.Component {
  state = {
    form: {
      usuario: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

  manejadorSubmit = (e) => {
    e.preventDefault();
  };

  manejadorChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    //console.log(this.state.form);
  };

  manejadorBoton = async () => {
    try {
      var reqData = {
        username: this.state.form.usuario,
        password: this.state.form.password,
        grant_type: "password",
      };
      //  console.log("esta es la data enviada", this.state.form.usuario, this.state.form.password)

      const response = await axios.post(Apiurl + "oauth/token",
        new URLSearchParams(reqData), {
        withCredentials: true,
        crossdomain: true,
        auth: {
          username: "angularapp",
          password: "angu1234lar",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no cache"
        },
      }
      );
      if (response.status === 200) {
        sessionStorage.setItem("acces_token", response.data.access_toke);
        const decoded = jwtDecode(response.data.access_toke);
        console.log("Payload:", decoded.authorities[0]);

        switch (decoded.authorities[0]) {
          case "ROLE_ADMINISTRADOR":
            window.location.replace = "PanelAdministrador";
            break;
          case "ROLE_RECEPCIONISTA":
            window.location.replace = "PanelRecepcionista";
            break;
          case "ROLE_SERVICIOS":
            WindowSharp.location.replace = "SERVICIOS";
            break;
          default:
            alert("No pertenece a ningun usuario dentro del sistema");
            break;
        }
      } else {
        this.setState({
          error: true,
          errorMsg: response.data.error_description,
        });
      }
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: "Error: Usuario o Contraseña equivocados"
      })
    }
  };

  render() {
    return (
      <div className="testimonial_area section_gap" style={{ margin: "0px" }}>
        <NavbarInicio />
        <div style={{ height: "450px", margin: "0px" }}>
          <div style={{ width: "300px", alignItems: "center", justifyContent: "center", margin: "auto" }}>
            <form onSubmit={this.manejadorSubmit}>
              <input type="text" name="usuario" placeholder="Usuario" onChange={this.manejadorChange} />
              <input type="password" name="password" placeholder="Contraseña" onChange={this.manejadorChange} />
              <input type="submit" value="Log In" onClick={this.manejadorBoton} />
              <a onClick={this.olvidoSuContrasena} style={{ color: "blue", height: "100%" }}>
                ¿Olvido su contraseña?
              </a>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
