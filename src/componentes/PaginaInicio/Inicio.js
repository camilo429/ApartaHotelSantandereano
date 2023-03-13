import React from "react";


import "../../App.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "../../css/sb-admin-2.min.css";
import "../../vendor/fontawesome-free/css/all.min.css";

//librerias que necesito 
import "../../css/bootstrap.css"
import "../../vendor/linericon/style.css"
import "../../css/font-awesome.min.css"
import "../../vendor/owl-carousel/owl.carousel.min.css";
import "../../vendor/bootstrap-datepicker/bootstrap-datetimepicker.min.css";
import "../../vendor/nice-select/css/nice-select.css";
import "../../vendor/owl-carousel/owl.carousel.min.css";
import "../../css/responsive.css";

function Inicio() {
  return (
    <div>
      <div className="header_area">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <img
              src="/assets/img/logo.jpg"
              alt="Es el logo del aparta hotel"
              style={{ width: "120px", height: "90px" }}
            ></img>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div
              className="collapse navbar-collapse offset"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav menu_nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="index.html">
                    Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="about.html">
                    Sobre Nosotros
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="accomodation.html">
                    Accomodation
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="gallery.html">
                    Gallery
                  </a>
                </li>
                <li className="nav-item submenu dropdown">
                  <a
                    href="/Home"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Blog
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a className="nav-link" href="blog.html">
                        Blog
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="blog-single.html">
                        Detalles del blog
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="elements.html">
                    Elemementos
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html">
                    Contactos
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* // is de background more the text in the center de display */}
      <div className="banner_area">
        <div className="booking_table d_flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset="0"
            data-background=""
          ></div>
          <div className="container">
            <div className="banner_content text-center">
              <h2>Tiempo de Descanso</h2>
              <p>
                Si necesitas en necesitas un hospedaje en Bogotá, esta es tu
                mejor obción
                <br /> Diferentes habitaciones a diferentes precios pero con la
                misma calidad.
              </p>
              <a href="/Home" className="btn btn-warning">
                Recepciona con nosotros
              </a>
            </div>
          </div>
        </div>
        {/* // is the cuadro for book your reservartion */}
        <div className="hotel_booking_area position">
          <div className="container">
            <div className="hotel_booking_table">
              <div className="col-md-3">
                <h2>
                  Reserve
                  <br /> su Habitación
                </h2>
              </div>
              <div className="col-md-9">
                <div className="boking_table">
                  <div className="row">
                    <div className="col-md-4">
                      <input
                        type="email"
                        placeholder="Escribe el correo"
                        style={{ backgroundColor: "103454", color: "white" }}
                        className="form-control"
                      ></input>
                    </div>
                    <div className="col-md-4">
                      <div className="book_tabel_item">
                        <input
                          type="email"
                          placeholder="Escribe el correo"
                          style={{ backgroundColor: "103454", color: "white" }}
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="book_tabel_item">
                        <input
                          type="email"
                          placeholder="Escribe el correo"
                          style={{ backgroundColor: "103454", color: "white" }}
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="accomodation_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">Aparta Hotel Santadereano</h2>
            <p>
              Somos lo que usted necesita para descansar... <br />
              No dude en ver nuestras habitaciones, precios y sobre todo AGENDAR
            </p>
          </div>
          {/* //espacio para poner las habitaciones  */}
          <div className="row mb_30">
            {/* // Espacio para poner una a una la habitación */}
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/101.jpg" alt="" />
                  <a
                    href="/Home"
                    className="btn theme_btn btn-warning button_hover"
                  >
                    Agendar <br />
                    Ahora
                  </a>
                </div>
                <a href="/Home">
                  <h4 className="sec_h4">
                    Abitación Familiar <br /> (5 Personas)
                  </h4>
                </a>
                <h5>
                  $50.000<small>/Noche</small>
                </h5>
              </div>
            </div>
            {/* // Segunda habitación */}
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/205.jpg" alt="" />
                  <a
                    href="/Home"
                    className="btn theme_btn btn-warning button_hover"
                  >
                    Agendar <br />
                    Ahora
                  </a>
                </div>
                <a href="/Home">
                  <h4 className="sec_h4">
                    Matrimonial <br /> (Pareja o Personas){" "}
                  </h4>
                </a>
                <h5>
                  $35.000<small>/Noche</small>
                </h5>
              </div>
            </div>
            {/* // Tercer habitación */}
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/205.jpg" alt="" />
                  <a
                    href="/Home"
                    className="btn theme_btn btn-warning button_hover"
                  >
                    Agendar <br />
                    Ahora
                  </a>
                </div>
                <a href="/Home">
                  <h4 className="sec_h4">
                    Individual <br /> (1 Persona)
                  </h4>
                </a>
                <h5>
                  $30.000<small>/Noche</small>
                </h5>
              </div>
            </div>
            {/* //Cuarta Habitación */}
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="../../assets/img/101.jpg" alt="" />
                  <a
                    href="/Home"
                    className="btn theme_btn btn-warning button_hover"
                  >
                    Agendar <br />
                    Ahora
                  </a>
                </div>
                <a href="/Home">
                  <h4 className="sec_h4">
                    Amigos <br /> (2 Personas)
                  </h4>
                </a>
                <h5>
                  $40.000<small>/Noche</small>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* // Testimonio de los huespedes  */}

      <div className="testimonial_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">
              Comentarios de nuestros huespedes frecuentes
            </h2>
            <p>
              Historias y comentarios realizan de parte de nuestros huespedes
              más abituales <br />
              para nuestros futuros cliente{" "}
            </p>
          </div>
          {/* //Cuadros de testimonios */}
          <div className="testimonial_slider owl-carousel">
            <div className=" testimonial_item">
              <img
                className="rounded-circle"
                src="../../assets/img/fotoperfil.png"
                alt=""
              />
              <div className="media-body">
                <p>
                  As conscious traveling Paupers we must always be concerned
                  about our dear Mother Earth. If you think about it, you travel
                  across her face, and She is the{" "}
                </p>
                <a href="/Home">
                  <h4 className="sec_h4">Camilo Ahumada</h4>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Inicio;
