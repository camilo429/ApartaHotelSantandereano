import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
import MUIDataTable from "mui-datatables";
//Estilos
import "../../App.scss";
import "../../css/Sales.css";
import { Form, FormGroup, Label } from "reactstrap";
import { makeStyles } from "@mui/styles";
import { Modal, Button } from "@mui/material";
//Iconos
import * as AiFillEdit from "react-icons/ai";
import * as MdDelete from "react-icons/md";
//import * as BsInfoLg from "react-icons/bs";
//url
import { Apiurl } from "../../services/userService";
const url = Apiurl + "producto/listarProductos";
const urlG = Apiurl + "producto/crearProducto";
const urlE = Apiurl + "producto/actualizarProducto/";
const urlD = Apiurl + "producto/eliminarProducto/";
// expresiones regulares
const nameRegex = /^[a-zA-Z\s]+$/;

const useStyles = makeStyles((them) => ({
  modal: {
    position: "absolute",
    width: "60%",
    height: "45%",
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
function Sales() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [errors, setErrors] = useState([]);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    codProducto: "",
    nombreProducto: "",
    marca: "",
    cantidad: "",
    precio: "",
    fechaRegistro: "",
    horaRegistro: "",
  });
  const validacionesFormulario = (consolaSeleccionada) => {
    let errors = {};
    if (!nameRegex.test(consolaSeleccionada.nombreProducto)) {
      errors.nombreProducto = "Nombre NO valido";
    }
    if (
      consolaSeleccionada.nombreProducto.length < 4 ||
      consolaSeleccionada.nombreProducto.length > 30
    ) {
      errors.nombre = "El nombre es corto o muy largo";
    }

    if (
      consolaSeleccionada.precio.length < 3 ||
      consolaSeleccionada.precio.length > 7
    ) {
      errors.precio = "Verificar el Precio";
    }
    if (!nameRegex.test(consolaSeleccionada.marca)) {
      errors.marca = "El Nombre de la empresa No valido";
    }
    if (consolaSeleccionada.cantidad < 3 || consolaSeleccionada.cantidad > 45) {
      errors.cantidad = "La cantidad minima es 3 y máxima 45";
    }
    return errors;
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
      console.log(errors);
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
        alert("El producto ha sido Registrado");
      } else {
        alert("Error al ingresar un Producto");
        setErrors({});
      }
    } catch (error) {
      console.log("Error Al agregar un producto", error);
    }
  };
  const peticionPut = async () => {
    setErrors(validacionesFormulario(consolaSeleccionada));
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      await axios
        .request({
          method: "put",
          url: urlE + consolaSeleccionada.codProducto,
          withCredentials: true,
          crossdomain: true,
          data: consolaSeleccionada,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            var dataNueva = data;
            dataNueva.map((consola) => {
              if (consolaSeleccionada.codProducto === consola.codProducto) {
                consola.nombreProducto = consolaSeleccionada.nombreProducto;
                consola.marca = consolaSeleccionada.marca;
                consola.cantidad = consolaSeleccionada.cantidad;
                consola.precio = consolaSeleccionada.precio;
                consola.fechaRegistro = consolaSeleccionada.fechaRegistro;
                consola.horaRegistro = consolaSeleccionada.horaRegistro;
              }
            });
            setData(dataNueva);
            peticionGet();
            abrirCerrarModalEditar();
            alert("El Producto ha sido Actualizado");
          }
        });
    } else {
      alert("Error al actualizar Producto");
    }
  };
  const peticionDelete = async () => {
    console.log(consolaSeleccionada);
    axios
      .request({
        method: "delete",
        url: urlD + consolaSeleccionada.codProducto,
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
                consola.codProducto !== consolaSeleccionada.codProducto
            )
          );
          abrirCerrarModalEliminar();
          alert("Producto Eliminado!");
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
    // console.log(consola);
    setConsolaSeleccionada({
      codProducto: consola[0],
      nombreProducto: consola[1],
      precio: consola[2],
      cantidad: consola[3],
      marca: consola[4],
      fechaRegistro: consola[5],
      horaRegistro: consola[6],
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
      <h3>Agregar un Nuevo producto</h3>
      <Form style={{ marginLeft: "3%" }}>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre Producto</Label>
            <input
              name="nombreProducto"
              placeholder="Nombre Producto"
              className="form-control"
              onChange={handleChange}
            />
            {errors.nombreProducto && (
              <div style={estilos}>
                <p>{errors.nombreProducto}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Empresa</Label>
            <input
              name="marca"
              placeholder="Nombre marca"
              className="form-control"
              onChange={handleChange}
            />
            {errors.marca && (
              <div style={estilos}>
                <p>{errors.marca}</p>
              </div>
            )}
          </FormGroup>{" "}
          <FormGroup className="me-2">
            <Label for="exampleEmail">Precio(Unidad)</Label>
            <input
              name="precio"
              placeholder="# precio"
              className="form-control"
              onChange={handleChange}
            />{" "}
            {errors.precio && (
              <div style={estilos}>
                <p>{errors.precio}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Unidades</Label>
            <input
              name="cantidad"
              placeholder="# cantidad"
              className="form-control"
              onChange={handleChange}
            />
            {errors.cantidad && (
              <div style={estilos}>
                <p>{errors.cantidad}</p>
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
      <h3>Actualizar Producto</h3>
      <Form style={{ marginLeft: "3%" }}>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre Producto</Label>
            <input
              name="nombreProducto"
              placeholder="Nombre Producto"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.nombreProducto}
            />
            {errors.nombreProducto && (
              <div style={estilos}>
                <p>{errors.nombreProducto}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Empresa</Label>
            <input
              name="marca"
              placeholder="Nombre marca"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.marca}
            />
            {errors.marca && (
              <div style={estilos}>
                <p>{errors.marca}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Precio(Unidad)</Label>
            <input
              name="precio"
              placeholder="# precio"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.precio}
            />
            {errors.precio && (
              <div style={estilos}>
                <p>{errors.precio}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Unidades</Label>
            <input
              name="cantidad"
              placeholder="# cantidad"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.cantidad}
            />
            {errors.cantidad && (
              <div style={estilos}>
                <p>{errors.cantidad}</p>
              </div>
            )}
          </FormGroup>
        </div>
      </Form>
      <div align="right">
        <button
          color="primary"
          className="btn btn-primary"
          onClick={() => peticionPut()}
        >
          Actualizar
        </button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );
  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Esta seguro de Eliminar el Producto
        <br />
        <b>
          {consolaSeleccionada &&
            consolaSeleccionada.nombreProducto +
              " " +
              consolaSeleccionada.cantidad}
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
      name: "codProducto",
      label: "Código",
    },
    {
      name: "nombreProducto",
      label: "Producto",
    },
    {
      name: "precio",
      label: "Valor (Unidad)",
    },
    {
      name: "cantidad",
      label: "Cantidad",
    },
    {
      name: "marca",
      label: "Empresa",
    },
    {
      name: "fechaRegistro",
      label: "Fecha Registro",
    },
    {
      name: "horaRegistro",
      label: "Hora Registro",
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
                Editar
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
              Lista de Productos
            </h6>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-primary"
          >
            Agregar Producto
          </button>
        </div>
        <div className="card-body">
          <MUIDataTable
            title={"Lista de Productos"}
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
export default Sales;
