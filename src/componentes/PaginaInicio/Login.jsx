import React from "react";
//librerias
import axios from "axios";
import $ from "jquery";
//Servicios
import { Apiurl } from "../../services/userService";
//css
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss"
//Componentes
import Footer from "./Footer";
import Navbar from "./Navbar";

class Login extends React.Component() {

  state = {
    form: {
      "usuario": "",
      "password": ""
    },
    error: false,
    errorMsg: ""
  }
  manejadorSubmit = e => {
    e.preventDefault();
  }

  manejadorChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
    //console.log(this.state.form);
  }


  manejadorBoton = () => {
    var reqData = {
      "username": this.state.form.usuario,
      "password": this.state.form.password,
      "grant_type": "password",
    }

    axios.request({
      method: "post",
      url: Apiurl + "oauth/token",
      withCredentials: true,
      crossdomain: true,
      data: $.param(reqData),
      auth: {
        username: "angularapp", // This is the client_id
        password: "angu1234lar" // This is the client_secret
      }, header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache"
      }

    }).then(response => {

      if (response.status === 200) {
        sessionStorage.setItem("access_token", response.data.access_token);
        window.location.href = "empleados";

        console.log(response.data);
      } else {
        this.setState({
          error: true,
          errorMsg: response.data.error_description
        })
      }
      // console.log(response.data);
    }).catch(error => {
      this.setState({
        error: true,
        errorMsg: "Error:400"
      })
      //  console.log(error.message);
    })
  }



  render() {
    return (<div>
      <Navbar />
      <div className="container" style={{ marginLeft: "40%", marginBottom: "10%" }}>
        <form onSubmit={this.manejadorSubmit}>
          <input type="text" id="login" className="fadeIn second" name="usuario" placeholder="Usuario" onChange={this.manejadorChange} />
          <input type="password" id="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.manejadorChange} />
          <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorBoton} />
        </form>
        {
          this.state.error === true &&
          <div className="alert alert-danger" role="alert">
            {this.state.errorMsg}
          </div>}
      </div>
      <Footer />
    </div >);

  };
}
export default Login;
