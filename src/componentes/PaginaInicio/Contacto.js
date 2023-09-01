import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
//Estilos
import "../../vendors/bootstrap-datepicker/bootstrap-datetimepicker.min.css";
import "../../vendors/nice-select/css/nice-select.css";
import "../estilos/style.css";
import "../../css/responsive.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "../../css/sb-admin-2.min.css";
import "../../vendor/fontawesome-free/css/all.min.css";

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
    <div className="Contacto" style={{ background: "white", width:"100%" }}>
      <Navbar />
      <section className="breadcrumb_area">
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
      <div style={{ background: "white" }}>
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
          <form>
            <div className="form-row" style={{width:"80%"}}>
              <div className="form-group col-md-6">
                <label>Nombre</label>
                <input
                  className="form-control"
                  name="nombre"
                  placeholder="Ingrese su nombre"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Correo </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Ingrese su correo"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Número Celular</label>
                <input
                  type="number"
                  className="form-control"
                  name="numTelefono"
                  placeholder="Ingrese su número de telefono"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Mensaje</label>
                <input
                  className="form-control"
                  name="comentario"
                  type="texarea"
                  placeholder="Ingrese su mensaje"
                />
              </div>
            </div>
          </form>
          <div className="col-md-12 text-center">
            <button
              type="submit"
              value="submit"
              className="btn theme_btn button_hover"
            >
              Enviar Mensaje
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contacto;
