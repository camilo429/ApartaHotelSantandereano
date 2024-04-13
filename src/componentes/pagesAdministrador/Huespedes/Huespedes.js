import React, { useEffect, useState } from "react";
//Librerias
import axios from "axios";
import { Apiurl } from "../../../services/userService";
import MUIDataTable from "mui-datatables";
//Componentes
import TipoDocumento from "../TipoDocumento";
import Nacionalidades from "../Nacionalidades";
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
//Componentes
// url
import { EXPRESION_REGULAR_NOMBRE_APELLIDO, EXPRESION_REGULAR_EMAIL, EXPRESION_REGULAR_IDENTIFICACION } from "../../../services/ExpresionsRegular"
import Region from "../Region";
import Spinner from 'react-bootstrap/Spinner';
//Estilos
import "./Huesped.css";
const url = Apiurl + "huespedes/listarHuespedes";
const urlG = Apiurl + "huespedes/crearHuesped";
const urlE = Apiurl + "huespedes/actualizarHuesped/";
const urlD = Apiurl + "huespedes/eliminarhuesped/";

function Huespedes() {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [smShow, setSmShow] = useState(false);
  const handleMensajeClose = () => setSmShow(false);
  const handleShowMensaje = () => setSmShow(true);

  const [showEditar, setShowEditar] = useState(false);
  const handleEditarClose = () => setShowEditar(false);
  const handleEditarShow = () => setShowEditar(true);

  const [showEliminar, setShowEliminar] = useState(false);
  const handleEliminarClose = () => setShowEliminar(false);
  const handleEliminarShow = () => setShowEliminar(true);

  const [mensaje, setMensaje] = useState("");
  const [codNacionalidad, setCodNacionalidad] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
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
      nombre: "",
      nacionalidad: {
        codNacion: "",
        nombre: ""
      }
    },
    nomContactoEmergencia: "",
    numContactoEmergencia: "",
    checkin: [],
    estadoHuesped: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionGet = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })

      if (response.status === 200) {
        setData(response.data);
        //console.log(response.data);
      } else {
        console.log("error en el metodo get", response.status);
      }
    } catch (error) {
      console.log("Error al traer los huespedes", error);
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (Object.keys(errors).length === 0) {
        console.log("peticion post consola", consolaSeleccionada);
        setIsLoading(true);
        const response = await axios.post(urlG, consolaSeleccionada, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        })
        console.log("estado result", response.status);
        if (response.status === 201) {
          setData(data.concat(response.data));
          setMensaje("Huesped Registrado");
          handleClose();
          abrirCerrarModalMensaje();
          setConsolaSeleccionada({
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
              nombre: "",
              nacionalidad: {
                codNacion: "",
                nombre: ""
              }
            },
            nomContactoEmergencia: "",
            numContactoEmergencia: "",
            checkin: [],
            estadoHuesped: ""
          })
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error al registrar Huesped", error);
      const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al insertar el Huésped. Por favor, intenta nuevamente.";
      setMensaje(mensajeError);
      abrirCerrarModalMensaje();
    } finally {
      setIsLoading(false);
    }
  };

  const peticionPut = async (e) => {
    e.preventDefault();
    try {
      if (Object.keys(errors).length === 0) {
        const response = await axios.put(urlE + consolaSeleccionada.codHuesped, consolaSeleccionada, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          }
        });
        if (response.status === 201) {
          const dataNueva = data.map((consola) => {
            if (consolaSeleccionada.codHuesped === consola.codHuesped) {
              consola.codHuesped = consolaSeleccionada.codHuesped;
              consola.nombre = consolaSeleccionada.nombre;
              consola.apellido = consolaSeleccionada.apellido;
              consola.numCelular = consolaSeleccionada.numCelular;
              consola.correo = consolaSeleccionada.correo;
              consola.tipoDocumento = {
                codTipoDocumento: consolaSeleccionada.tipoDocumento.codTipoDocumento,
                nomTipoDocumento: consolaSeleccionada.tipoDocumento.nomTipoDocumento
              };
              consola.numDocumento = consolaSeleccionada.numDocumento;
              consola.fechaNacimiento = consolaSeleccionada.fechaNacimiento;
              consola.edad = consolaSeleccionada.edad;
              consola.nacionalidad = {
                codNacion: consolaSeleccionada.nacionalidad.codNacion,
                nombre: consolaSeleccionada.nacionalidad.nombre
              };
              consola.lugarOrigen = {
                codRegion: consolaSeleccionada.lugarOrigen.codRegion,
                nombre: consolaSeleccionada.lugarOrigen.nombre,
                nacionalidad: {
                  codNacion: consolaSeleccionada.lugarOrigen.nacionalidad.codNacion,
                  nombre: consolaSeleccionada.lugarOrigen.nacionalidad.nombre
                }
              };
              consola.nomContactoEmergencia = consolaSeleccionada.nomContactoEmergencia;
              consola.numContactoEmergencia = consolaSeleccionada.numContactoEmergencia;
              consola.checkin = consolaSeleccionada.checkin;
              consola.estadoHuesped = consolaSeleccionada.estadoHuesped;
            }
            return consola;
          })
          setData(dataNueva);
          peticionGet();
          handleEditarClose();
          setMensaje("Huesped Actualizado");
          abrirCerrarModalMensaje();
          setConsolaSeleccionada({});
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
      const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Editar el Huésped. Por favor, intenta nuevamente.";
      setMensaje(mensajeError);
      abrirCerrarModalMensaje();
    }
  }

  const peticionDelete = async () => {
    try {
      const response = await axios.delete(urlD + consolaSeleccionada.codHuesped, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      })

      if (response.status === 200) {
        setData(data.filter((consola) => consola.codEmpleado !== consolaSeleccionada.codEmpleado));
        setMensaje("Huesped Eliminado");
        handleEliminarClose();
        handleShowMensaje();
        peticionGet();
      }
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
      const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Eliminar el Huésped. Por favor, intenta nuevamente.";
      setMensaje(mensajeError);
      abrirCerrarModalMensaje();
    }
  }
  const validationsForm = () => {
    let errors = {};
    if (!consolaSeleccionada.nombre.trim()) {
      errors.nombre = "El campo 'Nombre' es requerido";
    } else if (!EXPRESION_REGULAR_NOMBRE_APELLIDO.test(consolaSeleccionada.nombre.trim())) {
      errors.nombre = "El campo 'Nombre' no es valido";
    }
    if (!consolaSeleccionada.apellido.trim()) {
      errors.apellido = "El campo 'Apellido' es requerido";
    } else if (!EXPRESION_REGULAR_NOMBRE_APELLIDO.test(consolaSeleccionada.apellido.trim())) {
      errors.apellido = "El campo 'Apellido' no es valido";
    }
    if (!consolaSeleccionada.correo.trim()) {
      errors.correo = "El campo 'Correo' es requerido";
    } else if (!EXPRESION_REGULAR_EMAIL.test(consolaSeleccionada.correo.trim())) {
      errors.email = "El campo 'Correo' no es valido";
    }
    if (!consolaSeleccionada.numCelular === "") {
      errors.numCelular = "El '# Celular' es requerido";
    }
    if (!consolaSeleccionada.fechaNacimiento.trim()) {
      errors.fechaNacimiento = "El 'Fecha Nacimiento' es requerido";
    }
    if (!consolaSeleccionada.tipoDocumento || consolaSeleccionada.tipoDocumento.nomTipoDocumento === "") {
      errors.tipoDocumento = "El 'Tipo Documento' es requerido";
    }
    if (!consolaSeleccionada.numDocumento === "") {
      errors.numDocumento = "El 'Número Documento' es requerido";
    } else if (!EXPRESION_REGULAR_IDENTIFICACION.test(consolaSeleccionada.numDocumento)) {
      errors.numDocumento = "El 'Número Documento' no es valido";
    }
    if (!consolaSeleccionada.nacionalidad || consolaSeleccionada.nacionalidad.nombre === "") {
      errors.nacionalidad = "La 'Nacionalidad'es requerida";
    }
    if (!consolaSeleccionada.lugarOrigen || consolaSeleccionada.lugarOrigen.nombre === "") {
      errors.lugarOrigen = "El 'lugar Origen' es requerido";
    }
    if (!consolaSeleccionada.nomContactoEmergencia.trim()) {
      errors.nomContactoEmergencia = "El 'Nombre Emergencia' es requerido";
    }
    if (!consolaSeleccionada.numContactoEmergencia === "") {
      errors.numContactoEmergencia = "El 'Número Emergencia' es requerido";
    }
    return errors;
  }
  const calcularFechaMaxima = () => {
    const hoy = new Date();
    const fechaMaxima = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
    return fechaMaxima.toISOString().split('T')[0]; // Formateamos la fecha como string en formato 'YYYY-MM-DD'
  };
  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validationsForm(consolaSeleccionada));
  }

  const abrirCerrarModalMensaje = () => {
    handleShowMensaje();
    setTimeout(() => {
      handleMensajeClose();
    }, 2000); // 2000 milisegundos = 2 segundos
  };
  const seleccionarHuespedes = (consola, caso) => {
    console.log("Consola", consola);
    setConsolaSeleccionada({
      codHuesped: consola[0],
      nombre: consola[1],
      apellido: consola[2],
      numCelular: consola[3],
      correo: consola[4],
      tipoDocumento: {
        codTipoDocumento: consola[5].codTipoDocumento,
        nomTipoDocumento: consola[5].nomTipoDocumento,
      },
      numDocumento: consola[6],
      fechaNacimiento: consola[7],
      edad: consola[8],
      nacionalidad: {
        codNacion: consola[9].codNacion,
        nombre: consola[9].nombre,
      },
      lugarOrigen: {
        codRegion: consola[10].codRegion,
        nombre: consola[10].nombre,
        nacionalidad: {
          codNacion: consola[10].nacionalidad.codNacion,
          nombre: consola[10].nacionalidad.nombre,
        }
      },
      nomContactoEmergencia: consola[11],
      numContactoEmergencia: consola[12],
      estadoHuesped: consola[13],
      checkin: consola[14]
    });
    console.log("ConsolaSeleccionada", consolaSeleccionada);
    if (caso === "Editar") {
      handleEditarShow();
    }
    if (caso === "Eliminar") {
      handleEliminarShow();
    }
  };

  const bodyEliminar = (
    <div className="bodyEliminar">
      <p>
        Esta seguro de Eliminar Huesped <b>{consolaSeleccionada && consolaSeleccionada.nombre} {consolaSeleccionada.apellido} C.C: {consolaSeleccionada && consolaSeleccionada.numDocumento}</b> ? <br />
      </p>
      <div align="right">
        <button className="btn btn-primary" onClick={() => peticionDelete()}> Si </button>
        <button className="btn btn-secondary" onClick={handleEliminarClose}>No</button>
      </div>
    </div>
  );
  const bodyInsertar = (
    <form onSubmit={onSubmit} >
      <div className="flex">
        <div className="formHuesped">
          <label>Nombre</label>
          <input className="form-control" name="nombre" placeholder="Nombre (s)" onBlur={handleBlur} value={consolaSeleccionada.nombre} onChange={handleChange} />
          {errors.nombre && <p id="errores">{errors.nombre}</p>}
        </div>
        <div className="formHuesped">
          <label>Apellido</label>
          <input className="form-control" name="apellido" placeholder="Apellido" onBlur={handleBlur} value={consolaSeleccionada.apellido} onChange={handleChange} />
          {errors.apellido && <p id="errores">{errors.apellido}</p>}
        </div>
        <div className="formHuesped">
          <label>Número Celular</label>
          <input className="form-control" name="numCelular" placeholder="Celular" onBlur={handleBlur} value={consolaSeleccionada.numCelular} onChange={handleChange} />
          {errors.numCelular && <p id="errores">{errors.numCelular}</p>}
        </div>
        <div className="formHuesped">
          <label>Fecha de Nacimiento</label>
          <input type="date" className="form-control" name="fechaNacimiento" placeholder="Nacimiento" onBlur={handleBlur} value={consolaSeleccionada.fechaNacimiento} onChange={handleChange} max={calcularFechaMaxima()} />
          {errors.fechaNacimiento && <p id="errores">{errors.fechaNacimiento}</p>}
        </div>
        <div className="formHuesped">
          <label>Correo Electronico</label>
          <input className="form-control" name="correo" placeholder="correo electronico" onBlur={handleBlur} value={consolaSeleccionada.correo} onChange={handleChange} />
          {errors.correo && <p id="errores">{errors.correo}</p>}
        </div>
      </div>
      <div className="flex" style={{ marginLeft: "10px" }}>
        <div className="formHuesped">
          <label>Tipo Documento</label>
          <TipoDocumento name="tipoDocumento" value={consolaSeleccionada.tipoDocumento} handleChangeData={handleChange} />
          {errors.tipoDocumento && <p id="errores">{errors.tipoDocumento}</p>}
        </div>
        <div className="formHuesped" >
          <label>Número Documento</label>
          <input className="form-control" name="numDocumento" type="number" placeholder="# Documento" onBlur={handleBlur} value={consolaSeleccionada.numDocumento} onChange={handleChange} />
          {errors.numDocumento && <p id="errores">{errors.numDocumento}</p>}
        </div>
        <div className="formHuesped">
          <label>Nacionalidad</label>
          <Nacionalidades name="nacionalidad" value={consolaSeleccionada.nacionalidad} handleChangeData={handleChange} />
          {errors.nacionalidad && <p id="errores">{errors.nacionalidad}</p>}
        </div>
        <div className="formHuesped">
          <label > ¿Región de dónde proviene?</label>
          <Region name="lugarOrigen" codNacion={codNacionalidad || 1} value={consolaSeleccionada.lugarOrigen} handleChangeData={handleChange} />
          {errors.lugarOrigen && <p id="errores">{errors.lugarOrigen}</p>}
        </div>
        <div className="formHuesped">
          <label>Nombre Emergencia</label>
          <input className="form-control" name="nomContactoEmergencia" placeholder="Nombre Contacto" onBlur={handleBlur} value={consolaSeleccionada.nomContactoEmergencia} onChange={handleChange} />
          {errors.nomContactoEmergencia && <p id="errores">{errors.nomContactoEmergencia}</p>}
        </div>
      </div>
      <div className="flex">
        <div className="formHuesped">
          <label>#Contacto Emergencia</label>
          <input className="form-control" type="number" name="numContactoEmergencia" onBlur={handleBlur} value={consolaSeleccionada.numContactoEmergencia} onChange={handleChange} placeholder="# Contacto" />
          {errors.numContactoEmergencia && <p id="errores">{errors.numContactoEmergencia}</p>}
        </div>
        <div className="formHuesped">
          {isLoading && (
            <div className="loading-container">
              <div className="flex">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              </div>
            </div>
          )}
        </div>
        <div id="huespedesbotonesinsertar" className="flex">
          <button className="btn btn-primary" id="insertar" type="submit"> Insertar </button>
          <button className="btn btn-secondary" type="submit" onClick={handleClose}>Cancelar</button>
        </div>
      </div>
    </form>
  );
  const bodyEditar = (
    <form onSubmit={peticionPut}>
      <div className="flex">
        <div className="me-2">
          <label>Nombre(s)</label>
          <input className="form-control" name="nombre" onBlur={handleBlur} value={consolaSeleccionada?.nombre} onChange={handleChange} />
          {errors.nombre && <p id="errores">{errors.nombre}</p>}
        </div>
        <div className="me-2">
          <label>Apellido(s)</label>
          <input className="form-control" name="apellido" onBlur={handleBlur} value={consolaSeleccionada?.apellido} onChange={handleChange} />
          {errors.apellido && <p id="errores">{errors.apellido}</p>}
        </div>
        <div className="me-2">
          <label>Número Celular</label>
          <input className="form-control" name="numCelular" onBlur={handleBlur} value={consolaSeleccionada?.numCelular} onChange={handleChange} />
          {errors.numCelular && <p id="errores">{errors.numCelular}</p>}
        </div>
        <div className="me-2">
          <label>Fecha Nacimiento</label>
          <input className="form-control" name="fechaNacimiento" type="date" onBlur={handleBlur} onChange={handleChange} value={consolaSeleccionada?.fechaNacimiento} max={calcularFechaMaxima()} />
          {errors.fechaNacimiento && <p id="errores">{errors.fechaNacimiento}</p>}
        </div>
        <div className="me-2">
          <label>Correo Electronico</label>
          <input className="form-control" name="correo" onBlur={handleBlur} onChange={handleChange} value={consolaSeleccionada?.correo} />
          {errors.correo && <p id="errores">Dirección no valida</p>}
        </div>
      </div>
      <div className="flex">
        <div className="me-2" >
          <label>Tipo Documento</label>
          <TipoDocumento name="tipoDocumento" value={consolaSeleccionada?.tipoDocumento} handleChangeData={handleChange} />
          {errors.tipoDocumento && <p id="errores">{errors.tipoDocumento}</p>}
        </div>
        <div className="me-2">
          <label>Número Documento</label>
          <input className="form-control" name="numDocumento" onBlur={handleBlur} onChange={handleChange} value={consolaSeleccionada?.numDocumento} />
          {errors.numDocumento && <p id="errores">{errors.numDocumento}</p>}
        </div>
        <div className="me-2" style={{ width: "200px", margin: "20px" }}>
          <label>Nacionalidad</label>
          <Nacionalidades name="nacionalidad" value={consolaSeleccionada?.nacionalidad} handleChangeData={handleChange} />
          {errors.nacionalidad && <p id="errores">{errors.nacionalidad}</p>}
        </div>
        <div className="me-2">
          <label>¿De dónde proviene?</label>
          <Region name="lugarOrigen" value={consolaSeleccionada?.lugarOrigen} codNacion={codNacionalidad || 1} handleChangeData={handleChange} />
          {errors.lugarOrigen && <p id="errores">{errors.lugarOrigen}</p>}
        </div>
        <div className="me-2">
          <label>Nombre Emergencia</label>
          <input className="form-control" name="nomContactoEmergencia" onBlur={handleBlur} onChange={handleChange} value={consolaSeleccionada?.nomContactoEmergencia} />
          {errors.nomContactoEmergencia && <p id="errores">{errors.nomContactoEmergencia}</p>}
        </div>
      </div>
      <div className="flex">
        <div className="me-2">
          <label>#Contacto Emergencia</label>
          <input className="form-control" name="numContactoEmergencia" onBlur={handleBlur} onChange={handleChange} value={consolaSeleccionada?.numContactoEmergencia} />
          {errors.numContactoEmergencia && <p id="errores">{errors.numContactoEmergencia}</p>}
        </div>
        <div className="me-2" style={{ width: "200px", margin: "20px" }}>
          <label>Estado Huesped</label>
          <select required className="form-select" aria-label="Default select example" name="estadoHuesped" value={consolaSeleccionada?.estadoHuesped === true ? "TRUE" : "FALSE"} onChange={handleChange}>
            <option value="TRUE">TRUE</option>
            <option value="FALSE">FALSE</option>
          </select>
        </div>
        <div align="flex" id="huespedesbotonesinsertar">
          <button className="btn btn-primary" type="submit"> Actualizar </button>
          <button className="btn btn-secondary" onClick={handleEditarClose}>Cancelar</button>
        </div>
      </div>
    </form>
  );
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
  useEffect(() => {
    if (consolaSeleccionada.nacionalidad !== undefined) {
      // console.log("Nacionalidad cambiada:", consolaSeleccionada.nacionalidad);
      setCodNacionalidad(consolaSeleccionada.nacionalidad.codNacion);
    }
    peticionGet();
  }, [consolaSeleccionada.nacionalidad]);

  const columns = [
    {
      name: "codHuesped",
      label: "Código",
    }, {
      name: "nombre",
      label: "Nombre",
    }, {
      name: "apellido",
      label: "apellido",
    }, {
      name: "numCelular",
      label: "Celular",
    }, {
      name: "correo",
      label: "Correo Electronico",
    }, {
      name: "tipoDocumento",
      label: "Tipo Documento",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          if (value && value.nomTipoDocumento) {
            return value.nomTipoDocumento;
          } else {
            return "";
          }
          // Devuelve el nombre del tipo de documento
        },
      },
    }, {
      name: "numDocumento",
      label: "Número Documento",
    }, {
      name: "fechaNacimiento",
      label: "FechaNacimiento"
    }, {
      name: "edad",
      label: "Edad"
    }, {
      name: "nacionalidad",
      label: "Nacionalidad",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          if (value && value.nombre) {
            return value.nombre;
          } else {
            return "";
          }
        },
      },
    }, {
      name: "lugarOrigen",
      label: "Lugar Origen",
      options: {
        customBodyRender: (value, tableMeta) => {
          if (value && value.nombre) {
            return value.nombre;
          } else {
            return ""; // Otra acción adecuada si value.nombre no está definido
          }
        }
      }
    }, {
      name: "nomContactoEmergencia",
      label: "Nombre Contacto ",
    }, {
      name: "numContactoEmergencia",
      label: "Número de Emergencia",
    }, {
      name: "estadoHuesped",
      label: "Estado Huesped",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          try {
            if (value === true) {
              return "HABILITADO";
            } else {
              return "INABILITADO";
            }
          } catch (error) {
            console.log("No se puede cargar el valor de Estado Huesped:", error);
            return "Error";
          }
        },
      },
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
                    <Link className="dropdown-item" onClick={() => seleccionarHuespedes(tableMeta.rowData, "Editar")}> Editar </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={() => seleccionarHuespedes(tableMeta.rowData, "Eliminar")}> Eliminar </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/Login`}> Factura </Link>
                  </li>
                </ul>
              </li>
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="Huespedes">
      <div>
        <h6 className="m-0 font-weight-bold text-primary"> Base de Datos Huespedes </h6>
        <div> <button onClick={handleShow} className="btn btn-primary"> Agregar Huesped</button> </div>
        <div style={{ color: "red" }}>
          <MUIDataTable
            title={"Lista Huespedes"}
            data={data}
            columns={columns}
            options={{ selectableRows: 'none' }}
            id="custom-table" // Aplica los estilos personalizados
          />
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false} dialogClassName="crearHuesped">
        <Modal.Header closeButton>
          <Modal.Title>Insertar Huesped</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">{bodyInsertar}</Modal.Body>
      </Modal>
      <Modal show={showEditar} onHide={handleEditarClose} animation={false} dialogClassName="crearHuesped">
        <Modal.Header closeButton>
          <Modal.Title>Editar Huesped</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyEditar}</Modal.Body>
      </Modal>
      <Modal show={showEliminar} onHide={handleEliminarClose} size="lg"> {bodyEliminar} </Modal>
      <Modal show={smShow} onHide={handleMensajeClose} animation={false}> {popUp}</Modal>
    </div>
  );
}
export default Huespedes;