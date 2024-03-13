import React, { useEffect, useState } from "react";
//Librerias
import axios from "axios";
import MUIDataTable from "mui-datatables";
//Estilos
import { styled } from "@mui/system";
import { Form, FormGroup, Label } from "reactstrap";
import "../../App.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Huesped.css";
//iconos
import { Modal, Button } from "@mui/material";
import * as AiFillEdit from "react-icons/ai";
import * as MdDelete from "react-icons/md";
//import * as BsInfoLg from "react-icons/bs";
//Componentes
import Nacionalidades from "../../componentes/pagesAdministrador/Nacionalidades";
import TipoDocumento from "./TipoDocumento";
// url
import { Apiurl } from "../../services/userService";
import Region from "./Region";
//import { wait } from "@testing-library/user-event/dist/utils";
// import { useLoaderData } from "react-router-dom";
const url = Apiurl + "huespedes/listarHuespedes";
const urlG = Apiurl + "huespedes/crearHuesped";
const urlE = Apiurl + "huespedes/actualizarHuesped/";
const urlD = Apiurl + "huespedes/eliminarhuesped/";



function Huespedes() {

  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);


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
      nacionalidad: {
        codNacion: "",
        nombre: ""
      },
      nombre: ""
    },
    nomContactoEmergencia: "",
    numContactoEmergencia: "",
    checkin: [],
    estadoHuesped: ""
  });

  const useStyles = ({ theme }) => ({
    modal: {
      position: "absolute",
      width: "60%",
      height: "70%",
      backgroundColor: "white",
      padding: "1%",
      border: "2px solid #000",
      top: "40%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      fontSize: "0.9rem",
      borderRadius: "5px",
    },
  });
  const ModalContainer = styled("div")(useStyles);

  const useEstilo = ({ theme }) => ({
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
  });
  const ModalContainerII = styled("div")(useEstilo);

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
      } else {
        console.log("error en el metodo get", response.status);
      }
    } catch (error) {
      console.log("Error al traer los huespedes", error);
      switch (error.response.status) {
        case 404:
          alert("No hay huespedes registrados")
          break;
        case 401:
          alert("Autorización No valida");
          break;
      }
      alert("Error al traer los huespedes");
    }
  };

  const peticionPost = async () => {
    try {
      setConsolaSeleccionada({
        lugarOrigen: {
          codRegion: consolaSeleccionada.region.codRegion,
          nacionalidad: {
            codNacion: consolaSeleccionada.nacionalidad.codNacion,
            nombre: consolaSeleccionada.nacionalidad.nombre
          },
          nombre: consolaSeleccionada.region.nombre
        }
      })
      console.log(consolaSeleccionada)
      const response = await axios.post(urlG, consolaSeleccionada, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      console.log("estado result", response.status);
      if (response.status === 201) {
        setData(data.concat(response.data));
        peticionGet();
        abrirCerrarModalInsertar();
        alert("El Huesped ha sido creado");
        setConsolaSeleccionada({
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
        })
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      if (error.response && error.response.status === 400) {
        alert("Error al insertar un huésped: " + error.response.data.mensaje);
      } else {
        console.error("Error en la solicitud:", error);
      }
    }
  }

  const peticionPut = async () => {
    try {
      const response = await axios.put(urlE + consolaSeleccionada.codHuesped, consolaSeleccionada, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      });
      // console.log(response.status);
      if (response.status === 201) {
        setData((prevData) =>
          prevData.map((consola) => consola.codHuesped === consolaSeleccionada.codHuesped ? consolaSeleccionada : consola
          ));

        peticionGet();
        abrirCerrarModalEditar();
        alert("El huesped ha sido actualizado");
      } else {
        console.error("La solicitud PUT no fue exitosa");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
    }
  }
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

  const seleccionarHuespedes = (consola, caso) => {
    // console.log("Consola", consola);
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
      nacionalidad: {
        codNacion: consola[7].codNacion,
        nombre: consola[7].nombre,
      },
      lugarOrigen: consola[8],
      nomContactoEmergencia: consola[9],
      numContactoEmergencia: consola[10],
      estadoHuesped: consola[11],
    });
    // console.log("ConsolaSeleccionada", consolaSeleccionada);
    if (caso === "Editar") {
      abrirCerrarModalEditar();
    }
    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    }
  };

  const bodyInsertar = (
    <div>
      <ModalContainer>
        <h3>Agregar Huesped</h3>
        <Form>
          <div className="flex">
            <FormGroup className="me-2">
              <Label for="exampleEmail">Nombre</Label>
              <input className="form-control" name="nombre" onChange={handleChange} placeholder={!consolaSeleccionada?.nombre ? "Nombres" : "Nombre"} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="Apellido">Apellido</Label>
              <input className="form-control" name="apellido" onChange={handleChange} placeholder={!consolaSeleccionada?.apellido ? "Apellido" : "Apellido"} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">Número Celular</Label>
              <input className="form-control" name="numCelular" onChange={handleChange} placeholder={!consolaSeleccionada?.numCelular ? "Número de celular Personal" : "Numero de celular"} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">Fecha de Nacimiento</Label>
              <input type="date" className="form-control" name="fechaNacimiento" onChange={handleChange} placeholder={!consolaSeleccionada?.fechaNacimiento ? "fecha Nacimiento" : "Fecha Nacimiento"} />
            </FormGroup>
          </div>
          <div className="flex">
            <FormGroup className="me-2">
              <Label for="email">Correo Electronico</Label>
              <input className="form-control" name="correo" onChange={handleChange} placeholder={!consolaSeleccionada?.correo ? "Correo Personal" : "Correo"} />
            </FormGroup>
            <FormGroup className="me-2" style={{ width: "300px", margin: "20px" }}>
              <Label for="exampleEmail">Tipo Documento</Label>
              <TipoDocumento name="tipoDocumento" handleChangeData={handleChange} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">Número Documento</Label>
              <input className="form-control" name="numDocumento" onChange={handleChange} placeholder={!consolaSeleccionada?.numDocumento ? "Número Idenficación" : "Número de documento"} />
            </FormGroup>
            <FormGroup className="me-2" style={{ width: "250px", margin: "20px" }}>
              <Label for="exampleEmail">Nacionalidad</Label>
              <Nacionalidades name="nacionalidad" handleChangeData={handleChange} />
            </FormGroup>
          </div>
          <div className="flex">
            <FormGroup>
              <Label for="eampleemail"> ¿ Región de dónde proviene ?</Label>
              <Region name="region" handleChangeData={handleChange} codNacion={2} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">Nombre Emergencia</Label>
              <input className="form-control" name="nomContactoEmergencia" onChange={handleChange} placeholder={!consolaSeleccionada?.nomContactoEmergencia ? "Nombre del acompañante" : "Acompañante"} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">#Contacto Emergencia</Label>
              <input className="form-control" name="numContactoEmergencia" onChange={handleChange} placeholder={!consolaSeleccionada?.numContactoEmergencia ? "Número de contacto de Emergencia" : "NúmeroEmergencia"} />
            </FormGroup>
            <FormGroup styles={{ margin: "6px" }}>
              <Label for="eampleemail"> Estado Huesped</Label>
              <select className="form-select" name="estadoHuesped" placeholder="estado Huesped" onChange={handleChange}>
                <option value="1">HABILITADO</option>
                <option value="0">DESHABILITADO</option>
              </select>
            </FormGroup>
          </div>
        </Form>
        <div align="right">
          <Button color="primary" onClick={(e) => peticionPost(e)}> Insertar</Button>
          <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </ModalContainer>
    </div>
  );



  const bodyEditar = (
    <div>
      <ModalContainer>
        <h3>Editar Huesped</h3>
        <Form style={{ textAlign: "center" }}>
          <div className="flex">
            <FormGroup className="me-2">
              <Label for="exampleEmail">Nombre</Label>
              <input required className="form-control" name="nombre" onChange={handleChange} value={consolaSeleccionada?.nombre} placeholder={!consolaSeleccionada?.nombre ? "Nombre" : "Nombre"} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="Apellido">Apellido</Label>
              <input required className="form-control" name="apellido" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellido} placeholder={!consolaSeleccionada?.apellido ? " su apellido" : "Apellido"} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">Número Celular</Label>
              <input required className="form-control" name="numCelular" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numCelular} placeholder={!consolaSeleccionada?.numCelular ? "Número de Celular" : "Numero de celular"} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="email">Correo Electronico</Label>
              <input required className="form-control" name="correo" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo} placeholder={!consolaSeleccionada?.correo ? "Correo" : "Correo"} />}
            </FormGroup>
          </div>
          <div className="flex">
            <FormGroup className="me-2" style={{ width: "250px", margin: "20px" }}>
              <Label for="exampleEmail">Tipo Documento</Label>
              <TipoDocumento required name="tipoDocumento" handleChangeData={handleChange} value={!consolaSeleccionada.tipoDocumento} placeholder={consolaSeleccionada.tipoDocumento} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">Número Documento</Label>
              <input required className="form-control" name="numDocumento" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numDocumento} placeholder={!consolaSeleccionada?.numDocumento ? " su número de identidad" : "Número de documento"} />
            </FormGroup>
            <FormGroup className="me-2" style={{ width: "200px", margin: "20px" }}>
              <Label for="exampleEmail">Nacionalidad</Label>
              <Nacionalidades required name="nacionalidad" handleChangeData={handleChange} value={consolaSeleccionada.nacionalidad} style={{ width: "15%" }} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">¿Lugar de dónde viene?</Label>
              <input required className="form-control" name="lugarProviene" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.lugarOrigen} placeholder={!consolaSeleccionada?.lugarOrigen ? " el lugar de donde proviene" : "Lugar Proveniente"} />
            </FormGroup>
          </div>
          <div className="flex">
            <FormGroup className="me-2">
              <Label for="exampleEmail">Nombre Emergencia</Label>
              <input required className="form-control" name="nomContactoEmergencia" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia} placeholder={!consolaSeleccionada?.nomContactoEmergencia ? "Diligenice nombre del acompañante" : "Acompañante"} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">#Contacto Emergencia</Label>
              <input required className="form-control" name="numContactoEmergencia" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numContactoEmergencia} placeholder={!consolaSeleccionada?.numContactoEmergencia ? "Número de contacto de Emergencia" : "NumeroEmergencia"} />
            </FormGroup>
            <FormGroup className="me-2" style={{ width: "200px", margin: "20px" }}>
              <Label for="exampleEmail">Estado Huesped</Label>
              <select required className="form-select" aria-label="Default select example" name="estadoHuesped" onChange={handleChange} defaultValue={"Habilitado"} value={consolaSeleccionada && consolaSeleccionada.estadoHuesped === true ? "HABILITADO" : "INHABILITADO"}>
                <option value="TRUE">TRUE</option>
                <option value="FALSE">FALSE</option>
              </select>
            </FormGroup>
          </div>
        </Form>
        <div align="right">
          <Button color="primary" onClick={() => peticionPut()}> Actualizar </Button>
          <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
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

  useEffect(() => {
    peticionGet();
  }, []);

  const columns = [
    {
      name: "codHuesped",
      label: "Código",
    }, {
      name: "nombre",
      label: "Nombre",
      sort: false,
    }, {
      name: "apellido",
      label: "apellido",
    }, {
      name: "numCelular",
      label: "Celular",
    }, {
      name: "correo",
      label: "Correo Electronico",
    },
    // }, {
    //   name: "tipoDocumento",
    //   label: "Tipo Documento",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return `${value.nomTipoDocumento}`;
    //     },
    //   },
    // }, 
    {
      name: "numDocumento",
      label: "Número Documento",
    },
    // {
    //   name: "nacionalidad",
    //   label: "Nacionalidad",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return `${value.nombre}`;
    //     },
    //   },
    // }, 
    // {
    //   name: "lugarOrigen",
    //   label: "Lugar De incio de viaje",
    // }, 
    {
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
            // Suponiendo que data es la fuente de tus datos
            data.forEach((consola, ind) => {
              if (consola.estadoHuesped === true) {
                value = "Habilitado";
              } else {
                value = "Inhabilitado";
              }
            });
          } catch (error) {
            console.log("No carga el valor de Estado Huesped");
          }
          return value;
        },
      },
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
              <Button variant="contained" color="primary" onClick={() => seleccionarHuespedes(tableMeta.rowData, "Editar")}>
                <AiFillEdit.AiFillEdit className="me-2" />Editar
              </Button>
              <Button variant="contained" color="secondary" onClick={() => seleccionarHuespedes(tableMeta.rowData, "Eliminar")}>
                <MdDelete.MdDelete className="me-2" />Eliminar
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
    <div className="Huespedes">
      <div className="card shadow mb-4">
        <h6 className="m-0 font-weight-bold text-primary"> Base de Datos Huespedes </h6>
        <div> <Button onClick={() => abrirCerrarModalInsertar()} className="btn btn-primary"> Agregar Huesped</Button> </div>
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
    </div>
  );
}
export default Huespedes;