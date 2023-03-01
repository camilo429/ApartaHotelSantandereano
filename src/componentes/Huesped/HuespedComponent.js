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

const url = "http://localhost:8001/huespedes/listarHuespedes";
const urlG = "http://localhost:8001/huespedes/registrarHuesped";
const urlE = "http://localhost:8001/huespedes/actualizarHuesped/";
const urlD = "http://localhost:8001/huespedes/deleteHuespedes/";
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 800,
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
    width: "30%",
  },
  TextField: {
    marginTop: "15px",
    marginLeft: "15px",
  },
}));

function HuespedComponent() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    num_celular: "",
    correo: "",
    id_tip_documento: "",
    numDocumento: "",
    id_nacionalidad: "",
    lugar_origen: "",
    nom_contacto_emergencia: "",
    num_contacto_emergencia: "",
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
      .put(urlE + consolaSeleccionada.numDocumento, consolaSeleccionada)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.numDocumento === consola.numDocumento) {
            consola.nombre = consolaSeleccionada.nombre;
          }
        });
        setData(dataNueva);
        peticionGet();
        abrirCerrarModalEditar();
      });
  };

  const peticionDelete = async () => {
    await axios
      .delete(urlD + consolaSeleccionada.numDocumento)
      .then((response) => {
        setData(
          data.filter(
            (consola) =>
              consola.numDocumento !== consolaSeleccionada.numDocumento
          )
        );
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
  const seleccionarHuesped = (consola, caso) => {
    setConsolaSeleccionada(consola);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Huesped</h3>

      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
      />
      <TextField
        name="apellido"
        className={styles.inputMaterial}
        label="Apellido"
        onChange={handleChange}
      />
      <TextField
        name="direccion"
        className={styles.inputMaterial}
        label="Dirección"
        onChange={handleChange}
      />
      <TextField
        name="num_celular"
        className={styles.inputMaterial}
        label="Número Celular"
        onChange={handleChange}
      />
      <TextField
        name="correo"
        className={styles.inputMaterial}
        label="Correo Electronico"
        onChange={handleChange}
      />

      <TextField
        name="id_tip_documento"
        className={styles.inputMaterial}
        label="id Tipo De Documento"
        onChange={handleChange}
      />
      <TextField
        name="numDocumento"
        className={styles.inputMaterial}
        label="Número De Documento"
        onChange={handleChange}
      />
      <TextField
        name="id_nacionalidad"
        className={styles.inputMaterial}
        label="idLugar Nacimiento"
        onChange={handleChange}
      />

      <TextField
        name="lugar_origen"
        className={styles.inputMaterial}
        label="Lugar origen"
        onChange={handleChange}
      />
      <TextField
        name="nom_contacto_emergencia"
        className={styles.inputMaterial}
        label="Nombre Contacto Emergencia"
        onChange={handleChange}
      />

      <TextField
        name="num_contacto_emergencia"
        className={styles.inputMaterial}
        label="Numero contacto Emergencia"
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
      <h3>Editar Huesped</h3>

      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.nombre}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="apellido"
        className={styles.inputMaterial}
        label="Apellido"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.apellido}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="direccion"
        className={styles.inputMaterial}
        label="Dirección"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.direccion}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="num_celular"
        className={styles.inputMaterial}
        label="Número Celular"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.num_celular}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="correo"
        className={styles.inputMaterial}
        label="Correo Electronico"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.correo}
      />

      <TextField
        name="id_tip_documento"
        className={styles.inputMaterial}
        label="Tipo De Documento"
        onChange={handleChange}
        value={
          consolaSeleccionada &&
          consolaSeleccionada.id_tip_documento.tipDocumento
        }
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="numDocumento"
        className={styles.inputMaterial}
        label="Número De Documento"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.numDocumento}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="id_nacionalidad"
        className={styles.inputMaterial}
        label="Lugar Nacimiento"
        onChange={handleChange}
        value={
          consolaSeleccionada && consolaSeleccionada.id_nacionalidad.nombre
        }
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="lugar_origen"
        className={styles.inputMaterial}
        label="Lugar origen"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.lugar_origen}
      />
      <TextField
        style={{ marginTop: "15px" }}
        name="nom_contacto_emergencia"
        className={styles.inputMaterial}
        label="Nombre Contacto Emergencia"
        onChange={handleChange}
        value={
          consolaSeleccionada && consolaSeleccionada.nom_contacto_emergencia
        }
      />

      <TextField
        name="num_contacto_emergencia"
        className={styles.inputMaterial}
        label="Numero contacto Emergencia"
        onChange={handleChange}
        value={
          consolaSeleccionada && consolaSeleccionada.num_contacto_emergencia
        }
      />
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
        Esta seguro de Eliminar Huesped
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
    <div className="HuespedComponent">
      <br />
      <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
      <br></br>
      <br></br>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Número celular</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Tipo Documento</TableCell>
              <TableCell>Número Documento</TableCell>
              <TableCell>Nacionalidad</TableCell>
              <TableCell>Lugar Nacimiento</TableCell>
              <TableCell>Nombre Emergencia</TableCell>
              <TableCell>Contacto Emergencia</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((consola) => (
              <TableRow key={consola.id_huesped}>
                <TableCell>{consola.nombre}</TableCell>
                <TableCell>{consola.apellido}</TableCell>
                <TableCell>{consola.direccion}</TableCell>
                <TableCell>{consola.num_celular}</TableCell>
                <TableCell>{consola.correo} celular</TableCell>
                <TableCell>{consola.id_tip_documento.tipDocumento}</TableCell>
                <TableCell>{consola.numDocumento}</TableCell>
                <TableCell>{consola.id_nacionalidad.nombre}</TableCell>
                <TableCell>{consola.lugar_origen}</TableCell>
                <TableCell>{consola.nom_contacto_emergencia}</TableCell>
                <TableCell>{consola.num_contacto_emergencia}</TableCell>
                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => seleccionarHuesped(consola, "Editar")}
                  />
                  &nbsp;&nbsp; &nbsp;&nbsp;
                  <Delete
                    className={styles.iconos}
                    onClick={() => seleccionarHuesped(consola, "Eliminar")}
                  />
                </TableCell>
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

export default HuespedComponent;
