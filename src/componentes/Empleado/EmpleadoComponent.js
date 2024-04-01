import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
// Iconos
import * as AiFillEdit from "react-icons/ai";
import * as MdDelete from "react-icons/md";
// import * as BsInfoLg from "react-icons/bs";
//Componentes
import DocumentoEmpleado from "./DocumentoEmpleado";
import TipoSangre from "./TipoSangre";
import GeneroEmpleado from "./GeneroEmpleado";
import TipoDocumento from "../pagesAdministrador/TipoDocumento";
//url
import { Apiurl } from "../../services/userService";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { EXPRESION_REGULAR_NOMBRE_APELLIDO, EXPRESION_REGULAR_EMAIL, EXPRESION_REGULAR_CELULAR, EXPRESION_REGULAR_IDENTIFICACION } from "../../services/ExpresionsRegular"
import { useForm } from 'react-hook-form';
//css
import "./Empleado.css"
const url = Apiurl + "empleados/listarEmpleados";
const urlG = Apiurl + "empleados/crearEmpleado";
const urlE = Apiurl + "empleados/actualizarEmpleado/";
const urlD = Apiurl + "empleados/eliminarEmpleado/";

function EmpleadoComponent() {

  const [data, setData] = useState([]);

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

  const [mensaje, setMensaje] = useState("");

  const { handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const { register } = useForm({
    shouldUnregister: false
  });


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

  const handleChange = (e) => {
    setValue(e.target.name, e.target.value);
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
        console.log("error en listar empleados", response.status)
      }
    } catch (error) {
      console.log("Error al traer los Empleados", error);
    }
  };

  const onSubmit = async (info) => {
    try {
      console.log("post:", info);
      const response = await axios.post(urlG, info, {
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
        handleShowMensaje();
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
        reset();
      } else {
        console.log("Error al registrar empleado", response.status);
      }
    } catch (error) {
      console.log("Error post Empleado", error);
    } finally {
      //setIsLoading(false);
    }
  };

  const peticionPut = async () => {
    try {
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
        reset();
        setConsolaSeleccionada({});
      } else {
        console.log("Error la solicitud put empleado", response.status);
      }
    } catch (error) {
      alert("Error al editar empleado");
      console.log("Error editar empleado", error.response.data);
      reset();
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
      fotoEmpleado: consola[16],
      fechaIngreso: consola[17],
      fechaSalida: consola[18]
    });
    console.log("seleccionada", consolaSeleccionada);
    if (caso === "EDITAR") {
      handleEditarShow();
    }
    if (caso === "ELIMINAR") {
      handleEliminarShow();
    }
  };

  const bodyEditar = (
    <form onSubmit={handleSubmit(peticionPut)}>
      <div className="flex">
        <div className="me-2">
          <label>Nombre</label>
          <input className="form-control" name="nombre" onChange={handleChange} value={consolaSeleccionada?.nombre} placeholder={!consolaSeleccionada?.nombre ? "Nombre" : "Nombre"} />
        </div>
        <div className="me-2">
          <label>Apellido</label>
          <input className="form-control" name="apellido" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellido} placeholder="Apellido" />
        </div>
        <div className="me-2" style={{ width: "250px", margin: "20px" }}>
          <label>Tipo Documento</label>
          <TipoDocumento name="tipDocumento" handleChangeData={handleChange} value={consolaSeleccionada.tipDocumento} />
        </div>
        <div className="me-2">
          <label>Número Documento Indentidad</label>
          <input name="numDocumento" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numDocumento} placeholder="Numero Identidad" className="form-control" />
        </div>
        <div className="me-2">
          <label>Edad</label>
          <input name="edad" disabled onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.edad} placeholder="Numero Identidad" className="form-control" />
        </div>
      </div>
      <div className="flex">
        <div className="me-2">
          <label >Número de Celular</label>
          <input name="numTelefono" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numTelefono} placeholder="Número Celular" className="form-control" />
        </div>
        <div className="me-2">
          <label>Correo Electronico</label>
          <input name="correo" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo} placeholder="Correo Electronico" className="form-control" />
        </div>
        <div className="me-2">
          <label>Fecha de Nacimiento</label>
          <input name="fechaNacimiento" type="date" required pattern="\d{4}-\d{2}-\d{2}" className="form-control" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.fechaNacimiento} />
        </div>
        <div className="me-2">
          <label>Dirección</label>
          <input name="direccion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.direccion} placeholder="Dirección" className="form-control" />
        </div>
        <div className="me-2">
          <label>Nombre Contacto Emergencia</label>
          <input name="nomContactoEmergencia" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia} placeholder="Nombre Familiar" className="form-control" />
        </div>
      </div>
      <div className="flex">
        <div className="me-2">
          <label>#Número Emergencia</label>
          <input name="numContactoEmergencia" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numContactoEmergencia} placeholder="# Contacto Emergencia" className="form-control" />
        </div>
        <div className="me-2">
          <label>EPS</label>
          <input name="eps" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.eps} placeholder="EPS" className="form-control" />
        </div>
        <div className="me-2">
          <label>ARL</label>
          <input name="arl" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.arl} placeholder="ARL" className="form-control" />
        </div>
        <div className="me-2">
          <label>Foto</label>
          <input name="fotoEmpleado" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.fotoEmpleado} placeholder="foto" className="form-control" />
        </div>
        <div className="me-2" style={{ width: "300px", margin: "20px" }}>
          <label>Genero</label>
          <GeneroEmpleado name="sexo" handleChangeData={handleChange} value={consolaSeleccionada.sexo} />
        </div>
      </div>
      <div className="flex">
        <div className="me-2" style={{ width: "300px", margin: "20px" }}>
          <label >Tipo de Sangre</label>
          <TipoSangre name="tipoSangre" handleChangeData={handleChange} value={consolaSeleccionada.tipoSangre} />
        </div>
        <div className="me-2">
          <label>Fecha de Ingreso</label>
          <input name="fechaIngreso" type="date" required pattern="\d{4}-\d{2}-\d{2}" className="form-control" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.fechaIngreso} />
        </div>
        <div className="me-2">
          <label>Fecha de Salida</label>
          <input name="fechaSalida" type="date" required pattern="\d{4}-\d{2}-\d{2}" className="form-control" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.fechaSalida} />
        </div>
      </div>
      <div align="right">
        <button className="btn btn-primary" type="submit" onClick={() => peticionPut()}> Actualizar </button>
        <button className="btn btn-secondary" type="submit" onClick={handleEditarClose}>Cancelar</button>
      </div>
    </form>
  );

  const bodyEliminar = (
    <div>
      <p>Esta seguro de Eliminar Empleado{" "}<b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ?</p>
      <div align="right">
        <button className="btn btn-primary" type="submit" onClick={() => peticionDelete()}> Si </button>
        <button className="btn btn-secondary" type="submit" onClick={handleEditarClose}>No</button>
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
      name: "fotoEmpleado",
      label: "No foto",
    }, {
      name: "fechaIngreso",
      label: "Fecha Ingreo",
    }, {
      name: "fechaSalida",
      label: "Fecha Salida",
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
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div className="inputInsertar">
                <label >Nombre</label>
                <input className="form-control" name="nombre" placeholder="Nombre" required onChange={handleChange} />
                {errors.nombre?.type === "pattern" && <p id="errores">Nombre no Valido</p>}
              </div>
              <div className="inputInsertar">
                <label>Apellido</label>
                <input name="apellido" placeholder="Apellido" className="form-control" required onChange={handleChange} />
                {errors.apellido?.type === "pattern" && <p id="errores">Apellido no Valido</p>}
              </div>
              <div className="inputInsertar">
                <label>Tipo Documento</label>
                <TipoDocumento name="tipDocumento" value={consolaSeleccionada.tipDocumento} handleChangeData={handleChange} />
              </div>
              <div className="inputInsertar">
                <label>Número Documento</label>
                <input name="numDocumento" placeholder="Número Documento" className="form-control" required onChange={handleChange} />
                {errors.numDocumento?.type === 'pattern' && <p id="errores">El campo no es valido</p>}
              </div>
              <div className="inputInsertar">
                <label>Número Celular</label>
                <input name="numTelefono" placeholder="# Celular" className="form-control" required onChange={handleChange} />
                {errors.numContactoEmergencia?.type === 'patter' && <p id="errores">Número NO valido</p>}
              </div>
            </div>
            <div className="flex">
              <div className="inputInsertar">
                <label>Correo Electronico</label>
                <input name="correo" placeholder="Correo Electronico" className="form-control" required onChange={handleChange} />
                {errors.correo?.type === "pattern" && <p id="errores">Dirección no valida</p>}
              </div>
              <div className="inputInsertar">
                <label>Fecha de Nacimiento</label>
                <input name="fechaNacimiento" type="date" required pattern="\d{4}-\d{2}-\d{2}" className="form-control" onChange={handleChange} />
                {errors.fechaNacimiento?.type === 'maxLength' && <p id="errores">Fecha no valida</p>}
              </div>
              <div className="inputInsertar">
                <label>Dirección</label>
                <input name="direccion" placeholder="Dirección" className="form-control" onChange={handleChange} />
              </div>
              <div className="inputInsertar w-80">
                <label>Nombre Emergencia</label>
                <input name="nomContactoEmergencia" placeholder="Nombre Contacto Emergencia" className="form-control" required onChange={handleChange} />
                {errors.nomContactoEmergencia?.type === 'pattern' && <p id="errores">El Campo No es valido</p>}
              </div>
              <div className="inputInsertar">
                <label>Número Emergencia</label>
                <input name="numContactoEmergencia" placeholder="#Contacto Emergencia" className="form-control" required onChange={handleChange} />
                {errors.numContactoEmergencia?.type === 'patter' && <p id="errores">Número NO valido</p>}
              </div>
            </div>
            <div className="flex">
              <div className="inputInsertar">
                <label>EPS</label>
                <input name="eps" placeholder="EPS" className="form-control" required onChange={handleChange} />
              </div>
              <div className="inputInsertar">
                <label>ARL</label>
                <input name="arl" placeholder="ARL" className="form-control" required onChange={handleChange} />
              </div>
              <div className="inputInsertar" >
                <label>Genero</label>
                <GeneroEmpleado name="sexo" value={consolaSeleccionada.GeneroEmpleado} handleChangeData={handleChange} />
              </div>
              <div className="inputInsertar">
                <label>Tipo Grupo Sanguineo</label>
                <TipoSangre name="tipoSangre" value={consolaSeleccionada.tipoSangre} handleChangeData={handleChange} />
              </div>
              <div className="inputInsertar">
                <label>fechaIngreso</label>
                <input name="fechaIngreso" placeholder="fechaIngreso" className="form-control" type="date" required onChange={handleChange} />
              </div>
            </div>
            <div align="right">
              <button type="submit" className="btn btn-primary"> Insertar </button>
              <button className="btn btn-secondary" type="submit" onClick={handleCloseInsertar}>Cancelar</button>
            </div>
          </form>
        </Modal.Body>
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
    </div>
  );
}
export default EmpleadoComponent;