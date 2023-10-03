//componentes
import Footer from "./Footer";
import Navbar from "./Navbar";
//Hooks
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
//Estilos
import "../../vendors/bootstrap-datepicker/bootstrap-datetimepicker.min.css";
import "../../vendors/nice-select/css/nice-select.css";
import "../estilos/style.css";
import "../../css/responsive.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "../../css/sb-admin-2.min.css";
import "../../vendor/fontawesome-free/css/all.min.css";
//librerias
import axios from "axios";
import { Apiurl } from "../../services/userService"
//Dirrección
const url = Apiurl + "comentarios/crearComentario"
//Expresiones Regulares
const nameRegex = /^[a-zA-Z\s]+$/;
const correoExpresion = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/
let estilos = {
  fontWeight: "bold",
  color: "#dc3545"
}
function Contacto() {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formulario, setFormulario] = useState({
    codComentario: "",
    nombre: "",
    email: "",
    numTelefono: "",
    comentario: "",
    fechaEnviado: "",
    horaEnviado: ""
  });
  function validacionesFormulario(formulario) {
    if (!nameRegex.test(formulario.nombre)) {
      errors.nombre = "Nombre no valido";
    }
    if (!correoExpresion.test(formulario.email)) {
      errors.email = "Correo No valido";
    }
    if (formulario.numTelefono.length < 10 || formulario.numTelefono.length > 10) {
      errors.numTelefono = "El número debe tener 10 digitos";
    }
    if (formulario.comentario.length === 0) {
      errors.comentario = "El Comentario está vacio";
    }
    if (formulario.comentario.length > 100) {
      errors.comentario = "El comentario enviado supera los 100 caracteres";
    }
    return errors;
  }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB98G8_CHNNlhya9B1iiolBxsxp4UDZc60",
  });
  const mapCenter = {
    lat: 4.632369452800604,
    lng: -74.15449512172077,
  };

  if (!isLoaded) {
    return (
      <div className="container">
        {" "}
        <p>Está cargando el mapa</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionPost = async (e) => {

    let fechaActual = new Date();
    let hora = fechaActual.getHours();
    let dia = fechaActual.getDay();

    setFormulario.horaEnviado = hora;
    setFormulario.fechaActual = dia;
    console.log("data seleccionada", formulario);
    setErrors(validacionesFormulario(formulario));
    if (Object.keys(errors).length === 0) {
      const response = await axios.post(url, formulario)
      setData(data.concat(response.data));
      setFormulario({
        codComentario: "",
        nombre: "",
        email: "",
        numTelefono: "",
        comentario: "",
        fechaEnviado: "",
        horaEnviado: ""
      });
      alert("¡Gracias por ser parte de la familia de El Santandereano" +
        " y por compartir tus pensamientos y sugerencias con nosotros!");
    }
  };

  return (
    <div className="Contacto">
      <Navbar />
      <section className="breadcrumb_area">
        <div
          className="overlay bg-parallax"
          data-stellar-ratio="0.8"
          data-stellar-vertical-offset="0"
          data-background=""
        />
        <div className="container">
          <div className="page-cover text-center">
            <h2 className="page-cover-tittle">Contactanos</h2>
            <ol className="breadcrumb">
              <li>
                <a href="inicio.html">Inicio</a>
              </li>
              <li className="active">Contactanos</li>
            </ol>
          </div>
        </div>
      </section>
      <section>
        <div>
          <br></br>
          <h2 className="post-title">Estamos Ubicados en: Carrera 80a#2-15</h2>
          <br></br>
          <div className="container">
            <GoogleMap
              mapContainerStyle={{ height: "400px", with: "400px" }}
              zoom={13}
              center={mapCenter}
            >
              <Marker
                position={{ lat: 4.632369452800604, lng: -74.15449512172077 }}
              />
            </GoogleMap>
          </div>
        </div>
      </section>

      {/* //mostramos la información para el mensaje */}
      <section className="accomodation_area section_gap" style={{ paddingTop: "20px" }}>
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">
              ¡Tu Opinión es Importante para Nosotros!
            </h2>
            <p>
              En El Santandereano, valoramos la opinión de nuestros huéspedes
              y estamos siempre buscando maneras de mejorar tu experiencia. Si
              has tenido una estancia reciente con nosotros o tienes alguna sugerencia,
              por favor, compártela con nosotros a través de nuestra caja de comentarios.
              Estamos ansiosos por escucharte y asegurarnos de que tu próxima visita sea
              aún mejor.
            </p>
          </div>
          <h2 className="title_color">
            Caja de Comentarios y Sugerencias:
          </h2>
        </div>
        <div className="flex" >
          {" "}
          <div className="col-md-3" style={{ width: "100%", marginRight: "5%" }}>
            <div className="contact_info">
              <div className="info_item">
                <i className="lnr lnr-home"></i>
                <h6>Bogotá, Colombia</h6>
                <p>Aparta Hotel Santandereano (kennedy) +(57) 3107763328</p>
                <p>Servicio las 24/7/365 año</p>
              </div>
              <div className="info_item">
                <i className="lnr lnr-envelope"></i>
                <h6>
                  <a href="/gmail.com">apartahotelsantandereano@gmail.com</a>
                </h6>
                <p>Envie su comentario o pregunta.</p>
              </div>
            </div>
          </div>
          {/* // enviar mensaje o pregunta */}
          <div className="form">
            <form >
              <div className="form-row" style={{ width: "80%" }}>
                <div className="form-group col-md-6">
                  <input
                    className="form-control"
                    name="nombre"
                    placeholder="Ingrese su nombre"
                    onChange={handleChange}
                    value={formulario.nombre}
                  />
                  {
                    errors.nombre &&
                    <div style={estilos}>
                      <p>{errors.nombre}</p>
                    </div>
                  }
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formulario.email}
                    placeholder="Ingrese su correo"
                    onChange={handleChange}
                  />
                  {
                    errors.email &&
                    <div style={estilos}>
                      <p>{errors.email}</p>
                    </div>
                  }
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    name="numTelefono"
                    placeholder="Ingrese su número de telefono"
                    onChange={handleChange}
                    value={formulario.numTelefono}
                  />
                  {
                    errors.numTelefono &&
                    <div style={estilos}>
                      <p>{errors.numTelefono}</p>
                    </div>
                  }
                </div>
                <div className="form-group col-md-6">
                  <textarea
                    className="form-control"
                    name="comentario"
                    type="texarea"
                    placeholder="Ingrese su mensaje"
                    onChange={handleChange}
                    value={formulario.comentario}
                  />
                  {
                    errors.comentario &&
                    <div style={estilos}>
                      <p>{errors.comentario}</p>
                    </div>
                  }
                </div>
              </div>
            </form>
            <div className="col-md-12 text-center">
              <button
                type="submit"
                value="submit"
                className="btn theme_btn button_hover"
                onClick={(e) => peticionPost(e)}
              >
                Enviar Mensaje
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contacto;
