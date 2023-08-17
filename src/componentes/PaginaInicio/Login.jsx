import React from "react";
//css
import '../../css/Login.css';
// logo
import logo from "../../image/logo.png";
//servicios
import { Apiurl } from '../../services/userService';
//librerias
import axios from 'axios';
import $ from "jquery";
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
        return (
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first">
                            <br />
                            <br />
                            <img src={logo} width="100px" alt="User Icon" />
                        </div>


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
                </div>
            </React.Fragment>
        );
    }
}

export default Login