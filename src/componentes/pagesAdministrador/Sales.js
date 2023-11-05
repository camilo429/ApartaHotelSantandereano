import React, { useEffect, useState } from "react";
import axios from "axios";
// Reactstrap
import { Form, FormGroup, Label } from "reactstrap";
import { makeStyles } from "@mui/styles";
import { Modal, Button } from "@mui/material";
//Estilos
import "../../App.scss";
import "../../css/Sales.css";
//Iconos
import * as MdDelete from "react-icons/md";
// import * as BsInfoLg from "react-icons/bs";
import * as AiFillEdit from "react-icons/ai";
//url
import { Apiurl } from "../../services/userService";
const url = Apiurl + "producto/listarProductos";
const urlG = Apiurl + "producto/crearProducto";
const urlE = Apiurl + "producto/actualizarProducto/";
const urlD = Apiurl + "producto/eliminarProducto/";

const useStyles = makeStyles((them) => ({
  modal: {
    position: "absolute",
    width: "50%",
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

function Sales() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    codProducto: "",
    nombreProducto: "",
    marca: "",
    cantidad: "",
    precio: "",
    fechaRegistro: "",
    horaRegistro: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(consolaSeleccionada);
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
    e.preventDefault();
    console.log("esta es la data seleccionada", consolaSeleccionada);
    const response = await axios.post(urlG, consolaSeleccionada, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    });
    setData(data.concat(response.data));
    peticionGet();
    abrirCerrarModalInsertar();
    alert("El producto ha sido Registrado");
  };
  const peticionPut = async () => {
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
    setConsolaSeleccionada(consola);
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
            <Label for="exampleEmail">Fecha de Entrada</Label>
            <input
              name="fechaRegistro"
              type="date"
              placeholder="fechaRegistro"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Hora de Registro</Label>
            <input
              name="horaRegistro"
              type="time"
              value="11:00"
              min="09:00"
              max="22:00"
              step="30"
              placeholder="horaRegistro"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Precio(Unidad)</Label>
            <input
              name="precio"
              placeholder="# precio"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Unidades</Label>
            <input
              name="cantidad"
              placeholder="# cantidad"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Empresa</Label>
            <input
              name="marca"
              placeholder="Nombre marca"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre Producto</Label>
            <input
              name="nombreProducto"
              placeholder="Nombre Producto"
              className="form-control"
              onChange={handleChange}
            />
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
            <Label for="exampleEmail">Fecha de Entrada</Label>
            <input
              className="form-control"
              name="fechaRegistro"
              onChange={handleChange}
              value={consolaSeleccionada?.fechaRegistro}
              type="date"
              placeholder="fechaRegistro"
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Hora de Registro</Label>
            <input
              name="horaRegistro"
              type="time"
              value={consolaSeleccionada?.horaRegistro}
              placeholder="horaRegistro"
              className="form-control"
              onChange={handleChange}
            />
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
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Unidades</Label>
            <input
              name="cantidad"
              placeholder="# cantidad"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.cantidad}
            />
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
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre Producto</Label>
            <input
              name="nombreProducto"
              placeholder="Nombre Producto"
              className="form-control"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.nombreProducto}
            />
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
  ];
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
          <div className="table-responsive">
            <table className="table table-bordered" cellSpacing="0">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Unidades</th>
                  <th> Marca</th>
                  <th>Fecha de ingreso</th>
                  <th>Hora de registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((consola) => {
                  return (
                    <tr key={consola.codProducto}>
                      <th>{consola.nombreProducto}</th>
                      <th>{consola.precio}</th>
                      <th>{consola.cantidad}</th>
                      <th>{consola.marca}</th>
                      <th>{consola.fechaRegistro}</th>
                      <th>{consola.horaRegistro}</th>
                      <th>
                        <Button
                          className="flex"
                          onClick={() =>
                            seleccionarProducto(consola, "Eliminar")
                          }
                        >
                          <MdDelete.MdDelete className="me-2" />
                          Eliminar
                        </Button>

                        <Button
                          className="flex"
                          onClick={() => seleccionarProducto(consola, "Editar")}
                        >
                          <AiFillEdit.AiFillEdit className="me-2" />
                          Editar
                        </Button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
    </div>
  );
}
export default Sales;
