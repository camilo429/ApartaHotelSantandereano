import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../App.scss";
import "./Empleado.css";

import * as AiFillEdit from "react-icons/ai";
import * as MdDelete from "react-icons/md";
import * as BsInfoLg from "react-icons/bs";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";

import { Form, FormGroup, Label, Input } from "reactstrap";
import { makeStyles } from "@mui/styles";
import { Modal, Button } from "@mui/material";

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
    width: "900px",
    height: "500px",
    backgroundColor: "white",
    padding: 10,
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
  const [modalVer, setModalVer] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    nombre: "",
    apellido: "",
    idTipoDocumento: {
      idTipDocumento: "",
      tipDocumento: "",
    },
    numDocumento: "",
    numTelefono: "",
    correo: "",
    fechaNacimiento: "",
    direccion: "",
    nomContactoEmergencia: "",
    numContactoEmergencia: "",
    eps: "",
    arl: "",
    idSexoBio: {
      idSexoBio: "",
      sexoBio: "",
    },
    idTipoSangre: {
      idTipoSangre: "",
      tipoSangre: "",
    },
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
      .put(urlE + consolaSeleccionada.idEmpleado, consolaSeleccionada)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.idEmpleado === consola.idEmpleado) {
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
      .delete(urlD + consolaSeleccionada.idEmpleado)
      .then((response) => {
        setData(
          data.filter(
            (consola) => consola.idEmpleado !== consolaSeleccionada.idEmpleado
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
              placeholder="Nombre"
              type="text"
              className="w-90 me-2"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Apellido</Label>
            <Input
              name="apellido"
              placeholder="Apellido"
              type="text"
              className="w-90 me-2"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail"># Documento Indentidad</Label>
            <Input
              name="numDocumento"
              placeholder="Número Documento"
              type="text"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Celular</Label>
            <Input
              name="numTelefono"
              placeholder="# Celular"
              type="text"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Correo Electronico</Label>
            <Input
              name="correo"
              placeholder="Correo Electronico"
              type="text"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Nacimiento</Label>
            <Input
              name="fechaNacimiento"
              type="date"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Dirección</Label>
            <Input
              name="direccion"
              placeholder="Dirección"
              type="text"
              className="w-90"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2 w-80">
            <Label for="exampleEmail">Nombre Contacto Emergencia</Label>
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
            <Label for="exampleEmail">Número Emergencia</Label>
            <Input
              name="numContactoEmergencia"
              placeholder="#Contacto Emergencia"
              type="text"
              className="w-100"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">EPS</Label>
            <Input
              name="eps"
              placeholder="EPS"
              type="text"
              className="w-100"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">ARL</Label>
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
          <FormGroup className="me-2">
            <Label for="exampleEmail">Genero</Label>
            <GeneroEmpleado name="idSexoBio" handleChangeData={handleChange} />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo Grupo Sanguineo</Label>
            <TipoSangre name="idTipoSangre" handleChangeData={handleChange} />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo de Documento</Label>
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
            <Label for="exampleEmail">Número Documento Indentidad</Label>
            <Input
              name="numDocumento"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numDocumento}
              disabled
              placeholder="Numero Identidad"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Celular</Label>
            <Input
              name="numTelefono"
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
              disabled
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Nacimiento</Label>
            <Input
              name="fechaNacimiento"
              onChange={handleChange}
              value={
                consolaSeleccionada?.fechaNacimiento.split("-")[2] +
                "-" +
                consolaSeleccionada?.fechaNacimiento.split("-")[1] +
                "-" +
                consolaSeleccionada?.fechaNacimiento.split("-")[0]
              }
              type="date"
              disabled
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Dirección</Label>
            <Input
              name="direccion"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.direccion}
              placeholder="Dirección"
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
          <FormGroup className="me-2">
            <Label for="exampleEmail">EPS</Label>
            <Input
              name="eps"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.eps}
              placeholder="EPS"
              disabled
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">ARL</Label>
            <Input
              name="arl"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.arl}
              placeholder="ARL"
              disabled
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2 w-100">
            <Label for="exampleEmail">Genero</Label>
            <GeneroEmpleado
              name="idSexoBio"
              handleChangeData={handleChange}
              value={consolaSeleccionada.idSexoBio}
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
          <FormGroup className="me-2 w-100">
            <Label for="exampleEmail">Tipo de Sangre</Label>
            <TipoSangre
              name="idTipoSangre"
              handleChangeData={handleChange}
              value={consolaSeleccionada.idTipoSangre}
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
            <Label for="exampleEmail">Apellido</Label>
            <Input
              name="apellido"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.apellido}
              placeholder="Apellido"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Documento Indentidad</Label>
            <Input
              name="numDocumento"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numDocumento}
              disabled
              placeholder="Numero Identidad"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Celular</Label>
            <Input
              name="numTelefono"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numTelefono}
              placeholder="Número Celular"
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
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Nacimiento</Label>
            <Input
              name="fechaNacimiento"
              onChange={handleChange}
              value={
                consolaSeleccionada?.fechaNacimiento.split("-")[2] +
                "-" +
                consolaSeleccionada?.fechaNacimiento.split("-")[1] +
                "-" +
                consolaSeleccionada?.fechaNacimiento.split("-")[0]
              }
              type="date"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Dirección</Label>
            <Input
              name="direccion"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.direccion}
              placeholder="Dirección"
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
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">EPS</Label>
            <Input
              name="eps"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.eps}
              placeholder="EPS"
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">ARL</Label>
            <Input
              name="arl"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.arl}
              placeholder="ARL"
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2 w-100">
            <Label for="exampleEmail">Genero</Label>
            <GeneroEmpleado
              name="idSexoBio"
              handleChangeData={handleChange}
              value={consolaSeleccionada.idSexoBio}
            />
          </FormGroup>
          <FormGroup className="me-2 w-100">
            <Label for="exampleEmail">Tipo de Documento de Indentidad</Label>
            <DocumentoEmpleado
              name="idTipoDocumento"
              handleChangeData={handleChange}
              value={consolaSeleccionada.idTipoDocumento}
            />
          </FormGroup>
          <FormGroup className="me-2 w-100">
            <Label for="exampleEmail">Tipo de Sangre</Label>
            <TipoSangre
              name="idTipoSangre"
              handleChangeData={handleChange}
              value={consolaSeleccionada.idTipoSangre}
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
    <div className="EmpleadoComponent">
      <br></br>
      <br></br>
      <br></br>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="flex">
            <h6 className="m-0 font-weight-bold text-primary">
              Base de Datos Empleados
            </h6>
          </div>
        </div>
        <div className="flex">
          <Button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-primary"
          >
            Insertar Empleado
          </Button>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" cellSpacing="0">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Número Documento</th>
                  <th>Número de Celular</th>
                  <th>Correo</th>
                  <th>Fecha Nacimiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((consola) => (
                  <tr key={consola.idEmpleado}>
                    <th>{consola.nombre}</th>
                    <th>{consola.apellido}</th>
                    <th>{consola.numDocumento}</th>
                    <th>{consola.numTelefono}</th>
                    <th>{consola.correo}</th>
                    <th>{consola.fechaNacimiento}</th>
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
      <Modal open={modalVer} onClose={abrirCerrarModalVer}>
        {bodyVer}
      </Modal>
    </div>
  );
}

export default EmpleadoComponent;
