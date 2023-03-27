import React from "react";
import "../estilos/style.css";
import "../../css/responsive.css";

function Footer() {
  return (
    <div className="footer-area section_gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-3  col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h6 className="footer_title">Sobre el Aparta Hotel</h6>
              <p>
                El Aparta Hotel Santadereano siempre se encuentra de la mejor
                manera, mostrando los mejores servicios Este cuenta con atención
                personalizada, para que cada cliente se se sienta cómodo y
                seguro de sí mismo.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h6 className="footer_title">Navegación</h6>
              <div className="row">
                <div className="col-4">
                  <ul className="list_style">
                    <li>
                      <a href="/">Inicio</a>
                    </li>
                    <li>
                      <a href="/About">Sobre Nosotros</a>
                    </li>
                    <li>
                      <a href="/Servicios">Servicios</a>
                    </li>
                    <li>
                      <a href="/contactanos">Contactanos</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h6 className="footer_title">Servicios</h6>
              <p>
                Siempre prestamos los mejores servicios, de la mejor <br />
                manera a los mejores clientes
              </p>
            </div>
          </div>

          <div className="border_line" />
          <div className="row footer-bottom d-flex justify-content-between align-items-center">
            <div className="col-lg-4 col-sm-12 footer-social flex">
              <a href="https://www.facebook.com/HotelSantandereanoBogota">
                <img
                  src="/assets/img/facebook.png"
                  alt="Es la imagen de facebook"
                  style={{
                    width: "30px",
                    height: "30px",
                    margin: "10px",
                  }}
                />
              </a>

              <a href="https://www.instagram.com/HotelSantandereanoBogota">
                <img
                  src="/assets/img/instagram.png"
                  alt="Es la imagen de instagram"
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    marginTop: "4px",
                  }}
                />
              </a>

              <a
                href="https://wa.me/3107763328?text=Quisiera%20saber%20el%20precio%20de%20los%20servicios%20y%20sus%20precios?"
                style={{ textAlign: "center" }}
                className="flex"
              >
                <img
                  src="/assets/img/whatsapp.png"
                  alt="Es la imagen de Whatsapp"
                  style={{
                    width: "55px",
                    height: "55px",
                  }}
                />
                <div
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  (+57)3107763328
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
