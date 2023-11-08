import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
import MUIDataTable from "mui-datatables";
//Estilos
import "../../App.scss";
import { Form, FormGroup, Label } from "reactstrap";
import { makeStyles } from "@mui/styles";
import { Modal, Button } from "@mui/material";
//Iconos
import * as AiFillEdit from "react-icons/ai";
import * as MdDelete from "react-icons/md";
//import * as BsInfoLg from "react-icons/bs";
//url
import SelectEmpleado from "./SelectEmpleados";
import { Apiurl } from "../../services/userService";
const url = Apiurl + "actividades/listarActividades";
const urlG = Apiurl + "actividades/crearActividad";
const urlE = Apiurl + "actividades/verActividad/";
const urlD = Apiurl + "actividades/eliminarActividad/";
const urlEmpleados = Apiurl + "empleados/listarEmpleados";

// expresiones regulares
const nameRegex = /^[a-zA-Z\s]+$/;

const useStyles = makeStyles((them) => ({
  modal: {
    position: "absolute",
    width: "60%",
    height: "50%",
    backgroundColor: "white",
    padding: "1%",
    boder: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: "1.2rem",
    borderRadius: "5px",
  },
  icons: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));
let estilos = {
  fontWeight: "bold",
  color: "#dc3545",
};
function Tarea() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [errors, setErrors] = useState([]);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    codActividad: "",
    titulo: "",
    descripcion: "",
    fechaEntrega: "",
    horaEntrega: "",
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
    },
    estadoActividad: "",
  });
  const validacionesFormulario = (consolaSeleccionada) => {
    let errors = {};
    if (!nameRegex.test(consolaSeleccionada.titulo)) {
      errors.titulo = "Nombre NO valido";
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(consolaSeleccionada);
  };
  const peticionGet = async () => {
    axios
      .request({
        method: "get",
        url: url,
        withCredentials: true,
        crossdomain: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
          // console.log(response.data);
        }
      })
      .catch((error) => {
        alert("¡No hay ventas registradas!");
      });
  };
  const peticionPost = async (e) => {
    try {
      setErrors(validacionesFormulario(consolaSeleccionada));
      console.log(consolaSeleccionada);
      if (Object.keys(errors).length === 0) {
        e.preventDefault();
        const response = await axios.post(urlG, consolaSeleccionada, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        });
        setData(data.concat(response.data));
        peticionGet();
        abrirCerrarModalInsertar();
        alert("La Actividad ha sido Registrada");
      } else {
        alert("Error al agregar Actividad");
        setErrors({});
      }
    } catch (error) {
      console.log("Error al agregar Actividad", error);
    }
  };

  const peticionDelete = async () => {
    console.log(consolaSeleccionada);
    axios
      .request({
        method: "delete",
        url: urlD + consolaSeleccionada.codActividad,
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
              (consola) =>
                consola.codActividad !== consolaSeleccionada.codActividad
            )
          );
          abrirCerrarModalEliminar();
          alert("Actividad Eliminada Eliminado!");
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
  const seleccionarProducto = (consola, caso) => {
    console.log("Seleccionar", consola);
    setConsolaSeleccionada({
      codActividad: consola[0],
      titulo: consola[1],
      descripcion: consola[2],
      fechaEntrega: consola[3],
      horaEntrega: consola[4],
      empleado: {
        codEmpleado: consola[5].codEmpleado,
        nombre: consola[5].nombre,
        apellido: consola[5].apellido,
        tipDocumento: {
          codTipoDocumento: consola[5].codTipoDocumento,
          nomTipoDocumento: consola[5].nomTipoDocumento,
        },
        numDocumento: consola[5].numDocumento,
        edad: consola[5].edad,
        numTelefono: consola[5].numTelefono,
        correo: consola[5].correo,
        fechaNacimiento: consola[5].fechaNacimiento,
        direccion: consola[5].direccion,
        nomContactoEmergencia: consola[5].nomContactoEmergencia,
        numContactoEmergencia: consola[5].numContactoEmergencia,
        eps: consola[5].eps,
        arl: consola[5].arl,
        sexo: {
          codSexo: consola[5].codSexo,
          nomSexo: consola[5].nomSexo,
        },
        tipoSangre: {
          codTipoSangre: consola[5].codSexo,
          nomTipoSangre: consola[5].nomTipoSangre,
        },
        fotoEmpleado: consola[5].fotoEmpleado,
      },
      estadoActividad: consola[6],
    });
    if (caso === "Editar") {
      abrirCerrarModalEditar();
    }
    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    }
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar un Nueva Actividad</h3>
      <Form style={{ marginLeft: "3%" }}>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">titulo titulo</Label>
            <input
              name="titulo"
              placeholder="titulo titulo"
              className="form-control"
              onChange={handleChange}
            />
            {errors.titulo && (
              <div style={estilos}>
                <p>{errors.titulo}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">descripcion</Label>
            <input
              name="descripcion"
              placeholder="descripcion descripcion"
              className="form-control"
              onChange={handleChange}
            />
            {errors.descripcion && (
              <div style={estilos}>
                <p>{errors.descripcion}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">fechaEntrega(Unidad)</Label>
            <input
              name="fechaEntrega"
              type="date"
              placeholder="# fechaEntrega"
              className="form-control"
              onChange={handleChange}
            />
            {errors.fechaEntrega && (
              <div style={estilos}>
                <p>{errors.fechaEntrega}</p>
              </div>
            )}
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">horaEntrega</Label>
            <input
              name="horaEntrega"
              type="time"
              placeholder="# horaEntrega"
              className="form-control"
              onChange={handleChange}
            />
            {errors.horaEntrega && (
              <div style={estilos}>
                <p>{errors.horaEntrega}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Empleado</Label>
            <SelectEmpleado
              name="empleado"
              handleChangeData={handleChange}
              url={urlEmpleados}
            />
            {errors.estadoActividad && (
              <div style={estilos}>
                <p>{errors.estadoActividad}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">estadoActividad</Label>
            <input
              name="estadoActividad"
              placeholder="# estadoActividad"
              className="form-control"
              onChange={handleChange}
            />
            {errors.estadoActividad && (
              <div style={estilos}>
                <p>{errors.estadoActividad}</p>
              </div>
            )}
          </FormGroup>
        </div>
      </Form>
      <div align="right">
        <button className="btn btn-success" onClick={(e) => peticionPost(e)}>
          Agregar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => abrirCerrarModalInsertar()}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Ver Actividad</h3>
      <Form style={{ marginLeft: "3%" }}>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Titulo Actividad</Label>
            <input
              name="titulo"
              placeholder="Titulo"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.titulo}
              readOnly
            />
            {errors.titulo && (
              <div style={estilos}>
                <p>{errors.titulo}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">descripcion</Label>
            <input
              name="descripcion"
              placeholder="Nombre Producto"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.descripcion}
              readOnly
            />
            {errors.nombreProducto && (
              <div style={estilos}>
                <p>{errors.nombreProducto}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup
            className="me-2"
            style={{ margin: "10px", width: "250px" }}
          >
            <Label fro="exampleEmail">Empleado</Label>
            <input
              name="descripcion"
              placeholder="Nombre Producto"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.empleado.nombre}
              readOnly
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">fechaEntrega</Label>
            <input
              name="fechaEntrega"
              placeholder="Nombre marca"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.fechaEntrega}
              readOnly
            />
            {errors.descripcion && (
              <div style={estilos}>
                <p>{errors.descripcion}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">fechaEntrega(Unidad)</Label>
            <input
              name="horaEntrega"
              placeholder="# horaEntrega"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.horaEntrega}
              readOnly
            />
            {errors.horaEntrega && (
              <div style={estilos}>
                <p>{errors.horaEntrega}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">estadoActividad</Label>
            <input
              name="estadoActividad"
              placeholder="# horaEntrega"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.estadoActividad}
              readOnly
            />
            {errors.estadoActividad && (
              <div style={estilos}>
                <p>{errors.estadoActividad}</p>
              </div>
            )}
          </FormGroup>
        </div>
      </Form>
      <div align="right">
        <Button onClick={() => abrirCerrarModalEditar()}>Volver</Button>
      </div>
    </div>
  );
  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Esta seguro de Eliminar la Actividad
        <br />
        <b>
          {consolaSeleccionada &&
            consolaSeleccionada.titulo +
              " " +
              consolaSeleccionada.estadoActividad}
        </b>
        ?
      </p>
      <div align="right">
        <button
          className="btn btn-primary"
          onClick={() => peticionDelete()}
          style={{ margin: "5px" }}
        >
          Eliminar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => abrirCerrarModalEliminar()}
        >
          Cancelar
        </button>
      </div>
    </div>
  );

  const columns = [
    {
      name: "codActividad",
      label: "Código",
    },
    {
      name: "titulo",
      label: "titulo",
    },
    {
      name: "descripcion",
      label: "descripcion",
    },
    {
      name: "fechaEntrega",
      label: "fechaEntrega",
    },
    {
      name: "horaEntrega",
      label: "horaEntrega",
    },
    {
      name: "empleado",
      label: "empleado",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          // Accede a la propiedad anidada y muestra su valor
          try {
            data.map((consola, ind) => {
              value = [consola.empleado.nombre, " ", consola.empleado.apellido];
            });
          } catch (error) {
            console.log("Error al cargar Nombre Empleado");
          }
          return value; // Esto mostrará el valor de tipoDocumento.nomTipoDocumento en la celda
        },
      },
    },
    {
      name: "estadoActividad",
      label: "estadoActividad",
    },
    {
      name: "Acciones",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, UpdateValue) => {
          return (
            <div>
              <Button
                variant="contained"
                color="primary"
                className="flex"
                onClick={() => seleccionarProducto(tableMeta.rowData, "Editar")}
              >
                <MdDelete.MdDelete className="me-2" />
                Ver
              </Button>

              <Button
                variant="contained"
                color="secondary"
                className="flex"
                onClick={() =>
                  seleccionarProducto(tableMeta.rowData, "Eliminar")
                }
              >
                <AiFillEdit.AiFillEdit className="me-2" />
                Eliminar
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
  };
  return (
    <div className="Productos">
      <br />
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="flex">
            <h6 className="m-0 font-weight-bold text-primary">
              Lista de Actividades
            </h6>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-primary"
          >
            Agregar Actividades
          </button>
        </div>
        <div className="card-body">
          <MUIDataTable
            title={"Lista de Actividades"}
            data={data}
            columns={columns}
            options={options}
          />
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
    </div>
  );
}
export default Tarea;
