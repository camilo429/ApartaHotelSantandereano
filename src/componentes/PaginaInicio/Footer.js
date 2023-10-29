import React from "react";
import "../estilos/style.css";
import "../../css/responsive.css";
// url
import { Apiurl } from "../../services/userService";
const inicio = Apiurl + "/";
const SobreNosotros = Apiurl + "/SobreNosotros";
const lugares = Apiurl + "/lugares";
const Contactanos = Apiurl + "/Contactanos";
const Login = Apiurl + "/Login";

function Footer() {
  return (
    <div className="footer-area section_gap">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-3  col-md-6 col-sm-6"
            style={{ marginRight: "100px" }}
          >
            <div className="single-footer-widget">
              <div className="row footer-bottom d-flex justify-content-between align-items-center">
                <div className="col-lg-4 col-sm-12 footer-social flex">
                  <a
                    href="https://www.facebook.com/HotelSantandereanoBogota"
                    target="_blank"
                  >
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
                  <a
                    href="https://wa.me/3107763328?text=Quisiera%20saber%20el%20precio%20de%20los%20servicios%20y%20sus%20precios?"
                    style={{ textAlign: "center" }}
                    className="flex"
                    target="_blank"
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

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h6 className="footer_title">Servicios</h6>
              <div className="row">
                <div className="col-4">
                  <ul className="list_style">
                    <li>Lavandería</li>
                    <li>Hospedaje</li>
                    <li>Parqueadero</li>
                    <li>Almacenamiento de objetos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
