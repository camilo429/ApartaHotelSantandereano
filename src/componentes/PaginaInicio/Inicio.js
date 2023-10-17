import React, { useState } from "react";
//librerias
import axios from "axios";
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
import TipoDocumento from "../pagesAdministrador/TipoDocumento";
//Reactrap
import { Form, FormGroup, Label } from "reactstrap";
import { makeStyles } from "@mui/styles";
import { Modal } from "@mui/material";
import Habitaciones from "./Habitaciones";
import TestimonioHuesped from "./TestimonioHuesped/TestimonioHuesped";
//Iconos
import * as FaWifi from "react-icons/fa";
import * as MdBathtub from "react-icons/md";
import * as PiTelevisionBold from "react-icons/pi";
import * as MdOutlineBedroomParent from "react-icons/md";
import * as MdRoomService from "react-icons/md";
import * as GrClearOption from "react-icons/gr";
import * as BsPersonFillGear from "react-icons/bs";
//url
const urlhabitacionesDisponibles =
  Apiurl + "habitacion/listarHabitaciones/estado/Disponible";
const urlG = Apiurl + "reservaciones/crearReservacion";
//Expresiones regulares
const fecha = /^\d{4}-\d{2}-\d{2}$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const correoExpresion = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
const cedulaExpresion = /^[0-9]{6,10}$/;
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "70%",
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
let estilos = {
  fontWeight: "bold",
  color: "#dc3545",
};
function Inicio() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [errors, setErrors] = useState([]);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    fechaEntrada: "",
    fechaSalida: "",
    adultos: 0,
    ninos: 0,
    tipoDocumento: {
      codTipoDocumento: "",
      nomTipoDocument: "",
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
      imagenHabitacion: "s",
    },
  });

  const validacionesReservacion = (consolaSeleccionada) => {
    let errors = {};
    const fechaActual = new Date();
    // Obtener el año, el mes y el día
    const año = fechaActual.getFullYear(); // Año (cuatro dígitos)
    const mes = fechaActual.getMonth() + 1; // Mes (0-11, por lo que sumamos 1)
    const dia = fechaActual.getDate(); // Día del mes
    // Almacenar la fecha en una variable en formato "aaaa-mm-dd"
    const fechaEnTexto = `${año}-${mes < 10 ? "0" : ""}${mes}-${
      dia < 10 ? "0" : ""
    }${dia}`;
    if (!fecha.test(consolaSeleccionada.fechaEntrada)) {
      errors.fechaEntrada = "Fecha No Válida";
    }
    if (fechaEnTexto > consolaSeleccionada.fechaEntrada) {
      errors.fechaEntrada = "Ya es pasado!";
    }
    if (consolaSeleccionada.fechaEntrada === "") {
      errors.fechaEntrada = "Fecha No Elegida!";
    }
    if (!fecha.test(consolaSeleccionada.fechaSalida)) {
      errors.fechaSalida = "Fecha No Válida";
    }
    if (consolaSeleccionada.fechaSalida < consolaSeleccionada.fechaEntrada) {
      errors.fechaSalida = "Fecha de salida < Fecha de Entrada";
    }
    if (consolaSeleccionada.adultos < 1) {
      setConsolaSeleccionada.adultos = 0;
      errors.adultos = "La habitación debe ser ocupada";
    }
    if (consolaSeleccionada.ninos === 0) {
      setConsolaSeleccionada.ninos = 0;
      errors.ninos = "Si no llevas niños elige '0'";
    }
    let capacidad =
      parseInt(consolaSeleccionada.adultos) +
      parseInt(consolaSeleccionada.ninos);
    let maxPerson = parseInt(
      consolaSeleccionada.habitacion.maxPersonasDisponibles
    );
    if (capacidad > maxPerson) {
      errors.habitacion =
        "La cantidad maximas para esta habitación es superada";
    }
    if (consolaSeleccionada.tipoDocumento.nomTipoDocument === "") {
      errors.tipoDocumento = "Seleccione un tipo documento";
    }
    if (!cedulaExpresion.test(consolaSeleccionada.numDocumento)) {
      errors.numDocumento = "Número No valido";
    }
    if (!nameRegex.test(consolaSeleccionada.nombre)) {
      errors.nombre = "Nombre No valido";
    }
    if (!nameRegex.test(consolaSeleccionada.apellido)) {
      errors.apellido = "Apellido No valido";
    }
    if (!correoExpresion.test(consolaSeleccionada.email)) {
      errors.email = "Correo No valido";
    }
    if (consolaSeleccionada.habitacion.codHabitacion === "") {
      errors.habitacion = "Debe de elegir una Habitación";
    }
    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const peticionPost = async () => {
    //console.log(consolaSeleccionada)
    setErrors(validacionesReservacion(consolaSeleccionada));
    //console.log(Object.keys(errors).length);
    if (Object.keys(errors).length === 0) {
      const response = await axios.post(urlG, consolaSeleccionada);
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
      alert("La reservación ha sido creada");
    } else {
      alert("Ha ocurrido un error al solitar una reservación");
    }
  };
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
    clearInterval(setConsolaSeleccionada);
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
            {errors.fechaEntrada && (
              <div style={estilos}>
                <p>{errors.fechaEntrada}</p>
              </div>
            )}
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
            {errors.fechaSalida && (
              <div style={estilos}>
                <p>{errors.fechaSalida}</p>
              </div>
            )}
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Adultos</Label>
            <input
              name="adultos"
              type="number"
              placeholder="# Adultos"
              className="form-control"
              onChange={handleChange}
            />
            {errors.adultos && (
              <div style={estilos}>
                <p>{errors.adultos}</p>
              </div>
            )}
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Número de Niños</Label>
            <input
              name="ninos"
              type="number"
              placeholder="# Niños"
              className="form-control"
              onChange={handleChange}
            />
            {errors.ninos && (
              <div style={estilos}>
                <p>{errors.ninos}</p>
              </div>
            )}
          </FormGroup>
        </div>

        <div className="flex">
          <FormGroup className="me-2">
            <Label for="exampleEmail">Tipo de Documento</Label>
            <TipoDocumento
              name="tipoDocumento"
              handleChangeData={handleChange}
            />
            {errors.tipoDocumento && (
              <div style={estilos}>
                <p>{errors.tipoDocumento}</p>
              </div>
            )}
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
            {errors.numDocumento && (
              <div style={estilos}>
                <p>{errors.numDocumento}</p>
              </div>
            )}
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Nombre</Label>
            <input
              name="nombre"
              placeholder="Nombre"
              className="form-control"
              onChange={handleChange}
            />
            {errors.nombre && (
              <div style={estilos}>
                <p>{errors.nombre}</p>
              </div>
            )}
          </FormGroup>

          <FormGroup className="me-2">
            <Label for="exampleEmail">Apellido</Label>
            <input
              name="apellido"
              placeholder="apellido"
              className="form-control"
              onChange={handleChange}
            />
            {errors.apellido && (
              <div style={estilos}>
                <p>{errors.apellido}</p>
              </div>
            )}
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
            {errors.email && (
              <div style={estilos}>
                <p>{errors.email}</p>
              </div>
            )}
          </FormGroup>
          <FormGroup className="me-2 w-80">
            <Label for="exampleEmail">Tipo Habitación </Label>
            <Habitaciones
              name="habitacion"
              handleChangeData={handleChange}
              url={urlhabitacionesDisponibles}
            />
            {errors.habitacion && (
              <div style={estilos}>
                <p>{errors.habitacion}</p>
              </div>
            )}
          </FormGroup>
        </div>
      </Form>
      <br />
      <div align="right">
        <button className="btn btn-success" onClick={(e) => peticionPost(e)}>
          Agendar
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
                Ya sea que viajes por negocios o placer, nuestras habitaciones
                te brindarán el refugio perfecto. Reserva tu habitación hoy y
                descubre por qué somos la elección preferida de viajeros
                exigentes. ¡Esperamos darle la bienvenida pronto!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="testimonial_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">
              {" "}
              Experimenta el Lujo y la Comodidad en Nuestras Habitaciones.
            </h2>
            <p>
              Bienvenido a Aparta Hotel Santandereano, donde el confort y la
              elegancia se combinan para ofrecerte una estancia inolvidable.
              Nuestras habitaciones han sido diseñadas pensando en tu comodidad
              y disfrute, y cada detalle ha sido cuidadosamente seleccionado
              para garantizar una experiencia única.
            </p>
          </div>

          <b className="title_color">
            Caracteristicas de Nuestas Habitaciones:
          </b>
          <div
            style={{ textAlign: "initial", margin: "10px" }}
            className="flex"
          >
            <br />
            <div>
              <MdOutlineBedroomParent.MdOutlineBedroomParent className="me-2" />
              <b className="title_color">Amplias y Modernas: </b>
              <p>
                Nuestras habitaciones son espaciosas modernamente decoradas,
                proporcionando un ambiente relajante para tu estadía.
              </p>
            </div>
            <div>
              <MdBathtub.MdBathtub className="me-2" />
              <b className="title_color">Baños Privados: </b>
              <p>
                Cada habitación cuenta con un baño privad equipado con articulos
                de tocador de alta calidad y duchas de lluvia.
              </p>
            </div>
            <div>
              <FaWifi.FaWifi className="me-2" />
              <b className="title_color">Conexión Wi-Fi de Alta Velocidad: </b>
              <p style={{ marginRight: "5px" }}>
                Mantente conectado con el mundo gracias a nuestra rápida
                conexión Wi-Fi gratuita en todas las habitaciones.
              </p>
            </div>
            <div>
              <PiTelevisionBold.PiTelevisionBold className="me-2" />
              <b className="title_color">Televisión de Pantalla Plana: </b>
              <p>
                Relájate viendo tus programas favoritos enuna televisión de
                pantalla plana de alta definición.
              </p>
            </div>
          </div>
          <div
            style={{ textAlign: "initial", margin: "10px" }}
            className="flex"
          >
            <div>
              <MdRoomService.MdRoomService className="me-2" />
              <b className="title_color">Servicio a la Habitación: </b>
              <p>
                Disfruta de comida a domicilio de los mejores restaurante de la
                zona en la comodidad de tu habitación con nuestro servicio a la
                habitación disponible hasta las 11:00pm.
              </p>
            </div>
            <div>
              <GrClearOption.GrClearOption className="me-2" />
              <b className="title_color">Limpieza Impecable: </b>
              <p style={{ marginRight: "5px" }}>
                Nuestras habitaciones se mantienen en perfecto estado de
                limpieza para tu seguridad y comodidad.
              </p>
            </div>
            <div>
              <BsPersonFillGear.BsPersonFillGear className="me-2" />
              <b className="title_color">Atención Personalizada: </b>
              <p>
                Nuestro amable personal está siempre dispuesto a ayudarte con
                cualquier solicitud o necesidad que puedas tener durante tu
                estancia.
              </p>
            </div>
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
              Lo que Nuestros Huéspedes dicen sobre su Estadía en El
              Santandereano:
            </h2>
            <p>
              En El Santandereano, nos enorgullece brindar un servicio
              excepcional y crear experiencias memorables para nuestros
              huéspedes. Aquí tienes algunos comentarios de aquellos que han
              tenido la oportunidad de alojarse con nosotros.
            </p>
          </div>
        </div>
        {/* //Cuadros de testimonios */}
        <div className="flex" style={{ marginLeft: "15%" }}>
          <TestimonioHuesped
            nombre="- Yerson Bautista."
            url="../../assets/img/cliente1.jpg"
            description="Mi estancia en El Santandereano fue simplemente maravillosa. Desde
            la cálida bienvenida hasta la atención al detalle en cada rincón, me 
            sentí como en un hogar lejos de casa. "
          />
          <TestimonioHuesped
            nombre="Diego M."
            url="../../assets/img/cliente2.jpg"
            description="Las habitaciones son elegantes y cómodas, con una hubicación 
            central. No podría habe pedido un lugar mejor para relajarme durante mis 
            vacaciones."
          />
          <TestimonioHuesped
            nombre="Valentina F."
            url="../../assets/img/cliente3.jpg"
            description="Mi familia y yo tuvimos una experiencia inolvidable en El Santandereano
            . Los niños se pueden dejar solos en las habitaciones, gracias a que el persona está
            muy atentos a cualquier suceso o ruido extraño. ¡Gracias por hacer que neustras vacaciones
            sean especiales!"
          />
        </div>
        <div className="container">
          <div className="section_title text-center">
            <p>
              Estos son solo algunos ejemplos de los comentarios positivos que
              hemos recibido de nuestros huéspedes satisfechos. En El
              Santendereano, nos esforzamos por superar tus expectativas en cada
              visita. Esperamos tener la oportunidad de atenderte pronto y hacer
              que tu estancia sea igual de memorable.
            </p>
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
