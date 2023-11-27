import React, { useEffect, useState } from "react";
//Librerias
import axios from "axios";
import MUIDataTable from "mui-datatables";
//Estilos
import { makeStyles } from "@mui/styles";
import { Form, FormGroup, Label } from "reactstrap";
import "../../App.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Huesped.css";
//iconos
import { Modal, Button } from "@mui/material";
import * as AiFillEdit from "react-icons/ai";
import * as MdDelete from "react-icons/md";
//import * as BsInfoLg from "react-icons/bs";
//Componentes
import Nacionalidades from "../../componentes/pagesAdministrador/Nacionalidades";
import TipoDocumento from "./TipoDocumento";
// url
import { Apiurl } from "../../services/userService";
// import { useLoaderData } from "react-router-dom";
const url = Apiurl + "huespedes/listarHuespedes";
const urlG = Apiurl + "huespedes/crearHuesped";
const urlE = Apiurl + "huespedes/actualizarHuesped/";
const urlD = Apiurl + "huespedes/eliminarhuesped/";
// expresiones regulares
const nameRegex = /^[a-zA-Z\s]+$/;
const numeroCelularExpresion =
  /^(3(?:0[0-5]|1[0-9]|2[0-7]|3[0-5]|4[0-8]|5[0-7]|6[0-5]|7[0-5]|9[0-8]))\d{7}$/;
const correoExpresion = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
const cedulaExpresion = /^[0-9]{6,10}$/;

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "60%",
    height: "70%",
    backgroundColor: "white",
    padding: "1%",
    boder: "2px solid #000",
    top: "40%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: "0.9rem",
    borderRadius: "5px",
  },
}));
const useEstilo = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "30%",
    height: "30%",
    backgroundColor: "white",
    padding: "5%",
    boder: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));
let estilos = {
  fontWeight: "bold",
  color: "#dc3545",
};
function Huespedes() {
  const styles = useStyles();
  const estilo = useEstilo();
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalVer, setModalVer] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    codHuesped: "",
    nombre: "",
    apellido: "",
    numCelular: "",
    correo: "",
    tipoDocumento: {
      codTipoDocumento: "",
      nomTipoDocumento: "",
    },
    numDocumento: "",
    nacionalidad: {
      codNacion: "",
      nombre: "",
    },
    lugarOrigen: "",
    nomContactoEmergencia: "",
    numContactoEmergencia: "",
    estadoHuesped: true,
  });

  const validacionesFormulario = (consolaSeleccionada) => {
    let errors = {};
    if (!nameRegex.test(consolaSeleccionada.nombre)) {
      errors.nombre = "Nombre NO válido";
    }
    if (
      consolaSeleccionada.nombre.length < 4 ||
      consolaSeleccionada.nombre.length > 30
    ) {
      errors.nombre = "El nombre es corto o muy largo";
    }
    if (!nameRegex.test(consolaSeleccionada.apellido)) {
      errors.apelldio = "Apellido NO válido";
    }
    if (
      consolaSeleccionada.apellido.length < 4 ||
      consolaSeleccionada.apellido.length > 30
    ) {
      errors.apellido = "Apellido es corto o muy largo";
    }
    if (!numeroCelularExpresion.test(consolaSeleccionada.numCelular)) {
      errors.numCelular = "Número No válido";
    }
    if (!correoExpresion.test(consolaSeleccionada.correo)) {
      errors.correo = "Correo No válido";
    }
    if (!cedulaExpresion.test(consolaSeleccionada.numDocumento)) {
      errors.numDocumento = "Número de documento no valido";
    }
    if (!nameRegex.test(consolaSeleccionada.lugarOrigen)) {
      errors.lugarOrigen = "Lugar Origen No valido";
    }
    if (!nameRegex.test(consolaSeleccionada.nomContactoEmergencia)) {
      errors.nomContactoEmergencia = "Lugar Origen No valido";
    }
    if (
      !numeroCelularExpresion.test(consolaSeleccionada.numContactoEmergencia)
    ) {
      errors.numContactoEmergencia = "Número No válido";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionGet = async () => {
    setErrors({});
    axios
      .request({
        method: "get",
        url: url,
        withCredentials: true,
        crossdomain: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los huespedes:", error);
        setErrors({ message: "No hay Huéspedes registrados." });
      });
  };

  const peticionPost = async () => {
    try {
      setErrors(validacionesFormulario(consolaSeleccionada));
      console.log(errors);
      if (Object.keys(errors).length === 0) {
        const response = await axios.post(urlG, consolaSeleccionada, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        });
        setData(data.concat(response.data));
        peticionGet();
        abrirCerrarModalInsertar();
        alert("El Huesped ha sido creado");
        setConsolaSeleccionada({
          codHuesped: "",
          nombre: "",
          apellido: "",
          numCelular: "",
          correo: "",
          tipoDocumento: {
            codTipoDocumento: "",
            nomTipoDocumento: "",
          },
          numDocumento: "",
          nacionalidad: {
            codNacion: "",
            nombre: "",
          },
          lugarOrigen: "",
          nomContactoEmergencia: "",
          numContactoEmergencia: "",
          estadoHuesped: true,
        });
        setErrors({});
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Error al insertar un huesped");
        console.log(error);
      } else {
        console.log(error.response.status);
      }
    }
  };

  const peticionPut = async () => {
    setErrors(validacionesFormulario(consolaSeleccionada));
    if (Object.keys(errors).length === 0) {
      await axios
        .request({
          method: "put",
          url: urlE + consolaSeleccionada.codHuesped,
          withCredentials: true,
          crossdomain: true,
          data: consolaSeleccionada,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          console.log(response.status);
          if (response.status === 201) {
            var dataNueva = data;
            dataNueva.map((consola) => {
              if (consolaSeleccionada.codHuesped === consola.codHuesped) {
                consola.nombre = consolaSeleccionada.nombre;
                consola.apellido = consolaSeleccionada.apellido;
                consola.numCelular = consolaSeleccionada.numCelular;
                consola.correo = consolaSeleccionada.correo;
                consola.codTipoDocumento =
                  consolaSeleccionada.tipoDocumento.codTipoDocumento;
                consola.nomTipoDocumento =
                  consolaSeleccionada.tipoDocumento.nomTipoDocumento;
                consola.numDocumento = consolaSeleccionada.numDocumento;
                consola.fechaNacimiento = consolaSeleccionada.fechaNacimiento;
                consola.codNacion = consolaSeleccionada.nacionalidad.codNacion;
                consola.nombre = consolaSeleccionada.nacionalidad.nombre;
                consola.lugarOrigen = consolaSeleccionada.lugarOrigen;
                consola.nomContactoEmergencia =
                  consolaSeleccionada.nomContactoEmergencia;
                consola.numContactoEmergencia =
                  consolaSeleccionada.numContactoEmergencia;
                consola.estadoHuesped = consolaSeleccionada.estadoHuesped;
              }
            });
            setData(dataNueva);
            peticionGet();
            abrirCerrarModalEditar();
            alert("El huesped ha sido actualizado");
          }
          setErrors({});
        });
    }
  };

  const peticionDelete = async () => {
    axios
      .request({
        method: "delete",
        url: urlD + consolaSeleccionada.codHuesped,
        withCredentials: true,
        crossdomain: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setData(
            data.filter(
              (consola) => consola.codHuesped !== consolaSeleccionada.codHuesped
            )
          );
          abrirCerrarModalEliminar();
          setErrors({});
        }
      });
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  const abrirCerrarModalVer = () => {
    setModalVer(!modalVer);
  };
  const seleccionarHuespedes = (consola, caso) => {
    console.log("Consola", consola);
    setConsolaSeleccionada({
      codHuesped: consola[0],
      nombre: consola[1],
      apellido: consola[2],
      numCelular: consola[3],
      correo: consola[4],
      numDocumento: consola[6],
      nacionalidad: {
        codNacion: consola[7].codNacion,
        nombre: consola[7].nombre,
      },
      lugarOrigen: consola[8],
      nomContactoEmergencia: consola[9],
      numContactoEmergencia: consola[10],
      estadoHuesped: consola[11],
    });

    // console.log("ConsolaSeleccionada", consolaSeleccionada);
    if (caso === "Editar") {
      abrirCerrarModalEditar();
    }
    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    }
    if (caso === "Ver") {
      abrirCerrarModalVer();
    }
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Huesped</h3>
      <Form>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre</Label>
            <input
              className="form-control"
              name="nombre"
              onChange={handleChange}
              placeholder={!consolaSeleccionada?.nombre ? "Nombres" : "Nombre"}
            />
            {errors.nombre && (
              <div style={estilos}>
                <p>{errors.nombre}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="Apellido">Apellido</Label>
            <input
              className="form-control"
              name="apellido"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.apellido ? "Apellido" : "Apellido"
              }
            />
            {errors.apellido && (
              <div style={estilos}>
                <p>{errors.apellido}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Celular</Label>
            <input
              className="form-control"
              name="numCelular"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.numCelular
                  ? "Número de celular Personal"
                  : "Numero de celular"
              }
            />
            {errors.numCelular && (
              <div style={estilos}>
                <p>{errors.numCelular}</p>
              </div>
            )}
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="email">Correo Electronico</Label>
            <input
              className="form-control"
              name="correo"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.correo ? "Correo Personal" : "Correo"
              }
            />
            {errors.correo && (
              <div style={estilos}>
                <p>{errors.correo}</p>
              </div>
            )}
          </FormGroup>

          <FormGroup
            className="me-2"
            style={{ width: "300px", margin: "20px" }}
          >
            <Label for="exampleEmail">Tipo Documento</Label>
            <TipoDocumento
              name="tipoDocumento"
              handleChangeData={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Documento</Label>
            <input
              className="form-control"
              name="numDocumento"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.numDocumento
                  ? "Número Idenficación"
                  : "Número de documento"
              }
            />
            {errors.numDocumento && (
              <div style={estilos}>
                <p>{errors.numDocumento}</p>
              </div>
            )}
          </FormGroup>

          <FormGroup
            className="me-2"
            style={{ width: "250px", margin: "20px" }}
          >
            <Label for="exampleEmail">Nacionalidad</Label>
            <Nacionalidades
              name="nacionalidad"
              handleChangeData={handleChange}
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">¿Lugar de dónde viene?</Label>
            <input
              className="form-control"
              name="lugarOrigen"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.lugarOrigen
                  ? "Lugar de donde proviene"
                  : "LugarProveniente"
              }
            />
            {errors.lugarOrigen && (
              <div style={estilos}>
                <p>{errors.lugarOrigen}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre Emergencia</Label>
            <input
              className="form-control"
              name="nomContactoEmergencia"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.nomContactoEmergencia
                  ? "Nombre del acompañante"
                  : "Acompañante"
              }
            />
            {errors.nomContactoEmergencia && (
              <div style={estilos}>
                <p>{errors.nomContactoEmergencia}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">#Contacto Emergencia</Label>
            <input
              className="form-control"
              name="numContactoEmergencia"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.numContactoEmergencia
                  ? "Número de contacto de Emergencia"
                  : "NúmeroEmergencia"
              }
            />
            {errors.numContactoEmergencia && (
              <div style={estilos}>
                <p>{errors.numContactoEmergencia}</p>
              </div>
            )}
          </FormGroup>
        </div>
      </Form>
      <div align="right">
        <Button color="primary" onClick={(e) => peticionPost(e)}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyVer = (
    <div className={styles.modal}>
      <h3>Datos del Huesped</h3>
      <Form>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre</Label>
            <input
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={consolaSeleccionada?.nombre}
              placeholder={
                !consolaSeleccionada?.nombre ? " su nombre" : "Nombre"
              }
              disabled
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="Apellido">Apellido</Label>
            <input
              className="form-control"
              name="apellido"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.apellido}
              placeholder="Apellido"
              disabled
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Celular</Label>
            <input
              className="form-control"
              name="numCelular"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numCelular}
              placeholder="#Celular"
              disabled
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="email">Correo Electronico</Label>
            <input
              className="form-control"
              name="correo"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.correo}
              placeholder="Correo Electronico"
              disabled
            />
          </FormGroup>

          <FormGroup className="me-2" style={{ width: "15%" }}>
            <Label for="exampleEmail">Tipo Documento</Label>
            <TipoDocumento
              name="tipoDocumento"
              handleChangeData={handleChange}
              value={consolaSeleccionada.tipoDocumento}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Documento</Label>
            <input
              className="form-control"
              name="numDocumento"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numDocumento}
              disabled
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Nacionalidad</Label>
            <Nacionalidades
              name="nacionalidad"
              handleChangeData={handleChange}
              value={consolaSeleccionada.nacionalidad}
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">¿Lugar de donde viene?</Label>
            <input
              className="form-control"
              name="lugarOrigen"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.lugarOrigen}
              placeholder="lugarOrigen"
              disabled
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre Emergencia</Label>
            <input
              className="form-control"
              name="nomContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia
              }
              placeholder="Nombre Familiar"
              disabled
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">#Contacto Emergencia</Label>
            <input
              className="form-control"
              name="numContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.numContactoEmergencia
              }
              placeholder="# Contacto Emergencia"
              disabled
            />
          </FormGroup>
        </div>
      </Form>
      <div align="right">
        <Button onClick={() => abrirCerrarModalVer()}>Volver</Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Huesped</h3>
      <Form style={{ textAlign: "center" }}>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre</Label>
            <input
              required
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={consolaSeleccionada?.nombre}
              placeholder={!consolaSeleccionada?.nombre ? "Nombre" : "Nombre"}
            />
            {errors.nombre && (
              <div style={estilos}>
                <p>{errors.nombre}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="Apellido">Apellido</Label>
            <input
              required
              className="form-control"
              name="apellido"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.apellido}
              placeholder={
                !consolaSeleccionada?.apellido ? " su apellido" : "Apellido"
              }
            />
            {errors.apellido && (
              <div style={estilos}>
                <p>{errors.apellido}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Celular</Label>
            <input
              required
              className="form-control"
              name="numCelular"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numCelular}
              placeholder={
                !consolaSeleccionada?.numCelular
                  ? "Número de Celular"
                  : "Numero de celular"
              }
            />
            {errors.numCelular && (
              <div style={estilos}>
                <p>{errors.numCelular}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="email">Correo Electronico</Label>
            <input
              required
              className="form-control"
              name="correo"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.correo}
              placeholder={!consolaSeleccionada?.correo ? "Correo" : "Correo"}
            />
            {errors.correo && (
              <div style={estilos}>
                <p>{errors.correo}</p>
              </div>
            )}
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup
            className="me-2"
            style={{ width: "250px", margin: "20px" }}
          >
            <Label for="exampleEmail">Tipo Documento</Label>
            <TipoDocumento
              required
              name="tipoDocumento"
              handleChangeData={handleChange}
              value={consolaSeleccionada.tipoDocumento}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Documento</Label>
            <input
              required
              className="form-control"
              name="numDocumento"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numDocumento}
              placeholder={
                !consolaSeleccionada?.numDocumento
                  ? " su número de identidad"
                  : "Número de documento"
              }
            />
            {errors.numDocumento && (
              <div style={estilos}>
                <p>{errors.numDocumento}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup
            className="me-2"
            style={{ width: "200px", margin: "20px" }}
          >
            <Label for="exampleEmail">Nacionalidad</Label>
            <Nacionalidades
              required
              name="nacionalidad"
              handleChangeData={handleChange}
              value={consolaSeleccionada.nacionalidad}
              style={{ width: "15%" }}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">¿Lugar de dónde viene?</Label>
            <input
              required
              className="form-control"
              name="lugarProviene"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.lugarOrigen}
              placeholder={
                !consolaSeleccionada?.lugarOrigen
                  ? " el lugar de donde proviene"
                  : "Lugar Proveniente"
              }
            />
            {errors.lugarOrigen && (
              <div style={estilos}>
                <p>{errors.lugarOrigen}</p>
              </div>
            )}
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre Emergencia</Label>
            <input
              required
              className="form-control"
              name="nomContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia
              }
              placeholder={
                !consolaSeleccionada?.nomContactoEmergencia
                  ? "Diligenice nombre del acompañante"
                  : "Acompañante"
              }
            />
            {errors.nomContactoEmergencia && (
              <div style={estilos}>
                <p>{errors.nomContactoEmergencia}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">#Contacto Emergencia</Label>
            <input
              required
              className="form-control"
              name="numContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.numContactoEmergencia
              }
              placeholder={
                !consolaSeleccionada?.numContactoEmergencia
                  ? "Número de contacto de Emergencia"
                  : "NumeroEmergencia"
              }
            />
            {errors.numContactoEmergencia && (
              <div style={estilos}>
                <p>{errors.numContactoEmergencia}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup
            className="me-2"
            style={{ width: "200px", margin: "20px" }}
          >
            <Label for="exampleEmail">Estado Huesped</Label>
            <select
              required
              className="form-select"
              aria-label="Default select example"
              name="estadoHuesped"
              onChange={handleChange}
              value={
                consolaSeleccionada &&
                consolaSeleccionada.estadoHuesped === true
                  ? "HABILITADO"
                  : "INHABILITADO"
              }
            >
              <option value="TRUE">Habilitado</option>
              <option value="false" selected>
                Inhabilitado
              </option>
            </select>
            {errors.estadoHuesped && (
              <div style={estilos}>
                <p>{errors.estadoHuesped}</p>
              </div>
            )}
          </FormGroup>
        </div>

        <div className="flex"></div>
      </Form>
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Actualizar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );
  const bodyEliminar = (
    <div className={estilo.modal}>
      <p>
        Esta seguro de Eliminar Empleado{" "}
        <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ?
        <br />
        <b>{consolaSeleccionada && consolaSeleccionada.numDocumento}</b>
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Si
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  useEffect(() => {
    peticionGet();
  }, []);

  const columns = [
    {
      name: "codHuesped",
      label: "Código",
    },
    {
      name: "nombre",
      label: "Nombre",
      sort: false,
    },
    {
      name: "apellido",
      label: "apellido",
    },
    {
      name: "numCelular",
      label: "Celular",
    },
    {
      name: "correo",
      label: "Correo Electronico",
    },
    {
      name: "tipoDocumento",
      label: "Tipo Documento",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return `${value.codTipoDocumento} (${value.nomTipoDocumento})`;
        },
      },
    },
    {
      name: "numDocumento",
      label: "Número Documento",
    },
    {
      name: "nacionalidad",
      label: "Nacionalidad",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          // Accede a la propiedad anidada y muestra su valor
          try {
            data.map((consola, ind) => {
              value = [
                consola.nacionalidad.codNacion,
                consola.nacionalidad.nombre,
              ];
            });
          } catch (error) {
            console.log("Error al cargar nacionalidades  en Huespedes");
          }
          return value; // Esto mostrará el valor de tipoDocumento.nomTipoDocumento en la celda
        },
      },
    },
    {
      name: "lugarOrigen",
      label: "Lugar De incio de viaje",
    },
    {
      name: "nomContactoEmergencia",
      label: "Nombre Contacto ",
    },
    {
      name: "numContactoEmergencia",
      label: "Número de Emergencia",
    },
    {
      name: "estadoHuesped",
      label: "Estado Huesped",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          try {
            data.map((consola, ind) => {
              if (consola.estadoHuesped === true) {
                value = "Habilitado";
              } else {
                value = "Inhabilitado";
              }
            });
          } catch (error) {
            console.log("No carga el valor de Estado Huesped");
          }
          return value;
        },
      },
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  seleccionarHuespedes(tableMeta.rowData, "Editar")
                }
              >
                <AiFillEdit.AiFillEdit className="me-2" />
                Editar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  seleccionarHuespedes(tableMeta.rowData, "Eliminar")
                }
              >
                <MdDelete.MdDelete className="me-2" />
                Eliminar
              </Button>
            </div>
          );
        },
      },
    },
  ];
  const options = {
    filterType: "dropdown",
    responsive: "standard",
    /*  customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} />*/
  };
  return (
    <div className="Huespedes">
      <div className="card shadow mb-4">
        <h6 className="m-0 font-weight-bold text-primary">
          Base de Datos Huespedes
        </h6>
        <div>
          <Button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-primary"
          >
            Agregar Huesped
          </Button>
        </div>
        <div>
          <MUIDataTable
            title={"Lista Huespedes"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>

      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
      <Modal open={modalVer} onClose={abrirCerrarModalVer}>
        {bodyVer}
      </Modal>
    </div>
  );
}

export default Huespedes;
