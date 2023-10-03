import React, { useState, useEffect } from "react";
//Librerias
import axios from "axios";
import MUIDataTable from "mui-datatables";
//Estilos
import "../../App.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Huesped.css";
// Reactstrap
import { Form, FormGroup, Label, Input } from "reactstrap";
import { makeStyles } from "@mui/styles";
import { Modal, Button } from "@mui/material";
//componentes
import TipoDocumento from "../pagesAdministrador/TipoDocumento";
import Habitaciones from "../PaginaInicio/Habitaciones";
//iconos
import * as MdDelete from "react-icons/md";
import * as AiFillEdit from "react-icons/ai";
// import * as BsInfoLg from "react-icons/bs";
//url
import { Apiurl } from "../../services/userService";
const urlhabitacionesDisponibles =
  Apiurl + "habitacion/listarHabitaciones/estado/Disponible";
const url = Apiurl + "reservaciones/listarReservas";
const urlG = Apiurl + "reservaciones/crearReservacion";
//const urlE = Apiurl + "reservaciones/actualizarHuesped/";
const urlD = Apiurl + "reservaciones/eliminarReservacion/";
const urlVer = Apiurl + "reservaciones/verReservacion/";

// let estilos = {
//   fontWeight: "bold",
//   color: "#dc3545"
// }

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "80%",
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
    fontSize: "1.2rem",
    borderRadius: "5px",
  },
}));
function Reservaciones() {
  const styles = useStyles();
  const estilos = useEstilo();
  const [data, setData] = useState([]);
  // const [errors, setErrors] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  // const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalVer, setModalVer] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    fechaEntrada: "",
    codReservacion: "",
    fechaSalida: "",
    totalDias: "",
    adultos: "",
    ninos: "",
    tipoDocumento: {
      codTipoDocumento: "",
      nomTipoDocumento: "",
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
      imagenHabitacion: "",
    },
    totalHuespedes: "",
    totalReservacion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
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
          // console.log(response.data);
        }
      })
      .catch((error) => {
        alert("Error al obtener las Reservaciones", error);
      });
  };

  const peticionDelete = async () => {
    axios
      .request({
        method: "delete",
        url: urlD + consolaSeleccionada.codReservacion,
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
                consola.codReservacion !== consolaSeleccionada.codReservacion
            )
          );
          abrirCerrarModalEliminar();
          alert("Reservación Eliminada!");
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          alert("A ocurrido un error 500");
        }
        alert("Error al ELIMINAR la reservación", error.status);
      });
  };

  const peticionPost = async (e) => {
    e.preventDefault();
    console.log("esta es la data seleccionada ", consolaSeleccionada);
    const response = await axios.post(urlG, consolaSeleccionada);
    setData(data.concat(response.data));
    peticionGet();
    abrirCerrarModalInsertar();
    alert("La habitación ha sido creada");
  };
  const peticionPostVer = async (e) => {
    e.preventDefault();
    console.log("esta es la data Ver ", consolaSeleccionada);
    const response = await axios.post(
      urlVer,
      consolaSeleccionada.codReservacion
    );
    setData(data.concat(response.data));
    peticionGet();
    abrirCerrarModalInsertar();
  };
  const seleccionarReservacion = (consola, caso) => {
    console.log(consola);
    setConsolaSeleccionada({
      codReservacion: consola[0],
    });
    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    }
    if (caso === "Ver") {
      abrirCerrarModalVer();
    }
  };
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  const abrirCerrarModalVer = () => {
    setModalVer(!modalVer);
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agendar una Reservación</h3>
      <Form style={{ marginLeft: "3%" }}>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Entrada</Label>
            <input
              name="fechaEntrada"
              type="date"
              placeholder="fechaEntrada"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Salida</Label>
            <input
              name="fechaSalida"
              type="date"
              placeholder="fechaSalida"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Adultos</Label>
            <input
              name="adultos"
              placeholder="# Adultos"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Niños</Label>
            <input
              name="ninos"
              placeholder="# Niños"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo de Documento</Label>
            <TipoDocumento
              name="tipoDocumento"
              handleChangeData={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail"># Documento</Label>
            <input
              name="numDocumento"
              type="number"
              placeholder="Número de Documento"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

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
            <Input
              name="apellido"
              placeholder="apellido"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Correo Electronico</Label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2 w-80">
            <Label for="exampleEmail">habitacion</Label>
            <Habitaciones
              name="habitacion"
              handleChangeData={handleChange}
              url={urlhabitacionesDisponibles}
            />
          </FormGroup>
        </div>
      </Form>
      <br />
      <div align="right">
        <button className="btn btn-success" onClick={(e) => peticionPost(e)}>
          Agendar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => abrirCerrarModalInsertar()}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
  const bodyEliminar = (
    <div className={estilos.modal}>
      <p>Esta seguro de Eliminar la reservación</p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Si
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );
  const bodyVer = (
    <div className={styles.modal}>
      <h3>Agendar una Reservación</h3>
      <Form style={{ marginLeft: "3%" }}>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Entrada</Label>
            <input
              name="fechaEntrada"
              type="date"
              placeholder="fechaEntrada"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Salida</Label>
            <input
              name="fechaSalida"
              type="date"
              placeholder="fechaSalida"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Adultos</Label>
            <input
              name="adultos"
              placeholder="# Adultos"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Niños</Label>
            <input
              name="ninos"
              placeholder="# Niños"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo de Documento</Label>
            <TipoDocumento
              name="tipoDocumento"
              handleChangeData={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail"># Documento</Label>
            <input
              name="numDocumento"
              type="number"
              placeholder="Número de Documento"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

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
            <Input
              name="apellido"
              placeholder="apellido"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Correo Electronico</Label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2 w-80">
            <Label for="exampleEmail">habitacion</Label>
            <Habitaciones
              name="habitacion"
              handleChangeData={handleChange}
              url={urlhabitacionesDisponibles}
            />
          </FormGroup>
        </div>
      </Form>
      <br />
      <div align="right">
        <button className="btn btn-success" onClick={(e) => peticionPostVer(e)}>
          Agendar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => abrirCerrarModalVer()}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
  const columns = [
    {
      name: "codReservacion",
      label: "Código Resevación",
    },
    {
      name: "fechaEntrada",
      label: "Fecha Entrada",
    },
    {
      name: "fechaSalida",
      label: "Fecha Salida",
      filter: false,
      sort: false,
    },
    {
      name: "totalDias",
      label: "Total Días",
      sort: true,
    },
    {
      name: "adultos",
      label: "# Adultos",
      sort: true,
    },
    {
      name: "ninos",
      label: "# Niños",
    },
    {
      name: "tipoDocumento.nomTipoDocumento",
      label: "Tipo Documento",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          // Accede a la propiedad anidada y muestra su valor
          try {
            data.map((consola, ind) => {
              value = consola.tipoDocumento.nomTipoDocumento;
            });
          } catch (error) {
            console.log("error al volver a cargar las tablas");
          }
          return value; // Esto mostrará el valor de tipoDocumento.nomTipoDocumento en la celda
        },
      },
    },
    {
      name: "habitacion.numHabitacion",
      label: "# habitacion",
    },
    {
      name: "numDocumento",
      label: "# Documento",
    },
    {
      name: "nombre",
      label: "Nombre",
    },
    {
      name: "apellido",
      label: "Apellido",
    },
    {
      name: "Email",
      label: "email",
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
                onClick={() => seleccionarReservacion(tableMeta.rowData, "Ver")}
              >
                <AiFillEdit.AiFillEdit className="me-2" />
                Ver
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  seleccionarReservacion(tableMeta.rowData, "Eliminar")
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
  useEffect(() => {
    peticionGet();
  }, []);
  return (
    <div className="Huespedes">
      <br />
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="flex">
            <h6 className="m-0 font-weight-bold text-primary">Reservaciones</h6>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-primary"
          >
            Agendar Reservación
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <MUIDataTable title="Reservaciones" columns={columns} data={data} />
          </div>
        </div>
      </div>
      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
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
export default Reservaciones;
