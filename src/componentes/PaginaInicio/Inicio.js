import React, { useEffect, useState, useCallback } from "react";
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
import { useForm } from 'react-hook-form';
//Reactrap
import { Form, FormGroup, Label } from "reactstrap";
import { Modal } from 'react-bootstrap';
import Habitaciones from "./Habitaciones";
import TestimonioHuesped from "./TestimonioHuesped/TestimonioHuesped";
import { Spinner } from 'reactstrap';
//Iconos
import * as FaWifi from "react-icons/fa";
import * as MdBathtub from "react-icons/md";
import * as PiTelevisionBold from "react-icons/pi";
import * as MdOutlineBedroomParent from "react-icons/md";
import * as MdRoomService from "react-icons/md";
import * as GrClearOption from "react-icons/gr";
import * as BsPersonFillGear from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
//url
const urlG = Apiurl + "reservaciones/crearReservacion";

function Inicio() {
  const [data, setData] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [showReservacion, setReservacion] = useState(false);
  const handleReservacionClose = () => setReservacion(false);
  const handleReservacionShow = () => setReservacion(true);

  const [smShow, setSmShow] = useState(false);
  const handleMensajeClose = () => setSmShow(false);
  const handleShowMensaje = () => setSmShow(true);

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    fechaEntrada: "",
    fechaSalida: "",
    adultos: 0,
    ninos: 0,
    tipoDocumento: {
      codTipoDocumento: "",
      nomTipoDocumento: "",
    },
    numDocumento: "",
    nombre: "",
    apellido: "",
    email: "",
    habitacion: {
      codHabitacion: "",
      nombreHabitacion: {
        codTipoHabitacio: "",
        nombre: "",
        precioXPersona: "",
        precioXAcompanante: ""
      },
      descripHabitacion: "",
      numHabitacion: "",
      pisoHabitacion: "",
      maxPersonasDisponibles: "",
      estadoHabitacion: {
        codEstadoHabitacion: "",
        nombre: ""
      },
      imagenHabitacion: null
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
    try {
      console.log("ConsolaSeleccionada", consolaSeleccionada)
      const response = await axios.post(urlG, consolaSeleccionada);
      if (response.status === 201) {
        setData(data.concat(response.data));
        handleReservacionClose();
        setMensaje("La reservación ha sido Exitosa")
        handleShowMensaje();
        setConsolaSeleccionada({
          tipoDocumento: {
            codTipoDocumento: "",
            nomTipoDocument: "",
          },
          habitacion: {
            codHabitacion: "",
            nombreHabitacion: {
              codTipoHabitacio: "",
              nombre: "",
              precioXPersona: "",
              precioXAcompanante: ""
            },
            descripHabitacion: "",
            numHabitacion: "",
            pisoHabitacion: "",
            maxPersonasDisponibles: "",
            estadoHabitacion: {
              codEstadoHabitacion: "",
              nombre: ""
            },
            imagenHabitacion: null
          }
        })
        reset();
      } else {
        alert('Error', response.status);
      }
    } catch (error) {
      console.error("Error al realizar la reservación", error);
      alert("Hubo un error al crear la reservación. Por favor, intenta nuevamente.", error.response.data);
    }
  }

  //const abrirCerrarModalMensaje = () => {
  //  setModalMensaje(!modalMensaje);
  //  setTimeout(() => {
  //    setModalMensaje(false);
  //  }, 2000); // 2000 milisegundos = 2 segundos
  //};

  const bodyInsertar = (
    <div>
      <Form onSubmit={handleSubmit(peticionPost)}>
        <div className="flex" id="fomularioReservacion">
          <FormGroup>
            <div id="reservacion">
              <Label for="exampleEmail">Fecha de Entrada</Label>
              <input name="fechaEntrada" type="date" placeholder="fechaEntrada" className="form-control" onChange={handleChange} />
              {errors.fechaEntrada && <p id="errores">{errors.fechaEntrada.message}</p>}
            </div>
          </FormGroup>
          <FormGroup  >
            <div id="reservacion">
              <Label for="exampleEmail">Fecha de Salida</Label>
              <input name="fechaSalida" type="date" placeholder="fechaSalida" className="form-control" onChange={handleChange} />
              {errors.fechaSalida?.type === "required" && <p id="errores">El Campo es Requerido</p>}
              {errors.fechaSalida?.type === 'maxLength' && <p id="errores">Fecha no valida</p>}
              {errors.fechaSalida && <p id="errores">{errors.fechaSalida.message}</p>}
            </div>
          </FormGroup>
          <FormGroup>
            <div id="reservacion">
              <Label for="exampleEmail">Número de Adultos</Label>
              <input name="adultos" type="number" placeholder="# Adultos" max="5" min="1" className="form-control" id="fecha" onChange={handleChange} />
              {errors.adultos?.type === "required" && <p id="errores">Es Requerido</p>}
            </div>
          </FormGroup>
          <FormGroup>
            <div id="reservacion">
              <Label for="exampleEmail">Número de Niños</Label>
              <input name="ninos" type="number" placeholder="# Niños" min="0" max="4" className="form-control" id="fecha" onChange={handleChange} />
              {errors.ninos?.type === 'required' && <p id="errores"> Es requerido</p>}
            </div>
          </FormGroup>
          <FormGroup style={{ marginLeft: "7px" }}>
            <div id="reservacion">
              <Label for="exampleEmail">Tipo de Documento</Label>
              <TipoDocumento name="tipoDocumento" handleChangeData={handleChange} value={consolaSeleccionada.tipoDocumento} />
            </div>
          </FormGroup>
        </div>
        <div className="flex" id="fomularioReservacion">
          <FormGroup >
            <div id="reservacion">
              <Label for="exampleEmail"># Documento</Label>
              <input name="numDocumento" type="number" placeholder="Número de Documento" className="form-control" onChange={handleChange} />
            </div>
          </FormGroup>
          <FormGroup >
            <div id="reservacion">
              <Label for="exampleEmail">Nombre</Label>
              <input name="nombre" placeholder="Nombre" className="form-control" onChange={handleChange} />
              {errors.nombre?.type === 'required' && <p id="errores">El campo es requerido</p>}
              {errors.nombre?.type === 'maxLength' && <p id="errores">Es muy largo</p>}
            </div>
          </FormGroup>
          <FormGroup >
            <div id="reservacion">
              <Label for="exampleEmail">Apellido</Label>
              <input name="apellido" placeholder="Apellido" className="form-control" onChange={handleChange} />
              {errors.apellido?.type === 'required' && <p id="errores">El campo es requerido</p>}
              {errors.apellido?.type === 'maxLength' && <p id="errores">Es muy largo</p>}
            </div>
          </FormGroup>
          <FormGroup >
            <div id="reservacion">
              <Label for="exampleEmail">Correo Electronico</Label>
              <input name="email" type="email" placeholder="email" className="form-control" onChange={handleChange} />
              {errors.email?.type === "pattern" && <p id="errores">Dirección no valida</p>}
              {errors.email?.type === 'required' && <p id="errores">El campo es requerido</p>}
            </div>
          </FormGroup>
          <FormGroup style={{ marginLeft: "7px" }}>
            <div id="reservacion">
              <Label for="exampleEmail">Tipo Habitación </Label>
              <Habitaciones name="habitacion" handleChangeData={handleChange} value={consolaSeleccionada.habitacion} />
            </div>
          </FormGroup>
        </div>
        <div className="flex">
          {/* Indicador de carga */}
          {/*{isLoading && (
              <div className="loading-container">
                <div className="flex">
                  <Spinner color="primary" style={{ marginLeft: "200px" }} />
                  <div className="loading-spinner">Cargando</div>
                </div>
              </div>
            )}*/}
          <button type="submit" className="btn btn-success">Agendar</button>
          <button type="submit" className="btn btn-danger" onClick={handleReservacionClose}> Cancelar</button>
        </div>
      </Form >
      <br />
    </div >
  );

  const popUp = (
    <div>
      <div className="flex" style={{ marginLeft: "50px", alignContent: "center", alignItems: "center" }}>
        <FaCheck className="me-3" color="green" /><p>¡Reservación Exitosa!</p>
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
      <div className="testimonial_area section_gap" style={{ alignItems: "center", justifyContent: "center" }}>
        <div className="container">
          <div className="section_title text-left">
            <h2 className="title_color">Experimenta el Lujo y la Comodidad en Nuestras Habitaciones.</h2>
            <p>
              Bienvenido a Aparta Hotel Santandereano, donde el confort y la elegancia se combinan para ofrecerte una estancia inolvidable.
              Nuestras habitaciones han sido diseñadas pensando en tu comodidad y disfrute, y cada detalle ha sido cuidadosamente seleccionado
              para garantizar una experiencia única.
            </p>
          </div>
          {/* Caracteristicas de las habitaciones */}
          <b className="title_color">Caracteristicas de Nuestas Habitaciones: </b>
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
          <div className="row mb_30" style={{ alignItems: "center", justifyContent: "center" }}>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/302.jpg" alt="" style={{ height: "350px" }} />
                </div>
                <h4 className="sec_h4"> Individual <br />(1 Persona)</h4>
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
        <button type="submit" onClick={handleReservacionShow} className="btn btn-warning" style={{ height: "60px", width: "50%", marginLeft: "25%" }}>
          <h5 className="sec_h5">¡Reserva tu Habitación Aquí!</h5>
        </button>
      </div>
      {/* // Testimonio de los huespedes  */}
      <div className="testimonial_area section_gap" style={{ marginBottom: "0px" }}>
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">Lo que Nuestros Huéspedes dicen sobre su Estadía en El Santandereano:</h2>
            <p>
              En El Santandereano, nos enorgullece ofrecer un servicio excepcional y crear experiencias memorables
              para nuestros huéspedes. A continuación, compartimos algunos comentarios de aquellos que han tenido la
              oportunidad de alojarse con nosotros.
            </p>
          </div>
        </div>
        {/* //Cuadros de testimonios */}
        <div className="flex" style={{ marginLeft: "15%", height: "450px" }}>
          <TestimonioHuesped
            nombre="- Yerson Bautista."
            url="../../assets/img/yerson.jpg"
            description="Mi estancia en El Santandereano fue simplemente maravillosa. Desde la cálida bienvenida hasta 
            la atención al detalle en cada rincón, me sentí como en un hogar lejos de casa."/>
          <TestimonioHuesped
            nombre="Diego M."
            url="../../assets/img/yerson.jpg"
            description="Las habitaciones son elegantes y cómodas, con una hubicacióncentral. No podría habe pedido un 
            lugar mejor para relajarme durante mis vacaciones." />
          <TestimonioHuesped
            nombre="Valentina F."
            url="../../assets/img/valentina.png"
            description=" Mi familia y yo tuvimos una experiencia inolvidable en El Santandereano. Agradecemos 
            la atención del personal, que nos permitió sentirnos tranquilos.¡Gracias por hacer nuestras vacaciones tan especiales!"/>
        </div>
      </div>
      <div className="testimonial_area section_gap">
        <div className="section_title text-center">
          <p>
            Aquí te presentamos algunos comentarios positivos de huéspedes satisfechos, solo un vistazo a las experiencias que hemos compartido.
            En El Santandereano, dedicamos nuestros esfuerzos a superar tus expectativas en cada visita. Estamos ansiosos por la oportunidad de
            recibirte pronto y crear una experiencia inolvidable durante tu estancia.
          </p>
        </div>
      </div>
      {/* // footer */}
      <Footer />
      <Modal show={showReservacion} onHide={handleReservacionClose} animation={false} dialogClassName="Reservacion">
        <Modal.Header closeButton>
          <Modal.Title>Insertar Tipo Habitación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">{bodyInsertar}</Modal.Body>
      </Modal>
      <Modal show={smShow} onHide={handleMensajeClose} animation={false}>{popUp}</Modal>

      {/*<Modal show={modalMensaje} onHide={handleMsShow}>
        {popUp}
      </Modal>*/}
    </div >
  );
}
export default Inicio;