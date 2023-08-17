import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Contacto() {
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

  return (
    <div>
      <Navbar />
      <section className="breadcrumb_area">
        <div
          className="overlay bg-parallax"
          data-stellar-ratio="0.8"
          data-stellar-vertical-offset="0"
          data-background=""
        ></div>
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
      <div>
        <br></br>
        <hr className="my-4" />
        <br></br>
        <h2 className="post-title">Estamos Ubicados en: carrera 80a#2-15</h2>
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
        <br></br>
        <br></br>
      </div>

      {/* //mostramos la información para el mensaje */}
      <div className="flex" style={{width:"90%", marginLeft:"10%"}}>
        {" "}
        <div className="col-md-3">
          <div className="contact_info">
            <div className="info_item">
              <i className="lnr lnr-home"></i>
              <h6>Bogotá, Colombia</h6>
              <p>Aparta Hotel Santandereano; (kennedy)</p>
            </div>
            <div className="info_item">
              <i className="lnr lnr-phone-handset"></i>
              <h6>
                <a href="/whatsapp.com">(57) 3107763328</a>
              </h6>
              <p>Servicio24 Horas</p>
            </div>
            <div class="info_item">
              <i class="lnr lnr-envelope"></i>
              <h6>
                <a href="/gmail.com">apartahotelsantandereano@gmail.com</a>
              </h6>
              <p>Envie su comentario o pregunta.</p>
            </div>
          </div>
        </div>
        {/* // enviar mensaje o pregunta */}
        <div className="col-md-9">
          <form
            className="row contact_form"
            action="contact_process.php"
            method="post"
            id="contactForm"
            novalidate="novalidate"
          >
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Ingrese su nombre"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Ingrese su correo"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  placeholder="Ingrese su número de telefono"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="message"
                  id="message"
                  rows="1"
                  placeholder="Ingrese su mensaje"
                ></textarea>
              </div>
            </div>
            <div className="col-md-12 text-right">
              <button
                type="submit"
                value="submit"
                className="btn theme_btn button_hover"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contacto;
