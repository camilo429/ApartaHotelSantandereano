import React, { useEffect, useState } from "react";
//Librerias
import axios from "axios";
import MUIDataTable from "mui-datatables";
//Estilos
import { Form, FormGroup, Label } from "reactstrap";
import "./Huesped.css";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
//iconos
import { Modal, Button } from "@mui/material";
//import * as BsInfoLg from "react-icons/bs";
//Componentes
import Nacionalidades from "../Nacionalidades";
import TipoDocumento from "../TipoDocumento";
// url
import { Apiurl } from "../../../services/userService";
import Region from "../Region";

const url = Apiurl + "huespedes/listarHuespedes";
const urlG = Apiurl + "huespedes/crearHuesped";
const urlE = Apiurl + "huespedes/actualizarHuesped/";
const urlD = Apiurl + "huespedes/eliminarhuesped/";

function Huespedes() {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [codNacionalidad, setCodNacionaldad] = useState();
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
    "& input": {
      width: "175px"
    },
    "& input::placeholder": {
      fontSize: "0.8rem"
    },

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
    console.log(consolaSeleccionada)
    try {
      const response = await axios.put(urlE + consolaSeleccionada.codHuesped, consolaSeleccionada, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      });
      // console.log(response.status);
      if (response.status === 201) {
        setData((prevData) =>
          prevData.map((consola) => consola.codHuesped === consolaSeleccionada.codHuesped ? consolaSeleccionada : consola));

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
          codNacion: consola[10].codNacion,
          nombre: consola[10].nombre,
        }
      },
      nomContactoEmergencia: consola[11],
      numContactoEmergencia: consola[12],
      estadoHuesped: consola[13],
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
            <FormGroup >
              <Label for="exampleEmail">Nombre</Label>
              <input className="form-control" name="nombre" onChange={handleChange} placeholder={!consolaSeleccionada?.nombre ? "Nombres" : "Nombre"} />
            </FormGroup>
            <FormGroup >
              <Label for="Apellido">Apellido</Label>
              <input className="form-control" name="apellido" onChange={handleChange} placeholder={!consolaSeleccionada?.apellido ? "Apellido" : "Apellido"} />
            </FormGroup>
            <FormGroup >
              <Label for="exampleEmail">Número Celular</Label>
              <input className="form-control" name="numCelular" onChange={handleChange} placeholder={!consolaSeleccionada?.numCelular ? "Número de celular" : "Numero de celular"} />
            </FormGroup>
            <FormGroup >
              <Label for="exampleEmail">Fecha de Nacimiento</Label>
              <input type="date" className="form-control" name="fechaNacimiento" onChange={handleChange} placeholder={!consolaSeleccionada?.fechaNacimiento ? "fecha Nacimiento" : "Fecha Nacimiento"} />
            </FormGroup>
            <FormGroup >
              <Label for="email">Correo Electronico</Label>
              <input className="form-control" name="correo" onChange={handleChange} placeholder={!consolaSeleccionada?.correo ? "Correo Personal" : "Correo"} />
            </FormGroup>
          </div>
          <div className="flex" style={{ marginLeft: "10px" }}>
            <FormGroup style={{ width: "175px", margin: "5px" }}>
              <Label for="exampleEmail" style={{ margin: "6px" }}>Tipo Documento</Label>
              <TipoDocumento name="tipoDocumento" handleChangeData={handleChange} />
            </FormGroup>
            <FormGroup >
              <Label for="exampleEmail">Número Documento</Label>
              <input className="form-control" name="numDocumento" onChange={handleChange} placeholder={!consolaSeleccionada?.numDocumento ? "Número Idenficación" : "Número de documento"} />
            </FormGroup>
            <FormGroup style={{ width: "175px", margin: "10px" }} >
              <Label for="exampleEmail" style={{ margin: "6px" }} >Nacionalidad</Label>
              <Nacionalidades name="nacionalidad" handleChangeData={handleChange} />
            </FormGroup>
            <FormGroup style={{ width: "175px", margin: "10px" }}>
              <Label for="eampleemail" style={{ margin: "6px" }}> ¿Región de dónde proviene?</Label>
              <Region name="region" handleChangeData={handleChange} codNacion={2} />
            </FormGroup>
            <FormGroup >
              <Label for="exampleEmail">Nombre Emergencia</Label>
              <input className="form-control" name="nomContactoEmergencia" onChange={handleChange} placeholder={!consolaSeleccionada?.nomContactoEmergencia ? "Nombre del acompañante" : "Acompañante"} />
            </FormGroup>
          </div>
          <div className="flex">
            <FormGroup >
              <Label for="exampleEmail">#Contacto Emergencia</Label>
              <input className="form-control" name="numContactoEmergencia" onChange={handleChange} placeholder={!consolaSeleccionada?.numContactoEmergencia ? "Celular Emergencia" : "NúmeroEmergencia"} />
            </FormGroup>
            <FormGroup style={{ height: "25px", width: "175px", margin: "5px" }}>
              <Label style={{ margin: "6px" }}> Estado Huesped</Label>
              <select className="form-select" name="estadoHuesped" placeholder="estado Huesped" onChange={handleChange}>
                <option value="1">HABILITADO</option>
                <option value="0">DESHABILITADO</option>
              </select>
            </FormGroup>
          </div>
        </Form>
        <div align="right">
          <Button className="btn btn-primary" onClick={(e) => peticionPost(e)}> Insertar</Button>
          <Button className="btn btn-secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
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
              <Label for="exampleEmail">Nombre(s)</Label>
              <input required className="form-control" name="nombre" onChange={handleChange} value={consolaSeleccionada?.nombre} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="Apellido">Apellido(s)</Label>
              <input required className="form-control" name="apellido" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellido} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">Número Celular</Label>
              <input required className="form-control" name="numCelular" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numCelular} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">Fecha Nacimiento</Label>
              <input required className="form-control" type="date" name="fechaNacimiento" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.fechaNacimiento} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="email">Correo Electronico</Label>
              <input required className="form-control" name="correo" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo} />
            </FormGroup>
          </div>
          <div className="flex">
            <FormGroup className="me-2" style={{ width: "250px", margin: "20px" }}>
              <Label for="exampleEmail">Tipo Documento</Label>
              <TipoDocumento required name="tipoDocumento" handleChangeData={handleChange} value={consolaSeleccionada && consolaSeleccionada.tipoDocumento} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">Número Documento</Label>
              <input required className="form-control" name="numDocumento" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numDocumento} />
            </FormGroup>
            <FormGroup className="me-2" style={{ width: "200px", margin: "20px" }}>
              <Label for="exampleEmail">Nacionalidad</Label>
              <Nacionalidades required name="nacionalidad" handleChangeData={handleChange} value={consolaSeleccionada.nacionalidad} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">¿De dónde proviene?</Label>
              <Region required name="lugarOrigen" handleChangeData={handleChange} value={consolaSeleccionada.lugarOrigen} codNacion={codNacionalidad} />
            </FormGroup>
            <FormGroup className="me-2">
              <Label for="exampleEmail">Nombre Emergencia</Label>
              <input required className="form-control" name="nomContactoEmergencia" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nomContactoEmergencia} />
            </FormGroup>
          </div>
          <div className="flex">
            <FormGroup className="me-2">
              <Label for="exampleEmail">#Contacto Emergencia</Label>
              <input required className="form-control" name="numContactoEmergencia" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.numContactoEmergencia} />
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
    if (consolaSeleccionada && consolaSeleccionada.nacionalidad !== undefined) {
      // console.log("Nacionalidad cambiada:", consolaSeleccionada.nacionalidad);
      setCodNacionaldad(consolaSeleccionada.nacionalidad.codNacion);
    }
    peticionGet();
  }, [consolaSeleccionada]);

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
          return value.nomTipoDocumento; // Devuelve el nombre del tipo de documento
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
          return value.nombre;
        },
      },
    }, {
      name: "lugarOrigen",
      label: "Lugar Origen",
      options: {
        customBodyRender: (value, tableMeta) => {
          return value.nombre
        }
      }
    },
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