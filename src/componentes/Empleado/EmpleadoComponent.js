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
// import * as BsInfoLg from "react-icons/bs";
//Reactrap
import { Form, FormGroup, Label, Input } from "reactstrap";
import { styled } from "@mui/system";
import { Modal, Button } from "@mui/material";
//Componentes
import DocumentoEmpleado from "./DocumentoEmpleado";
import TipoSangre from "./TipoSangre";
import GeneroEmpleado from "./GeneroEmpleado";
import TipoDocumento from "../pagesAdministrador/TipoDocumento";
//url
import { Apiurl } from "../../services/userService";
import MUIDataTable from "mui-datatables";

const url = Apiurl + "empleados/listarEmpleados";
const urlG = Apiurl + "empleados/crearEmpleado";
const urlE = Apiurl + "empleados/actualizarEmpleado/";
const urlD = Apiurl + "empleados/eliminarEmpleado/";
// expresiones regulares
const nameRegex = /^[a-zA-Z\s]+$/;
const numeroCelularExpresion =
  /^(3(?:0[0-5]|1[0-9]|2[0-7]|3[0-5]|4[0-8]|5[0-7]|6[0-5]|7[0-5]|9[0-8]))\d{7}$/;
const correoExpresion = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
const cedulaExpresion = /^[0-9]{6,10}$/;
const useStyles = styled("div")(({ theme }) => ({
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
    fontSize: "0.9rem",
    borderRadius: "5px",
    overflow: "scroll",
  },
}));
let estilos = {
  fontWeight: "bold",
  color: "#dc3545",
};
function EmpleadoComponent() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [errors, setErrors] = useState([]);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
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
  });

  const validacionesFormulario = (consolaSeleccionada) => {
    let errors = {};
    if (!nameRegex.test(consolaSeleccionada.nombre)) {
      errors.nombre = "Nombre NO válido";
    }
    if (
      consolaSeleccionada.nombre.length < 4 ||
      consolaSeleccionada.nombre.length > 30
    ) {
      errors.nombre = "El nombre es corto o muy largo";
    }
    if (!nameRegex.test(consolaSeleccionada.apellido)) {
      errors.apelldio = "Apellido NO válido";
    }
    if (
      consolaSeleccionada.apellido.length < 4 ||
      consolaSeleccionada.apellido.length > 30
    ) {
      errors.apellido = "Apellido es corto o muy largo";
    }
    if (!numeroCelularExpresion.test(consolaSeleccionada.numTelefono)) {
      errors.numTelefono = "Número No válido";
    }
    if (!correoExpresion.test(consolaSeleccionada.correo)) {
      errors.correo = "Correo No válido";
    }
    if (!cedulaExpresion.test(consolaSeleccionada.numDocumento)) {
      errors.numDocumento = "Número de documento no valido";
    }
    if (!nameRegex.test(consolaSeleccionada.lugarOrigen)) {
      errors.lugarOrigen = "Lugar Origen No valido";
    }
    if (!nameRegex.test(consolaSeleccionada.nomContactoEmergencia)) {
      errors.nomContactoEmergencia = "Lugar Origen No valido";
    }
    if (
      !numeroCelularExpresion.test(consolaSeleccionada.numContactoEmergencia)
    ) {
      errors.numContactoEmergencia = "Número No válido";
    }
    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionGet = async () => {
    await axios.get(url).then((response) => { setData(response.data); }).catch((error) => {
      if (error === 404) {
        alert("No hay empleados registrados");
        console.log("empleados", error);
      }
      console.log("empleado", error);
    });
  };

  const peticionPost = async (e) => {
    // console.log("Crear Empleado", consolaSeleccionada);
    setErrors(validacionesFormulario(consolaSeleccionada));
    if (Object.keys(errors).length === 0) {
      const response = await axios.post(urlG, consolaSeleccionada, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      if (response.status === 201) {
        setData(data.concat(response.data));
        peticionGet();
        abrirCerrarModalInsertar();
        alert("El Empleado ha sido creado");
      } else {
        alert("El empleado No se ha creado correctamente");
      }
    } else {
      console.log("tiene errores en crear empleado", errors);
    }
  };

  const peticionPut = async () => {
    try {
      const response = await axios.put(urlE + consolaSeleccionada.codEmpleado, consolaSeleccionada, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      });
      if (response.status === 201) {
        const dataNueva = data.map((consola) => {
          if (consolaSeleccionada.codEmpleado === consola.codEmpleado) {
            consola.nombre = consolaSeleccionada.nombre;
            consola.apellido = consolaSeleccionada.apellido;
            consola.tipDocumento = consolaSeleccionada.tipDocumento.codTipoDocumento;
            consola.tipDocumento = {
              nomTipoDocumento: consolaSeleccionada.tipDocumento.nomTipoDocumento,
              codTipoDocumento: consolaSeleccionada.tipDocumento.nomTipoDocumento,
            };
            consola.edad = consolaSeleccionada.edad;
            consola.numTelefono = consolaSeleccionada.numTelefono;
            consola.correo = consolaSeleccionada.correo;
            consola.fechaNacimiento = consolaSeleccionada.fechaNacimiento;
            consola.direccion = consolaSeleccionada.direccion;
            consola.nomContactoEmergencia = consolaSeleccionada.nomContactoEmergencia;
            consola.numContactoEmergencia = consolaSeleccionada.numContactoEmergencia;
            consola.eps = consolaSeleccionada.eps;
            consola.arl = consolaSeleccionada.arl;
            consola.sexo.codSexo = consolaSeleccionada.sexo.codSexo;
            consola.sexo.nomSexo = consolaSeleccionada.sexo.nomSexo;
            consola.tipoSangre.codTipoSangre = consolaSeleccionada.tipoSangre.codTipoSangre;
            consola.tipoSangre.nomTipoSangre = consolaSeleccionada.tipoSangre.nomTipoSangre;
            consola.fotoEmpleado = consolaSeleccionada.fotoEmpleado;
          }
          return consola;
        })
        setData(dataNueva);
        peticionGet();
        abrirCerrarModalEditar();
        alert("El empleado ha sido actualizado");
        setConsolaSeleccionada({});
      }
      setErrors({});

    } catch (error) {
      alert("Error al editar empleado");
      console.log("Error editar empleado", error.response.data);
    }
  }

  const peticionDelete = async () => {
    try {
      const response = await axios.delete(urlD + consolaSeleccionada.codEmpleado, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      })

      if (response.status === 200) {
        setData(data.filter((consola) => consola.codEmpleado !== consolaSeleccionada.codEmpleado));
        abrirCerrarModalEliminar();
      }
    } catch (error) {
      alert("Error al eliminar empleado");
      console.log("Error editar empleado", error);
    }

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
    // console.log(consola);
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
    });
    console.log("seleccionada", consolaSeleccionada);
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
            <input name="nombre" placeholder="Nombre" className="form-control" onChange={handleChange} />
            {errors.nombre && (<div style={estilos}> <p>{errors.nombre}</p></div>)}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Apellido</Label>
            <input name="apellido" placeholder="Apellido" className="form-control" onChange={handleChange} />
            {errors.apellido && (<div style={estilos}> <p>{errors.apellido}</p></div>)}
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "300px", margin: "20px" }}>
            <Label for="exampleEmail">Tipo Documento</Label>
            <TipoDocumento name="tipDocumento" handleChangeData={handleChange} />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Documento</Label>
            <input name="numDocumento" placeholder="Número Documento" className="form-control" onChange={handleChange} />
            {errors.numDocumento && (<div style={estilos}> <p>{errors.numDocumento}</p> </div>)}
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Celular</Label>
            <input name="numTelefono" placeholder="# Celular" className="form-control" onChange={handleChange} />
            {errors.numTelefono && (<div style={estilos}> <p>{errors.numTelefono}</p> </div>)}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Correo Electronico</Label>
            <input name="correo" placeholder="Correo Electronico" className="form-control" onChange={handleChange} />
            {errors.correo && (<div style={estilos}> <p>{errors.correo}</p></div>)}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Nacimiento</Label>
            <Input name="fechaNacimiento" type="date" required pattern="\d{4}-\d{2}-\d{2}" className="form-control" onChange={handleChange} />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Dirección</Label>
            <input name="direccion" placeholder="Dirección" className="form-control" onChange={handleChange} />
          </FormGroup>
          <FormGroup className="me-2 w-80">
            <Label for="exampleEmail">Nombre Emergencia</Label>
            <input name="nomContactoEmergencia" placeholder="Nombre Contacto Emergencia" className="form-control" onChange={handleChange} />
            {errors.nomContactoEmergencia && (<div style={estilos}> <p>{errors.nomContactoEmergencia}</p></div>)}
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Emergencia</Label>
            <input name="numContactoEmergencia" placeholder="#Contacto Emergencia" className="form-control" onChange={handleChange} />
            {errors.numContactoEmergencia && (<div style={estilos}> <p>{errors.numContactoEmergencia}</p></div>)}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">EPS</Label>
            <input name="eps" placeholder="EPS" className="form-control" onChange={handleChange} />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">ARL</Label>
            <input name="arl" placeholder="ARL" className="form-control" onChange={handleChange} />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2" style={{ width: "300px", margin: "20px" }}>
            <Label for="exampleEmail">Genero</Label>
            <GeneroEmpleado name="sexo" handleChangeData={handleChange} />
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "300px", margin: "20px" }}>
            <Label for="exampleEmail">Tipo Grupo Sanguineo</Label>
            <TipoSangre name="tipoSangre" handleChangeData={handleChange} />
          </FormGroup>
        </div>
      </Form>
      <br />
      <div align="right">
        <Button color="primary" onClick={(e) => peticionPost(e)}> Insertar </Button>
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
            <Input name="nombre" onChange={handleChange} value={consolaSeleccionada?.nombre} placeholder={!consolaSeleccionada?.nombre ? "Diligencia su nombre" : "Nombre"} disabled />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Apellido</Label>
            <Input name="apellido" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellido} placeholder="Apellido" disabled />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Documento Indentidad</Label>
            <Input name="numDocumento" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numDocumento} disabled placeholder="Numero Identidad" />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Celular</Label>
            <Input name="numTelefono" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numTelefono} placeholder="Número Celular" disabled />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Correo Electronico</Label>
            <Input name="correo" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo} placeholder="Correo Electronico" disabled />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Nacimiento</Label>
            <Input name="fechaNacimiento" onChange={handleChange} value={consolaSeleccionada?.fechaNacimiento} type="date" disabled />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Dirección</Label>
            <Input name="direccion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.direccion} placeholder="Dirección" disabled />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Contacto Emergencia</Label>
            <Input name="nomContactoEmergencia" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia} placeholder="Nombre Familiar" disabled />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label className="w-100" for="exampleEmail"> #Contacto Emergencia </Label>
            <Input name="numContactoEmergencia" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numContactoEmergencia} placeholder="# Contacto Emergencia" className="w-100" disabled />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">EPS</Label>
            <Input name="eps" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.eps} placeholder="EPS" disabled />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">ARL</Label>
            <Input name="arl" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.arl} placeholder="ARL" disabled />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2 w-100">
            <Label for="exampleEmail">Genero</Label>
            <GeneroEmpleado name="idSexoBio" handleChangeData={handleChange} value={consolaSeleccionada.idSexoBio} disabled />
          </FormGroup>
          <FormGroup className="me-2 w-100">
            <Label for="exampleEmail">Tipo de Documento de Indentidad</Label>
            <DocumentoEmpleado name="idTipoDocumento" handleChangeData={handleChange} value={consolaSeleccionada.idTipoDocumento} disabled />
          </FormGroup>
          <FormGroup className="me-2 w-100">
            <Label for="exampleEmail">Tipo de Sangre</Label>
            <TipoSangre name="idTipoSangre" handleChangeData={handleChange} value={consolaSeleccionada.idTipoSangre} disabled />
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
      <h3>Editar Empleado</h3>
      <Form>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre</Label>
            <input className="form-control" name="nombre" onChange={handleChange} value={consolaSeleccionada?.nombre} placeholder={!consolaSeleccionada?.nombre ? "Nombre" : "Nombre"} />
            {errors.nombre && (<div style={estilos}> <p>{errors.nombre}</p> </div>)}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Apellido</Label>
            <input name="apellido" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellido} placeholder="Apellido" className="form-control" />
            {errors.apellido && (<div style={estilos}>  <p>{errors.apellido}</p></div>)}
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "250px", margin: "20px" }}>
            <Label for="exampleEmail">Tipo Documento</Label>
            <TipoDocumento name="tipDocumento" handleChangeData={handleChange} value={consolaSeleccionada.tipDocumento} />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número Documento Indentidad</Label>
            <input name="numDocumento" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numDocumento} placeholder="Numero Identidad" className="form-control" />
            {errors.numDocumento && (<div style={estilos}> <p>{errors.numDocumento}</p> </div>)}
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Edad</Label>
            <input name="edad" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.edad} placeholder="Numero Identidad" className="form-control" />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Celular</Label>
            <input name="numTelefono" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numTelefono} placeholder="Número Celular" className="form-control" />
            {errors.numTelefono && (<div style={estilos}><p>{errors.numTelefono}</p></div>)}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Correo Electronico</Label>
            <input name="correo" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo} placeholder="Correo Electronico" className="form-control" />
            {errors.correo && (<div style={estilos}><p>{errors.correo}</p></div>)}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Nacimiento</Label>
            <input name="fechaNacimiento" type="date" required pattern="\d{4}-\d{2}-\d{2}" className="form-control" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.fechaNacimiento} />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Dirección</Label>
            <input name="direccion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.direccion} placeholder="Dirección" className="form-control" />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre Contacto Emergencia</Label>
            <input name="nomContactoEmergencia" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia} placeholder="Nombre Familiar" className="form-control" />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">#Número Emergencia</Label>
            <input name="numContactoEmergencia" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numContactoEmergencia} placeholder="# Contacto Emergencia" className="form-control" />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">EPS</Label>
            <input name="eps" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.eps} placeholder="EPS" className="form-control" />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">ARL</Label>
            <input name="arl" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.arl} placeholder="ARL" className="form-control" />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Foto</Label>
            <input name="fotoEmpleado" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.fotoEmpleado} placeholder="foto" className="form-control" />
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "300px", margin: "20px" }}>
            <Label for="exampleEmail">Genero</Label>
            <GeneroEmpleado name="sexo" handleChangeData={handleChange} value={consolaSeleccionada.sexo} />
          </FormGroup>
          <FormGroup className="me-2" style={{ width: "300px", margin: "20px" }}>
            <Label for="exampleEmail">Tipo de Sangre</Label>
            <TipoSangre name="tipoSangre" handleChangeData={handleChange} value={consolaSeleccionada.tipoSangre} />
          </FormGroup>
        </div>
      </Form>
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}> Actualizar </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>Esta seguro de Eliminar Empleado{" "}<b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ?</p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}> Si </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
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
        customBodyRender: (value, tableMeta, updateValue) => {
          try {
            value = data.map((consola) => consola.tipDocumento.nomTipoDocumento).join(", ");
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
            value = data.map((consola) => consola.sexo.nomSexo).join(", ");
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
            value = data.map((consola) => consola).tipoSangre.nomTipoSangre.join(", ");
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
      name: "acciones",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Button variant="contained" color="primary" onClick={() => seleccionarEmpleado(tableMeta.rowData, "Editar")}>
                <AiFillEdit.AiFillEdit className="me-2" /> Editar
              </Button>
              <Button variant="contained" color="secondary" onClick={() => seleccionarEmpleado(tableMeta.rowData, "Eliminar")}>
                <MdDelete.MdDelete className="me-2" />Eliminar
              </Button>
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
          <Button onClick={() => abrirCerrarModalInsertar()} className="btn btn-primary" > Insertar Empleado </Button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <MUIDataTable title={"Lista de Empleados"} data={data} columns={columns} />
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