import React, { useEffect, useState } from "react";
//Librerias
import axios from "axios";
import $ from "jquery";
//Estilos
import { makeStyles } from "@mui/styles";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "../../App.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
//iconos
import { Modal, Button } from "@mui/material";
import * as AiFillEdit from "react-icons/ai";
import * as MdDelete from "react-icons/md";
import * as BsInfoLg from "react-icons/bs";
import { Co2Sharp } from "@mui/icons-material";
//Componentes
import DocumentoEmpleado from "../../componentes/Empleado/DocumentoEmpleado";
import Nacionalidades from "../../componentes/pagesAdministrador/Nacionalidades";
import TipoDocumento from "./TipoDocumento";
// url
import { Apiurl } from "../../services/userService";


const url = Apiurl + "huespedes/listarHuespedes";
const urlG = Apiurl + "huespedes/crearHuesped";
const urlE = Apiurl + "huespedes/actualizarHuesped/";
const urlD = Apiurl + "huespedes/eliminarhuesped/";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    padding: 10,
    boder: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

function Huespedes() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalVer, setModalVer] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    numCelular: "",
    correo: "",
    tipoDocumento: {
      codTipoDocumento: "",
      nomTipoDocumento: ""
    },
    numDocumento: "",
    nacionalidad: {
      codNacion: "",
      nombre: ""
    },
    lugarOrigen: "",
    nomContactoEmergencia: "",
    numContactoEmergencia: "",
    estadoHuesped: "true",

  });
  const [state, setState] = useState({
    form: {
      "usuario": "",
      "password": ""
    },
    error: false,
    errorMsg: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionGet = async () => {
    axios.request({
      method: "get",
      url: url,
      withCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    }).then(response => {
      if (response.status === 200) {
        setData(response.data);
        console.log(response.data);
      } else {
        setState({
          error: true,
          errorMsg: response.data.error_description
        })
      }
      // console.log(response.data);
    }).catch(error => {
      setState({
        error: true,
        errorMsg: "Error:400"
      })
      //  console.log(error.message);
    })
  };

  const peticionPost = async () => {
    console.log("esta es la data seleccionada", consolaSeleccionada);
    const response = await axios.post(urlG, consolaSeleccionada, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    });
    console.log(response.data);
    setData(data.concat(response.data));
    peticionGet();
    abrirCerrarModalInsertar();
  };

  const peticionPut = async () => {
    await axios.request({
      method: "put",
      url: urlE + consolaSeleccionada.codHuesped,
      withCredentials: true,
      crossdomain: true,
      data: consolaSeleccionada,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    }).then(response => {
      console.log(response.status);
      if (response.status == 201) {
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.codHuesped === consola.codHuesped) {
            consola.nombre = consolaSeleccionada.nombre;
            consola.apellido = consolaSeleccionada.apellido;
            consola.direccion = consolaSeleccionada.direccion;
            consola.numCelular = consolaSeleccionada.numCelular;
            consola.correo = consolaSeleccionada.correo;

            consola.codTipoDocumento = consolaSeleccionada.codTipoDocumento,
              consola.nomTipoDocumento = consolaSeleccionada.nomTipoDocumento

            consola.numDocumento = consolaSeleccionada.numDocumento;

            consola.codNacion = consolaSeleccionada.codNacion,
              consola.nombre = consolaSeleccionada.nombre

            consola.lugarOrigen = consolaSeleccionada.lugarOrigen
            consola.nomContactoEmergencia = consolaSeleccionada.nomContactoEmergencia
            consola.numContactoEmergencia = consolaSeleccionada.numContactoEmergencia
            consola.estadoHuesped = true
          }
        })
        setData(dataNueva);
        peticionGet();
        abrirCerrarModalEditar();
      } else {
        setState({
          error: true,
          errorMsg: response.data.errror_description
        })
      }
    }).catch(error => {
      console.log(error);
    })
    // await axios
    //   .put(urlE + consolaSeleccionada.idHuesped, consolaSeleccionada)
    //   .then((response) => {
    //     var dataNueva = data;
    //     dataNueva.map((consola) => {
    //       if (consolaSeleccionada.idHuesped === consola.idHuesped) {
    //         consola.nombre = consolaSeleccionada.nombre;
    //       }
    //     });
    //     setData(dataNueva);
    //     peticionGet();
    //     abrirCerrarModalEditar();
    //   });
  };

  const peticionDelete = async () => {
    axios.request({
      method: "delete",
      url: urlD + consolaSeleccionada.codHuesped,
      withCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    }).then(response => {
      if (response.status === 200) {
        setData(data.filter((consola) => consola.codHuesped !== consolaSeleccionada.codHuesped));
        abrirCerrarModalEliminar();
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
  const seleccionarEmpleado = (consola, caso) => {
    setConsolaSeleccionada(consola);
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
      <h3>Agregar Empleado</h3>
      <Form>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre</Label>
            <Input
              name="nombre"
              onChange={handleChange}
              value={consolaSeleccionada?.nombre}
              placeholder={
                !consolaSeleccionada?.nombre ? "Diligencia su nombre" : "Nombre"
              }
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="Apellido">Apellido</Label>
            <Input
              name="apellido"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.apellido}
              placeholder="Apellido"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Direccion</Label>
            <Input
              name="direccion"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.direccion}
              placeholder="direccion"
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Celular</Label>
            <Input
              name="numCelular"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numCelular}
              placeholder="#Celular"
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="email">Correo Electronico</Label>
            <Input
              name="correo"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.correo}
              placeholder="Correo Electronico"
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo Documento</Label>
            <TipoDocumento
              name="tipoDocumento"
              handleChangeData={handleChange}
              value={consolaSeleccionada.tipoDocumento}
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Documento</Label>
            <Input
              name="numDocumento"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numDocumento}
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

          <FormGroup className="me-2">
            <Label for="exampleEmail">Lugar Proviene</Label>
            <Input
              name="lugarOrigen"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.lugarOrigen
              }
              placeholder="lugarOrigen"
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre Emergencia</Label>
            <Input
              name="nomContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia
              }
              placeholder="Nombre Familiar"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">#Contacto Emergencia</Label>
            <Input
              name="numContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.numContactoEmergencia
              }
              placeholder="# Contacto Emergencia"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Estado Huesped</Label>
            <DocumentoEmpleado
              name="estadoHuesped"
              handleChangeData={handleChange}
              value={consolaSeleccionada.estadoHuesped}
            />
          </FormGroup>
        </div>
      </Form>
      <br />
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
      <h3>Datos del Empleado</h3>
      <Form>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre</Label>
            <Input
              name="nombre"
              onChange={handleChange}
              value={consolaSeleccionada?.nombre}
              placeholder={
                !consolaSeleccionada?.nombre ? "Diligencia su nombre" : "Nombre"
              }
              disabled
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Apellido</Label>
            <Input
              name="apellido"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.apellido}
              placeholder="Apellido"
              disabled
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Dirección</Label>
            <Input
              name="direccion"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numDocumento}
              disabled
              placeholder="direccion"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Celular</Label>
            <Input
              name="numCelular"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numTelefono}
              placeholder="Número Celular"
              disabled
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Correo Electronico</Label>
            <Input
              name="correo"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.correo}
              placeholder="Correo Electronico"
              type="email"
              disabled
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">numDocumento</Label>
            <Input
              name="numDocumento"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numDocumento}
              type="text"
              disabled
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">lugar Origen</Label>
            <Input
              name="lugarOrigen"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.direccion}
              placeholder="lugar Origen"
              disabled
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Contacto Emergencia</Label>
            <Input
              name="nomContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia
              }
              placeholder="Nombre Familiar"
              disabled
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label className="w-100" for="exampleEmail">
              #Contacto Emergencia
            </Label>
            <Input
              name="numContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.numContactoEmergencia
              }
              placeholder="# Contacto Emergencia"
              className="w-100"
              disabled
            />
          </FormGroup>
          <FormGroup className="me-2 w-100">
            <Label for="exampleEmail">Tipo de Documento de Indentidad</Label>
            <DocumentoEmpleado
              name="idTipoDocumento"
              handleChangeData={handleChange}
              value={consolaSeleccionada.idTipoDocumento}
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
      <Form>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre</Label>
            <Input
              name="nombre"
              onChange={handleChange}
              value={consolaSeleccionada?.nombre}
              placeholder={
                !consolaSeleccionada?.nombre ? "Diligencia su nombre" : "Nombre"
              }
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="Apellido">Apellido</Label>
            <Input
              name="apellido"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.apellido}
              placeholder="Apellido"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Direccion</Label>
            <Input
              name="direccion"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.direccion}
              placeholder="direccion"
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Celular</Label>
            <Input
              name="numCelular"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numCelular}
              placeholder="#Celular"
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="email">Correo Electronico</Label>
            <Input
              name="correo"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.correo}
              placeholder="Correo Electronico"
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo Documento</Label>
            <TipoDocumento
              name="tipoDocumento"
              handleChangeData={handleChange}
              value={consolaSeleccionada.tipoDocumento}
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Documento</Label>
            <Input
              name="numDocumento"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numDocumento}
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

          <FormGroup className="me-2">
            <Label for="exampleEmail">Lugar Proviene</Label>
            <Input
              name="lugarProviene"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.lugarOrigen
              }
              placeholder="LugarProviene"
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre Emergencia</Label>
            <Input
              name="nomContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia
              }
              placeholder="Nombre Familiar"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">#Contacto Emergencia</Label>
            <Input
              name="numContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.numContactoEmergencia
              }
              placeholder="# Contacto Emergencia"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Estado Huesped</Label>
            <DocumentoEmpleado
              name="idTipoDocumento"
              handleChangeData={handleChange}
              value={consolaSeleccionada.estadoHuesped}
            />
          </FormGroup>
        </div>

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
    <div className={styles.modal}>
      <p>
        Esta seguro de Eliminar Empleado{" "}
        <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ?
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

  return (
    <div className="Huespedes">
      <br />
      <br></br>
      <br></br>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="flex">
            <h6 className="m-0 font-weight-bold text-primary">
              Base de Datos Huespedes
            </h6>
          </div>
        </div>
        <div className="flex">
          <Button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-primary"
          >
            Agregar Huesped
          </Button>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" cellSpacing="0">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Dirección</th>
                  <th>Número celular</th>
                  <th>Tipo Documento</th>
                  <th>Lugar Origen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((consola) => {
                  return (
                    <tr key={consola} >
                      <td>{consola.nombre}</td>
                      <td>{consola.apellido}</td>
                      <td>{consola.direccion}</td>
                      <td>{consola.numCelular}</td>
                      <th>{consola.numDocumento}</th>
                      <th>{consola.lugarOrigen}</th>
                      <th>
                        <Button
                          className="flex"
                          onClick={() => seleccionarEmpleado(consola, "Editar")}
                        >
                          <AiFillEdit.AiFillEdit className="me-2" />
                          Editar
                        </Button>

                        <br></br>
                        <Button
                          className="flex"
                          onClick={() => seleccionarEmpleado(consola, "Eliminar")}
                        >
                          <MdDelete.MdDelete className="me-2" />
                          Eliminar
                        </Button>
                        <br></br>
                        <Button
                          className="flex"
                          onClick={() => seleccionarEmpleado(consola, "Ver")}
                        >
                          <BsInfoLg.BsInfoLg className="me-2" />
                          Ver Info
                        </Button>
                      </th>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
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
