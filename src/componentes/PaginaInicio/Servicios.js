import React from "react";
import { Link } from "react-router-dom";

const ServiciosComponent = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark" id="mainNav">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="index.html">
            Aparta Hotel Santandereano
          </a>
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
        className="App-header"
        style={{
          backgroundImage: "url(/assets/img/puertahotel.jpg)",
          height: "450px",
          width:"1300px"
        }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="col-md-10 col-lg-8 col-xl-7">
            <div className="post-heading">
              <h1>Servicios que prestamos y nuestras instalaciones</h1>
              <br></br>
              <h2 className="subheading">
                En la zona de contacto pregunte por lo que no vea
              </h2>
            </div>
          </div>
        </div>
      </header>

      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <br></br>
              <br></br>
              <h2 className="section-heading">
                Nuestro servicio principal es de hospedaje por noche
              </h2>
              <br></br>
              <br></br>
              <img
              src="/assets/img/101.jpg"
              alt="habitación 101"
              style={{
                width: "300px",
                height: "250px",
                float: "left",
                marginLeft: "25px",
              }}
            />

            <img
              src="/assets/img/2022.jpg"
              alt="habitación 202"
              style={{
                width: "300px",
                height: "250px",
                float: "left",
                marginLeft: "25px",
              }}
            />
            <img
              src="/assets/img/207.jpg"
              alt="habitación 207"
              style={{
                width: "300px",
                height: "250px",
                marginLeft: "25px",
                marginRight: "9px",
              }}
            />
             
          </div>
          <hr className="my-4"/>

          <div>
              <h2 className="section-heading">Servicio de lavanderia</h2>
              <br></br>
              <br></br>
              <h2 className="section-heading">Parqueadero para moto</h2>
              <br></br>
              <br></br>
              <h2 className="section-heading">Almacenamiento de maletas</h2>
              <br></br>
            </div>
          </div>
        </div>
      </article>

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
export default ServiciosComponent;
