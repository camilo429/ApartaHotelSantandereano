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
import SelectHuespedes from "../SelectHuespedes";
// url
import { Apiurl } from "../../../services/userService";
import SelectTipoHabitacion from "./SelectTipoHabitacion";
import SelectEstadoHabitacion from "./SelectEstadoHabitacion";
const url = Apiurl + "habitacion/listarHabitaciones";
const urlG = Apiurl + "habitacion/crearHabitacion";
const urlE = Apiurl + "habitacion/actualizarHabitacion/";
const urlD = Apiurl + "habitacion/eliminarHabitacion/";
const urlCheckIn = Apiurl + "checkin/crearCheckin";
const urlHuespedes = Apiurl + "huespedes/listarHuespedes";

function Habitacion() {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [errorsChecIn, setErrorsChecIn] = useState({});

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

  const [showCheckIn, setShowCheckIn] = useState(false);
  const handleCheckInClose = () => setShowCheckIn(false);
  const handleCheckInShow = () => setShowCheckIn(true);

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
  const [consolaCheckIn, setConsolaCheckIn] = useState({
    fechaEntrada: "",
    fechaSalida: "",
    codHuesped: {
      codHuesped: "",
      nombre: "",
      apellido: "",
      numCelular: "",
      correo: "",
      tipoDocumento: {
        codTipoDocumento: "",
        nomTipoDocumento: ""
      },
      numDocumento: "",
      fechaNacimiento: "",
      edad: "",
      nacionalidad: {
        codNacion: "",
        nombre: ""
      },
      lugarOrigen: {
        codRegion: "",
        nacionalidad: {
          codNacion: "",
          nombre: "",
        },
        nombre: "",
      },
      nomContactoEmergencia: "",
      numContactoEmergencia: "",
      estadoHuesped: ""
    },
    codHabitacion: {
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
    },
    numAdultos: "",
    numNinos: ""
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
  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validationsForm(consolaSeleccionada));
  }
  const handleBlurCheckIn = (e) => {
    manejarCambio(e);
    setErrorsChecIn(validationFormCheckIn(consolaCheckIn));
  }
  const validationsForm = () => {
    let errors = {}
    if (!consolaSeleccionada || !consolaSeleccionada.nombreHabitacion || consolaSeleccionada.nombreHabitacion.nombre === "") {
      errors.nombreHabitacion = "El 'Tipo Habitación' es requerido";
    }
    if (!consolaSeleccionada || consolaSeleccionada.numHabitacion === "") {
      errors.numHabitacion = "El 'Número Habitación' es requerido";
    } else if (!consolaSeleccionada || consolaSeleccionada.numHabitacion > 999) {
      errors.numHabitacion = "El 'Número Habitación' NO puede ser mayor a 999";
    }
    if (!consolaSeleccionada || consolaSeleccionada.pisoHabitacion === "") {
      errors.pisoHabitacion = "El 'Número Habitación' es requerido";
    } else if (!consolaSeleccionada || consolaSeleccionada.pisoHabitacion > 4) {
      errors.pisoHabitacion = "El 'Número Piso' no puede ser mayor a 4";
    }
    if (!consolaSeleccionada || consolaSeleccionada.maxPersonasDisponibles === "") {
      errors.maxPersonasDisponibles = "El 'Maximas Personas' es requerido";
    }
    if (!consolaSeleccionada || !consolaSeleccionada.estadoHabitacion || consolaSeleccionada.estadoHabitacion.nombre === "") {
      errors.estadoHabitacion = "El 'Tipo Habitación' es requerido";
    }
    if (!consolaSeleccionada || consolaSeleccionada.descripHabitacion === "") {
      errors.descripHabitacion = "El 'Descripción' es requerido";
    }
    return errors;
  }

  const validationFormCheckIn = (form) => {
    let errorsChecIn = {};

    if (!form || !form.fechaEntrada) {
      errorsChecIn.fechaEntrada = "El campo 'Fecha de Entrada' es requerido";
    }
    if (!form || !form.fechaSalida) {
      errorsChecIn.fechaSalida = "El campo 'Fecha de Salida' es requerido";
    }
    if (form.fechaSalida < form.fechaEntrada) {
      errorsChecIn.fechaSalida = "La fecha de salida debe ser posterior a la fecha de entrada";
    }
    if (!form || form.numAdultos === "" || form.numAdultos <= 0) {
      errorsChecIn.numAdultos = "El campo 'Número Adultos' es requerido y debe ser mayor que cero";
    }
    if (!form || form.numNinos < 0) {
      errorsChecIn.numNinos = "El campo 'Número Niños' no puede ser negativo";
    }
    if (!form || ((form.numAdultos + form.numNinos) > form.maxPersonasDisponibles)) {
      errorsChecIn.numAdultos = "El número total de personas supera la capacidad de la habitación";
    }
    return errorsChecIn;
  }

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
        // console.log(response.data);
      } else {
        console.log("Ha ocurrido un error get Habitación", response.status);
      }
    } catch (error) {
      console.log("error get habitación", error);
    }
  }
  const peticionPost = async (e) => {
    try {
      e.preventDefault();
      setErrors(validationsForm(consolaSeleccionada));
      if (Object.keys(errors).length === 0) {
        console.log("habitacion", consolaSeleccionada);
        const response = await axios.post(urlG, consolaSeleccionada, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          }
        });
        // console.log("post", response.status);
        if (response.status === 201) {
          setData(data.concat(response.data));
          setMensaje("Habitación Registrada");
          peticionGet();
          handleHabitacionClose();
          abrirCerrarModalMensaje();
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
        }
      }
    } catch (error) {
      const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Editar el Empleado. Por favor, intenta nuevamente.";
      setMensaje(mensajeError);
      abrirCerrarModalMensaje();
      setErrors({});
    }
  };

  const peticionPut = async (e) => {
    try {
      e.preventDefault();
      setErrors(validationsForm(consolaSeleccionada));
      console.log("put", consolaSeleccionada);
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
        abrirCerrarModalMensaje();
      } else {
        console.log("Error Actualizar Habitación", response.status);
      }
    } catch (error) {
      const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Editar el Empleado. Por favor, intenta nuevamente.";
      setMensaje(mensajeError);
      abrirCerrarModalMensaje();
      setErrors({});
    }
  };

  const peticionDelete = async (e) => {
    e.preventDefault();
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
      const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Editar el Empleado. Por favor, intenta nuevamente.";
      setMensaje(mensajeError);
      abrirCerrarModalMensaje();
      setErrors({});
    }
  };

  const peticionCheckIn = async (e) => {
    try {
      e.preventDefault();
      setErrors(validationFormCheckIn(consolaCheckIn));
      if (Object.keys(errors).length === 0) {
        console.log("CheckIn", consolaCheckIn);
        const response = await axios.post(urlCheckIn, consolaCheckIn, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        });
        if (response.status === 201) {
          setData(data.concat(response.data));
          peticionGet();
          handleCheckInClose()
          setMensaje("Habitación Reservada");
          abrirCerrarModalMensaje();
        }
      }
    } catch (error) {
      const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al dar ingreso al Huesped. Por favor, intenta nuevamente.";
      setMensaje(mensajeError);
      abrirCerrarModalMensaje();
      setErrors({});
    }
  };

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
    setConsolaCheckIn({
      codHabitacion: {
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
      },
    })
    if (caso === "Editar") {
      handleEditarShow();
    }
    if (caso === "Eliminar") {
      handleEliminarShow();
    }
    if (caso === "CheckIn") {
      handleCheckInShow();
    }
  }
  const cerrtarInsertar = () => {
    handleHabitacionClose();
    setConsolaCheckIn({});
  }
  const cerrrarEidtar = () => {
    handleEditarClose();
    setConsolaSeleccionada({});
  }
  const cerrarCheckIn = () => {
    handleCheckInClose();
    setConsolaCheckIn();
  }

  useEffect(() => {
    peticionGet();
  }, []);

  const abrirCerrarModalMensaje = () => {
    handleShowMensaje();
    setTimeout(() => {
      handleMensajeClose();
    }, 2000); // 2000 milisegundos = 2 segundos
  };
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
      <form onSubmit={peticionPost}>
        <div className="flex">
          <FormGroup className="me-2">
            <label>Tipo Habitacion Select</label>
            <SelectTipoHabitacion name="nombreHabitacion" value={consolaSeleccionada?.nombreHabitacion} handleChangeData={handleChange} />
            {errors.nombreHabitacion && <p id="errores">{errors.nombreHabitacion}</p>}
          </FormGroup>
          <FormGroup className="me-2" style={{ marginLeft: "4%" }}>
            <label>Número Habitación</label>
            <input name="numHabitacion" placeholder="Número Habitación" type="number" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.numHabitacion} onChange={handleChange} />
            {errors.numHabitacion && <p id="errores">{errors.numHabitacion}</p>}
          </FormGroup>
          <FormGroup className="me-2">
            <label>Piso Habitación</label>
            <Input name="pisoHabitacion" placeholder="Piso" type="number" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.pisoHabitacion} onChange={handleChange} />
            {errors.pisoHabitacion && <p id="errores">{errors.pisoHabitacion}</p>}
          </FormGroup>
          <FormGroup className="me-2">
            <label>Maximas Personas</label>
            <Input name="maxPersonasDisponibles" placeholder="Capacidad(Personas)" type="number" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.maxPersonasDisponibles} onChange={handleChange} />
            {errors.maxPersonasDisponibles && <p id="errores">{errors.maxPersonasDisponibles}</p>}
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <label>Imagen</label>
            <input className="form-control" name="imagenHabitacion" placeholder="url Imagen" onBlur={handleBlur} value={consolaSeleccionada.imagenHabitacion} onChange={handleChange} />
            {errors.imagenHabitacion && <p id="errores">{errors.imagenHabitacion}</p>}
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "30%" }}>
            <label >Estado Habitación Select</label>
            <SelectEstadoHabitacion name="estadoHabitacion" value={consolaSeleccionada?.estadoHabitacion} handleChangeData={handleChange} />
            {errors.estadoHabitacion && <p id="errores">{errors.estadoHabitacion}</p>}
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "70%", height: "100%" }}>
            <label >Descripción </label>
            <textarea className="form-control" name="descripHabitacion" type="textare" onBlur={handleBlur} value={consolaSeleccionada.descripHabitacion} onChange={handleChange} placeholder="Descripción Habitación" style={{ width: "100%", height: "100%" }} />
            {errors.descripHabitacion && <p id="errores">{errors.descripHabitacion}</p>}
          </FormGroup>
        </div>
        <div align="right">
          <button className="btn btn-primary" color="primary" type="submit">Insertar</button>
          <button className="btn btn-secondary" onClick={cerrtarInsertar} type="submit">Cancelar</button>
        </div>
      </form>
      <br />
    </div>
  );
  const bodyEditar = (
    <div>
      <Form onSubmit={peticionPut}>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo Habitación</Label>
            <SelectTipoHabitacion name="nombreHabitacion" value={consolaSeleccionada && consolaSeleccionada?.nombreHabitacion} handleChangeData={handleChange} />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Numero Habitación</Label>
            <input className="form-control" name="numHabitacion" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.numHabitacion) || ""} placeholder="Número Habitación" type="number" />
            {errors.numHabitacion && <p id="errores">{errors.numHabitacion}</p>}
          </FormGroup>
          <FormGroup className="me-2" >
            <Label for="exampleEmail">Piso Habitación</Label>
            <input className="form-control" name="pisoHabitacion" onChange={handleChange} onBlur={handleBlur} value={(consolaSeleccionada && consolaSeleccionada.pisoHabitacion) || ""} placeholder="Piso Habitación" type="number" />
            {errors.pisoHabitacion && <p id="errores">{errors.pisoHabitacion}</p>}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Capacidad (#Personas)</Label>
            <input className="form-control" name="maxPersonasDisponibles" onChange={handleChange} onBlur={handleBlur} value={(consolaSeleccionada && consolaSeleccionada.maxPersonasDisponibles) || ""} placeholder="# Personas" type="number" />
            {errors.maxPersonasDisponibles && <p id="errores">{errors.maxPersonasDisponibles}</p>}
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2" style={{ marginLeft: "4%" }}>
            <Label for="exampleEmail">Imagen Habitacion</Label>
            <input className="form-control" name="imagenHabitacion" onChange={handleChange} onBlur={handleBlur} value={(consolaSeleccionada && consolaSeleccionada.imagenHabitacion) || ""} placeholder="imagenHabitacion" />
            {errors.imagenHabitacion && <p id="errores">{errors.imagenHabitacion}</p>}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Estado Habitación </Label>
            <SelectEstadoHabitacion name="estadoHabitacion" value={consolaSeleccionada.estadoHabitacion} handleChangeData={handleChange} />
            {errors.estadoHabitacion && <p id="errores">{errors.estadoHabitacion}</p>}
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "100%", height: "100%" }}>
            <Label for="exampleEmail">Descripción Habitación</Label>
            <textarea className="form-control" name="descripHabitacion" type="textare" onBlur={handleBlur} value={(consolaSeleccionada && consolaSeleccionada.descripHabitacion) || ""} onChange={handleChange} placeholder="Descripción Habitación" style={{ width: "100%", height: "100%" }} />
            {errors.descripHabitacion && <p id="errores">{errors.descripHabitacion}</p>}
          </FormGroup>
        </div>
        <div align="right">
          <button className="btn btn-primary" type="submit" > Actualizar </button>
          <button className="btn btn-secondary" type="submit" onClick={cerrrarEidtar}>Cancelar</button>
        </div>
      </Form>
    </div>
  );
  const bodyEliminar = (
    <div className="bodyEliminar">
      <p>
        Esta seguro de Eliminar la Habitación
        <br />
        <b> {(!consolaSeleccionada && !consolaSeleccionada.nombreHabitacion.nombre + " " + consolaSeleccionada.numHabitacion) || ""} </b> ?
      </p>
      <div align="right">
        <button className="btn btn-primary" type="submit" onClick={() => peticionDelete()} style={{ margin: "5px" }}> Eliminar </button>
        <button className="btn btn-danger" type="submit" onClick={handleEliminarClose} > Cancelar </button>
      </div>
    </div>
  );
  const bodyCheckIn = (
    <div>
      <form onSubmit={peticionCheckIn}>
        <div className="flex">
          <div>
            <label >Fecha de Ingreso</label>
            <input name="fechaEntrada" type="date" className="form-control" onBlur={handleBlurCheckIn} value={consolaCheckIn?.fechaEntrada || ""} onChange={manejarCambio} />
            {errorsChecIn.fechaEntrada && <p id="errores">{errorsChecIn.fechaEntrada}</p>}
          </div>
          <div>
            <label>Fecha de Salida </label>
            <input name="fechaSalida" type="date" className="form-control" onBlur={handleBlurCheckIn} value={consolaCheckIn?.fechaSalida || ""} onChange={manejarCambio} />
            {errorsChecIn.fechaSalida && <p id="errores">{errorsChecIn.fechaSalida}</p>}
          </div>
          <div>
            <label># Adultos</label>
            <input name="numAdultos" type="number" className="form-control" onBlur={handleBlurCheckIn} value={consolaCheckIn?.numAdultos || ""} onChange={manejarCambio} placeholder="numAdultos" />
            {errorsChecIn.numAdultos && <p id="errores">{errorsChecIn.numAdultos}</p>}
          </div>
        </div>
        <div className="flex">
          <div>
            <label># Niños</label>
            <input name="numNinos" type="number" className="form-control" onBlur={handleBlurCheckIn} value={consolaCheckIn?.numNinos || ""} onChange={manejarCambio} placeholder="numNinos" />
            {errorsChecIn.numNinos && <p id="errores">{errorsChecIn.numNinos}</p>}
          </div>
          <div>
            <Label for="exampleEmail">Huesped Registrado </Label>
            <SelectHuespedes name="codHuesped" handleChangeData={manejarCambio} url={urlHuespedes} />
            {errorsChecIn.codHuesped && <p id="errores">{errorsChecIn.codHuesped}</p>}
          </div>
          <div align="right" style={{ marginTop: "30px" }}>
            <button className="btn btn-primary" type="submit"> Insertar </button>
            <button className="btn btn-secondary" onClick={cerrarCheckIn}>Cancelar</button>
          </div>
        </div>
      </form>
    </div>
  );

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
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={() => seleccionarHabitacion(tableMeta.rowData, "CheckIn")}> Check-In </Link>
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
      <Modal show={showEliminar} onHide={handleEliminarClose}> {bodyEliminar} </Modal>
      <Modal show={showCheckIn} onHide={handleCheckInClose} animation={false} dialogClassName="checkIn">
        <Modal.Header>
          <Modal.Title>Check - In</Modal.Title>
        </Modal.Header>
        {bodyCheckIn}
      </Modal>
    </div>
  );
}
export default Habitacion;