import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
//url
import { Apiurl } from "../../../services/userService";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { Form, FormGroup, Label } from "reactstrap";
//iconos
import { Modal, Button } from "@mui/material";
// import * as AiFillEdit from "react-icons/ai";
// import * as MdDelete from "react-icons/md";

const url = Apiurl + "recibosPublicos/listarRecibosPublicos";
const urlG = Apiurl + "recibosPublicos/crearReciboPublico";
// const urlE = Apiurl + "recibosPublicos/actualizarEmpleado/";
// const urlD = Apiurl + "recibosPublicos/eliminarRegistro/";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "60%",
    height: "70%",
    backgroundColor: "white",
    padding: "1%",
    boder: "2px solid #000",
    top: "40%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: "0.9rem",
    borderRadius: "5px",
  },
}));
const useEstilo = makeStyles((theme) => ({
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
}));
function TablaRecibos() {
  const styles = useStyles();
  const estilo = useEstilo();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [errors, setErrors] = useState([]);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    codRecibo: "",
    tipRecibo: {
      codTipRecibo: "",
      empresaPub: "",
    },
    numReferencia: "",
    pagoOportuno: "",
    supension: "",
    totalPagar: "",
    docRecibo: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          console.log(response.data);
        }
      })
      .catch((error) => {
        alert("No hay registros Tablas recibos");
      });
  };
  const peticionPost = async () => {
    try {
      setErrors(validacionesFormulario(consolaSeleccionada));
      console.log(errors);
      if (Object.keys(errors).length === 0) {
        const response = await axios.post(urlG, consolaSeleccionada, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        });
        setData(data.concat(response.data));
        peticionGet();
        abrirCerrarModalInsertar();
        alert("El recibo ha sido creado");
        setConsolaSeleccionada({
          codRecibo: "",
          tipRecibo: {
            codTipRecibo: "",
            empresaPub: "",
          },
          numReferencia: "",
          pagoOportuno: "",
          supension: "",
          totalPagar: "",
          docRecibo: "",
        });
        setErrors({});
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Error al insertar un recibo");
        console.log(error);
      } else {
        console.log(error.response.status);
      }
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
  const columns = [
    {
      name: "codRecibo",
      label: "Código",
    },
    {
      name: "tipRecibo",
      label: "Empresa",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          try {
            data.map((consola, idn) => {
              value = [consola.tipRecibo.empresaPub];
            });
          } catch (error) {
            console.log("Error Al cargar tipo de empresa tabla Recibos", error);
          }
          return value;
        },
      },
    },
    {
      name: "numReferencia",
      label: "Número Referencia",
    },
    {
      name: "pagoOportuno",
      label: "Fecha Limite",
    },
    {
      name: "supension",
      label: "Fecha Suspensión",
    },
    {
      name: "totalPagar",
      label: "totalPagar",
    },
    {
      name: "docRecibo",
      label: "ReciboUrl",
    },
  ];

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Recibo</h3>
      <Form>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">numReferencia</Label>
            <input
              className="form-control"
              name="numReferencia"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.nombre ? "numReferencia" : "numReferencia"
              }
            />
            {errors.numReferencia && (
              <div style={estilos}>
                <p>{errors.numReferencia}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="pagoOportuno">pagoOportuno</Label>
            <input
              className="form-control"
              name="pagoOportuno"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.apellido ? "pagoOportuno" : "pagoOportuno"
              }
            />
            {errors.pagoOportuno && (
              <div style={estilos}>
                <p>{errors.pagoOportuno}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">supension </Label>
            <input
              className="form-control"
              name="supension"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.supension ? "supension" : "supension"
              }
            />
            {errors.supension && (
              <div style={estilos}>
                <p>{errors.supension}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="email">totalPagar </Label>
            <input
              className="form-control"
              name="totalPagar"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.totalPagar ? "totalPagar " : "totalPagar"
              }
            />
            {errors.totalPagar && (
              <div style={estilos}>
                <p>{errors.totalPagar}</p>
              </div>
            )}
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">docRecibo </Label>
            <input
              className="form-control"
              name="docRecibo"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.docRecibo ? "docRecibo" : "docRecibo"
              }
            />
            {errors.docRecibo && (
              <div style={estilos}>
                <p>{errors.docRecibo}</p>
              </div>
            )}
          </FormGroup>
        </div>
      </Form>
      <div align="right">
        <Button color="primary" onClick={(e) => peticionPost(e)}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Agregar Huesped</h3>
      <Form>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">numReferencia</Label>
            <input
              className="form-control"
              name="numReferencia"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.nombre ? "numReferencia" : "numReferencia"
              }
            />
            {errors.numReferencia && (
              <div style={estilos}>
                <p>{errors.numReferencia}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="pagoOportuno">pagoOportuno</Label>
            <input
              className="form-control"
              name="pagoOportuno"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.apellido ? "pagoOportuno" : "pagoOportuno"
              }
            />
            {errors.pagoOportuno && (
              <div style={estilos}>
                <p>{errors.pagoOportuno}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">supension </Label>
            <input
              className="form-control"
              name="supension"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.supension ? "supension" : "supension"
              }
            />
            {errors.supension && (
              <div style={estilos}>
                <p>{errors.supension}</p>
              </div>
            )}
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="email">totalPagar </Label>
            <input
              className="form-control"
              name="totalPagar"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.totalPagar ? "totalPagar " : "totalPagar"
              }
            />
            {errors.totalPagar && (
              <div style={estilos}>
                <p>{errors.totalPagar}</p>
              </div>
            )}
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">docRecibo </Label>
            <input
              className="form-control"
              name="docRecibo"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.docRecibo ? "docRecibo" : "docRecibo"
              }
            />
            {errors.docRecibo && (
              <div style={estilos}>
                <p>{errors.docRecibo}</p>
              </div>
            )}
          </FormGroup>
        </div>
      </Form>
      <div align="right">
        <Button color="primary" onClick={(e) => peticionPost(e)}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );
  const bodyEliminar = (
    <div className={estilo.modal}>
      <p>
        Esta seguro de Eliminar Empleado{" "}
        <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ?
        <br />
        <b>{consolaSeleccionada && consolaSeleccionada.numDocumento}</b>
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Si
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );
  const bodyVer = (
    <div className={styles.modal}>
      <h3>Agregar Huesped</h3>
      <Form>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">numReferencia</Label>
            <input
              className="form-control"
              name="numReferencia"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.nombre ? "numReferencia" : "numReferencia"
              }
            />
            {errors.numReferencia && (
              <div style={estilos}>
                <p>{errors.numReferencia}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="pagoOportuno">pagoOportuno</Label>
            <input
              className="form-control"
              name="pagoOportuno"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.apellido ? "pagoOportuno" : "pagoOportuno"
              }
            />
            {errors.pagoOportuno && (
              <div style={estilos}>
                <p>{errors.pagoOportuno}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">supension </Label>
            <input
              className="form-control"
              name="supension"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.supension ? "supension" : "supension"
              }
            />
            {errors.supension && (
              <div style={estilos}>
                <p>{errors.supension}</p>
              </div>
            )}
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="email">totalPagar </Label>
            <input
              className="form-control"
              name="totalPagar"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.totalPagar ? "totalPagar " : "totalPagar"
              }
            />
            {errors.totalPagar && (
              <div style={estilos}>
                <p>{errors.totalPagar}</p>
              </div>
            )}
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">docRecibo </Label>
            <input
              className="form-control"
              name="docRecibo"
              onChange={handleChange}
              placeholder={
                !consolaSeleccionada?.docRecibo ? "docRecibo" : "docRecibo"
              }
            />
            {errors.docRecibo && (
              <div style={estilos}>
                <p>{errors.docRecibo}</p>
              </div>
            )}
          </FormGroup>
        </div>
      </Form>
      <div align="right">
        <Button color="primary" onClick={(e) => peticionPost(e)}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  useEffect(() => {
    peticionGet();
  }, []);
  const options = {
    filterType: "dropdown",
    responsive: "standard",
    /*  customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} />*/
  };
  return (
    <div>
      <div className="card shadow mb-4">
        <h6 className="m-0 font-weight-bold text-primary">Tabla de Recibos</h6>
        <div>
          <Button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-primary"
          >
            Agregar Recibo
          </Button>
        </div>
        <div>
          <MUIDataTable
            title={"Lista Recibos"}
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
      <Modal open={modalVer} onClose={abrirCerrarModalVer}>
        {bodyVer}
      </Modal>
    </div>
  );
}

export default TablaRecibos;
