import React, { useEffect, useState } from "react";
// librerias
import axios from "axios";
import MUIDataTable from "mui-datatables";
// Estilos
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Modal } from 'react-bootstrap';
import "./Habitacion.css";
import { Link } from "react-router-dom";
// Iconos
//Componentes
import Habitaciones from "../../PaginaInicio/Habitaciones";
import SelectHuespedes from "../SelectHuespedes";
// url
import { Apiurl } from "../../../services/userService";
import { useForm } from 'react-hook-form';
import SelectTipoHabitacion from "./SelectTipoHabitacion";
import SelectEstadoHabitacion from "./SelectEstadoHabitacion";
const url = Apiurl + "habitacion/listarHabitaciones";
const urlG = Apiurl + "habitacion/crearHabitacion";
const urlE = Apiurl + "habitacion/actualizarHabitacion/";
const urlD = Apiurl + "habitacion/eliminarHabitacion/";
const urlCheckIn = Apiurl + "checkin/crearCheckin";
const urlhabitacionesDisponibles = Apiurl + "habitacion/listarHabitaciones/estado/Disponible";
const urlHuespedes = Apiurl + "huespedes/listarHuespedes";

function Habitacion() {
  const [data, setData] = useState([]);

  const [showHabitacion, setShowHabitacion] = useState(false);
  const handleHabitacionClose = () => setShowHabitacion(false);
  const handleHabitacionShow = () => setShowHabitacion(true);

  const [smShow, setSmShow] = useState(false);
  const handleMensajeClose = () => setSmShow(false);
  const handleShowMensaje = () => setSmShow(true);

  const [mensaje, setMensaje] = useState("");

  const [showEditar, setShowEditar] = useState(false);
  const handleEditarClose = () => setShowEditar(false);
  const handleEditarShow = () => setShowEditar(true);

  const [showEliminar, setShowEliminar] = useState(false);
  const handleEliminarClose = () => setShowEliminar(false);
  const handleEliminarShow = () => setShowEliminar(true);

  const { handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const { register } = useForm({
    shouldUnregister: false
  });

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    codHabitacion: "",
    nombreHabitacion: {
      codTipoHabitacion: "",
      nombre: "",
      precioXPersona: "",
      precioXAcompanante: ""
    },
    descripHabitacion: "",
    numHabitacion: "",
    pisoHabitacion: "",
    maxPersonasDisponibles: "",
    estadoHabitacion: {
      codEstadoHabitacion: "",
      nombre: ""
    },
    imagenHabitacion: ""
  });
  //const [consolaCheckIn, setConsolaCheckIn] = useState({
  //  fechaIngreso: "",
  //  fechaSalida: "",
  //  huesped: {
  //    codHuesped: "",
  //    nombre: "",
  //    apellido: "",
  //    numCelular: "",
  //    correo: "",
  //    tipoDocumento: {
  //      codTipoDocumento: "",
  //      nomTipoDocumento: "",
  //    },
  //    numDocumento: "",
  //    nacionalidad: {
  //      codNacion: "",
  //      nombre: "",
  //    },
  //    lugarOrigen: "",
  //    nomContactoEmergencia: "",
  //    numContactoEmergencia: "",
  //    estadoHuesped: true,
  //  },
  //  habitacion: {
  //    codHabitacion: "",
  //    nombreHabitacion: "",
  //    descripHabitacion: "",
  //    numHabitacion: "",
  //    pisoHabitacion: "",
  //    maxPersonasDisponibles: "",
  //    precioDia: "",
  //    estadoHabitacion: "",
  //    imagenHabitacion: "",
  //  },
  //});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //const manejarCambio = (e) => {
  //  const { name, value } = e.target;
  //  setConsolaCheckIn((prevState) => ({
  //    ...prevState,
  //    [name]: value,
  //  }));
  //};

  const peticionGet = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      });
      console.log(response.status);
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.log("Ha ocurrido un error get Habitación", response.status);
      }
    } catch (error) {
      console.log("error get habitación", error);
    }
  }
  const peticionPost = async (e) => {
    try {
      console.log("habitacion", consolaSeleccionada);
      const response = await axios.post(urlG, consolaSeleccionada, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      });
      console.log("post", response.status);
      if (response.status === 201) {
        setData(data.concat(response.data));
        setMensaje("Habitación Registrada");
        peticionGet();
        handleHabitacionClose();
        handleShowMensaje();
        setConsolaSeleccionada({
          codHabitacion: "",
          nombreHabitacion: {
            codTipoHabitacion: "",
            nombre: "",
            precioXPersona: "",
            precioXAcompanante: ""
          },
          descripHabitacion: "",
          numHabitacion: "",
          pisoHabitacion: "",
          maxPersonasDisponibles: "",
          estadoHabitacion: {
            codEstadoHabitacion: "",
            nombre: ""
          },
          imagenHabitacion: ""
        })
        reset();
      } else {
        console.log("error post habitacion");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const peticionPut = async () => {
    try {
      const response = await axios.put(urlE + consolaSeleccionada.codHabitacion, consolaSeleccionada, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      })
      console.log("Editar Habitación", response.status);
      if (response.status === 201) {
        const dataNueva = data.map((consola) => {
          if (consolaSeleccionada.codHabitacion === consola.codHabitacion) {
            consola.nombreHabitacion = {
              codTipoHabitacion: consolaSeleccionada.nombreHabitacion.codTipoHabitacion,
              nombre: consolaSeleccionada.nombreHabitacion.nombre,
              precioXPersona: consolaSeleccionada.nombreHabitacion.precioXPersona,
              precioXAcompanante: consolaSeleccionada.nombreHabitacion.precioXAcompanante
            };
            consola.descripHabitacion = consolaSeleccionada.descripHabitacion;
            consola.numHabitacion = consolaSeleccionada.numHabitacion;
            consola.pisoHabitacion = consolaSeleccionada.pisoHabitacion;
            consola.maxPersonasDisponibles = consolaSeleccionada.maxPersonasDisponibles;
            consola.estadoHabitacion = {
              codEstadoHabitacion: consolaSeleccionada.estadoHabitacion.codEstadoHabitacion,
              nombre: consolaSeleccionada.estadoHabitacion.nombre
            };
            consola.imagenHabitacion = consolaSeleccionada.imagenHabitacion;
          }
          return consola;
        })
        setData(dataNueva);
        peticionGet();
        handleEditarClose();
        setMensaje("Habitación Actualizada");
        handleShowMensaje();
        reset();
      } else {
        console.log("Error Actualizar Habitación", response.status);
      }
    } catch (error) {
      console.log("error put", error);
    }
  };

  const peticionDelete = async () => {
    try {
      console.log("codigo", consolaSeleccionada.codHabitacion);
      const response = await axios.delete(urlD + consolaSeleccionada.codHabitacion, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      })
      console.log("response delete habitacón", response.status);
      if (response.status === 200) {
        setData(data.filter((consola) => consola.codHabitacion !== consolaSeleccionada));
        setMensaje("Habitación Eliminada");
        handleEliminarClose();
        handleShowMensaje();
        peticionGet();
      } else {
        console.log("Error al eliminar Habitación", response.status);
      }
    } catch (error) {
      console.log("Error al Eliminar habitación", error);
    }
  };

  //const peticionCheckIn = async (e) => {
  //  e.preventDefault();
  //  console.log("esta es la data seleccionada", consolaCheckIn);
  //  const response = await axios.post(urlCheckIn, consolaCheckIn, {
  //    headers: {
  //      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
  //    },
  //  });
  //  setData(data.concat(response.data));
  //  peticionGet();
  //  abrirCerrarModalCheckIn();
  //  alert("La habitación número", consolaCheckIn.habitacion, "ha sido ocupada");
  //};

  //const seleccionarHabitacion = (consola, caso) => {
  //  setConsolaSeleccionada({
  //    codHabitacion: consola[0],
  //    nombreHabitacion: consola[1],
  //    descripHabitacion: consola[2],
  //    numHabitacion: consola[3],
  //    pisoHabitacion: consola[4],
  //    estadoHabitacion: consola[5],
  //    maxPersonasDisponibles: consola[6],
  //    precioDia: consola[7],
  //    imagenHabitacion: consola[8],
  //  });
  //  if (caso === "Editar") {
  //    abrirCerrarModalEditar();
  //  }
  //  if (caso === "Eliminar") {
  //    abrirCerrarModalEliminar();
  //  }
  //};

  const seleccionarHabitacion = (consola, caso) => {
    console.log("consola", consola);
    setConsolaSeleccionada({
      codHabitacion: consola[0],
      nombreHabitacion: {
        codTipoHabitacion: consola[1].codTipoHabitacion,
        nombre: consola[1].nombre,
        precioXPersona: consola[1].precioXPersona,
        precioXAcompanante: consola[1].precioXAcompanante
      },
      numHabitacion: consola[2],
      pisoHabitacion: consola[3],
      descripHabitacion: consola[4],
      maxPersonasDisponibles: consola[5],
      estadoHabitacion: {
        codEstadoHabitacion: consola[6].codEstadoHabitacion,
        nombre: consola[6].nombre
      },
      imagenHabitacion: consola[7]
    })
    console.log("consolaSeleccionada", consolaSeleccionada);
    if (caso === "Editar") {
      handleEditarShow();
    }
    if (caso === "Eliminar") {
      handleEliminarShow();
    }
  }

  useEffect(() => {
    peticionGet();
  }, []);

  const popUp = (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            {mensaje}
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  )
  const bodyInsertar = (
    <div>
      <h3>Agregar Habitacion</h3>
      <Form onSubmit={handleSubmit(peticionPost)}>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo Habitacion Select</Label>
            <SelectTipoHabitacion name="nombreHabitacion" value={consolaSeleccionada?.nombreHabitacion} handleChangeData={handleChange} />
          </FormGroup>
          <FormGroup className="me-2" style={{ marginLeft: "4%" }}>
            <Label for="exampleEmail">Número Habitación</Label>
            <input name="numHabitacion" placeholder="Número Habitación" type="number" className="form-control" onChange={handleChange} />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Piso Habitación</Label>
            <Input name="pisoHabitacion" placeholder="Piso" type="number" className="form-control" onChange={handleChange} />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Maximas Personas</Label>
            <Input name="maxPersonasDisponibles" placeholder="Capacidad(Personas)" type="number" className="form-control" onChange={handleChange} />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Imagen</Label>
            <input className="form-control" name="imagenHabitacion" placeholder="url Imagen" onChange={handleChange} />
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "30%" }}>
            <Label for="exampleEmail">Estado Habitación Select</Label>
            <SelectEstadoHabitacion name="estadoHabitacion" value={consolaSeleccionada?.estadoHabitacion} handleChangeData={handleChange} />
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "70%", height: "100%" }}>
            <Label for="exampleEmail">Descripción </Label>
            <textarea className="form-control" name="descripHabitacion" placeholder="Descripción Habitación" type="text" onChange={handleChange} style={{ width: "100%", height: "100%" }} />
          </FormGroup>
        </div>
        <div className="flex">
        </div>
        <div align="right">
          <button className="btn btn-primary" color="primary" type="submit">Insertar</button>
          <button className="btn btn-secondary" onClick={handleHabitacionClose} type="submit">Cancelar</button>
        </div>
      </Form>
      <br />
    </div>
  );
  const bodyEditar = (
    <div>
      <Form onSubmit={handleSubmit(peticionPut)}>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo Habitación</Label>
            <SelectTipoHabitacion name="nombreHabitacion" value={consolaSeleccionada && consolaSeleccionada?.nombreHabitacion} handleChangeData={handleChange} />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Numero Habitación</Label>
            <input className="form-control" name="numHabitacion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numHabitacion} placeholder="Número Habitación" type="number" />
          </FormGroup>
          <FormGroup className="me-2" >
            <Label for="exampleEmail">Piso Habitación</Label>
            <input className="form-control" name="pisoHabitacion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.pisoHabitacion} placeholder="Piso Habitación" type="number" />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Capacidad (#Personas)</Label>
            <input className="form-control" name="maxPersonasDisponibles" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.maxPersonasDisponibles} placeholder="# Personas" type="number" />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2" style={{ marginLeft: "4%" }}>
            <Label for="exampleEmail">Imagen Habitacion</Label>
            <input className="form-control" name="imagenHabitacion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.imagenHabitacion} placeholder="imagenHabitacion" />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Estado Habitación </Label>
            <SelectEstadoHabitacion name="estadoHabitacion" value={consolaSeleccionada.estadoHabitacion} handleChangeData={handleChange} />
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "100%", height: "100%" }}>
            <Label for="exampleEmail">Descripción Habitación</Label>
            <textarea className="form-control" name="descripHabitacion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.descripHabitacion} placeholder="Descripción Habitación" style={{ width: "100%", height: "100%" }} />
          </FormGroup>
        </div>
        <div align="right">
          <button className="btn btn-primary" type="submit" > Actualizar </button>
          <button className="btn btn-secondary" type="submit" onClick={handleEditarClose}>Cancelar</button>
        </div>
      </Form>

    </div>
  );
  const bodyEliminar = (
    <div className="bodyEliminar">
      <p>
        Esta seguro de Eliminar la Habitación
        <br />
        <b> {consolaSeleccionada && consolaSeleccionada.nombreHabitacion.nombre + " " + consolaSeleccionada.numHabitacion} </b> ?
      </p>
      <div align="right">
        <button className="btn btn-primary" type="submit" onClick={() => peticionDelete()} style={{ margin: "5px" }}> Eliminar </button>
        <button className="btn btn-danger" type="submit" onClick={handleEliminarClose} > Cancelar </button>
      </div>
    </div>
  );
  //const bodyCheckIn = (
  //  <div className={styles.modal}>
  //    <p>Realizar Ingreso Huesped</p>
  //    <Form>
  //      <div className="flex">
  //        <FormGroup className="me-2" style={{ width: "30%" }}>
  //          <Label for="exampleEmail">Fecha de Ingreso</Label>
  //          <input name="fechaIngreso" type="date" placeholder="fechaIngreso" className="form-control" onChange={manejarCambio} />
  //        </FormGroup>
  //        <FormGroup className="me-2" style={{ width: "70%", height: "100%" }}>
  //          <Label for="exampleEmail">Fecha de Salida </Label>
  //          <input name="fechaSalida" type="date" placeholder="fechaSalida" className="form-control" onChange={manejarCambio} />
  //        </FormGroup>
  //        <FormGroup className="me-2" style={{ width: "70%", height: "100%" }}>
  //          <Label for="exampleEmail">Habitación </Label>
  //          <Habitaciones name="habitacion" handleChangeData={manejarCambio} url={urlhabitacionesDisponibles} />
  //        </FormGroup>
  //        <FormGroup className="me-2" style={{ width: "70%", height: "100%" }}>
  //          <Label for="exampleEmail">Huesped Registrado </Label>
  //          <SelectHuespedes name="huesped" handleChangeData={manejarCambio} url={urlHuespedes} />
  //        </FormGroup>
  //      </div>
  //    </Form>
  //    <div align="right">
  //      <Button color="primary" onClick={(e) => peticionCheckIn(e)}> Insertar </Button>
  //      <Button onClick={() => abrirCerrarModalCheckIn()}>Cancelar</Button>
  //    </div>
  //  </div>
  //);

  const columns = [
    {
      name: "codHabitacion",
      label: "codHabitacion",
    }, {
      name: "nombreHabitacion",
      label: "Nombre",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          if (value && value.nombre) {
            return value.nombre;
          } else {
            return "";
          }
        }
      }
    }, {
      name: "numHabitacion",
      label: "#Habitación",
      sort: true,
    }, {
      name: "pisoHabitacion",
      label: "#pisoHabitacion",
      sort: true,
    }, {
      name: "descripHabitacion",
      label: "Descripción",
      filter: false,
      sort: false,
    }, {
      name: "maxPersonasDisponibles",
      label: "Capacidad (Personas)",
    }, {
      name: "estadoHabitacion",
      label: "Estado",
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          if (value && value.nombre) {
            return value.nombre;
          } else {
            return "";
          }
        }
      }
    }, {
      name: "acciones",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="Informacion.html" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Información
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" onClick={() => seleccionarHabitacion(tableMeta.rowData, "Editar")}> Editar </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={() => seleccionarHabitacion(tableMeta.rowData, "Eliminar")}> Eliminar </Link>
                  </li>
                </ul>
              </li>
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
          <button onClick={handleHabitacionShow} className="btn btn-primary" > Agregar Habitación </button>
          {/*<button onClick={() => abrirCerrarModalCheckIn()} className="btn btn-success"> Check-in </button>
          <button onClick={() => abrirCerrarModalInsertar()} className="btn btn-danger"> Check-out </button>*/}
        </div>
        <div className="card-body" style={{ width: "100%" }}>
          <MUIDataTable title={"Lista habitaciones"} data={data} columns={columns} options={options} />
        </div>
      </div>
      <Modal show={showHabitacion} onHide={handleHabitacionClose} animation={false} dialogClassName="customModal">
        <Modal.Header closeButton>
          <Modal.Title>Insertar Habitación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">{bodyInsertar}</Modal.Body>
      </Modal>
      <Modal show={smShow} onHide={handleMensajeClose} animation={false} > {popUp}</Modal>
      <Modal show={showEditar} onHide={handleHabitacionClose} animation={false} dialogClassName="customModal">
        <Modal.Header closeButton>
          <Modal.Title>Editar Huesped</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyEditar}</Modal.Body>
      </Modal>
      <Modal show={showEliminar} onHide={handleEliminarClose}>
        {bodyEliminar}
      </Modal>
      {/*<Modal open={modalCheckIn} onClose={abrirCerrarModalCheckIn}>
        {bodyCheckIn}
      </Modal>*/}
    </div>
  );
}
export default Habitacion;