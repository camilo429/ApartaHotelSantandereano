import React, { useState } from "react";
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
import { Modal } from 'react-bootstrap';
import { MdGppBad } from "react-icons/md";

const Login = () => {
    const [formulario, setFormulario] = useState({
        usuario: "",
        password: "",
    });

    const [mensaje, setMensaje] = useState("");

    const [smShow, setSmShow] = useState(false);
    const handleMensajeClose = () => setSmShow(false);
    const handleShowMensaje = () => setSmShow(true);

    const [smShowCredenciales, setSmShowCredenciales] = useState(false);
    const handleCredencialesClose = () => setSmShowCredenciales(false);
    const handleCredencialesShow = () => setSmShowCredenciales(true);

    const manejadorChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submit = async (e) => {
        try {
            e.preventDefault();
            var reqData = {
                username: formulario.usuario,
                password: formulario.password,
                grant_type: "password",
            };

            const response = await axios.post(Apiurl + "oauth/token", new URLSearchParams(reqData), {
                auth: {
                    username: "angularapp",
                    password: "angu1234lar",
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            console.log("data", response.data);
            if (response.status === 200) {
                sessionStorage.setItem("access_token", response.data.access_token);
                sessionStorage.setItem("empleado", response.data.empleado[0]);

                const decoded = jwtDecode(response.data.access_token);

                console.log("Payload:", decoded.authorities[0]);
                console.log("Payload Código:", decoded.empleado[0]);

                switch (decoded.authorities[0]) {
                    case "ROLE_ADMINISTRADOR":
                        window.location.href = "PanelAdministrador";
                        break;
                    case "ROLE_RECEPCIONISTA":
                        window.location.href = "PanelRecepcionista";
                        break;
                    case "ROLE_ASEADOR":
                        window.location.href = "PanelAseador";
                        break;
                    default:
                        break;
                }
            } else {

            }
        } catch (error) {
            setFormulario({
                password: ""
            })
            setMensaje("Credenciales Incorrectas");
            abrirCerrarModalMensaje();
        }
    };

    const abrirCerrarModalMensaje = () => {
        handleShowMensaje();
        setTimeout(() => {
            handleMensajeClose();
            setMensaje("");
        }, 2000); // 2000 milisegundos = 2 segundos
    };
    const credencialesIncorrectas = (event) => {
        event.preventDefault();
        abrirCerrarModalCredenciales();
    }
    const popUp = (
        <div>
            <div className="flex" id="mensaje">
                <MdGppBad className="me-3" /><p>{mensaje}</p>
            </div>
        </div>
    );
    const abrirCerrarModalCredenciales = () => {
        handleCredencialesShow();
        setTimeout(() => {
            handleCredencialesClose();
        }, 3000); // 3000 milisegundos = 2 segundos
    };
    const credenciales = (
        <div>
            <div className="flex" id="mensaje">
                <MdGppBad className="me-3" /><p>Usuario y contraseña no se pueden cambiar, Comuniquese con Soporte Técnico</p>
            </div>
        </div>
    );
    return (
        <div className="testimonial_area section_gap" style={{ margin: "0px" }}>
            <NavbarInicio />
            <div style={{ height: "450px", margin: "0px" }}>
                <div style={{ width: "300px", alignItems: "center", justifyContent: "center", margin: "auto" }}>
                    <form onSubmit={submit}>
                        <input type="text" name="usuario" placeholder="Usuario" onChange={manejadorChange} value={formulario.usuario} />
                        <input type="password" name="password" placeholder="Contraseña" onChange={manejadorChange} value={formulario.password} />
                        <button type="submit" className="btn btn-primary">Ingresar </button>
                        <a onClick={credencialesIncorrectas} style={{ color: "blue", height: "100%" }} href="Login">¿Olvido su contraseña?</a>
                    </form>
                </div>
            </div>
            <Footer />
            <Modal show={smShow} onHide={handleMensajeClose} animation={false} size="sm">{popUp}</Modal>
            <Modal show={smShowCredenciales} onHide={handleCredencialesClose} animation={false} size="lg">{credenciales}</Modal>
        </div>
    );
}
export default Login;