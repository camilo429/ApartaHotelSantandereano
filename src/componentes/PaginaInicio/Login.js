import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input } from "reactstrap";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { Button } from "@mui/material";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";

const url = "http://localhost:8001/usuarioEmpleado/createLoginEmpleado";
const urlLogin ="http://localhost:5000/oauth/token";

function Login() {

  const [data, setData] = useState([]);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    userName: "",
    contraseña: "",
  }
  );

  const loginUsuario = async (e) => {
    e.preventDefault();
    console.log("esta esla data seleccionada", consolaSeleccionada);
    const response = await axios.post(url, consolaSeleccionada);
    console.log(response.data);
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
