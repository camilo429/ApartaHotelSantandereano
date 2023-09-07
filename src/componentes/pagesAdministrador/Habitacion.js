import React, { useEffect, useState } from "react";
// librerias
import axios from "axios"
// Estilos
import { Form, FormGroup, Label, Input } from "reactstrap";
import "../../App.scss";
import { makeStyles } from "@mui/styles";
import { Modal, Button } from "@mui/material";
// Iconos
import * as MdDelete from "react-icons/md";
import * as AiFillEdit from "react-icons/ai";
// url
import { Apiurl } from "../../services/userService";

const url = Apiurl + "habitacion/listarHabitaciones";
const urlG = Apiurl + "habitacion/crearHabitacion";
const urlE = Apiurl + "habitacion/actualizarHabitacion/";
const urlD = Apiurl + "habitacion/eliminarHabitacion/";

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
function Habitacion() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  //const [modalVer, setModalVer] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    codHabitacion: "",
    nombreHabitacion: "",
    descripHabitacion: "",
    numHabitacion: "",
    pisoHabitacion: "",
    maxPersonasDisponibles: "",
    precioDia: "",
    estadoHabitacion: "",
    imagenHabitacion: ""
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

  const peticionPut = async () => {
    await axios.request({
      method: "put",
      url: urlE + consolaSeleccionada.codHabitacion,
      withCredentials: true,
      crossdomain: true,
      data: consolaSeleccionada,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    }).then((response) => {
      console.log(response.status);
      console.log(consolaSeleccionada);
      if (response.status == 201) {
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.codHabitacion === consola.codHabitacion) {
            consola.codHabitacion = consolaSeleccionada.codHabitacion
            consola.descripHabitacion = consolaSeleccionada.descripHabitacion
            consola.estadoHabitacion = "ocupado"
            consola.imagenHabitacion = consolaSeleccionada.imagenHabitacion
            consola.maxPersonasDisponibles = consolaSeleccionada.maxPersonasDisponibles
            consola.nombreHabitacion = consolaSeleccionada.nombreHabitacion
            consola.numHabitacion = consolaSeleccionada.numHabitacion
            consola.pisoHabitacion = consolaSeleccionada.pisoHabitacion
            consola.precioHabitacion = consolaSeleccionada.precioHabitacion
          }
        })
        setData(dataNueva);
        peticionGet();
        abrirCerrarModalEditar();
        alert("La habitación ha sido actualizada");
      }
    });
  }

  const peticionDelete = async () => {
    axios.request({
      method: "delete",
      url: urlD + consolaSeleccionada.codHabitacion,
      withCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    }).then(response => {
      if (response.status === 200) {
        setData(data.filter((consola) => consola.codHabitacion !== consolaSeleccionada.codHabitacion));
        abrirCerrarModalEliminar();
        alert("Habitación Eliminada!")
      }
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

  const seleccionarHabitacion = (consola, caso) => {
    setConsolaSeleccionada(consola);
    if (caso === "Editar") {
      abrirCerrarModalEditar();
    }
    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    }
  };
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
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Habitación</h3>
      <Form>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre</Label>
            <input
              className="form-control"
              name="nombreHabitacion"
              onChange={handleChange}
              value={consolaSeleccionada?.nombreHabitacion}
              placeholder={
                !consolaSeleccionada?.nombreHabitacion
                  ? "Nombre"
                  : "Nombre"
              }
            />
          </FormGroup>
          <FormGroup className="me-2" style={{ marginLeft: "4%" }}>
            <Label for="exampleEmail">Numero Habitación</Label>
            <input
              className="form-control"
              name="numHabitacion"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.numHabitacion
              }
              placeholder="Número Habitación"
            />
          </FormGroup>
          <FormGroup className="me-2" style={{ marginLeft: "4%" }}>
            <Label for="exampleEmail">Piso Habitación</Label>
            <input
              className="form-control"
              name="pisoHabitacion"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.pisoHabitacion}
              placeholder="Piso Habitación"
              type="number"
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Capacidad (#Personas)</Label>
            <input
              className="form-control"
              name="maxPersonasDisponibles"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.maxPersonasDisponibles}
              placeholder="#Personas"
              type="number"
            />
          </FormGroup>
          <FormGroup className="me-2" style={{ marginLeft: "4%" }}>
            <Label for="exampleEmail">Valor (Persona)</Label>
            <input
              className="form-control"
              name="precioDia"
              onChange={handleChange}
              value={
                consolaSeleccionada &&
                consolaSeleccionada.precioDia
              }
              type="number"
            />
          </FormGroup>
          <FormGroup className="me-2" style={{ marginLeft: "4%" }}>
            <Label for="exampleEmail">Imagen Habitacion</Label>
            <input
              className="form-control"
              name="imagenHabitacion"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.imagenHabitacion
              }
              placeholder="imagenHabitacion"
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2" style={{ width: "40%" }}>
            <Label for="exampleEmail">Estado Habitación</Label>
            <select
              className="form-select"
              name="estadoHabitacion"
              placeholder="estado Habitación"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.estadoHabitacion
              }
            >
              <option value="1">Ocupada</option>
              <option value="2">Sucia</option>
              <option value="3">Apartada</option>
              <option value="3">Libre</option>
            </select>
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "100%", height: "100%" }}>
            <Label for="exampleEmail">Descripción Habitación</Label>
            <textarea
              className="form-control"
              name="descripHabitacion"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.descripHabitacion
              }
              placeholder="Descripción Habitación"
              style={{ width: "100%", height: "100%" }}
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
    <div className="Habitacion">
      <br />
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="flex">
            <h6 className="m-0 font-weight-bold text-primary">
              Lista de habitaciones
            </h6>
          </div>
        </div>
        <div className="flex">
          <Button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-primary"
          >
            Agregar Habitación
          </Button>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" cellSpacing="0">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Número</th>
                  <th>Piso</th>
                  <th>
                    Capacidad <br /> Máxima
                  </th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((consola) => {
                  return (
                    <tr key={consola}>
                      <th>{consola.nombreHabitacion}</th>
                      <th>{consola.descripHabitacion}</th>
                      <th>{consola.numHabitacion}</th>
                      <th>{consola.pisoHabitacion}</th>
                      <th>{consola.maxPersonasDisponibles}</th>
                      <th>{consola.precioDia}</th>
                      <th>
                        <Button
                          className="flex"
                          onClick={() =>
                            seleccionarHabitacion(consola, "Eliminar")
                          }
                        >
                          <MdDelete.MdDelete className="me-2" />
                          Eliminar
                        </Button>

                        <Button
                          className="flex"
                          onClick={() => seleccionarHabitacion(consola, "Editar")}
                        >
                          <AiFillEdit.AiFillEdit className="me-2" />
                          Editar
                        </Button>
                      </th>
                    </tr>
                  )
                })
                }
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
    </div>
  );
}

export default Habitacion;
