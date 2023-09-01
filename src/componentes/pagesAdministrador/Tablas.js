import React, { useEffect, useState } from "react";
//Librerias
import axios from "axios";
//Estilos
import { makeStyles } from "@mui/styles";
import { Form, FormGroup, Label } from "reactstrap";
import "../../App.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Huesped.css"
//iconos
import { Modal, Button } from "@mui/material";
import * as AiFillEdit from "react-icons/ai";
import * as MdDelete from "react-icons/md";
import * as BsInfoLg from "react-icons/bs";
// url
import { Apiurl } from "../../services/userService";
const url = Apiurl + "reservaciones/listarHuespedes";
const urlG = Apiurl + "reservaciones/crearReservacion";
const urlE = Apiurl + "reservaciones/actualizarHuesped/";
const urlD = Apiurl + "reservaciones/eliminarhuesped/";


let estilos = {
  fontWeight: "bold",
  color: "#dc3545"
}
function Reservacion() {

  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalVer, setModalVer] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    codReservacion:"",
    fechaEntrada:"",
    fechaSalida:"",
    totalDias:"",
    adultos:"",
    ninos:"",
    tipoDocumento:"",
    numDocumento:"",
    nombre:"",
    apellido:"",
    email:"",
    habitacion:"",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const peticionGet = async () => {
    axios.request({
      method: "get",
      url: url,
      withCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    }).then(response => {
      if (response.status === 200) {
        setData(response.data);
        console.log(response.data);
      }
    })
  };
  useEffect(() => {
    peticionGet();
  }, []);
  return (
    <div className="Huespedes">
      <br />
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="flex">
            <h6 className="m-0 font-weight-bold text-primary">
              Reservaciones
            </h6>
          </div>
        </div>
        <div className="flex">
          <Button
            onClick={() => abrirCerrarModalInsertar()}
            className="btn btn-primary"
          >
            Buscar reservación
          </Button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" >
              <thead>
                <tr>
                  <th>fechaEntrada</th>
                  <th>fechaSalida</th>
                  <th>totalDias</th>
                  <th># adultos</th>
                  <th># ninos</th>
                  <th>nombre</th>
                  <th>Apellido</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((consola, idx) => {
                  return (
                    <tr key={consola.codReservacion} >
                      <td>{consola.fechaEntrada}</td>
                      <td>{consola.fechaSalida}</td>
                      <td>{consola.totalDias}</td>
                      <th>{consola.adultos}</th>
                      <th>{consola.ninos}</th>
                      <th>{consola.nombre}</th>
                      <th>{consola.apellido}</th>
                      <th>
                        <Button
                          className="flex"
                          onClick={() => seleccionarEmpleado(consola, "Editar")}
                        >
                          <AiFillEdit.AiFillEdit className="me-2" />
                          Editar
                        </Button>

                        <br></br>
                        <Button
                          className="flex"
                          onClick={() => seleccionarEmpleado(consola, "Eliminar")}
                        >
                          <MdDelete.MdDelete className="me-2" />
                          Eliminar
                        </Button>
                        <br></br>
                        <Button
                          className="flex"
                          onClick={() => seleccionarEmpleado(consola, "Ver")}
                        >
                          <BsInfoLg.BsInfoLg className="me-2" />
                          Ver Info
                        </Button>
                      </th>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item"><a className="page-link" >Anterior</a></li>
                <li className="page-item"><a className="page-link" >1</a></li>
                <li className="page-item"><a className="page-link" >2</a></li>
                <li className="page-item"><a className="page-link" >3</a></li>
                <li className="page-item"><a className="page-link" >Siguiente</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservacion;
