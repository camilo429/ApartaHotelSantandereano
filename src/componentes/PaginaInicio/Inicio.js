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
import NavbarInicio from "./Navbar/NavbarInicio";
import Footer from "./Footer";
import { Apiurl } from "../../services/userService";
import TipoDocumento from "../pagesAdministrador/TipoDocumento";
import CaracteristicaHabitacion from "./CaracteristicaHabitacion"
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
      imagenHabitacion: "",
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
    const fechaEnTexto = `${año}-${mes < 10 ? "0" : ""}${mes}-${dia < 10 ? "0" : ""
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
      await axios
        .post(urlG, consolaSeleccionada)
        .then((response) => {
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
          alert("La reservación ha sido creada");
          setConsolaSeleccionada({
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
              imagenHabitacion: "",
            },
          });
        })
        .catch((error) => {
          console.log("error reservacion", error);
        });
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
      <NavbarInicio />
      {/* // is de background more the text in the center de display */}
      <div className="banner_area" style={{ height: "500px" }}>
        <div className="booking_table d_flex align-items-center">
          <div className="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0"></div>
          <div className="container">
            <div className="banner_content text-center">
              <h2>Tiempo de Descanso</h2>
              <p>
                ¡Tanto si viajas por negocios como por placer, nuestras habitaciones están diseñadas para
                ofrecerte el refugio perfecto! Reserva tu habitación hoy mismo y descubre por qué somos la
                elección preferida de viajeros exigentes. ¡Estamos emocionados por darte la bienvenida pronto!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="testimonial_area section_gap">
        <div className="container">
          <div className="section_title text-left">
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

          {/* Caracteristicas de las habitaciones */}
          <b className="title_color">
            Caracteristicas de Nuestas Habitaciones:
          </b>
          <div style={{ textAlign: "initial", margin: "10px" }} className="flex">
            <br />
            <CaracteristicaHabitacion
              componenteImg={<MdOutlineBedroomParent.MdOutlineBedroomParent />}
              caracteristica="Amplias y Modernas"
              description="Nuestras habitaciones son espaciosas modernamente decoradas, proporcionando un ambiente relajante para tu estadía." />
            <CaracteristicaHabitacion
              componenteImg={<MdBathtub.MdBathtub />}
              caracteristica="Baños Privados:"
              description="Cada habitación cuenta con un baño privad equipado con articulos de tocador de alta calidad y duchas de lluvia." />
            <CaracteristicaHabitacion
              componenteImg={<FaWifi.FaWifi />}
              caracteristica="Conexión Wi-Fi de Alta Velocidad"
              description="Mantente conectado con el mundo gracias a nuestra rápida conexión Wi-Fi gratuita en todas las habitaciones." />
            <CaracteristicaHabitacion
              componenteImg={<PiTelevisionBold.PiTelevisionBold />}
              caracteristica="Televisión de Pantalla Plana"
              description="   Relájate viendo tus programas favoritos enuna televisión de pantalla plana de alta definición." />
          </div>

          <div style={{ textAlign: "initial", margin: "10px" }} className="flex" >
            <CaracteristicaHabitacion
              componenteImg={<MdRoomService.MdRoomService />}
              caracteristica="Servicio a la Habitación"
              description="Disfruta de comida a domicilio de los mejores restaurante de la zona en la comodidad de tu habitación con nuestro servicio a la habitación disponible hasta las 11:00pm." />

            <CaracteristicaHabitacion
              componenteImg={<GrClearOption.GrClearOption />}
              caracteristica="Limpieza Impecable"
              description="Nuestras habitaciones se mantienen en perfecto estado de limpieza para tu seguridad y comodidad." />

            <CaracteristicaHabitacion
              componenteImg={<BsPersonFillGear.BsPersonFillGear />}
              caracteristica="Atención Personalizada"
              description="Nuestro amable personal está siempre dispuesto a ayudarte con cualquier solicitud o necesidad que puedas tener durante tu estancia." />
          </div>

          {/*Habitaciones  */}
          <div className="row mb_30">
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/302.jpg" alt="" style={{ height: "350px" }} />
                </div>
                <h4 className="sec_h4"> Individual <br /> (1 Persona)</h4>
                <h5> $35.000<small>/Noche</small></h5>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/205.jpg" alt="Habitación Para Pareja" />
                </div>
                <h4 className="sec_h4">Matrimonial <br /> (Pareja o Personas)</h4>
                <h5> $40.000<small>/Noche</small></h5>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/305.jpg" alt="" style={{ height: "350px" }} />
                </div>
                <h4 className="sec_h4"> Amigos <br /> (2 Personas)</h4>
                <h5>$45.000<small>/Noche</small></h5>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img"><img src="../../assets/img/101.jpg" alt="" /></div>
                <h4 className="sec_h4">
                  Habitación Familiar <br /> (5 Personas)
                </h4>

                <h5>$70.000<small>/Noche</small></h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial_area section_gap " >
        <button onClick={() => abrirCerrarModalInsertar()} className="btn btn-warning" style={{ height: "60px", width: "50%", marginLeft: "25%" }}>
          <h5 className="sec_h5">¡Reserva tu Habitación Aquí!</h5>
        </button>
      </div>

      {/* // Testimonio de los huespedes  */}
      <div className="testimonial_area section_gap ">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">Lo que Nuestros Huéspedes dicen sobre su Estadía en El Santandereano:
            </h2>
            <p>
              En El Santandereano, nos enorgullece ofrecer un servicio excepcional y crear experiencias memorables
              para nuestros huéspedes. A continuación, compartimos algunos comentarios de aquellos que han tenido la
              oportunidad de alojarse con nosotros.
            </p>
          </div>
        </div>
        {/* //Cuadros de testimonios */}
        <div className="flex" style={{ marginLeft: "15%" }}>
          <TestimonioHuesped
            nombre="- Yerson Bautista."
            url="../../assets/img/yerson.jpg"
            description="Mi estancia en El Santandereano fue simplemente maravillosa. Desde la cálida bienvenida hasta 
            la atención al detalle en cada rincón, me sentí como en un hogar lejos de casa."
          />
          <TestimonioHuesped
            nombre="Diego M."
            url="../../assets/img/yerson.jpg"
            description="Las habitaciones son elegantes y cómodas, con una hubicacióncentral. No podría habe pedido un 
            lugar mejor para relajarme durante mis vacaciones."
          />
          <TestimonioHuesped
            nombre="Valentina F."
            url="../../assets/img/valentina.png"
            description=" Mi familia y yo tuvimos una experiencia inolvidable en El Santandereano. Agradecemos 
            la atención del personal, que nos permitió sentirnos tranquilos.¡Gracias por hacer nuestras vacaciones tan especiales!"
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
    </div >
  );
}
export default Inicio;
