import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Apiurl } from "../../services/userService";

const url = Apiurl + "tipoDocumento/listarTipoDocumentos";
const urlG = Apiurl + "registrarTipoDocumento";
const urlE = Apiurl + "tipoDocumento/actualizarTipoDocumento/";
const urlD = Apiurl + "tipoDocumento/deleteTipoDocumento/";

const useStyles = styled("div")(({ theme }) => ({
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

function DocumentoComponent() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    codTipoDocumento: "",
    tipDocumento: "",
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
    try {
      const response = await axios.put(urlE + consolaSeleccionada.codTipoDocumento, consolaSeleccionada);
      if (response.status === 200) {
        // Crear una copia de la data
        const dataNueva = [...data];
        // Actualizar la consola seleccionada en la copia de la data
        const indice = dataNueva.findIndex(consola => consola.codTipoDocumento === consolaSeleccionada.codTipoDocumento);
        if (indice !== -1) {
          dataNueva[indice].tipDocumento = consolaSeleccionada.tipDocumento;
        }
        // Actualizar el estado con la nueva data
        setData(dataNueva);
        // Realizar una nueva petición GET (si es necesario)
        peticionGet();
        // Cerrar el modal de edición
        abrirCerrarModalEditar();
      }
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
    }
  }
  const peticionDelete = async () => {
    await axios
      .delete(urlD + consolaSeleccionada.id_tip_documento)
      .then((response) => {
        setData(
          data.filter(
            (consola) =>
              consola.id_tip_documento !== consolaSeleccionada.id_tip_documento
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
  const seleccionarDocumento = (consola, caso) => {
    setConsolaSeleccionada(consola);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Documento Empleado</h3>
      <TextField
        name="tipDocumento"
        className={styles.inputMaterial}
        label="tipDocumento"
        onChange={handleChange}
      ></TextField>
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
      <h3>Editar Documento Empleado</h3>
      <TextField
        name="tipDocumento"
        className={styles.inputMaterial}
        label="documento"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.tipDocumento}
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
        Esta seguro de Eliminar Empleado{" "}
        <b>{consolaSeleccionada && consolaSeleccionada.tipDocumento}</b> ?
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
    <div className="DocumentoComponent">
      <br />
      <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
      <br></br>
      <br></br>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>tipo Documento</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((consola) => (
              <TableRow key={consola.id_tip_documento}>
                <TableCell>{consola.tipDocumento}</TableCell>
                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => seleccionarDocumento(consola, "Editar")}
                  />
                  &nbsp;&nbsp; &nbsp;&nbsp;
                  <Delete
                    className={styles.iconos}
                    onClick={() => seleccionarDocumento(consola, "Eliminar")}
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

export default DocumentoComponent;
