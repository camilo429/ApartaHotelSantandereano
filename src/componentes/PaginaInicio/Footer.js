import React from "react";
import "../estilos/style.css";
import "../../css/responsive.css";

function Footer() {
  return (
    <div className="footer-area section_gap" style={{ alignItems: "center", justifyContent: "center" }}>
      <div className="container">
        <div className="col-lg-4 col-sm-12 footer-social flex">
          <a href="https://www.facebook.com/HotelSantandereanoBogota" target="_blank" rel="noreferrer" >
            <img src="/assets/img/facebook.png" alt="Facebook" style={{ width: "30px", height: "30px", margin: "10px", }} />
          </a>
          <a href="https://wa.me/3107763328?text=Quisiera%20saber%20el%20precio%20de%20los%20servicios%20y%20sus%20precios?"
            style={{ textAlign: "center" }} className="flex" target="_blank" rel="noreferrer" >
            <img src="/assets/img/whatsapp.png" alt="Whatsap" style={{ width: "55px", height: "55px", }} />
            <div style={{ color: "white", textAlign: "center", marginTop: "10px", }}> (+57) 3107763328 </div>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Footer;
