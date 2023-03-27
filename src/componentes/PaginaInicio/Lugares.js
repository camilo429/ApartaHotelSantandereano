import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../../css/styles.css";
import "../estilos/banderas.jpg";
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
            <h2 className="title_color">Lugares Especiales</h2>
            <p>
              El Aparta Hotel Santandereano, además de presentar varios de los
              servicios mostrados, está ubicado en un sector donde el comercio
              y lugares importantes para el desarrollo del país.
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
                    src="../../assets/img/abastos1.jpg"
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
                    src="../../assets/img/abastos1.jpg"
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
                    src="../../assets/img/abastos1.jpg"
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
                    src="../../assets/img/abastos1.jpg"
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
                    src="../../assets/img/abastos1.jpg"
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
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Lugares;
