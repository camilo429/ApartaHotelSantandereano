import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "../estilos/style.css";
import "../../css/responsive.css";

function About() {
  return (
    <div className="About">
      <Navbar />

      <div className="breadcrumb_area">
       <br/>
       <br/>
        <div className="container">
          <div className="page-cover text-center">
            <h2 className="page-cover-tittle">Hacerca de nosotros</h2>
            <ol className="breadcrumb">
              <li>
                <a href="/Inicio">Inicio</a>
              </li>
              <li className="active">Sobre Nosotros</li>
            </ol>
          </div>
        </div>
      </div>

      <div style={{ float: "right", marginLeft: "45px", width: "700px" }}>
        <br></br>
        <br></br>
        <h1>Acerca de nosotros</h1>
        <br></br>
        <h2>Visión</h2>
        <p>
          Ser una sólida empresa hotelera a nivel local y regional, reconocida
          por la calidad humana y profesional de nuestros colaboradores.
        </p>
        <br></br>
        <h2>Misión</h2>
        <p>
          Satisfacer las necesidades de alojamiento de nuestros clientes,
          brindando los mejores servicios que cumplan con los estándares de
          calidad.
        </p>
        <h2>Valores</h2>

        <h6>Compromiso</h6>
        <p>
          Comprometidos de satisfacer y exceder todas las expectativas de
          nuestros huéspedes y clientes.
        </p>

        <h6>Trabajo en Equipo </h6>
        <p>
          La clave de nuestro éxito es el capital humano, un equipo que trabaja
          conjuntamente para lograr la satisfacción del cliente.
        </p>

        <h6>Liderazgo</h6>
        <p>Horizontalidad en nuestro liderazgo.</p>

        <h6>Servicio Personalizado</h6>
        <p>
          Buscamos dar un excelente servicio al cliente, con la idea inicial de
          sus fundadores: “buen servicio y buena comida al precio justo”
          cuidamos cada detalle para la satisfacción del cliente.
        </p>
        <h6>Honestidad </h6>
        <p>
          En cada una de nuestras acciones, enfrentando todas las situaciones
          con honestidad, honradez y rectitud.
        </p>
      </div>

      <div style={{ width: "700px" }}></div>

      <div style={{ float: "none" }}>
        <main className="mb-4">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="font-weight-light">
                <h2>Historia</h2>
                <p>
                  Los inicios del Aparta Hotel Santandereano, se remota a
                  diciembre de 2008, cuando se constituye la dueña Ana Beatriz
                  Quiroga Inicialmente con el nombre comercial de Hotel de
                  Abastos
                  <br></br>
                  <br></br>
                  La apertura se hizo en enero del 2009 tan solo con 7
                  habitaciones con todas las comodidades necesarias, se nos dio
                  la categoría inicial de hospedaje sencillo.
                  <br></br>
                  <br></br>
                  En junio de 2011 ElMinisterio de Comercio Exterior y Turismo
                  nos otorga el RECONOCIMIENTO A LA APLICACIÓN DE BUENAS
                  PRÁCTICAS DE GESTIÓN DE SERVICIO PARA ESTABLECIMIENTOS DE
                  HOSPEDAJE. En julio del 2012, ampliamos nuestro número de
                  habitaciones de 7 a 14, al tener la demanda por nuestro buen
                  servicio y atención.
                  <br></br>
                  <br></br>
                  En el año 2013 nuevamente otorga el RECONOCIMIENTO A LA
                  APLICACIÓN DE BUENAS PRÁCTICAS DE GESTIÓN DE SERVICIO PARA
                  ESTABLECIMIENTOS DE HOSPEDAJE. De igual modo también la
                  empresa es reconocida por las buenas prácticas ambientales. En
                  octubre 2015 se amplía la cantidad de habitaciones de 14 a 17,
                  y de igual nos asociamos con restaurantes cadena, para poder
                  completar el servicio de alimentos que requerían nuestros
                  huéspedes.
                  <br></br>
                  <br></br>
                  Con todos estos avances y con los distintos servicios que se
                  adicionaron para beneficios de nuestros huéspedes es que nos
                  direccionamos a seguir creciendo para que nuestros clientes y
                  huéspedes disfruten de nuestros servicios y la atención
                  personalizada de nuestros colaboradores que saben
                  perfectamente que nuestros huéspedes son primero.
                  <br></br>
                  <br></br>
                  En el Aparta Hotel Santandereano sabemos que un ambiente ideal
                  para los negocios de nuestros clientes es parte de su éxito,
                  por este motivo le ofrecemos un lugar donde la elegancia, el
                  confort y la modernidad se complementan con un trato
                  personalizado y un servicio de primera que harán de su estadía
                  la clave de su éxito.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default About;
