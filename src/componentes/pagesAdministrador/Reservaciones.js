import React, { useState, useEffect } from "react";
//Librerias
import axios from "axios";
//Estilos
import "../../App.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Huesped.css"
// Estilos
import { Form, FormGroup, Label, Input } from "reactstrap";
import "../../App.scss";
import { makeStyles } from "@mui/styles";
import { Modal, Button } from "@mui/material";
//iconos
import * as MdDelete from "react-icons/md";
// import * as BsInfoLg from "react-icons/bs";
//url
import { Apiurl } from "../../services/userService";
const url = Apiurl + "reservaciones/listarReservas";
const urlG = Apiurl + "reservaciones/crearReservacion";
//const urlE = Apiurl + "reservaciones/actualizarHuesped/";
const urlD = Apiurl + "reservaciones/eliminarReservacion/";


// let estilos = {
//   fontWeight: "bold",
//   color: "#dc3545"
// }

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "50%",
    height: "60%",
    backgroundColor: "white",
    padding: "1%",
    boder: "2px solid #000",
    top: "40%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: "1.2rem",
    borderRadius: "5px",
  },
}));
const useEstilo = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "40%",
    height: "40%",
    backgroundColor: "white",
    padding: "5%",
    boder: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}))
function Reservaciones() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  // const [errors, setErrors] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  // const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  // const [modalVer, setModalVer] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    fechaEntrada: "",
    codReservacion: "",
    fechaSalida: "",
    totalDias: "",
    adultos: "",
    ninos: "",
    tipoDocumento: {
      codTipoDocumento: "",
      nomTipoDocumento: ""
    },
    numDocumento: "",
    nombre: "",
    apellido: "",
    email: "",
    habitacion: {
      codHabitacion: "",
      nombreHabitacion: "",
      descripHabitacion: "",
      numHabitacion: "",
      pisoHabitacion: "",
      maxPersonasDisponibles: "",
      precioDia: "",
      estadoHabitacion: "",
      imagenHabitacion: ""
    },
    totalHuespedes: "",
    totalReservacion: ""
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
        // console.log(response.data);
      }
    })
  };

  // const peticionPut = async () => {
  //   await axios.request({
  //     method: "put",
  //     url: urlE + consolaSeleccionada.codReservacion,
  //     withCredentials: true,
  //     crossdomain: true,
  //     data: consolaSeleccionada,
  //   }).then((response) => {
  //     console.log(response.status);
  //     console.log(consolaSeleccionada);
  //     if (response.status == 201) {
  //       var dataNueva = data;
  //       dataNueva.map((consola) => {
  //         if (consolaSeleccionada.codHabitacion === consola.codHabitacion) {
  //           consola.codHabitacion = consolaSeleccionada.codHabitacion
  //           consola.descripHabitacion = consolaSeleccionada.descripHabitacion
  //           consola.estadoHabitacion = "ocupado"
  //           consola.imagenHabitacion = consolaSeleccionada.imagenHabitacion
  //           consola.maxPersonasDisponibles = consolaSeleccionada.maxPersonasDisponibles
  //           consola.nombreHabitacion = consolaSeleccionada.nombreHabitacion
  //           consola.numHabitacion = consolaSeleccionada.numHabitacion
  //           consola.pisoHabitacion = consolaSeleccionada.pisoHabitacion
  //           consola.precioHabitacion = consolaSeleccionada.precioHabitacion
  //         }
  //       })
  //       setData(dataNueva);
  //       peticionGet();
  //       abrirCerrarModalEditar();
  //       alert("La habitación ha sido actualizada");
  //     }
  //   });
  // }

  const peticionDelete = async () => {
    axios.request({
      method: "delete",
      url: urlD + consolaSeleccionada.codReservacion,
      withCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    }).then(response => {
      if (response.status === 200) {
        setData(data.filter((consola) => consola.codReservacion !== consolaSeleccionada.codReservacion));
        abrirCerrarModalEliminar();
        alert("Habitación Eliminada!")
      }
    })
  };
  const peticionPost = async (e) => {
    e.preventDefault();

    const response = await axios.post(urlG, consolaSeleccionada, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    });
    setData(data.concat(response.data));
    peticionGet();
    abrirCerrarModalInsertar();
    alert("La habitación ha sido creada");
  };
  const seleccionarReservacion = (consola, caso) => {
    setConsolaSeleccionada(consola);
    // if (caso === "Editar") {
    //   abrirCerrarModalEditar();
    // }
    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    }
  };
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  // const abrirCerrarModalEditar = () => {
  //   setModalEditar(!modalEditar);
  // };

  useEffect(() => {
    peticionGet();
  }, []);
  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Habitacion</h3>
      <Form>
        <div className="flex">
          <FormGroup className="me-2" >
            <Label for="exampleEmail">Nombre Habitación</Label>
            <input
              name="nombreHabitacion"
              placeholder="Nombre Habitación"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2" style={{ marginLeft: "4%" }}>
            <Label for="exampleEmail">Número Habitación</Label>
            <input
              name="numHabitacion"
              placeholder="Número Habitación"
              type="number"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Piso Habitación</Label>
            <Input
              name="pisoHabitacion"
              placeholder="Piso"
              type="number"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Capacidad</Label>
            <Input
              name="maxPersonasDisponibles"
              placeholder="Capacidad(Personas)"
              type="number"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2" style={{ marginLeft: "4%" }}>
            <Label for="exampleEmail">Precio Habitación(Día)</Label>
            <input
              name="precioDia"
              placeholder="Valor Habitación"
              type="number"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Imagen</Label>
            <input
              className="form-control"
              name="imagenHabitacion"
              placeholder="url Imagen"
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2" style={{ width: "30%" }}>
            <Label for="exampleEmail">Estado Habitación</Label>
            <select
              className="form-select"
              name="estadoHabitacion"
              placeholder="estado Habitación"
              onChange={handleChange}
            >
              <option value="1">Ocupada</option>
              <option value="2">Sucia</option>
              <option value="3">Apartada</option>
              <option value="3">Libre</option>
            </select>
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "70%", height: "100%" }}>
            <Label for="exampleEmail">Descripción </Label>
            <textarea
              className="form-control"
              name="descripHabitacion"
              placeholder="Descripción Habitación"
              type="text"
              onChange={handleChange}
              style={{ width: "100%", height: "100%" }}
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
  const bodyEliminar = (
    <div className={useEstilo.modal}>
      <p>
        Esta seguro de Eliminar la Habitación
        <b>
          {consolaSeleccionada &&
            " " &&
            consolaSeleccionada.nombreHabitacion &&
            " " &&
            consolaSeleccionada.numHabitacion}
        </b>{" "}
        ?
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Si
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className="Huespedes">
      <br />
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="flex">
            <h6 className="m-0 font-weight-bold text-primary">
              Reservacioneses
            </h6>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-primary"
          >
            Buscar reservación
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" >
              <thead>
                <tr>
                  <th>fechaEntrada</th>
                  <th>fechaSalida</th>
                  <th>totalDias</th>
                  <th># adultos</th>
                  <th># ninos</th>
                  <th>nombre</th>
                  <th>Apellido</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((consola, idx) => {
                  return (
                    <tr key={consola.codReservacion} >
                      <td>{consola.fechaEntrada}</td>
                      <td>{consola.fechaSalida}</td>
                      <td>{consola.totalDias}</td>
                      <th>{consola.adultos}</th>
                      <th>{consola.ninos}</th>
                      <th>{consola.nombre}</th>
                      <th>{consola.apellido}</th>
                      <th>
                        {/* <button
                          className="flex"
                          onClick={() => seleccionarReservacion(consola, "Editar")}
                        >
                          <AiFillEdit.AiFillEdit className="me-2" />
                          Editar
                        </button> */}

                        <br></br>
                        <Button
                          className="flex"
                          onClick={() => seleccionarReservacion(consola, "Eliminar")}
                        >
                          <MdDelete.MdDelete className="me-2" />
                          Eliminar
                        </Button>
                        <br></br>
                        {/* <Button
                          className="flex"
                          onClick={() => seleccionarEmpleado(consola, "Ver")}
                        >
                          <BsInfoLg.BsInfoLg className="me-2" />
                          Ver Info
                        </Button> */}
                      </th>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item"><a className="page-link" >Anterior</a></li>
                <li className="page-item"><a className="page-link" >1</a></li>
                <li className="page-item"><a className="page-link" >2</a></li>
                <li className="page-item"><a className="page-link" >3</a></li>
                <li className="page-item"><a className="page-link" >Siguiente</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>
      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default Reservaciones;
