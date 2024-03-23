import React, { useEffect, useState, useCallback } from "react";
//Librerias
import axios from "axios";
import MUIDataTable from "mui-datatables";
//Estilos
import { Form } from "reactstrap";
import "./Huesped.css";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import "./../../estilos/style.css";
//iconos
import { Modal, Button } from "@mui/material";
//import * as BsInfoLg from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
//Componentes
import Nacionalidades from "../Nacionalidades";
import TipoDocumento from "../TipoDocumento";
import { useForm } from 'react-hook-form';
// url
import { Apiurl } from "../../../services/userService";
import { EXPRESION_REGULAR_NOMBRE_APELLIDO, EXPRESION_REGULAR_EMAIL, EXPRESION_REGULAR_CELULAR, EXPRESION_REGULAR_IDENTIFICACION } from "../../../services/ExpresionsRegular"
import Region from "../Region";
import { Spinner } from 'reactstrap';

const url = Apiurl + "huespedes/listarHuespedes";
const urlG = Apiurl + "huespedes/crearHuesped";
const urlE = Apiurl + "huespedes/actualizarHuesped/";
const urlD = Apiurl + "huespedes/eliminarhuesped/";

function Huespedes() {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [codNacionalidad, setCodNacionalidad] = useState();
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
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

  const useStyles = ({ theme }) => ({
    position: "absolute",
    width: "75%",
    height: "65%",
    backgroundColor: "white",
    padding: "1%",
    border: "2px solid #000",
    top: "40%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: "0.8rem",
    borderRadius: "5px",
    overflow: "scroll"
  });
  const ModalContainer = styled("div")(useStyles);
  const useEstilo = ({ theme }) => ({
    position: "absolute",
    width: "30%",
    height: "30%",
    backgroundColor: "white",
    padding: "5%",
    boder: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "5px"
  });
  const ModalContainerII = styled("div")(useEstilo);
  // Define los estilos para otro componente (usoEstilos)
  const otroEstilo = ({ theme }) => ({
    position: "absolute",
    width: "40%",
    height: "15%",
    backgroundColor: "white",
    padding: "1%",
    border: "2px solid #000",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "2.25rem",
    borderRadius: "5px",
  });
  // Utiliza styled para generar la versión estilizada del otro componente
  const UsoEstilosContainer = styled("div")(otroEstilo);

  const handleChange = (e) => {
    console.log("handleChange called")
    setValue(e.target.name, e.target.value);
    console.log("target", e.target.name, e.target.value)
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
      } else {
        console.log("error en el metodo get", response.status);
      }
    } catch (error) {
      console.log("Error al traer los huespedes", error);
    }
  };

  // const peticionPost = async () => {
  //   try {
  //     console.log("peticion post", consolaSeleccionada);
  //     const response = await axios.post(urlG, consolaSeleccionada, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
  //       },
  //     })
  //     console.log("estado result", response.status);
  //     if (response.status === 201) {
  //       setData(data.concat(response.data));
  //       abrirCerrarModalInsertar();
  //       setMensaje("! Huesped Registrado ¡");
  //       abrirCerrarModalMensaje();
  //       setConsolaSeleccionada({
  //         codHuesped: "",
  //         nombre: "",
  //         apellido: "",
  //         numCelular: "",
  //         correo: "",
  //         tipoDocumento: {
  //           codTipoDocumento: "",
  //           nomTipoDocumento: ""
  //         },
  //         numDocumento: "",
  //         fechaNacimiento: "",
  //         edad: "",
  //         nacionalidad: {
  //           codNacion: "",
  //           nombre: ""
  //         },
  //         lugarOrigen: {
  //           codRegion: "",
  //           nombre: "",
  //           nacionalidad: {
  //             codNacion: "",
  //             nombre: ""
  //           }
  //         },
  //         nomContactoEmergencia: "",
  //         numContactoEmergencia: "",
  //         checkin: [],
  //         estadoHuesped: ""
  //       })
  //     }
  //     reset();
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error en la solicitud:", error);
  //     setIsLoading(false);
  //     throw error;
  //   }
  // }

  const onSubmit = async (info) => {
    try {
      console.log("peticion post consola", consolaSeleccionada);
      console.log("peticion post info", info);
      const response = await axios.post(urlG, info, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      console.log("estado result", response.status);
      if (response.status === 201) {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
        setMensaje("! Huesped Registrado ¡");
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
      reset();
      setIsLoading(false);
    } catch (error) {
      console.error("Error al registrar Huesped", error);
      // alert("Hubo un error al crear la huesped. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const peticionPut = async (info) => {
    console.log("putavida", info);
    console.log("codHuesped", info.nombre);
    try {
      const response = await axios.put(urlE + consolaSeleccionada.codHuesped, consolaSeleccionada, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      });
      // console.log(response.status);
      if (response.status === 201) {
        setData((prevData) =>
          prevData.map((consola) => consola[0] === consolaSeleccionada.codHuesped ? consolaSeleccionada : consola));
        peticionGet();
        abrirCerrarModalEditar();
        // alert("El huesped ha sido actualizado");
        setMensaje("Huesped Actualizado");
        abrirCerrarModalMensaje();
        reset();
        setIsLoading(false);
      } else {
        console.error("La solicitud PUT no fue exitosa");
        reset();
      }
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
      reset();
    }
  }

  const modificarHuespedMemoized = useCallback(peticionPut, [peticionPut]);
  useEffect(() => {
    if (isLoading) {
      modificarHuespedMemoized();
    }
  }, [isLoading, consolaSeleccionada, modificarHuespedMemoized]);

  const peticionDelete = async () => {
    axios
      .request({
        method: "delete",
        url: urlD + consolaSeleccionada.codHuesped,
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
              (consola) => consola.codHuesped !== consolaSeleccionada.codHuesped
            )
          );
          abrirCerrarModalEliminar();
        }
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
  const abrirCerrarModalMensaje = () => {
    setModalMensaje(!modalMensaje);
    setTimeout(() => {
      setModalMensaje(false);
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
      abrirCerrarModalEditar();
    }
    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    }
  };

  const bodyInsertar = (
    <ModalContainer>
      <h3>Agregar Huesped</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div >
            <label>Nombre</label>
            <input className="form-control" name="nombre" placeholder="Nombre (s)"  {...register('nombre', { required: true, maxLength: 30, pattern: EXPRESION_REGULAR_NOMBRE_APELLIDO })} />
            {errors.nombre?.type === 'required' && <p id="errores">El campo es requerido</p>}
            {errors.nombre?.type === 'maxLength' && <p id="errores">Es muy largo</p>}
            {errors.nombre?.type === 'pattern' && <p id="errores">Nombre no valido</p>}
          </div>
          <div >
            <label>Apellido</label>
            <input className="form-control" name="apellido" placeholder="Apellido" {...register('apellido', { required: true, maxLength: 30, pattern: EXPRESION_REGULAR_NOMBRE_APELLIDO, })} />
            {errors.apellido?.type === 'required' && <p id="errores">El campo es requerido</p>}
            {errors.apellido?.type === 'maxLength' && <p id="errores">Muy largo</p>}
            {errors.apellido?.type === 'pattern' && <p id="errores">Nombre no valido</p>}
          </div>
          <div >
            <label>Número Celular</label>
            <input className="form-control" name="numCelular" placeholder="Celular" {...register('numCelular', { required: true, pattern: EXPRESION_REGULAR_CELULAR, })} />
            {errors.numCelular?.type === 'required' && <p id="errores">El campo es requerido</p>}
            {errors.numCelular?.type === 'pattern' && <p id="errores">Número NO valido</p>}
          </div>
          <div>
            <label>Fecha de Nacimiento</label>
            <input type="date" className="form-control" name="fechaNacimiento" placeholder="Nacimiento" {...register('fechaNacimiento', { required: true, maxLength: 10 })} />
            {errors.fechaNacimiento?.error === 'required' && <p id="errores">El campo es requerido</p>}
            {errors.fechaNacimiento?.type === 'maxLength' && <p id="errores">Fecha no valida</p>}
          </div>
          <div >
            <label>Correo Electronico</label>
            <input className="form-control" name="correo" placeholder={!consolaSeleccionada?.correo ? "Correo Personal" : "Correo"} {...register('correo', { required: true, pattern: EXPRESION_REGULAR_EMAIL, })} />
            {errors.correo?.type === "pattern" && <p id="errores">Dirección no valida</p>}
            {errors.correo?.type === 'required' && <p id="errores">El campo es requerido</p>}
          </div>
        </div>
        <div className="flex" style={{ marginLeft: "10px" }}>
          <div style={{ width: "175px", margin: "5px" }}>
            <label style={{ margin: "6px" }}>Tipo Documento</label>
            <TipoDocumento name="tipoDocumento" value={consolaSeleccionada.tipoDocumento} handleChangeData={handleChange} />
          </div>
          <div >
            <label>Número Documento</label>
            <input className="form-control" name="numDocumento" type="number" placeholder="# Documento" {...register('numDocumento', { required: true, pattern: EXPRESION_REGULAR_IDENTIFICACION })} />
            {errors.numDocumento?.type === 'required' && <p id="errores">El campo es requerido</p>}
            {errors.numDocumento?.type === 'pattern' && <p id="errores">El campo no es valido</p>}
          </div>
          <div style={{ width: "175px", margin: "10px" }} >
            <label style={{ margin: "6px" }} >Nacionalidad</label>
            <Nacionalidades name="nacionalidad" value={consolaSeleccionada.nacionalidad} handleChangeData={handleChange} />
          </div>
          <div style={{ width: "175px", margin: "10px" }}>
            <label style={{ margin: "6px" }}> ¿Región de dónde proviene?</label>
            <Region name="lugarOrigen" codNacion={codNacionalidad} value={consolaSeleccionada.lugarOrigen} handleChangeData={handleChange} />
          </div>
          <div >
            <label>Nombre Emergencia</label>
            <input className="form-control" name="nomContactoEmergencia" placeholder="Nombre Contacto" {...register('nomContactoEmergencia', { required: true, pattern: EXPRESION_REGULAR_NOMBRE_APELLIDO })} />
            {errors.nomContactoEmergencia?.type === 'required' && <p id="errores">El Campo es Requerido</p>}
            {errors.nomContactoEmergencia?.type === 'pattern' && <p id="errores">El Campo No es valido</p>}
          </div>
        </div>
        <div className="flex">
          <div >
            <label>#Contacto Emergencia</label>
            <input className="form-control" type="number" name="numContactoEmergencia" onChange={handleChange} placeholder="# Contacto" {...register('numContactoEmergencia', { required: true, pattern: EXPRESION_REGULAR_CELULAR })} />
            {errors.numContactoEmergencia?.type === 'required' && <p id="errores">El campo es requerido</p>}
            {errors.numContactoEmergencia?.type === 'patter' && <p id="errores">Número NO valido</p>}
          </div>
          <div>
            {isLoading && (
              <div className="loading-container">
                <div className="flex"> <Spinner color="primary" style={{ marginLeft: "200px" }} /><div className="loading-spinner">Cargando</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="huespedesbotonesinsertar" className="flex">
          <button className="btn btn-primary" id="insertar"> Insertar </button>
          <button className="btn btn-secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
        </div>
      </form>
    </ModalContainer>
  );

  const bodyEditar = (
    <div>
      <ModalContainer>
        <h3>Editar Huesped</h3>
        <form onSubmit={handleSubmit(peticionPut)}>
          <div className="flex">
            <div className="me-2">
              <label>Nombre(s)</label>
              <input className="form-control" name="nombre" onChange={handleChange}  {...register('nombre', { required: true, maxLength: 30, pattern: EXPRESION_REGULAR_NOMBRE_APELLIDO })} />
              {errors.nombre?.type === 'required' && <p id="errores">El campo es requerido</p>}
              {errors.nombre?.type === 'maxLength' && <p id="errores">Muy largo</p>}
              {errors.nombre?.type === 'pattern' && <p id="errores">Nombre no valido</p>}
            </div>
            <div className="me-2">
              <label>Apellido(s)</label>
              <input className="form-control" name="apellido" {...register('apellido', { required: true, maxLength: 30, pattern: EXPRESION_REGULAR_NOMBRE_APELLIDO })} />
              {errors.apellido?.type === 'required' && <p id="errores">El campo es requerido</p>}
              {errors.apellido?.type === 'maxLength' && <p id="errores">Muy largo</p>}
              {errors.apellido?.type === 'pattern' && <p id="errores">Nombre no valido</p>}
            </div>
            <div className="me-2">
              <label>Número Celular</label>
              <input className="form-control" name="numCelular"  {...register('numCelular', { required: true, pattern: EXPRESION_REGULAR_CELULAR, })} />
              {errors.numCelular?.type === 'required' && <p id="errores">El campo es requerido</p>}
              {errors.numCelular?.type === 'pattern' && <p id="errores">Número NO valido</p>}
            </div>
            <div className="me-2">
              <label>Fecha Nacimiento</label>
              <input className="form-control" type="date" name="fechaNacimiento" {...register('fechaNacimiento', { required: true, maxLength: 10 })} />
              {errors.fechaNacimiento?.error === 'required' && <p id="errores">El campo es requerido</p>}
              {errors.fechaNacimiento?.type === 'maxLength' && <p id="errores">Fecha no valida</p>}
            </div>
            <div className="me-2">
              <label>Correo Electronico</label>
              <input className="form-control" name="correo" {...register('correo', { required: true, pattern: EXPRESION_REGULAR_EMAIL })} />
              {errors.correo?.type === "pattern" && <p id="errores">Dirección no valida</p>}
              {errors.correo?.type === 'required' && <p id="errores">El campo es requerido</p>}
            </div>
          </div>
          <div className="flex">
            <div className="me-2" style={{ width: "250px", margin: "20px" }}>
              <label>Tipo Documento</label>
              <TipoDocumento name="tipoDocumento" value={consolaSeleccionada.tipoDocumento} handleChangeData={handleChange} />
            </div>
            <div className="me-2">
              <label>Número Documento</label>
              <input className="form-control" name="numDocumento" value={consolaSeleccionada && consolaSeleccionada.numDocumento} {...register('numDocumento', { required: true, pattern: EXPRESION_REGULAR_IDENTIFICACION })} />
              {errors.numDocumento?.type === 'required' && <p id="errores">El campo es requerido</p>}
              {errors.numDocumento?.type === 'pattern' && <p id="errores">El campo no es valido</p>}
            </div>
            <div className="me-2" style={{ width: "200px", margin: "20px" }}>
              <label>Nacionalidad</label>
              <Nacionalidades name="nacionalidad" value={consolaSeleccionada.nacionalidad} handleChangeData={handleChange} />
            </div>
            <div className="me-2">
              <label>¿De dónde proviene?</label>
              <Region name="lugarOrigen" value={consolaSeleccionada.lugarOrigen} codNacion={codNacionalidad} handleChangeData={handleChange} />
            </div>
            <div className="me-2">
              <label for="nomContactoEmergencia">Nombre Emergencia</label>
              <input required className="form-control" name="nomContactoEmergencia" value={consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia}  {...register('nomContactoEmergencia', { required: true, pattern: EXPRESION_REGULAR_NOMBRE_APELLIDO })} />
              {errors.nomContactoEmergencia?.type === 'required' && <p id="errores">El Campo es Requerido</p>}
              {errors.nomContactoEmergencia?.type === 'pattern' && <p id="errores">El Campo No es valido</p>}
            </div>
          </div>
          <div className="flex">
            <div className="me-2">
              <label>#Contacto Emergencia</label>
              <input className="form-control" name="numContactoEmergencia" value={consolaSeleccionada && consolaSeleccionada.numContactoEmergencia} {...register('numContactoEmergencia', { required: true, pattern: EXPRESION_REGULAR_CELULAR })} />
              {errors.numContactoEmergencia?.type === 'required' && <p id="errores">El campo es requerido</p>}
              {errors.numContactoEmergencia?.type === 'patter' && <p id="errores">Número NO valido</p>}
            </div>
            <div className="me-2" style={{ width: "200px", margin: "20px" }}>
              <label>Estado Huesped</label>
              <select required className="form-select" aria-label="Default select example" name="estadoHuesped" defaultValue={consolaSeleccionada.estadoHuesped === true ? "TRUE" : "FALSE"}>
                <option value="TRUE">TRUE</option>
                <option value="FALSE">FALSE</option>
              </select>
            </div>
          </div>
          <div align="right">
            <button className="btn btn-primary" type="submit"> Actualizar </button>
            <button className="btn btn-secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
          </div>
        </form>
      </ModalContainer>
    </div>
  );
  const bodyEliminar = (
    <div>
      <ModalContainerII>
        <p>
          Esta seguro de Eliminar Empleado <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ? <br />
          <b>{consolaSeleccionada && consolaSeleccionada.numDocumento}</b>
        </p>
        <div align="right">
          <Button color="secondary" onClick={() => peticionDelete()}> Si </Button>
          <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
        </div>
      </ModalContainerII>
    </div>
  );
  const popUp = (
    <div>
      <UsoEstilosContainer>
        <div className="flex" style={{ marginLeft: "50px", alignContent: "center", alignItems: "center" }}>
          <FaCheck className="me-3" color="green" /><p>{mensaje}</p>
        </div>
      </UsoEstilosContainer>
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
              return "Habilitado";
            } else {
              return "Inhabilitado";
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
  const options = {
    filterType: "dropdown",
    responsive: "standard",
    /*  customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} />*/
  };
  return (
    <div className="Huespedes">
      <div className="card shadow mb-4">
        <h6 className="m-0 font-weight-bold text-primary"> Base de Datos Huespedes </h6>
        <div> <button onClick={() => abrirCerrarModalInsertar()} className="btn btn-primary"> Agregar Huesped</button> </div>
        <div> <MUIDataTable title={"Lista Huespedes"} data={data} columns={columns} options={options} /></div>
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
      <Modal open={modalMensaje} onClose={abrirCerrarModalMensaje}>
        {popUp}
      </Modal>
    </div>
  );
}
export default Huespedes;