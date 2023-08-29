import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
//css
import "../../App.scss";
import "./Empleado.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
// Iconos
import * as AiFillEdit from "react-icons/ai";
import * as MdDelete from "react-icons/md";
import * as BsInfoLg from "react-icons/bs";
//Reactrap
import { Form, FormGroup, Label, Input } from "reactstrap";
import { makeStyles } from "@mui/styles";
import { Modal, Button } from "@mui/material";
//Componentes
import DocumentoEmpleado from "./DocumentoEmpleado";
import TipoSangre from "./TipoSangre";
import GeneroEmpleado from "./GeneroEmpleado";
import TipoDocumento from "../pagesAdministrador/TipoDocumento";
//url
import { Apiurl } from "../../services/userService";

const url = Apiurl + "empleados/listarEmpleados";
const urlG = Apiurl + "empleados/crearEmpleado";
const urlE = Apiurl + "empleados/actualizarEmpleado/";
const urlD = Apiurl + "empleados/eliminarEmpleado/";

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

function EmpleadoComponent() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalVer, setModalVer] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    codEmpleado:"",
    nombre: "",
    apellido: "",
    tipDocumento: {
      codTipoDocumento: "",
      nomTipoDocumento: "",
    },
    edad: "",
    numTelefono: "",
    correo: "",
    fechaNacimiento: "",
    direccion: "",
    nomContactoEmergencia: "",
    numContactoEmergencia: "",
    eps: "",
    arl: "",
    sexo: {
      codSexo: "",
      nomSexo: "",
    },
    tipoSangre: {
      codTipoSangre: "",
      nomTipoSangre: "",
    },
    fotoEmpleado: "",
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
    console.log("data seleccioada", consolaSeleccionada)
    const response = await axios.post(urlG, consolaSeleccionada, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    });

    setData(data.concat(response.data));
    peticionGet();
    abrirCerrarModalInsertar();
    alert("El Empleado ha sido creado");
  };

  const peticionPut = async () => {
    //setErrors(validacionesFormulario(consolaSeleccionada));
    console.log("esta es la data seleccionada" + consolaSeleccionada);
    await axios.request({
      method: "put",
      url: urlE + consolaSeleccionada.codEmpleado,
      withCredentials: true,
      crossdomain: true,
      data: consolaSeleccionada,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    }).then(response => {
      //console.log(response.status);
      console.log(response.data);
      if (response.status == 201) {
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.codEmpleado === consola.codEmpleado) {
            consola.nombre = consolaSeleccionada.nombre
            consola.apellido = consolaSeleccionada.apellido
            consola.tipDocumento.codTipoDocumento = consolaSeleccionada.tipDocumento.codTipoDocumento
            consola.tipDocumento.nomTipoDocumento = consolaSeleccionada.tipDocumento.nomTipoDocumento
            consola.numDocumento = consolaSeleccionada.numDocumento
            consola.edad = consolaSeleccionada.edad
            consola.numTelefono = consolaSeleccionada.numTelefono
            consola.correo = consolaSeleccionada.correo
            consola.fechaNacimiento = consolaSeleccionada.fechaNacimiento
            consola.direccion = consolaSeleccionada.direccion
            consola.nomContactoEmergencia = consolaSeleccionada.nomContactoEmergencia
            consola.numContactoEmergencia = consolaSeleccionada.numContactoEmergencia
            consola.eps = consolaSeleccionada.eps
            consola.arl = consolaSeleccionada.arl
            consola.sexo.codSexo = consolaSeleccionada.sexo.codSexo
            consola.sexo.nomSexo = consolaSeleccionada.sexo.nomSexo
            consola.tipoSangre.codTipoSangre = consolaSeleccionada.tipoSangre.codTipoSangre
            consola.tipoSangre.nomTipoSangre = consolaSeleccionada.tipoSangre.nomTipoSangre
            consola.fotoEmpleado = consolaSeleccionada.fotoEmpleado
          }
        })
        setData(dataNueva);
        peticionGet();
        abrirCerrarModalEditar();
        alert("El empleado ha sido actualizado");
      }
    })
  };


  const peticionDelete = async () => {
    axios.request({
      method: "delete",
      url: urlD + consolaSeleccionada.codEmpleado,
      withCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    }).then(response => {
      if (response.status === 200) {
        setData(data.filter((consola) => consola.codEmpleado !== consolaSeleccionada.codEmpleado));
        abrirCerrarModalEliminar();
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
            <input
              name="nombre"
              placeholder="Nombre"
              className="form-control"
              onChange={handleChange}

            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Apellido</Label>
            <input
              name="apellido"
              placeholder="Apellido"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo Documento</Label>
            <TipoDocumento
              name="tipDocumento"
              handleChangeData={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Número identidad</Label>
            <input
              name="numDocumento"
              placeholder="Número Documento"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Edad</Label>
            <input
              name="edad"
              placeholder="Edad"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Celular</Label>
            <input
              name="numTelefono"
              placeholder="# Celular"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Correo Electronico</Label>
            <input
              name="correo"
              placeholder="Correo Electronico"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Nacimiento</Label>
            <Input
              name="fechaNacimiento"
              type="date"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Dirección</Label>
            <input
              name="direccion"
              placeholder="Dirección"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2 w-80">
            <Label for="exampleEmail">Nombre Contacto Emergencia</Label>
            <input
              name="nomContactoEmergencia"
              placeholder="Nombre Contacto Emergencia"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Emergencia</Label>
            <input
              name="numContactoEmergencia"
              placeholder="#Contacto Emergencia"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">EPS</Label>
            <input
              name="eps"
              placeholder="EPS"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">ARL</Label>
            <input
              name="arl"
              placeholder="ARL"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Foto</Label>
            <input
              name="fotoEmpleado"
              placeholder="fotoEmpleado"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Genero</Label>
            <GeneroEmpleado name="sexo" handleChangeData={handleChange} />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo Grupo Sanguineo</Label>
            <TipoSangre name="tipoSangre" handleChangeData={handleChange} />
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
            <input
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={consolaSeleccionada?.nombre}
              placeholder={
                !consolaSeleccionada?.nombre ? "Nombre" : "Nombre"
              }
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Apellido</Label>
            <input
              name="apellido"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.apellido}
              placeholder="Apellido"
              className="form-control"
            />
          </FormGroup>
          <FormGroup >
            <Label for="exampleEmail">Tipo de Documento</Label>
            <TipoDocumento
              name="tipDocumento"
              handleChangeData={handleChange}
              value={consolaSeleccionada.tipDocumento}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Documento Indentidad</Label>
            <input
              name="numDocumento"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numDocumento}
              placeholder="Numero Identidad"
              className="form-control"
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Edad</Label>
            <input
              name="edad"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.edad}
              placeholder="Numero Identidad"
              className="form-control"
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Celular</Label>
            <input
              name="numTelefono"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numTelefono}
              placeholder="Número Celular"
              className="form-control"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Correo Electronico</Label>
            <input
              name="correo"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.correo}
              placeholder="Correo Electronico"
              className="form-control"
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Nacimiento</Label>
            <input
              name="fechaNacimiento"
              type="date"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.fechaNacimiento}

            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Dirección</Label>
            <input
              name="direccion"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.direccion}
              placeholder="Dirección"
              className="form-control"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre Contacto Emergencia</Label>
            <input
              name="nomContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia
              }
              placeholder="Nombre Familiar"
              className="form-control"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label className="w-100" for="exampleEmail">
              #Número Emergencia
            </Label>
            <input
              name="numContactoEmergencia"
              onChange={handleChange}
              value={
                consolaSeleccionada && consolaSeleccionada.numContactoEmergencia
              }
              placeholder="# Contacto Emergencia"
              className="form-control"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">EPS</Label>
            <input
              name="eps"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.eps}
              placeholder="EPS"
              className="form-control"
            />
          </FormGroup>


        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">ARL</Label>
            <input
              name="arl"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.arl}
              placeholder="ARL"
              className="form-control"
            />
          </FormGroup>
          <FormGroup className="me-2 w-100">
            <Label for="exampleEmail">Genero</Label>
            <GeneroEmpleado
              name="sexo"
              handleChangeData={handleChange}
              value={consolaSeleccionada.sexo}
            />
          </FormGroup>

          <FormGroup className="me-2 w-100">
            <Label for="exampleEmail">Tipo de Sangre</Label>
            <TipoSangre
              name="tipoSangre"
              handleChangeData={handleChange}
              value={consolaSeleccionada.tipoSangre}
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
