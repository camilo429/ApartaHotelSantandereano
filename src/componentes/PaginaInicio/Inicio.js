import React, { useState } from "react";
//librerias
import axios from "axios";
//import $ from "jquery";
//Estilos
import "../../vendors/bootstrap-datepicker/bootstrap-datetimepicker.min.css";
import "../../vendors/nice-select/css/nice-select.css";
import "../estilos/style.css";
import "../../css/responsive.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "../../css/sb-admin-2.min.css";
import "../../vendor/fontawesome-free/css/all.min.css";
//Components
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Apiurl } from "../../services/userService";
import TipoDocumento from "../pagesAdministrador/TipoDocumento"
//Reactrap
import { Form, FormGroup, Label, Input } from "reactstrap";
import { makeStyles } from "@mui/styles";
import { Modal } from "@mui/material";
import Habitaciones from "./Habitaciones";
//url
const urlhabitacionesDisponibles = Apiurl + "habitacion/listarHabitaciones/estado/Disponible";
const urlG = Apiurl + "reservaciones/crearReservacion";
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
function Inicio() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    fechaEntrada: "",
    fechaSalida: "",
    adultos: 0,
    ninos: 0,
    tipoDocumento: {
      codTipoDocumento: "",
      nomTipoDocument: ""
    },
    numDocumento: "",
    nombre: "",
    apellido: "",
    email: "",
    habitacion: {
      codHabitacion: "",
      nombreHabitacion: "",
      descripHabitacion: "",
      numHabitacion: "",
      pisoHabitacion: "",
      maxPersonasDisponibles: "",
      precioDia: "",
      estadoHabitacion: "",
      imagenHabitacion: "s"
    }
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const peticionPost = async () => {
    console.log(consolaSeleccionada)
    const response = await axios.post(urlG, consolaSeleccionada);
    setData(data.concat(response.data));
    abrirCerrarModalInsertar();
    alert("La reservación ha sido creada");
  };
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agendar una Reservación</h3>
      <Form style={{ marginLeft: "3%" }}>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Entrada</Label>
            <input
              name="fechaEntrada"
              type="date"
              placeholder="fechaEntrada"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail">Fecha de Salida</Label>
            <input
              name="fechaSalida"
              type="date"
              placeholder="fechaSalida"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Adultos</Label>
            <input
              name="adultos"
              placeholder="# Adultos"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Niños</Label>
            <input
              name="ninos"
              placeholder="# Niños"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo de Documento</Label>
            <TipoDocumento
              name="tipoDocumento"
              handleChangeData={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2">
            <Label for="exampleEmail"># Documento</Label>
            <input
              name="numDocumento"
              type="number"
              placeholder="Número de Documento"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre</Label>
            <input
              name="nombre"
              placeholder="Nombre"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Apellido</Label>
            <Input
              name="apellido"
              placeholder="apellido"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Correo Electronico</Label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="form-control"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="me-2 w-80">
            <Label for="exampleEmail">habitacion</Label>
            <Habitaciones
              name="habitacion"
              handleChangeData={handleChange}
              url={urlhabitacionesDisponibles}
            />
          </FormGroup>
        </div>
      </Form>
      <br />
      <div align="right">
        <button className="btn btn-success" onClick={(e) => peticionPost(e)}>
          Agendar
        </button>
        <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
      </div>
    </div>
  );
  return (
    <div>
      <Navbar />
      {/* // is de background more the text in the center de display */}
      <div className="banner_area" style={{ height: "500px" }}>
        <div className="booking_table d_flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset="0"
          ></div>
          <div className="container">
            <div className="banner_content text-center">
              <h2>Tiempo de Descanso</h2>
              <p>
                Si necesitas en necesitas un hospedaje en Bogotá, esta es tu mejor
                opción <br /> Diferentes habitaciones a diferentes precios pero con la
                misma calidad.
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="testimonial_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">Aparta Hotel Santadereano</h2>
            <p>
              Somos lo que usted necesita para descansar... <br />
              No dude en ver nuestras habitaciones, precios y sobre todo AGENDAR
            </p>
          </div>
          {/* //espacio para poner las habitaciones  */}
          <div className="row mb_30">
            {/* // Espacio para poner una a una la habitación */}
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/101.jpg" alt="" />
                </div>
                <button
                  onClick={() => abrirCerrarModalInsertar()}
                  className="btn btn-warning"
                  style={{ marginTop: "2%", width: "100%", height: "40%" }}
                >
                  Agendar Habitación
                </button>
                <a href="/Home">
                  <h4 className="sec_h4">
                    Habitación Familiar <br /> (5 Personas)
                  </h4>
                </a>
                <h5>
                  $50.000<small>/Noche</small>
                </h5>
              </div>
            </div>
            {/* // Segunda habitación */}
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/205.jpg" alt="" />
                </div>
                <button
                  onClick={() => abrirCerrarModalInsertar()}
                  className="btn btn-warning"
                  style={{ marginTop: "2%", width: "100%", height: "40%" }}
                >
                  Agendar Habitación
                </button>
                <a href="/Home">
                  <h4 className="sec_h4">
                    Matrimonial <br /> (Pareja o Personas){" "}
                  </h4>
                </a>
                <h5>
                  $35.000<small>/Noche</small>
                </h5>
              </div>
            </div>
            {/* // Tercer habitación */}
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/205.jpg" alt="" />
                </div>
                <button
                  onClick={() => abrirCerrarModalInsertar()}
                  className="btn btn-warning"
                  style={{ marginTop: "2%", width: "100%", height: "40%" }}
                >
                  Agendar Habitación
                </button>
                <a href="/Home">
                  <h4 className="sec_h4">
                    Individual <br /> (1 Persona)
                  </h4>
                </a>
                <h5>
                  $30.000<small>/Noche</small>
                </h5>
              </div>
            </div>
            {/* //Cuarta Habitación */}
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/101.jpg" alt="" />
                </div>
                <button
                  onClick={() => abrirCerrarModalInsertar()}
                  className="btn btn-warning"
                  style={{ marginTop: "2%", width: "100%", height: "40%" }}
                >
                  Agendar Habitación
                </button>
                <a href="/Home">
                  <h4 className="sec_h4">
                    Amigos <br /> (2 Personas)
                  </h4>
                </a>
                <h5>
                  $40.000<small>/Noche</small>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* // Testimonio de los huespedes  */}

      <div className="testimonial_area section_gap ">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">
              Comentarios de nuestros huéspedes frecuentes
            </h2>
            <p>
              Historias y comentarios realizados de parte de nuestros huéspedes
              más habituales <br />
              para nuestros futuros huéspedes
            </p>
          </div>
        </div>
        {/* //Cuadros de testimonios */}

        <div className="flex" style={{ marginLeft: "15%" }}>
          <div
            className="testimonial_slider"
            style={{ width: "300px", height: "250px", margin: "10px" }}
          >
            <div className="testimonial_item">
              <img
                className="rounded-circle"
                src="../../assets/img/fotoperfil.png"
                alt="foto del primer cliente"
                style={{ width: "120px", height: "120px" }}
              />
              <div className="media-body">
                <p>Es un hotel expectacular</p>
                <a href="/Home">
                  <h4 className="sec_h4">Camilo Ahumada</h4>
                </a>
              </div>
            </div>
          </div>

          <div className="flex">
            <div
              className="testimonial_slider flex"
              style={{ width: "300px", height: "250px", margin: "10px" }}
            >
              <div className=" testimonial_item">
                <img
                  className="rounded-circle"
                  src="../../assets/img/fotoperfil.png"
                  alt=""
                  style={{ width: "120px", height: "120px" }}
                />
                <div className="media-body">
                  <p>Diego medina es el mejor hotel que estado viendo</p>
                  <a href="/Home">
                    <h4 className="sec_h4">Diego Medina</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div
              className="testimonial_slider flex"
              style={{ width: "300px", height: "250px", margin: "10px" }}
            >
              <div className=" testimonial_item">
                <img
                  className="rounded-circle"
                  src="../../assets/img/fotoperfil.png"
                  alt=""
                  style={{ width: "120px", height: "120px" }}
                />
                <div className="media-body">
                  <p>Diego medina es el mejor hotel que estado viendo</p>
                  <a href="/Home">
                    <h4 className="sec_h4">Diego Medina</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // footer */}
      <Footer />
      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>
    </div>
  );
}
export default Inicio;
