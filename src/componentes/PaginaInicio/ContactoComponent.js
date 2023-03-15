import React from "react";
import { Link } from "react-router-dom";
import GoogleMaps from "simple-react-google-maps";
import "../../vendor/owl-carousel/owl.carousel.min.css";
import "../../vendor/nice-select/css/nice-select.css";
import "../../vendor/owl-carousel/owl.carousel.min.css";

import "../../css/responsive.css";
import "../../vendor/linericon/style.css";

const ContactoComponent = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark" id="mainNav">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="index.html">
            Aparta Hotel Santandereano
          </a>
          <img
            src="/assets/img/facebook.png"
            alt="Es la imagen de facebook"
            style={{
              width: "25px",
              height: "25px",
              marginLeft: "35px",
            }}
          ></img>
          <img
            src="/assets/img/whatsapp.png"
            alt="Es la imagen de Whatsapp"
            style={{
              width: "55px",
              height: "55px",
              marginRight: "0px",
            }}
          />
          <div style={{ color: "white", marginLeft: "0px" }}>
            (+57)3107763328
          </div>
          <img
            src="/assets/img/instagram.png"
            alt="Es la imagen de instagram"
            style={{
              width: "25px",
              height: "25px",
              marginRight: "10px",
            }}
          />
          <div className="navbar-brand" id="navbarResponsive">
            <Link className="badge badge-light" to={`/Inicio`}>
              Inicio
            </Link>
            <Link className="badge badge-light" to={`/QuienesSomos`}>
              Nosotros
            </Link>
            <Link className="badge badge-light" to={`/Servicios`}>
              Habitaciones
            </Link>
            <Link className="badge badge-light" to={`/Contacto`}>
              Contacto
            </Link>
            <Link className="badge badge-light" to={`/Login`}>
              Login
            </Link>
          </div>
        </div>
      </nav>

      <header
        className="masthead"
        alt="Es la imagen de timbre"
        style={{
          backgroundImage: "url(/assets/img/timbre2.jpg)",
          width: "1500px",
          height: "500px",
        }}
      >
        <div class="col-md-10 col-lg-8 col-xl-7">
          <div style={{ color: "white", marginLeft: "80px", padding: "120px" }}>
            <h1>Contáctenos</h1>
            <br />
            <br />
            <p>Contáctenos</p>
          </div>
        </div>
      </header>

      <br />
      <br />
      <main class="mb-4">
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
              <h1>Envíenos su consulta, estamos para servirlo</h1>

              <div class="my-5">
                <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                  <div class="form-floating">
                    <input
                      class="form-control"
                      id="name"
                      type="text"
                      placeholder="Enter your name..."
                      data-sb-validations="required"
                    />
                    <label for="name">Nombre</label>
                    <br />
                    <br />
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="name:required"
                    >
                      El nombre es requerido
                    </div>
                  </div>
                  <br />
                  <br />

                  <div class="form-floating">
                    <input
                      class="form-control"
                      id="email"
                      type="email"
                      placeholder="Enter your email..."
                      data-sb-validations="required,email"
                    />
                    <label for="email">correo electronico</label>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="email:required"
                    >
                      Requerido
                    </div>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="email:email"
                    >
                      Correo no es valido
                    </div>
                  </div>
                  <br />

                  <div class="form-floating">
                    <input
                      class="form-control"
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number..."
                      data-sb-validations="required"
                    />
                    <label for="phone">Número de celular</label>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="phone:required"
                    >
                      Requerido
                    </div>
                  </div>
                  <br />

                  <div class="form-floating">
                    <label for="message">Mensaje o pregunta</label>
                    <br></br>
                    <br></br>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="message:required"
                    >
                      Requerido
                    </div>
                  </div>
                  <br />

                  <br />
                  <div class="d-none" id="submitSuccessMessage">
                    <div class="text-center mb-3">
                      <div class="fw-bolder">
                        Formulario correctamente diligenciado
                      </div>
                      Formulario activado
                      <br />
                      <a href="https://startbootstrap.com/solution/contact-forms">
                        https://ApartaHotelSantantandereano.com
                      </a>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div class="d-none" id="submitErrorMessage">
                    <div class="text-center text-danger mb-3">
                      Error al enviar el mensaje
                    </div>
                  </div>
                  <button
                    class="btn btn-primary "
                    id="submitButton"
                    type="submit"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div style={{ marginBottom: "50px" }}>
        <div className="container">
          <GoogleMaps
            apiKey={"AIzaSyATbG2zP_RkvgXW7pjWNbyubO6VaSpZ1vk"}
            style={{ height: "400px", with: "400px" }}
            zoom={13}
            center={{
              lat: 4.632369452800604,
              lng: -74.15449512172077,
            }}
            markers={[
              {
                lat: 4.632369452800604,
                lng: -74.15449512172077,
              },
            ]}
          />
        </div>
      </div>
      <div>
        <footer className="navbar navbar-dark bg-dark">
          <div className="badge badge-light">
            <div align="center">
              <img
                src="/assets/img/facebook.png"
                alt="Es la imagen de facebook"
                style={{
                  width: "25px",
                  height: "25px",
                  marginLeft: "350px",
                  marginRight: "25px",
                }}
              />
              <a
                className="navbar-brand"
                href="https://www.facebook.com/HotelSantandereanoBogota"
              >
                Facebook
              </a>
              <img
                src="/assets/img/instagram.png"
                alt="Es la imagen de instragram"
                style={{
                  width: "25px",
                  height: "25px",
                  marginLeft: "25px",
                  marginRight: "25px",
                }}
              />
              <a
                className="navbar-brand"
                href="https://www.instagram.com/HotelSantandereanoBogota"
              >
                Instagram
              </a>
              <img
                src="/assets/img/whatsapp.png"
                alt="Es la imagen de whatsapp"
                style={{
                  width: "55px",
                  height: "55px",
                  marginLeft: "15px",
                  marginRight: "15px",
                }}
              />
              <a
                className="navbar-brand"
                href="https://wa.me/3107763328?text=Quisiera%20saber%20el%20precio%20de%20los%20servicios%20y%20sus%20precios?"
              >
                Whatsapp (3107763328)
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default ContactoComponent;
