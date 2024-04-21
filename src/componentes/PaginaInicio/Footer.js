import React from "react";
import "../estilos/style.css";
import "../../css/responsive.css";

function Footer() {
  return (
    <div className="footer-area section_gap" style={{ alignItems: "center", justifyContent: "center" }}>
      <div className="container">
        <div className="col-lg-4 col-sm-12 footer-social flex">
          <p style={{ color: "white" }}>Dirección: Carrera 80a # 2-15</p>
          <a href="https://wa.me/3107763328?text=¿Quiero%20saber%20el%20precio%20de%20los%20servicios%20?" style={{ textAlign: "center" }} className="flex" target="_blank" rel="noreferrer" >
            <img src="/assets/img/whatsapp.png" alt="Whatsap" style={{ width: "55px", height: "55px", }} />
            <div style={{ color: "white", textAlign: "center", marginTop: "10px", }}> (+57) 3107763328 </div>
            <p style={{ color: "white" }}>Telefono: 355-432</p>
          </a>

        </div>
      </div>
    </div>
  );
}
export default Footer;
