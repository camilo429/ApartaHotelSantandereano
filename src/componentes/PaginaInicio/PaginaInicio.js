import React from "react";
import { Link } from "react-router-dom";
import GoogleMaps from "simple-react-google-maps";

import "../../vendor/owl-carousel/owl.carousel.min.css";
import "../../vendor/nice-select/css/nice-select.css";
import "../../vendor/owl-carousel/owl.carousel.min.css";

const PaginaInicio = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="mainNav">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="index.html">  Aparta Hotel Santandereano</a>
          <img src="/assets/img/facebook.png" alt="Es la imagen de facebook" style={{ width: "25px", height: "25px", marginLeft: "35px", }}></img>
          <img src="/assets/img/whatsapp.png" alt="Es la imagen de Whatsapp"
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
            alt="Es la imagen de instragram"
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
            <Link className="badge badge-light" to={`/SobreNosotros`}>
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
        className="App-header"
        style={{
          backgroundImage: "url(/assets/img/frente1modificada.jpg)",
          width: "100%",
          height: "400px",
        }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <h1>Aparta Hotel Santandereano Bogotá Colombia</h1>
          <span className="subheading">
            Servicio las 24 horas, 365 días del año
          </span>
        </div>
      </header>

      <div
        style={{
          marginLeft: "100px",
          display: "inline-block",
          marginRight: "100px",
        }}
      >
        <h2 className="post-title">
          Somos el lugar perfecto para descansar y Retomar tu destino
        </h2>
        <br></br>
        <div style={{ color: "black" }}>
          <p>
            El Aparta Hotel Santandereano se encuentra en el distrito de Kennedy
            de Bogotá "Cr 80a #2-15", a 100 metros de la entrada principal de
            Corabastos (Central de alimentos más grande del país), a 2km de la
            estación Banderas de Transmilenio y a 4km del parque de Cayetano
            cañizares.
          </p>

          <div>
            <div align="center">
              <img src="/assets/img/abastos1.jpg" alt="Es la imagen de abastos" style={{ width: "350px", height: "250px", float: "left", marginLeft: "35px", }} />
            </div>

            <div>
              <img src="/assets/img/cañizares.png" alt="Es la imagen de calletano canizarez" style={{ width: "350px", height: "250px", float: "left", marginLeft: "10px", }} />
            </div>

            <div>
              <img src="/assets/img/banderas.jpg" alt="Es la imagen de la estación banderas" style={{ width: "350px", height: "250px", marginLeft: "10px", }} />
            </div>
          </div>

          <div className="">
            <hr className="my-4" />
            <br></br>
            <p>
              Todas las habitaciones tienen un promedio de dimensión de 25
              metros cuadrados, incluyen televisión pantalla plana con 125
              canales por cable, conexión wifi cama, mesa de noche, y baño
              privado con artículos de aseo gratuitos y ducha caliente.
              <br></br>
              <br></br>
              El establecimiento cuenta con convenios en alimentación como lo
              son POSTOBON, RAMO, Super Ricas, Pronto Pollo, Tatais pizza,
              Guiben’s pizza, JIREH Pizza Dos, El Punto estelar, entre otros. A
              esto se agrega que el sector es muy comercial, alrededor de dos
              cuadras del aparta hotel se encuentran en promedio unos 10 a 15
              restaurantes, con diferentes variedades de platos al gusto.
              <br></br>
              <br></br>
              El establecimiento cuenta con un lugar de parqueadero para 3 motos
              y un automóvil sencillo.
              <br></br>
            </p>
            <img src="/assets/img/101.jpg" alt="Es la imagen de habitaición 101" style={{
              width: "300px",
              height: "250px",
              float: "left",
              marginLeft: "25px",
            }}
            />
            <img
              src="/assets/img/2022.jpg"
              alt="Es la imagen de habitación 202"
              style={{
                width: "300px",
                height: "250px",
                float: "left",
                marginLeft: "25px",
                padding: "15px",
              }}
            />
            <img
              src="/assets/img/207.jpg"
              alt="Es la imagen de habitación 207"
              style={{
                width: "300px",
                height: "250px",
                marginLeft: "25px",
                marginRight: "9px",
              }}
            />
          </div>

          <hr className="my-4" />

          <div className="">
            <p>
              A las parejas les encanta la ubicación,cuando su presupuesto es
              limitado, pero buscan el mejor hospedaje. calidad-precio - Le han
              puesto una valoración de 8,8 para viajes de negocios, hospedaje de
              amanecida.
              <br></br>
              <br></br>
              Para el hotel es un placer recibirle a usted, a su familia o
              amigos. También son bienvenidos los eventos sociales de pequeña y
              mediana escala.
            </p>
          </div>

          <div>
            <div align="left">
              <img
                src="/assets/img/parqueadero.jpg"
                alt="Es la imagen del parqueadero"
                style={{
                  width: 400,
                  height: 250,
                  float: "left",
                  margin: "45px",
                }}
              ></img>
            </div>
            <div>
              <img
                src="/assets/img/recepcion.jpg"
                alt="Es la imagen de la reception"
                style={{
                  width: "400px",
                  height: "250px",
                  margin: "45px",
                }}
              ></img>
            </div>
          </div>

          <br></br>
          <hr className="my-4" />
          <br></br>
          <h2 className="post-title">Estamos Ubicados en: carrera 80a#2-15</h2>
          <br></br>
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
          <br></br>
          <br></br>
        </div>
      </div>

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
              alt="Es la imagen de facebook"
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
              alt="Es la imagen de Whatsapp"
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
  );
};
export default PaginaInicio;
