import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
// Iconos
import * as AiFillEdit from "react-icons/ai";
import * as MdDelete from "react-icons/md";
//Componentes
import TipoSangre from "./TipoSangre";
import GeneroEmpleado from "./GeneroEmpleado";
import TipoDocumento from "../pagesAdministrador/TipoDocumento";
//url
import { Apiurl } from "../../services/userService";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { EXPRESION_REGULAR_NOMBRE_APELLIDO, EXPRESION_REGULAR_EMAIL, EXPRESION_REGULAR_IDENTIFICACION } from "../../services/ExpresionsRegular"
import Spinner from 'react-bootstrap/Spinner';
//css
import "./Empleado.css"
import SelectRoles from "./SelectRoles";
const url = Apiurl + "empleados/listarEmpleados";
const urlG = Apiurl + "empleados/crearEmpleado";
const urlE = Apiurl + "empleados/actualizarEmpleado/";
const urlD = Apiurl + "empleados/eliminarEmpleado/";
const urlF = Apiurl + "loginEmpleado/registroLoginEmpleado"

function EmpleadoComponent() {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showInsertar, setShowInsertar] = useState(false);
  const handleCloseInsertar = () => setShowInsertar(false);
  const handleShowInsertar = () => setShowInsertar(true);

  const [smShow, setSmShow] = useState(false);
  const handleMensajeClose = () => setSmShow(false);
  const handleShowMensaje = () => setSmShow(true);

  const [showEditar, setShowEditar] = useState(false);
  const handleEditarClose = () => setShowEditar(false);
  const handleEditarShow = () => setShowEditar(true);

  const [showEliminar, setShowEliminar] = useState(false);
  const handleEliminarClose = () => setShowEliminar(false);
  const handleEliminarShow = () => setShowEliminar(true);

  const [showFunciones, setShowFunciones] = useState(false);
  const handleFuncionesClose = () => setShowFunciones(false);
  const handleFuncionesShow = () => setShowFunciones(true);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    codEmpleado: "",
    nombre: "",
    apellido: "",
    tipDocumento: {
      codTipoDocumento: "",
      nomTipoDocumento: "",
    },
    numDocumento: "",
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
    actividad: [],
    fechaIngreso: "",
    fechaSalida: "",
  });

  const [consolaFunciones, setConsolaFunciones] = useState({
    empleado: {
      codEmpleado: "",
      nombre: "",
      apellido: "",
      tipDocumento: {
        codTipoDocumento: "",
        nomTipoDocumento: "",
      },
      numDocumento: "",
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
      actividad: [],
      fechaIngreso: "",
      fechaSalida: "",
    },
    userName: "",
    contrasena: "",
    confirContrasena: "",
    rol: [
      {
        codRole: "",
        nombre: ""
      }
    ]
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFunciones = (e) => {
    const { name, value } = e.target;
    setConsolaFunciones((prevState) => ({
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
        console.log("error en listar empleados", response.status)
      }
    } catch (error) {
      console.log("Error al traer los Empleados", error);
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("empleado", consolaSeleccionada, errors);
      if (Object.keys(errors).length === 0) {
        const response = await axios.post(urlG, consolaSeleccionada, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        })
        console.log("estado post empleado", response.status);
        if (response.status === 201) {
          setData(data.concat(response.data));
          setMensaje("Empleado Creado");
          handleCloseInsertar();
          abrirCerrarModalMensaje();
          peticionGet();
          setConsolaSeleccionada({
            codEmpleado: "",
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
          })
        }
      }
      setErrors({});
    } catch (error) {
      console.log("Error post Empleado", error);
      const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al insertar el Huésped. Por favor, intenta nuevamente.";
      setMensaje(mensajeError);
      abrirCerrarModalMensaje();
      setErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  const peticionPut = async (e) => {
    e.preventDefault();
    try {
      console.log("put", errors);
      if (Object.keys(errors).length === 0) {
        console.log("put", consolaSeleccionada);
        const response = await axios.put(urlE + consolaSeleccionada.codEmpleado, consolaSeleccionada, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          }
        });
        if (response.status === 201) {
          const dataNueva = data.map((consola) => {
            if (consolaSeleccionada.codEmpleado === consola.codEmpleado) {
              consola.nombre = consolaSeleccionada.nombre;
              consola.apellido = consolaSeleccionada.apellido;
              consola.tipDocumento = {
                codTipoDocumento: consolaSeleccionada.tipDocumento.codTipoDocumento,
                nomTipoDocumento: consolaSeleccionada.tipDocumento.nomTipoDocumento,
              };
              consola.numDocumento = consolaSeleccionada.numDocumento;
              consola.edad = consolaSeleccionada.edad;
              consola.numTelefono = consolaSeleccionada.numTelefono;
              consola.correo = consolaSeleccionada.correo;
              consola.fechaNacimiento = consolaSeleccionada.fechaNacimiento;
              consola.direccion = consolaSeleccionada.direccion;
              consola.nomContactoEmergencia = consolaSeleccionada.nomContactoEmergencia;
              consola.numContactoEmergencia = consolaSeleccionada.numContactoEmergencia;
              consola.eps = consolaSeleccionada.eps;
              consola.arl = consolaSeleccionada.eps;
              consola.sexo = {
                codSexo: consolaSeleccionada.sexo.codSexo,
                nomSexo: consolaSeleccionada.sexo.nomSexo,
              };
              consola.tipoSangre = {
                codTipoSangre: consolaSeleccionada.tipoSangre.codTipoSangre,
                nomTipoSangre: consolaSeleccionada.tipoSangre.nomTipoSangre,
              };
              consola.fotoEmpleado = consolaSeleccionada.fotoEmpleado;
              consola.actividad = consolaSeleccionada.actividad;
              consola.fechaIngreso = consolaSeleccionada.fechaIngreso;
              consola.fechaSalida = consolaSeleccionada.fechaSalida;
            }
            return consola;
          })
          setData(dataNueva);
          peticionGet();
          setMensaje("Empleado Actualizado");
          handleEditarClose();
          handleShowMensaje();
          setConsolaSeleccionada({});
        }
      }
    } catch (error) {
      const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Editar el Empleado. Por favor, intenta nuevamente.";
      setMensaje(mensajeError);
      abrirCerrarModalMensaje();
      setErrors({});
    } finally {
      setIsLoading(false);
    }
  }

  const peticionDelete = async () => {
    try {
      const response = await axios.delete(urlD + consolaSeleccionada.codEmpleado, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      })

      if (response.status === 200) {
        setData(data.filter((consola) => consola.codEmpleado !== consolaSeleccionada.codEmpleado));
        setMensaje("Empleado Eliminado");
        handleEliminarClose();
        handleShowMensaje();
        peticionGet();
      } else {
        console.log("Se generado un error", response.status);
      }
    } catch (error) {
      alert("Error al eliminar empleado");
      console.log("Error editar empleado", error);
    }

  };

  const peticionfunciones = async (e) => {
    e.preventDefault();
    try {
      if (Object.keys(errors).length === 0) {
        console.log("peticion funciones", consolaFunciones);
        const response = await axios.post(urlF, consolaFunciones, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          }
        });
        if (response.status === 201) {
          setMensaje("Rol Asignado");
          abrirCerrarModalMensaje();
          setConsolaFunciones({
            codEmpleado: "",
            nombre: "",
            apellido: "",
            tipDocumento: {
              codTipoDocumento: "",
              nomTipoDocumento: "",
            },
            numDocumento: "",
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
            actividad: [],
            fechaIngreso: "",
            fechaSalida: "",
            userName: "",
            contrasena: "",
            confirContrasena: "",
            rol: [
              {
                codRole: "",
                nombre: ""
              }
            ]
          })
        }
      }
    } catch (error) {
      const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al insertar el Huésped. Por favor, intenta nuevamente.";
      setMensaje(mensajeError);
      abrirCerrarModalMensaje();

    }
  }
  const seleccionarEmpleado = (consola, caso) => {
    console.log(consola);
    setConsolaSeleccionada({
      codEmpleado: consola[0],
      nombre: consola[1],
      apellido: consola[2],
      tipDocumento: {
        codTipoDocumento: consola[3].codTipoDocumento,
        nomTipoDocumento: consola[3].nomTipoDocumento,
      },
      numDocumento: consola[4],
      edad: consola[5],
      numTelefono: consola[6],
      correo: consola[7],
      fechaNacimiento: consola[8],
      direccion: consola[9],
      nomContactoEmergencia: consola[10],
      numContactoEmergencia: consola[11],
      eps: consola[12],
      arl: consola[13],
      sexo: {
        codSexo: consola[14].codSexo,
        nomSexo: consola[14].nomSexo,
      },
      tipoSangre: {
        codTipoSangre: consola[15].codTipoSangre,
        nomTipoSangre: consola[15].nomTipoSangre,
      },
      fechaIngreso: consola[16],
      fechaSalida: consola[17],
      fotoEmpleado: "",
      actividad: [],
    });

    // console.log("consolaSeleccionada", consolaSeleccionada);

    setConsolaFunciones({
      empleado: {
        codEmpleado: consola[0],
        nombre: consola[1],
        apellido: consola[2],
        tipDocumento: {
          codTipoDocumento: consola[3].codTipoDocumento,
          nomTipoDocumento: consola[3].nomTipoDocumento,
        },
        numDocumento: consola[4],
        edad: consola[5],
        numTelefono: consola[6],
        correo: consola[7],
        fechaNacimiento: consola[8],
        direccion: consola[9],
        nomContactoEmergencia: consola[10],
        numContactoEmergencia: consola[11],
        eps: consola[12],
        arl: consola[13],
        sexo: {
          codSexo: consola[14].codSexo,
          nomSexo: consola[14].nomSexo,
        },
        tipoSangre: {
          codTipoSangre: consola[15].codTipoSangre,
          nomTipoSangre: consola[15].nomTipoSangre,
        },
        fechaIngreso: consola[16],
        fechaSalida: consola[17],
        fotoEmpleado: consola[18],
      }
    });
    console.log("funciones", consolaFunciones);
    if (caso === "EDITAR") {
      handleEditarShow();
    }
    if (caso === "ELIMINAR") {
      handleEliminarShow();
    }
    if (caso === "FUNCIONES") {
      handleFuncionesShow();
    }
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validationsForm(consolaSeleccionada));
  }
  const handleBlurFunciones = (e) => {
    handleFunciones(e);
    setErrors(validationsFormFunciones(consolaFunciones));
  }
  const calcularFechaMaxima = () => {
    const hoy = new Date();
    const fechaMaxima = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
    return fechaMaxima.toISOString().split('T')[0]; // Formateamos la fecha como string en formato 'YYYY-MM-DD'
  };
  const validationsForm = () => {
    let errors = {};
    if (!consolaSeleccionada.nombre || !consolaSeleccionada.nombre.trim()) {
      errors.nombre = "El 'Nombre'es requerido";
    } else if (!EXPRESION_REGULAR_NOMBRE_APELLIDO.test(consolaSeleccionada.nombre.trim())) {
      errors.nombre = "El campo 'Nombre' no es valido";
    }
    if (!consolaSeleccionada.apellido || !consolaSeleccionada.apellido.trim()) {
      errors.apellido = "El 'Apellido'es requerido";
    } else if (!EXPRESION_REGULAR_NOMBRE_APELLIDO.test(consolaSeleccionada.apellido.trim())) {
      errors.apellido = "El campo 'Apellido' no es valido";
    }
    if (!consolaSeleccionada.tipDocumento || consolaSeleccionada.tipDocumento.nomTipoDocumento === "") {
      errors.tipDocumento = "El 'Tipo Documento'es requerido";
    }
    if (!consolaSeleccionada.numDocumento || consolaSeleccionada.numDocumento === "") {
      errors.numDocumento = "El 'Número Documento'es requerido";
    } else if (!EXPRESION_REGULAR_IDENTIFICACION.test(consolaSeleccionada.numDocumento)) {
      errors.numDocumento = "No válido";
    }
    if (!consolaSeleccionada.numTelefono || consolaSeleccionada.numTelefono === "") {
      errors.numTelefono = "El 'Número Celular'es requerido";
    }
    if (!consolaSeleccionada.correo || !consolaSeleccionada.correo.trim()) {
      errors.correo = "El 'Correo'es requerido";
    } else if (!EXPRESION_REGULAR_EMAIL.test(consolaSeleccionada.correo.trim())) {
      errors.correo = "El 'Correo' no es valido";
    }
    if (!consolaSeleccionada.fechaNacimiento || !consolaSeleccionada.fechaNacimiento.trim()) {
      errors.fechaNacimiento = "El 'Fecha Nacimiento'es requerido";
    }
    if (!consolaSeleccionada.direccion || !consolaSeleccionada.direccion.trim()) {
      errors.direccion = "El 'Dirección'es requerido";
    }
    if (!consolaSeleccionada.nomContactoEmergencia || !consolaSeleccionada.nomContactoEmergencia.trim()) {
      errors.nomContactoEmergencia = "El 'Nombre Emergencia'es requerido";
    }
    if (!consolaSeleccionada.numContactoEmergencia || consolaSeleccionada.numContactoEmergencia === "") {
      errors.numContactoEmergencia = "El 'Número Emergencia'es requerido";
    }
    if (!consolaSeleccionada.eps || !consolaSeleccionada.eps.trim()) {
      errors.eps = "El 'EPS'es requerido";
    }
    if (!consolaSeleccionada.arl || !consolaSeleccionada.arl.trim()) {
      errors.arl = "El 'ARL'es requerido";
    }
    if (!consolaSeleccionada.sexo || consolaSeleccionada.sexo.nomSexo === "") {
      errors.sexo = "El 'Genero'es requerido";
    }
    if (!consolaSeleccionada.tipoSangre || consolaSeleccionada.tipoSangre.nomTipoSangre === "") {
      errors.tipoSangre = "El 'Tipo Sanguineo'es requerido";
    }
    if (!consolaSeleccionada.fechaIngreso || !consolaSeleccionada.fechaIngreso.trim()) {
      errors.fechaIngreso = "El 'Fecha Ingreso'es requerido";
    }
    if (!consolaSeleccionada.fechaNacimiento || !consolaSeleccionada.fechaIngreso || consolaSeleccionada.fechaNacimiento > consolaSeleccionada.fechaIngreso) {
      errors.fechaIngreso = "La fecha Ingreso es mayor que Fecha Nacimiento";
    }
    if (!consolaSeleccionada.fechaIngreso || !consolaSeleccionada.fechaSalida || consolaSeleccionada.fechaIngreso > consolaSeleccionada.fechaSalida) {
      errors.fechaSalida = "La fecha Ingreso es menor a la de Entrada";
    }
    return errors;
  }
  const validationsFormFunciones = () => {
    let errors = {}

    return errors;
  }
  const cancelarInsertar = () => {
    handleCloseInsertar();
    setErrors({});
  }
  const abrirCerrarModalMensaje = () => {
    handleShowMensaje();
    setTimeout(() => {
      handleMensajeClose();
    }, 2000); // 2000 milisegundos = 2 segundos
  };

  const setearConsolaSeleccionada = () => {
    setConsolaSeleccionada({});
    handleEditarClose();
  }

  const bodyEditar = (
    <form onSubmit={peticionPut}>
      <div className="flex">
        <div className="me-2">
          <label>Nombre</label>
          <input className="form-control" name="nombre" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada?.nombre) || ""} placeholder={!consolaSeleccionada?.nombre ? "Nombre" : "Nombre"} />
          {errors.nombre && <p id="errores">{errors.nombre}</p>}
        </div>
        <div className="me-2">
          <label>Apellido</label>
          <input className="form-control" name="apellido" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.apellido) || ""} placeholder="Apellido" />
          {errors.apellido && <p id="errores">{errors.apellido}</p>}
        </div>
        <div className="me-2" style={{ width: "250px", margin: "20px" }}>
          <label>Tipo Documento</label>
          <TipoDocumento name="tipDocumento" handleChangeData={handleChange} value={(consolaSeleccionada && consolaSeleccionada.tipDocumento) || ""} />
          {errors.tipDocumento && <p id="errores">{errors.tipDocumento}</p>}
        </div>
        <div className="me-2">
          <label>Número Documento Indentidad</label>
          <input name="numDocumento" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.numDocumento) || ""} placeholder="Numero Identidad" className="form-control" />
          {errors.numDocumento && <p id="errores">{errors.numDocumento}</p>}
        </div>
        <div className="me-2">
          <label>Edad</label>
          <input name="edad" disabled onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.edad) || ""} placeholder="Numero Identidad" className="form-control" />
        </div>
      </div>
      <div className="flex">
        <div className="me-2">
          <label >Número de Celular</label>
          <input name="numTelefono" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.correo) || ""} placeholder="Número Celular" className="form-control" />
          {errors.numTelefono && <p id="errores">{errors.numTelefono}</p>}
        </div>
        <div className="me-2">
          <label>Correo Electronico</label>
          <input name="correo" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.correo) || ""} placeholder="Correo Electronico" className="form-control" />
          {errors.correo && <p id="errores">{errors.correo}</p>}
        </div>
        <div className="me-2">
          <label>Fecha de Nacimiento</label>
          <input name="fechaNacimiento" type="date" required className="form-control" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.fechaNacimiento) || ""} />
          {errors.fechaNacimiento && <p id="errores">{errors.fechaNacimiento}</p>}
        </div>
        <div className="me-2">
          <label>Dirección</label>
          <input name="direccion" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.direccion) || ""} placeholder="Dirección" className="form-control" />
          {errors.direccion && <p id="errores">{errors.direccion}</p>}
        </div>
        <div className="me-2">
          <label>Nombre Contacto Emergencia</label>
          <input name="nomContactoEmergencia" onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia) || ""} placeholder="Nombre Familiar" className="form-control" />
          {errors.nomContactoEmergencia && <p id="errores">{errors.nomContactoEmergencia}</p>}
        </div>
      </div>
      <div className="flex">
        <div className="me-2">
          <label>#Número Emergencia</label>
          <input name="numContactoEmergencia" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.numContactoEmergencia) || ""} placeholder="# Contacto Emergencia" className="form-control" />
          {errors.numContactoEmergencia && <p id="errores">{errors.numContactoEmergencia}</p>}
        </div>
        <div className="me-2">
          <label>EPS</label>
          <input name="eps" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.eps) || ""} placeholder="EPS" className="form-control" />
          {errors.eps && <p id="errores">{errors.eps}</p>}
        </div>
        <div className="me-2">
          <label>ARL</label>
          <input name="arl" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.arl) || ""} placeholder="ARL" className="form-control" />
          {errors.arl && <p id="errores">{errors.arl}</p>}
        </div>
        <div className="me-2">
          <label>Foto</label>
          <input name="fotoEmpleado" onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.fotoEmpleado) || ""} placeholder="foto" className="form-control" />
        </div>
        <div className="me-2" style={{ width: "300px", margin: "20px" }}>
          <label>Genero</label>
          <GeneroEmpleado name="sexo" handleChangeData={handleChange} value={(consolaSeleccionada && consolaSeleccionada.sexo) || ""} />
          {errors.sexo && <p id="errores">{errors.sexo}</p>}
        </div>
      </div>
      <div className="flex">
        <div className="me-2" style={{ width: "300px", margin: "20px" }}>
          <label >Tipo de Sangre</label>
          <TipoSangre name="tipoSangre" handleChangeData={handleChange} value={(consolaSeleccionada && consolaSeleccionada.tipoSangre) || ""} />
          {errors.tipoSangre && <p id="errores">{errors.tipoSangre}</p>}
        </div>
        <div className="me-2">
          <label>Fecha de Ingreso</label>
          <input name="fechaIngreso" type="date" required className="form-control" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.fechaIngreso) || ""} />
          {errors.fechaIngreso && <p id="errores">{errors.fechaIngreso}</p>}
        </div>
        <div className="me-2">
          <label>Fecha de Salida</label>
          <input name="fechaSalida" type="date" className="form-control" onBlur={handleBlur} onChange={handleChange} value={(consolaSeleccionada && consolaSeleccionada.fechaSalida) || ""} />
          {errors.fechaSalida && <p id="errores">{errors.fechaSalida}</p>}
        </div>
      </div>
      <div align="right">
        {isLoading && (
          <div className="loading-container">
            <div className="flex">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            </div>
          </div>
        )}
        <button className="btn btn-primary" type="submit"> Actualizar </button>
        <button className="btn btn-secondary" type="submit" onClick={setearConsolaSeleccionada}>Cancelar</button>
      </div>
    </form>
  );

  const bodyInsertar = (
    <form onSubmit={onSubmit}>
      <div className="flex">
        <div className="inputInsertar">
          <label >Nombre</label>
          <input className="form-control" name="nombre" placeholder="Nombre" onBlur={handleBlur} value={consolaSeleccionada.nombre || ''} onChange={handleChange} />
          {errors.nombre && <p id="errores">{errors.nombre}</p>}
        </div>
        <div className="inputInsertar">
          <label>Apellido</label>
          <input name="apellido" placeholder="Apellido" className="form-control" required onBlur={handleBlur} value={consolaSeleccionada.apellido || ''} onChange={handleChange} />
          {errors.apellido && <p id="errores">{errors.apellido}</p>}
        </div>
        <div className="inputInsertar">
          <label>Tipo Documento</label>
          <TipoDocumento name="tipDocumento" value={consolaSeleccionada.tipDocumento} handleChangeData={handleChange} />
          {errors.tipDocumento && <p id="errores">{errors.tipDocumento}</p>}
        </div>
        <div className="inputInsertar">
          <label>Número Documento</label>
          <input name="numDocumento" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.numDocumento || ''} onChange={handleChange} required placeholder="Número Documento" />
          {errors.numDocumento && <p id="errores">{errors.numDocumento}</p>}
        </div>
        <div className="inputInsertar">
          <label>Número Celular</label>
          <input name="numTelefono" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.numTelefono || ''} onChange={handleChange} placeholder="# Celular" required />
          {errors.numTelefono && <p id="errores">{errors.numTelefono}</p>}
        </div>
      </div>
      <div className="flex">
        <div className="inputInsertar">
          <label>Correo Electronico</label>
          <input name="correo" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.correo || ''} onChange={handleChange} placeholder="Correo Electronico" required />
          {errors.correo && <p id="errores">{errors.correo}</p>}
        </div>
        <div className="inputInsertar">
          <label>Fecha de Nacimiento</label>
          <input name="fechaNacimiento" type="date" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.fechaNacimiento || ''} onChange={handleChange} required max={calcularFechaMaxima()} />
          {errors.fechaNacimiento && <p id="errores">{errors.fechaNacimiento}</p>}
        </div>
        <div className="inputInsertar">
          <label>Dirección</label>
          <input name="direccion" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.direccion || ''} onChange={handleChange} placeholder="Dirección" />
          {errors.direccion && <p id="errores">{errors.direccion}</p>}
        </div>
        <div className="inputInsertar w-80">
          <label>Nombre Emergencia</label>
          <input name="nomContactoEmergencia" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.nomContactoEmergencia || ''} onChange={handleChange} placeholder="Nombre Contacto Emergencia" required />
          {errors.nomContactoEmergencia && <p id="errores">{errors.nomContactoEmergencia}</p>}
        </div>
        <div className="inputInsertar">
          <label>Número Emergencia</label>
          <input name="numContactoEmergencia" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.numContactoEmergencia || ''} onChange={handleChange} placeholder="#Contacto Emergencia" required />
          {errors.numContactoEmergencia && <p id="errores">{errors.numContactoEmergencia}</p>}
        </div>
      </div>
      <div className="flex">
        <div className="inputInsertar">
          <label>EPS</label>
          <input name="eps" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.eps || ''} onChange={handleChange} placeholder="EPS" required />
          {errors.eps && <p id="errores">{errors.eps}</p>}
        </div>
        <div className="inputInsertar">
          <label>ARL</label>
          <input name="arl" placeholder="ARL" className="form-control" onBlur={handleBlur} value={consolaSeleccionada.arl || ''} onChange={handleChange} required />
          {errors.arl && <p id="errores">{errors.arl}</p>}
        </div>
        <div className="inputInsertar" >
          <label>Genero</label>
          <GeneroEmpleado name="sexo" value={consolaSeleccionada.GeneroEmpleado || ''} handleChangeData={handleChange} />
          {errors.sexo && <p id="errores">{errors.sexo}</p>}
        </div>
        <div className="inputInsertar">
          <label>Tipo Grupo Sanguineo</label>
          <TipoSangre name="tipoSangre" value={consolaSeleccionada.tipoSangre || ''} handleChangeData={handleChange} />
          {errors.tipoSangre && <p id="errores">{errors.tipoSangre}</p>}
        </div>
        <div className="inputInsertar">
          <label>Fecha Ingreso</label>
          <input name="fechaIngreso" placeholder="fechaIngreso" className="form-control" type="date" onBlur={handleBlur} value={consolaSeleccionada.fechaIngreso || ''} onChange={handleChange} required />
          {errors.fechaIngreso && <p id="errores">{errors.fechaIngreso}</p>}
        </div>
      </div>
      <div align="right">
        {isLoading && (
          <div className="loading-container">
            <div className="flex">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary"> Insertar </button>
        <button className="btn btn-secondary" type="button" onClick={cancelarInsertar}>Cancelar</button>
      </div>
    </form>
  );
  const bodyEliminar = (
    <div>
      <p>Esta seguro de Eliminar Empleado{" "}<b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ?</p>
      <div align="right">
        <button className="btn btn-primary" type="submit" onSubmit={() => peticionDelete()}> Si </button>
        <button className="btn btn-secondary" type="submit" onSubmit={handleEditarClose}>No</button>
      </div>
    </div>
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

  const bodyFunciones = (
    <form onSubmit={peticionfunciones}>
      <div className="flex">
        <div>
          <label>Nombre</label>
          <input type="text" value={(consolaFunciones.empleado && consolaFunciones.empleado.nombre) || ""} className="form-control" disabled onChange={handleFunciones} />
        </div>
        <div>
          <label>Apellido</label>
          <input type="text" value={(consolaFunciones.empleado && consolaFunciones.empleado.apellido) || ""} className="form-control" disabled onChange={handleFunciones} />
        </div>
        <div style={{ width: "200px", margin: "20px" }}>
          <label>Nombre</label>
          <SelectRoles name="rol" value={consolaFunciones.rol} handleChangeData={handleFunciones} />
        </div>
      </div>
      <div className="flex">
        <div>
          <label>Usuario</label>
          <input type="text" name="userName" value={consolaFunciones.userName || ""} className="form-control" onBlur={handleBlurFunciones} onChange={handleFunciones} />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="text" name="contrasena" value={consolaFunciones.contrasena || ""} className="form-control" onBlur={handleBlurFunciones} onChange={handleFunciones} />
        </div>
        <div>
          <label>Repetir Contraseña</label>
          <input type="text" name="confirContrasena" value={consolaFunciones.confirContrasena || ""} className="form-control" onBlur={handleBlurFunciones} onChange={handleFunciones} />
        </div>
      </div>
      <div className="flex">
        {isLoading && (
          <div className="loading-container">
            <div className="flex">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            </div>
          </div>
        )}
        <button className="btn btn-primary" type="submit">Asignar Usuario</button>
        <button className="btn btn-secondary" type="submit" onClick={handleFuncionesClose}>Cancelar</button>
      </div>
    </form>
  );
  useEffect(() => {
    peticionGet();
  }, []);

  const columns = [
    {
      name: "codEmpleado",
      label: "Código",
    }, {
      name: "nombre",
      label: "Nombre",
    }, {
      name: "apellido",
      label: "apellido",
    }, {
      name: "tipDocumento",
      label: "Tipo Documento",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, updateValue) => {
          try {
            if (value && value.nomTipoDocumento) {
              return value.nomTipoDocumento;
            } else {
              return "";
            }
          } catch (error) {
            console.log("Error al obtener tipos de documento", error)
          }
          return value;
        },
      },
    },
    {
      name: "numDocumento",
      label: "Número Documento",
    }, {
      name: "edad",
      label: "Edad",
    }, {
      name: "numTelefono",
      label: "Celular",
    }, {
      name: "correo",
      label: "correo",
    }, {
      name: "fechaNacimiento",
      label: "Fecha Nacimiento",
    }, {
      name: "direccion",
      label: "Dirección",
    }, {
      name: "nomContactoEmergencia",
      label: "Conctacto Emergencia",
    }, {
      name: "numContactoEmergencia",
      label: "Celular Contacto Emergencia",
    }, {
      name: "eps",
      label: "EPS",
    }, {
      name: "arl",
      label: "ARL",
    }, {
      name: "sexo",
      label: "Genero",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          try {
            if (value && value.nomSexo) {
              return value.nomSexo;
            } else {
              return "";
            }
          } catch (error) {
            console.log("Error al cargar el Genero en Empleado", error);
          }
          return value;
        },
      },
    }, {
      name: "tipoSangre",
      label: "Grupo Sanguineo",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          try {
            if (value && value.nomTipoSangre) {
              return value.nomTipoSangre
            } else {
              return "";
            }
          } catch (error) {
            console.log("Error al obtener tipo de sangre").join(", ");
          }
          return value;
        },
      },
    }, {
      name: "fechaIngreso",
      label: "Fecha Ingreo",
    }, {
      name: "fechaSalida",
      label: "Fecha Salida",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          try {
            if (value) {
              return value
            } else {
              return "";
            }
          } catch (error) {
            console.log("Error al obtener Fecha Salida").join(", ");
          }
          return value;
        },
      },
    }, {
      name: "fotoEmpleado",
      label: "Foto",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          try {
            if (value) {
              return value
            } else {
              return "";
            }
          } catch (error) {
            console.log("Error al obtener tipo de sangre").join(", ");
          }
          return value;
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
                <Link className="nav-link dropdown-toggle" to="Information.html" id="navbarDropdown" role="button" data-bs-toggle="dropdown" arial-expanded="false">
                  Información
                </Link>
                <ul className="dropdown-menu" arial-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" onClick={() => seleccionarEmpleado(tableMeta.rowData, "EDITAR")}><AiFillEdit.AiFillEdit className="me-2" />EDITAR</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={() => seleccionarEmpleado(tableMeta.rowData, "ELIMINAR")}><MdDelete.MdDelete className="me-2" />ELIMINAR</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={() => seleccionarEmpleado(tableMeta.rowData, "FUNCIONES")}><MdDelete.MdDelete className="me-2" />Asignar Roles</Link>
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
    <div className="EmpleadoComponent">
      <br></br>
      <br></br>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="flex">
            <h6 className="m-0 font-weight-bold text-primary">Base de Datos Empleados</h6>
          </div>
        </div>
        <div className="flex">
          <button className="btn btn-primary" onClick={handleShowInsertar}> Insertar Empleado </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <MUIDataTable title={"Lista de Empleados"} data={data} columns={columns} />
          </div>
        </div>
      </div>
      <Modal show={showInsertar} onHide={handleCloseInsertar} animation={false} dialogClassName="CustomEmpleado">
        <Modal.Header closeButton>
          <Modal.Title>Insertar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyInsertar}</Modal.Body>
      </Modal>
      <Modal show={smShow} onHide={handleMensajeClose} animation={false}> {popUp}</Modal>
      <Modal show={showEditar} onClose={handleEditarClose} animation={false} dialogClassName="CustomEmpleado">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyEditar}</Modal.Body>
      </Modal>
      <Modal show={showEliminar} onHide={handleEliminarClose} animation={false} >
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyEliminar}</Modal.Body>
      </Modal>
      <Modal show={showFunciones} onHide={handleFuncionesClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Asignar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyFunciones}</Modal.Body>
      </Modal>
    </div>
  );
}
export default EmpleadoComponent;