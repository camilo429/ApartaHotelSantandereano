import React, { useEffect, useState } from "react";
import { Modal, Button } from "@mui/material";
import axios from "axios";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "../../App.scss";
import { makeStyles } from "@mui/styles";

import * as MdDelete from "react-icons/md";

let url = "http://localhost:8001/habitaciones/listarHabitaciones";
const urlG = "http://localhost:8001/habitaciones/registrarHabitacion";
const urlE = "http://localhost:8001/habitaciones/actualizarHuesped/";
const urlD = "http://localhost:8001/habitaciones/deleteHabitacion/";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "900px",
    height: "400px",
    backgroundColor: "white",
    padding: 10,
    boder: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));
function Habitacion() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalVer, setModalVer] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    imagenHabitacion: "",
    nombreHabitacion: "",
    descripHabitacion: "",
    numHabitacion: "",
    pisoHabitacion: "",
    maxPersonasDisponibles: "",
    precioHabitacion: "",
    estadoHabitacion: "",
    idHabitacion: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionGet = async () => {
    await axios.get(url).then((response) => {
      setData(response.data);
    });
  };
  const peticionPost = async (e) => {
    e.preventDefault();
    console.log("esta es la data seleccionada", consolaSeleccionada);
    const response = await axios.post(urlG, consolaSeleccionada);
    console.log(response.data);
    setData(data.concat(response.data));
    peticionGet();
    abrirCerrarModalInsertar();
  };
  const peticionPut = async () => {
    await axios
      .put(urlE + consolaSeleccionada.idHuesped, consolaSeleccionada)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.idHuesped === consola.idHuesped) {
            consola.nombre = consolaSeleccionada.nombre;
          }
        });
        setData(dataNueva);
        peticionGet();
        abrirCerrarModalEditar();
      });
  };

  const peticionDelete = async () => {
    await axios
      .delete(urlD + consolaSeleccionada.numHabitacion)
      .then((response) => {
        setData(
          data.filter(
            (consola) =>
              consola.numHabitacion !== consolaSeleccionada.numHabitacion
          )
        );
        abrirCerrarModalEliminar();
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
      <h3>Agregar Empleado</h3>
      <Form>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Imagen</Label>
            <Input
              name="imagenHabitacion"
              placeholder="imagenHabitacion"
              type="text"
              className="w-90 me-2"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo Habitación</Label>
            <Input
              name="nombreHabitacion"
              placeholder="Tipo Habitación"
              type="text"
              className="w-90 me-2"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Descripción </Label>
            <Input
              name="descripHabitacion"
              placeholder="Descripción Habitación"
              type="text"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Habitación</Label>
            <Input
              name="numHabitacion"
              placeholder="Número Habitación"
              type="number"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Piso Habitación</Label>
            <Input
              name="pisoHabitacion"
              placeholder="Piso"
              type="number"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Capacidad</Label>
            <Input
              name="maxPersonasDisponibles"
              type="number"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Precio Habitación</Label>
            <Input
              name="precioHabitacion"
              placeholder="Valor Habitación"
              type="number"
              className="w-90"
              onChange={handleChange}
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
            <Label for="exampleEmail">Dirección</Label>
            <Input
              name="imagenHabitacion"
              onChange={handleChange}
              value={consolaSeleccionada?.imagenHabitacion}
              placeholder={
                !consolaSeleccionada?.imagenHabitacion
                  ? "Diligencia su nombre"
                  : "Nombre"
              }
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo Habitación</Label>
            <Input
              name="nombreHabitacion"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.nombreHabitacion
              }
              placeholder="Tipo Habitación"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Descripción Habitación</Label>
            <Input
              name="descripHabitacion"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.descripHabitacion
              }
              placeholder="Descripción Habitación"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Habitación</Label>
            <Input
              name="numHabitacion"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numHabitacion}
              placeholder="Número habitación"
              type="number"
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Piso</Label>
            <Input
              name="pisoHabitacion"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.pisoHabitacion}
              placeholder="Correo Electronico"
              type="number"
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Capacidad</Label>
            <Input
              name="maxPersonasDisponibles"
              onChange={handleChange}
              value={
                consolaSeleccionada &&
                consolaSeleccionada.maxPersonasDisponibles
              }
              type="number"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Precio Habitación</Label>
            <Input
              name="precioHabitacion"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.precioHabitacion
              }
              placeholder="Precio"
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
      <br></br>
      <br></br>
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
                {data.map((consola) => (
                  <tr key={consola.idHabitacion}>
                    <th>{consola.nombreHabitacion}</th>
                    <th>{consola.descripHabitacion}</th>
                    <th>{consola.numHabitacion}</th>
                    <th>{consola.pisoHabitacion}</th>
                    <th>{consola.maxPersonasDisponibles}</th>
                    <th>{consola.estadoHabitacion}</th>
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
                    </th>
                  </tr>
                ))}
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
