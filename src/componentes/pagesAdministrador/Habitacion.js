import React, { useEffect, useState } from "react";
// librerias
import axios from "axios";
import MUIDataTable from "mui-datatables";
// Estilos
import { Form, FormGroup, Label, Input } from "reactstrap";
import "../../App.scss";
import { makeStyles } from "@mui/styles";
import { Modal, Button } from "@mui/material";
import "../../css/Habitacion.css";
// Iconos
import * as MdDelete from "react-icons/md";
import * as AiFillEdit from "react-icons/ai";
//Componentes
import Habitaciones from "../PaginaInicio/Habitaciones";
import SelectHuespedes from "./SelectHuespedes";
// url
import { Apiurl } from "../../services/userService";

const url = Apiurl + "habitacion/listarHabitaciones";
const urlG = Apiurl + "habitacion/crearHabitacion";
const urlE = Apiurl + "habitacion/actualizarHabitacion/";
const urlD = Apiurl + "habitacion/eliminarHabitacion/";
const urlCheckIn = Apiurl + "checkin/crearCheckin";
const urlhabitacionesDisponibles =
  Apiurl + "habitacion/listarHabitaciones/estado/Disponible";
const urlHuespedes = Apiurl + "huespedes/listarHuespedes";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "70%",
    height: "70%",
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
function Habitacion() {
  const styles = useStyles();
  const estilos = useEstilo();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalCheckIn, setModalCheckIn] = useState(false);

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
    imagenHabitacion: "",
  });
  const [consolaCheckIn, setConsolaCheckIn] = useState({
    fechaIngreso: "",
    fechaSalida: "",
    huesped: {
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
    },
    habitacion: {
      codHabitacion: "",
      nombreHabitacion: "",
      descripHabitacion: "",
      numHabitacion: "",
      pisoHabitacion: "",
      maxPersonasDisponibles: "",
      precioDia: "",
      estadoHabitacion: "",
      imagenHabitacion: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setConsolaCheckIn((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionGet = async () => {
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
          //console.log(response.data);
        }
      });
  };
  const peticionPost = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(urlG, consolaSeleccionada, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setData(data.concat(response.data));
        peticionGet();
        abrirCerrarModalInsertar();
        alert("La habitación ha sido creada");
      })
      .catch((error) => {
        alert("Se ha generado un error al CREAR la habitación");
      });
  };

  const peticionPut = async () => {
    await axios
      .request({
        method: "put",
        url: urlE + consolaSeleccionada.codHabitacion,
        withCredentials: true,
        crossdomain: true,
        data: consolaSeleccionada,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        // console.log(response.status);
        // console.log(consolaSeleccionada);
        if (response.status === 201) {
          var dataNueva = data;
          dataNueva.map((consola) => {
            if (consolaSeleccionada.codHabitacion === consola.codHabitacion) {
              consola.codHabitacion = consolaSeleccionada.codHabitacion;
              consola.descripHabitacion = consolaSeleccionada.descripHabitacion;
              consola.estadoHabitacion = consolaSeleccionada.estadoHabitacion;
              consola.imagenHabitacion = consolaSeleccionada.imagenHabitacion;
              consola.maxPersonasDisponibles =
                consolaSeleccionada.maxPersonasDisponibles;
              consola.nombreHabitacion = consolaSeleccionada.nombreHabitacion;
              consola.numHabitacion = consolaSeleccionada.numHabitacion;
              consola.pisoHabitacion = consolaSeleccionada.pisoHabitacion;
              consola.precioDia = consolaSeleccionada.precioDia;
            }
            return consola;
          });
          setData(dataNueva);
          peticionGet();
          abrirCerrarModalEditar();
          alert("La habitación ha sido actualizada");
        }
      })
      .catch((error) => {
        alert("Se ha generado un error al actualizar la habitación");
      });
  };

  const peticionDelete = async () => {
    axios
      .request({
        method: "delete",
        url: urlD + consolaSeleccionada.codHabitacion,
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
              (consola) =>
                consola.codHabitacion !== consolaSeleccionada.codHabitacion
            )
          );
          abrirCerrarModalEliminar();
          alert("Habitación Eliminada!");
        }
      })
      .catch((error) => {
        alert(
          "Se ha generado un error al eliminar la habitación porque esta reservada"
        );
      });
  };
  const peticionCheckIn = async (e) => {
    e.preventDefault();
    console.log("esta es la data seleccionada", consolaCheckIn);
    const response = await axios.post(urlCheckIn, consolaCheckIn, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    });
    setData(data.concat(response.data));
    peticionGet();
    abrirCerrarModalCheckIn();
    alert("La habitación número", consolaCheckIn.habitacion, "ha sido ocupada");
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
  const abrirCerrarModalCheckIn = () => {
    setModalCheckIn(!modalCheckIn);
  };

  const seleccionarHabitacion = (consola, caso) => {
    setConsolaSeleccionada({
      codHabitacion: consola[0],
      nombreHabitacion: consola[1],
      descripHabitacion: consola[2],
      numHabitacion: consola[3],
      pisoHabitacion: consola[4],
      estadoHabitacion: consola[5],
      maxPersonasDisponibles: consola[6],
      precioDia: consola[7],
      imagenHabitacion: consola[8],
    });
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
          <FormGroup className="me-2">
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
              <option value="OCUPADA">OCUPADA</option>
              <option value="VACIA-SUCIA">SUCIA</option>
              <option value="APARTADA">APARTADA</option>
              <option value="DISPONIBLE">LIBRE</option>
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
                !consolaSeleccionada?.nombreHabitacion ? "Nombre" : "Nombre"
              }
            />
          </FormGroup>
          <FormGroup className="me-2" style={{ marginLeft: "4%" }}>
            <Label for="exampleEmail">Numero Habitación</Label>
            <input
              className="form-control"
              name="numHabitacion"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.numHabitacion}
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
              value={
                consolaSeleccionada &&
                consolaSeleccionada.maxPersonasDisponibles
              }
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
              value={consolaSeleccionada && consolaSeleccionada.precioDia}
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
              <option value="OCUPADA">OCUPADA</option>
              <option value="VACIA-SUCIA">VACIA-SUCIA</option>
              <option value="APARTADA">APARTADA</option>
              <option value="DISPONIBLE">DISPONIBLE</option>
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
    <div className={estilos.modal}>
      <p>
        Esta seguro de Eliminar la Habitación
        <br />
        <b>
          {consolaSeleccionada &&
            consolaSeleccionada.nombreHabitacion +
              " " +
              consolaSeleccionada.numHabitacion}
        </b>
        ?
      </p>
      <div align="right">
        <button
          className="btn btn-primary"
          onClick={() => peticionDelete()}
          style={{ margin: "5px" }}
        >
          Eliminar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => abrirCerrarModalEliminar()}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
  const bodyCheckIn = (
    <div className={styles.modal}>
      <p>Realizar Ingreso Huesped</p>
      <Form>
        <div className="flex">
          <FormGroup className="me-2" style={{ width: "30%" }}>
            <Label for="exampleEmail">Fecha de Ingreso</Label>
            <input
              name="fechaIngreso"
              type="date"
              placeholder="fechaIngreso"
              className="form-control"
              onChange={manejarCambio}
            />
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "70%", height: "100%" }}>
            <Label for="exampleEmail">Fecha de Salida </Label>
            <input
              name="fechaSalida"
              type="date"
              placeholder="fechaSalida"
              className="form-control"
              onChange={manejarCambio}
            />
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "70%", height: "100%" }}>
            <Label for="exampleEmail">Habitación </Label>
            <Habitaciones
              name="habitacion"
              handleChangeData={manejarCambio}
              url={urlhabitacionesDisponibles}
            />
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "70%", height: "100%" }}>
            <Label for="exampleEmail">Huesped Registrado </Label>
            <SelectHuespedes
              name="huesped"
              handleChangeData={manejarCambio}
              url={urlHuespedes}
            />
          </FormGroup>
          a
        </div>
      </Form>
      <div align="right">
        <Button color="primary" onClick={(e) => peticionCheckIn(e)}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalCheckIn()}>Cancelar</Button>
      </div>
    </div>
  );

  const columns = [
    {
      name: "codHabitacion",
      label: "codHabitacion",
    },
    {
      name: "nombreHabitacion",
      label: "Nombre",
    },
    {
      name: "descripHabitacion",
      label: "Descripción",
      filter: false,
      sort: false,
    },
    {
      name: "numHabitacion",
      label: "#Habitación",
      sort: true,
    },
    {
      name: "pisoHabitacion",
      label: "#pisoHabitacion",
      sort: true,
    },
    {
      name: "estadoHabitacion",
      label: "Estado Habitación",
    },
    {
      name: "maxPersonasDisponibles",
      label: "Capacidad (Personas)",
    },
    {
      name: "precioDia",
      label: "precioDia",
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
                  seleccionarHabitacion(tableMeta.rowData, "Editar")
                }
              >
                <AiFillEdit.AiFillEdit className="me-2" />
                Editar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  seleccionarHabitacion(tableMeta.rowData, "Eliminar")
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
    <div className="Habitacion">
      <br />
      <div className="card shadow mb-4">
        <div className="flex">
          <button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-primary"
          >
            Agregar Habitación
          </button>
          <button
            onClick={() => abrirCerrarModalCheckIn()}
            className="btn btn-success"
          >
            Check-in
          </button>
          <button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-danger"
          >
            Check-out
          </button>
        </div>
        <div className="card-body" style={{ width: "100%" }}>
          <MUIDataTable
            title={"Lista habitaciones"}
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
      <Modal open={modalCheckIn} onClose={abrirCerrarModalCheckIn}>
        {bodyCheckIn}
      </Modal>
    </div>
  );
}

export default Habitacion;
