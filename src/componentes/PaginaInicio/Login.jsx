import React from "react";
//css
import '../../css/Login.css';
//servicios
import { Apiurl } from '../../services/userService';
//librerias
import axios from 'axios';
import $ from "jquery";
//Componentenes
import Navbar from "./Navbar";
import Footer from "./Footer"
class Login extends React.Component {

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
        //  console.log("esta es la data enviada", this.state.form.usuario, this.state.form.password)

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
                window.location.href = "PanelAdministrador";
                console.log(response.data);
            } else {
                this.setState({
                    error: true,
                    errorMsg: response.data.error_description
                })
            }
        }).catch(error => {
            this.setState({
                error: true,
                errorMsg: "Error: En los datos ingresados"
            })
        })
    }
    olvidoSuContrasena() {
        alert("Pongase en contacto con su administrador de plataforma para realizar el " +
            "cambio de contraseña")
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="login">
                    <form onSubmit={this.manejadorSubmit}>
                        <input type="text" name="usuario" placeholder="Usuario" onChange={this.manejadorChange} />
                        <input type="password" name="password" placeholder="Contraseña" onChange={this.manejadorChange} />
                        <input type="submit" value="Log In" onClick={this.manejadorBoton} />
                        <a onClick={this.olvidoSuContrasena} style={{ color: "blue", marginBottom: "5px" }}>¿Olvido su contraseña?</a>
                    </form>
                    {
                        this.state.error === true &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsg}
                        </div>
                    }
                </div>
                <Footer />
            </div>
        );
    }
}

export default Login