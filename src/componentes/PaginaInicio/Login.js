import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input } from "reactstrap";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { Button } from "@mui/material";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import {auth} from "../../services/userService"

const url = "http://localhost:8001/usuarioEmpleado/createLoginEmpleado";
//const urlLogin ="http://localhost:5000/oauth/token";

import axios from 'axios';

const API_URL = 'http://localhost:5000/oauth/token';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar el token a la cabecera de Authorization de cada solicitud

function Login() {

  const [data, setData] = useState([]);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    userName: "",
    contraseña: "",
  }
  );

  const loginUsuario = async (e) => {
    e.preventDefault();
    console.log("esta es la data seleccionada", consolaSeleccionada);
    const response = await axios.post(urlLogin, consolaSeleccionada);
    console.log(response.data);
    {token:response.data.token,refresh:response.data.refres_token}
    setData(data.concat(response.data));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  return (
    <div>
      <Navbar />

      <div className="container" style={{ marginLeft: "40%", marginBottom: "10%" }}>
        <Form>
          <div style={{ marginTop: "20%" }}>
            <FormGroup>
              <Label for="exampleEmail">Usuario</Label>
              <Input
                name="userName"
                className="w-25 me-2"
                type="text"
                placeholder="Nombre Usuario"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ExampleContraseña">Contraseña</Label>
              <Input
                name="contraseña"
                className="w-25 me-2"
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
              />
            </FormGroup>
          </div>
        </Form>
        <Button
          color="primary" onClick={(e) => loginUsuario(e)} >
          Ingresar
        </Button>
      </div>


      <Footer />
    </div>
  );
}
export default Login;
