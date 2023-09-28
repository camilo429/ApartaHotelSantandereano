import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../../css/styles.css";

function Lugares() {
  return (
    <div className="Lugares">
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
            <h2 className="page-cover-tittle">Alojamiento</h2>
            <ol className="breadcrumb">
              <li>
                <a href="index.html">Inicio</a>
              </li>
              <li className="active">Alojamiento</li>
            </ol>
          </div>
        </div>
      </section>
      <section className="accomodation_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">Lugares Cercanos</h2>
            <p>
              En El Santandereano, te ofrecemos no solo un lugar cómodo para quedarte,
              sino también una ubicación privilegiada que te permite acceder fácilmente
              a emocionantes atracciones y servicios cercanos. Aquí tienes una lista de
              lugares de interés que se encuentran a poca distancia de nuestro hotel:
            </p>
          </div>
          <div className="row mb_30">
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img
                    src="../../assets/img/abastos1.jpg"
                    alt=""
                    style={{ width: "250px", height: "300px" }}
                  />
                </div>
                <a href="/Inicio">
                  <h4 className="sec_h4">Corabastos</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img
                    src="../../assets/img/cañizares.PNG"
                    alt=""
                    style={{ width: "250px", height: "300px" }}
                  />
                </div>
                <a href="/Inicio">
                  <h4 className="sec_h4">Parque Cañizares</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img
                    src="../../assets/img/tintal.jpg"
                    alt=""
                    style={{ width: "250px", height: "300px" }}
                  />
                </div>
                <a href="/Inicio">
                  <h4 className="sec_h4">Centro comercial Tintal</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img
                    src="../../assets/img/banderas.jpg"
                    alt=""
                    style={{ width: "250px", height: "300px" }}
                  />
                </div>
                <a href="/Inicio">
                  <h4 className="sec_h4">
                    Estación Transmilenio <br /> Banderas{" "}
                  </h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img
                    src="../../assets/img/rcn.jpg"
                    alt=""
                    style={{ width: "250px", height: "300px" }}
                  />
                </div>
                <a href="/Inicio">
                  <h4 className="sec_h4">RCN</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img
                    src="../../assets/img/flores.jpg"
                    alt=""
                    style={{ width: "250px", height: "300px" }}
                  />
                </div>
                <a href="/Inicio">
                  <h4 className="sec_h4">Flores</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img
                    src="../../assets/img/bomberos.jpg"
                    alt=""
                    style={{ width: "250px", height: "300px" }}
                  />
                </div>
                <a href="/Inicio">
                  <h4 className="sec_h4">Bomberos de Kennedy</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img
                    src="../../assets/img/hospialKenndy.jpg"
                    alt=""
                    style={{ width: "250px", height: "300px" }}
                  />
                </div>
                <a href="/Inicio">
                  <h4 className="sec_h4">Hospital de Kennedy</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="section_title text-center">
            <h2 className="title_color">Recomendaciones</h2>
            <p>
              Ya sea que estés interesado en la historia, la cultura, las compras
              o la gastronomía, hay algo para todos a solo unos pasos de nuestro hotel.
              Nuestro amable personal estará encantado de proporcionarte recomendaciones
              adicionales y ayudarte a planificar tu itinerario.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Lugares;
