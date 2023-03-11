import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";

import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const url = "http://localhost:8001/nacionalidad/listarNacionalidades";
const urlG = "http://localhost:8001/nacionalidad/registrarNacionalidad";
const urlE = "http://localhost:8001/nacionalidad/actualizarNacionalidad/";
const urlD = "http://localhost:8001/nacionalidad/deleteNacionalidad/";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    padding: 50,
    boder: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  icons: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function NacionalidadComponent() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    nombre: "",
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
    await axios.get(url).then((response) => {
      setData(response.data);
    });
  };

  const peticionPost = async () => {
    await axios.post(urlG, consolaSeleccionada).then((response) => {
      setData(data.concat(response.data));
      peticionGet();
      abrirCerrarModalInsertar();
    });
  };

  const peticionPut = async () => {
    await axios
      .put(urlE + consolaSeleccionada.id, consolaSeleccionada)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.id === consola.id) {
            consola.nombre = consolaSeleccionada.nombre;
          }
        });
        setData(dataNueva);
        peticionGet();
        abrirCerrarModalEditar();
      });
  };

  const peticionDelete = async () => {
    await axios.delete(urlD + consolaSeleccionada.id).then((response) => {
      setData(data.filter((consola) => consola.id !== consolaSeleccionada.id));
      abrirCerrarModalEliminar();
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
  const seleccionarNacionalidad = (consola, caso) => {
    setConsolaSeleccionada(consola);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nacionalidad</h3>
      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
      />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Nacionalidad</h3>
      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.nombre}
      />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Actualizar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Esta seguro de Eliminar Nacionalidad{" "}
        <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ?
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Si
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div className="NacionalidadComponent">
      <br />
      <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
      <br></br>
      <br></br>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Nacionalidad</TableCell>
              <TableCell>Acciones</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((consola) => (
              <TableRow key={consola.id}>
                <TableCell>{consola.id}</TableCell>
                <TableCell>{consola.nombre}</TableCell>

                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => seleccionarNacionalidad(consola, "Editar")}
                  />
                  &nbsp;&nbsp; &nbsp;&nbsp;
                  <Delete
                    className={styles.iconos}
                    onClick={() => seleccionarNacionalidad(consola, "Eliminar")}
                  />
                </TableCell>

                <TableCell>Acciones</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default NacionalidadComponent;
