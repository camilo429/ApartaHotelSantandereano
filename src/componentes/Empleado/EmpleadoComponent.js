import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import DocumentoEmpleado from "./DocumentoEmpleado";
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
  TextField,
} from "@mui/material";

import { Form, FormGroup, Label, Input } from "reactstrap";
import "../../App.scss";

import { Edit, Delete } from "@mui/icons-material";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";

const url = "http://localhost:8002/empleados/listarEmpleados";
const urlG = "http://localhost:8002/empleados/registrarEmpleado";
const urlE = "http://localhost:8002/empleados/actualizarEmpleado/";
const urlD = "http://localhost:8002/empleados/deleteEmpleado/";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 800,
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
    numDocumento: "",
    numTelefono: "",
    correo: "",
    contraseña: "",
    fechaNacimiento: "",
    direccion: "",
    nomContactoEmergencia: "",
    numContactoEmergencia: "",
    eps: "",
    arl: "",
    idGenero: "",
    idTipoSangre: "",
    idTipoDocumento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(consolaSeleccionada);
  };

  const peticionGet = async () => {
    await axios.get(url).then((response) => {
      setData(response.data);
    });
  };

  const peticionPost = async () => {
    await axios.post(urlG, consolaSeleccionada).then((response) => {
      setData(data.concat(response.data));
      peticionGet();
      abrirCerrarModalInsertar();
    });
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
              name="apellido"
              placeholder="Apellido"
              type="text"
              className="w-90 me-2"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="nombre"
              placeholder="Nombre"
              type="text"
              className="w-90 me-2"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="numDocumento"
              placeholder="Número Documento"
              type="text"
              className="w-90"
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
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="correo"
              placeholder="Correo Electronico"
              type="text"
              className="w-90"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="contraseña"
              placeholder="Contraseña"
              type="password"
              className="w-90"
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Input
              name="fechaNacimiento"
              placeholder="fecha Nacimiento"
              type="date"
              className="w-90"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="direccion"
              placeholder="Dirección"
              type="text"
              className="w-90"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input
              name="nomContactoEmergencia"
              placeholder="Nombre Contacto Emergencia"
              type="text"
              className="w-100"
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
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Input name="eps" placeholder="EPS" type="text" className="w-100" />
          </FormGroup>
          <FormGroup className="me-2">
            <Input name="arl" placeholder="ARL" type="text" className="w-100" />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Input name="idGenero" placeholder="idGenero" type="text" className="w-100" />
          </FormGroup>
          <FormGroup className="me-2">
            <Input name="idTipoSangre" placeholder="idTipoSangre" type="text" className="w-100" />
          </FormGroup>
          <FormGroup className="me-2">
          <DocumentoEmpleado onChange={handleChange} className="w-90"/>
          </FormGroup>
        </div>
      </Form>

      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Empleado</h3>
      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.nombre}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="apellido"
        className={styles.inputMaterial}
        label="Apellido"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.apellido}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="idTipoDocumento"
        className={styles.inputMaterial}
        label="id Tipo Documento"
        onChange={handleChange}
        value={
          consolaSeleccionada &&
          consolaSeleccionada.idTipoDocumento.id_tip_documento
        }
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="numDocumento"
        className={styles.inputMaterial}
        label="Número Documento"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.numDocumento}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="numTelefono"
        className={styles.inputMaterial}
        label="Número de Telefono"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.numTelefono}
      />

      <TextField
        name="correo"
        className={styles.inputMaterial}
        label="Correo"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.correo}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="contraseña"
        className={styles.inputMaterial}
        label="contraseña"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.contraseña}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="fechaNacimiento"
        className={styles.inputMaterial}
        label="Fecha Nacimiento"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.fechaNacimiento}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="direccion"
        className={styles.inputMaterial}
        label="Dirección"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.direccion}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="nomContactoEmergencia"
        className={styles.inputMaterial}
        label="Nombre Contacto Emergencia"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia}
      />

      <TextField
        style={{ marginTop: "15px" }}
        name="eps"
        className={styles.inputMaterial}
        label="EPS"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.eps}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="arl"
        className={styles.inputMaterial}
        label="ARL"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.arl}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="numContactoEmergencia"
        className={styles.inputMaterial}
        label="Numero contacto Emergencia"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.numContactoEmergencia}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="idGenero"
        className={styles.inputMaterial}
        label="Genero"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.idGenero.id}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="idTipoSangre"
        className={styles.inputMaterial}
        label="Tipo de sangre"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.idTipoSangre.id}
      />

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
              <TableCell>Tipo Documento</TableCell>
              <TableCell>Número Documento</TableCell>
              <TableCell>Número de Celular</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>contraseña</TableCell>
              <TableCell>Fecha de nacimiento</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Nombre Contacto Emergencia</TableCell>
              <TableCell>Número de Emergencia</TableCell>
              <TableCell>EPS</TableCell>
              <TableCell>ARL</TableCell>
              <TableCell>Genero</TableCell>
              <TableCell>Tipo de Sangre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((consola) => (
              <TableRow key={consola.id}>
                <TableCell>{consola.nombre}</TableCell>
                <TableCell>{consola.apellido}</TableCell>
                <TableCell>{consola.idTipoDocumento.tipDocumento}</TableCell>
                <TableCell>{consola.numDocumento}</TableCell>
                <TableCell>{consola.numTelefono}</TableCell>
                <TableCell>{consola.correo}</TableCell>
                <TableCell>{consola.contraseña}</TableCell>
                <TableCell>{consola.fechaNacimiento}</TableCell>
                <TableCell>{consola.direccion}</TableCell>
                <TableCell>{consola.nomContactoEmergencia}</TableCell>
                <TableCell>{consola.numContactoEmergencia}</TableCell>
                <TableCell>{consola.eps}</TableCell>
                <TableCell>{consola.arl}</TableCell>
                <TableCell>{consola.idGenero.genero}</TableCell>
                <TableCell>{consola.idTipoSangre.tipoSangre}</TableCell>
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
