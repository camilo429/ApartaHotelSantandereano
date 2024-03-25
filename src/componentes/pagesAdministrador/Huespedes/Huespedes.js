import React, { useEffect, useState } from "react";
import "./Huesped.css";
//Librerias
import axios from "axios";
import MUIDataTable from "mui-datatables";
//Estilos
//import { Form } from "reactstrap";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
//import "./../../estilos/style.css";
//iconos
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
import Spinner from 'react-bootstrap/Spinner';
import { Modal, Button } from 'react-bootstrap';


const url = Apiurl + "huespedes/listarHuespedes";
const urlG = Apiurl + "huespedes/crearHuesped";
const urlE = Apiurl + "huespedes/actualizarHuesped/";
const urlD = Apiurl + "huespedes/eliminarhuesped/";

function Huespedes() {
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [smShow, setSmShow] = useState(false);
  const handleMensajeClose = () => setSmShow(false);
  const handleShowMensaje = () => setSmShow(true);

  const [showEditar, setShowEditar] = useState(false);
  const handleEditarClose = () => setShowEditar(false);
  const handleEditarShow = () => setShowEditar(true);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

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
        console.log(response.data);
      } else {
        console.log("error en el metodo get", response.status);
      }
    } catch (error) {
      console.log("Error al traer los huespedes", error);
    }
  };

  const onSubmit = async (info) => {
    try {
      console.log("peticion post consola", consolaSeleccionada);
      console.log("peticion post info", info);
      setIsLoading(true);
      const response = await axios.post(urlG, info, {
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
        handleShowMensaje();
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
      setMensaje("Error al insertar Huesped", error);
      abrirCerrarModalMensaje();
      // alert("Hubo un error al crear la huesped. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };
  //
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
        handleEditarClose();
        // alert("El huesped ha sido actualizado");
        setMensaje("Huesped Actualizado");
        handleShowMensaje
          ();
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

  //  const abrirCerrarModalEliminar = () => {
  //    setModalEliminar(!modalEliminar);
  //  };

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
      //abrirCerrarModalEditar();
      handleEditarShow();
    }
    if (caso === "Eliminar") {
      //abrirCerrarModalEliminar();
    }
  };

  //  const bodyEliminar = (
  //    <div>
  //      <ModalContainerII>
  //        <p>
  //          Esta seguro de Eliminar Empleado <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ? <br />
  //          <b>{consolaSeleccionada && consolaSeleccionada.numDocumento}</b>
  //        </p>
  //        <div align="right">
  //          <Button color="secondary" onClick={() => peticionDelete()}> Si </Button>
  //          <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
  //        </div>
  //      </ModalContainerII>
  //    </div>
  //  );
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
      <Modal show={show} onHide={handleClose} animation={false} dialogClassName="customModal">
        <Modal.Header closeButton>
          <Modal.Title>Insertar Huesped</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="flex">
              <div className="formHuesped">
                <label>Nombre</label>
                <input className="form-control" name="nombre" placeholder="Nombre (s)"  {...register('nombre', { required: true, maxLength: 30, pattern: EXPRESION_REGULAR_NOMBRE_APELLIDO })} />
                {errors.nombre?.type === 'required' && <p id="errores">El campo es requerido</p>}
                {errors.nombre?.type === 'maxLength' && <p id="errores">Es muy largo</p>}
                {errors.nombre?.type === 'pattern' && <p id="errores">Nombre no valido</p>}
              </div>
              <div className="formHuesped">
                <label>Apellido</label>
                <input className="form-control" name="apellido" placeholder="Apellido" {...register('apellido', { required: true, maxLength: 30, pattern: EXPRESION_REGULAR_NOMBRE_APELLIDO, })} />
                {errors.apellido?.type === 'required' && <p id="errores">El campo es requerido</p>}
                {errors.apellido?.type === 'maxLength' && <p id="errores">Muy largo</p>}
                {errors.apellido?.type === 'pattern' && <p id="errores">Nombre no valido</p>}
              </div>
              <div className="formHuesped">
                <label>Número Celular</label>
                <input className="form-control" name="numCelular" placeholder="Celular" {...register('numCelular', { required: true, pattern: EXPRESION_REGULAR_CELULAR, })} />
                {errors.numCelular?.type === 'required' && <p id="errores">El campo es requerido</p>}
                {errors.numCelular?.type === 'pattern' && <p id="errores">Número NO valido</p>}
              </div>
              <div className="formHuesped">
                <label>Fecha de Nacimiento</label>
                <input type="date" className="form-control" name="fechaNacimiento" placeholder="Nacimiento" {...register('fechaNacimiento', { required: true, maxLength: 10 })} />
                {errors.fechaNacimiento?.type === 'required' && <p id="errores">El campo es requerido</p>}
                {errors.fechaNacimiento?.type === 'maxLength' && <p id="errores">Fecha no valida</p>}
              </div>
              <div className="formHuesped">
                <label>Correo Electronico</label>
                <input className="form-control" name="correo" placeholder="correo electronico" {...register('correo', { required: true, pattern: EXPRESION_REGULAR_EMAIL, })} />
                {errors.correo?.type === 'required' && <p id="errores">El campo es requerido</p>}
                {errors.correo?.type === "pattern" && <p id="errores">Dirección no valida</p>}
              </div>
            </div>
            <div className="flex" style={{ marginLeft: "10px" }}>
              <div style={{ width: "175px", margin: "5px" }}>
                <label style={{ margin: "6px" }}>Tipo Documento</label>
                <TipoDocumento name="tipoDocumento" value={consolaSeleccionada.tipoDocumento} handleChangeData={handleChange} />
              </div>
              <div className="formHuesped" >
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
                <Region name="lugarOrigen" codNacion={codNacionalidad || 1} value={consolaSeleccionada.lugarOrigen} handleChangeData={handleChange} />
              </div>
              <div className="formHuesped">
                <label>Nombre Emergencia</label>
                <input className="form-control" name="nomContactoEmergencia" placeholder="Nombre Contacto" {...register('nomContactoEmergencia', { required: true, pattern: EXPRESION_REGULAR_NOMBRE_APELLIDO })} />
                {errors.nomContactoEmergencia?.type === 'required' && <p id="errores">El Campo es Requerido</p>}
                {errors.nomContactoEmergencia?.type === 'pattern' && <p id="errores">El Campo No es valido</p>}
              </div>
            </div>
            <div className="flex">
              <div className="formHuesped">
                <label>#Contacto Emergencia</label>
                <input className="form-control" type="number" name="numContactoEmergencia" onChange={handleChange} placeholder="# Contacto" {...register('numContactoEmergencia', { required: true, pattern: EXPRESION_REGULAR_CELULAR })} />
                {errors.numContactoEmergencia?.type === 'required' && <p id="errores">El campo es requerido</p>}
                {errors.numContactoEmergencia?.type === 'patter' && <p id="errores">Número NO valido</p>}
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
            </div>
            <div id="huespedesbotonesinsertar" className="flex">
              <button className="btn btn-primary" id="insertar" type="submit"> Insertar </button>
              <button className="btn btn-secondary" type="submit" onClick={handleClose}>Cancelar</button>
            </div>
          </form></Modal.Body>
      </Modal>
      <Modal show={showEditar} onHide={handleEditarClose} animation={false} dialogClassName="customModal">
        <Modal.Header closeButton>
          <Modal.Title>Editar Huesped</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(peticionPut)}>
            <div className="flex">
              <div className="me-2">
                <label>Nombre(s)</label>
                <input className="form-control" name="nombre" defaultValue={consolaSeleccionada.nombre} {...register('nombre', { required: true, maxLength: 30 })} />
              </div>
              <div className="me-2">
                <label>Apellido(s)</label>
                <input className="form-control" name="apellido" onChange={handleChange} value={consolaSeleccionada.apellido} {...register('apellido', { required: true, maxLength: 30, pattern: EXPRESION_REGULAR_NOMBRE_APELLIDO })} />
                {errors.apellido?.type === 'required' && <p id="errores">El campo es requerido</p>}
                {errors.apellido?.type === 'maxLength' && <p id="errores">Muy largo</p>}
                {errors.apellido?.type === 'pattern' && <p id="errores">Nombre no valido</p>}
              </div>
              <div className="me-2">
                <label>Número Celular</label>
                <input className="form-control" name="numCelular" onChange={handleChange} value={consolaSeleccionada.numCelular}  {...register('numCelular', { required: true, pattern: EXPRESION_REGULAR_CELULAR, })} />
                {errors.numCelular?.type === 'required' && <p id="errores">El campo es requerido</p>}
                {errors.numCelular?.type === 'pattern' && <p id="errores">Número NO valido</p>}
              </div>
              <div className="me-2">
                <label>Fecha Nacimiento</label>
                <input className="form-control" name="fechaNacimiento" type="date" onChange={handleChange} value={consolaSeleccionada.fechaNacimiento} {...register('fechaNacimiento', { required: true, maxLength: 10 })} />
                {errors.fechaNacimiento?.error === 'required' && <p id="errores">El campo es requerido</p>}
                {errors.fechaNacimiento?.type === 'maxLength' && <p id="errores">Fecha no valida</p>}
              </div>
              <div className="me-2">
                <label>Correo Electronico</label>
                <input className="form-control" name="correo" onChange={handleChange} value={consolaSeleccionada.correo} {...register('correo', { required: true, pattern: EXPRESION_REGULAR_EMAIL })} />
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
                <input className="form-control" name="numDocumento" onChange={handleChange} value={consolaSeleccionada.numDocumento} {...register('numDocumento', { required: true, pattern: EXPRESION_REGULAR_IDENTIFICACION })} />
                {errors.numDocumento?.type === 'required' && <p id="errores">El campo es requerido</p>}
                {errors.numDocumento?.type === 'pattern' && <p id="errores">El campo no es valido</p>}
              </div>
              <div className="me-2" style={{ width: "200px", margin: "20px" }}>
                <label>Nacionalidad</label>
                <Nacionalidades name="nacionalidad" value={consolaSeleccionada.nacionalidad} handleChangeData={handleChange} />
              </div>
              <div className="me-2">
                <label>¿De dónde proviene?</label>
                <Region name="lugarOrigen" value={consolaSeleccionada.lugarOrigen} codNacion={codNacionalidad || 1} handleChangeData={handleChange} />
              </div>
              <div className="me-2">
                <label>Nombre Emergencia</label>
                <input className="form-control" name="nomContactoEmergencia" onChange={handleChange} value={consolaSeleccionada.nomContactoEmergencia}  {...register('nomContactoEmergencia', { required: true, pattern: EXPRESION_REGULAR_NOMBRE_APELLIDO })} />
                {errors.nomContactoEmergencia?.type === 'required' && <p id="errores">El Campo es Requerido</p>}
                {errors.nomContactoEmergencia?.type === 'pattern' && <p id="errores">El Campo No es valido</p>}
              </div>
            </div>
            <div className="flex">
              <div className="me-2">
                <label>#Contacto Emergencia</label>
                <input className="form-control" name="numContactoEmergencia" onChange={handleChange} value={consolaSeleccionada.numContactoEmergencia} {...register('numContactoEmergencia', { required: true, pattern: EXPRESION_REGULAR_CELULAR })} />
                {errors.numContactoEmergencia?.type === 'required' && <p id="errores">El campo es requerido</p>}
                {errors.numContactoEmergencia?.type === 'patter' && <p id="errores">Número NO valido</p>}
              </div>
              <div className="me-2" style={{ width: "200px", margin: "20px" }}>
                <label>Estado Huesped</label>
                <select required className="form-select" aria-label="Default select example" name="estadoHuesped" value={consolaSeleccionada.estadoHuesped === true ? "TRUE" : "FALSE"} onChange={handleChange}>
                  <option value="TRUE">TRUE</option>
                  <option value="FALSE">FALSE</option>
                </select>
              </div>
            </div>
            <div align="right">
              <button className="btn btn-primary" type="submit"> Actualizar </button>
              <button className="btn btn-secondary" onClick={() => handleEditarClose}>Cancelar</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/*<Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}> {bodyEliminar} </Modal>*/}
      <Modal show={smShow} onHide={handleMensajeClose} animation={false}> {popUp}</Modal>
    </div>
  );
}
export default Huespedes;