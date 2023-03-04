import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "../../App.scss";
import { Edit, Delete } from "@mui/icons-material";
import "./Empleado.css";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
} from "@mui/material";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";

import DocumentoEmpleado from "./DocumentoEmpleado";
import TipoSangre from "./TipoSangre";
import GeneroEmpleado from "./GeneroEmpleado";

const url = "http://localhost:8001/empleados/listarEmpleados";
const urlG = "http://localhost:8001/empleados/registrarEmpleado";
const urlE = "http://localhost:8001/empleados/actualizarEmpleado/";
const urlD = "http://localhost:8001/empleados/deleteEmpleado/";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "800px",
    backgroundColor: "white",
    padding: 50,
    boder: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

function EmpleadoComponent() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    nombre: "",
    apellido: "",
    idTipoDocumento: {},
    numDocumento: "",
    numTelefono: "",
    correo: "",
    fechaNacimiento: "",
    direccion: "",
    nomContactoEmergencia: "",
    numContactoEmergencia: "",
    eps: "",
    arl: "",
    idSexoBio: {},
    idTipoSangre: {},
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
    console.log("esta es la data selleccionada", consolaSeleccionada);
    const response = await axios.post(urlG, consolaSeleccionada);
    console.log(response.data);
    setData(data.concat(response.data));
    peticionGet();
    abrirCerrarModalInsertar();
  };

  const peticionPut = async () => {
    await axios
      .put(urlE + consolaSeleccionada.numDocumento, consolaSeleccionada)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.numDocumento === consola.numDocumento) {
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
      .delete(urlD + consolaSeleccionada.numDocumento)
      .then((response) => {
        setData(
          data.filter(
            (consola) =>
              consola.numDocumento !== consolaSeleccionada.numDocumento
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
  const seleccionarEmpleado = (consola, caso) => {
    setConsolaSeleccionada(consola);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Empleado</h3>
      <Form>
        <Label for="exampleEmail">Información Persona</Label>
        <div className="flex">
          <FormGroup className="me-2">
            <Input
              name="nombre"
              placeholder="Nombre"
              type="text"
              className="w-90 me-2"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="apellido"
              placeholder="Apellido"
              type="text"
              className="w-90 me-2"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="numDocumento"
              placeholder="Número Documento"
              type="text"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Input
              name="numTelefono"
              placeholder="Número de Celular"
              type="text"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="correo"
              placeholder="Correo Electronico"
              type="text"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="fechaNacimiento"
              placeholder="Fecha de Nacimiento"
              type="date"
              className="w-90"
              onClick={handleChange}
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Input
              name="direccion"
              placeholder="Dirección"
              type="text"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="nomContactoEmergencia"
              placeholder="Nombre Contacto Emergencia"
              type="text"
              className="w-100"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Input
              name="numContactoEmergencia"
              placeholder="Número Contacto Emergencia"
              type="text"
              className="w-100"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="eps"
              placeholder="EPS"
              type="text"
              className="w-100"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="arl"
              placeholder="ARL"
              type="text"
              className="w-100"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2" onChange={handleChange}>
            <GeneroEmpleado
              name="idSexoBio"
              className="me-2"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <TipoSangre
              name="idTipoDocumento"
              handleChangeData={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2" onChange={handleChange}>
            <DocumentoEmpleado
              name="idTipoDocumento"
              handleChangeData={handleChange}
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
      <h3>Editar Empleado</h3>

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
    <div className="EmpleadoComponent">
      <br />
      <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
      <br></br>
      <br></br>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Número Documento</TableCell>
              <TableCell>Número de Celular</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Fecha Nacimiento</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Nombre Contacto Emergencia</TableCell>
              <TableCell>Número de Emergencia</TableCell>
              <TableCell>EPS</TableCell>
              <TableCell>ARL</TableCell>
              <TableCell>Genero</TableCell>
              <TableCell>Tipo de Sangre</TableCell>
              <TableCell>Tipo Documento</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((consola) => (
              <TableRow key={consola.idEmpleado}>
                <TableCell>{consola.nombre}</TableCell>
                <TableCell>{consola.apellido}</TableCell>
                <TableCell>{consola.numDocumento}</TableCell>
                <TableCell>{consola.numTelefono}</TableCell>
                <TableCell>{consola.correo}</TableCell>
                <TableCell>{consola.fechaNacimiento}</TableCell>
                <TableCell>{consola.direccion}</TableCell>
                <TableCell>{consola.nomContactoEmergencia}</TableCell>
                <TableCell>{consola.numContactoEmergencia}</TableCell>
                <TableCell>{consola.eps}</TableCell>
                <TableCell>{consola.arl}</TableCell>
                <TableCell>{consola.idSexoBio.sexoBio}</TableCell>
                <TableCell>{consola.idTipoSangre.tipoSangre}</TableCell>
                <TableCell>{consola.idTipoDocumento.tipDocumento}</TableCell>
                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => seleccionarEmpleado(consola, "Editar")}
                  />
                  &nbsp;&nbsp; &nbsp;&nbsp;
                  <Delete
                    className={styles.iconos}
                    onClick={() => seleccionarEmpleado(consola, "Eliminar")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default EmpleadoComponent;
