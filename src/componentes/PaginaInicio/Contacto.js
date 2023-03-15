import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import GoogleMaps from "simple-react-google-maps";

function Contacto() {
  return (
    <div>
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
            <h2 className="page-cover-tittle">Contactanos</h2>
            <ol className="breadcrumb">
              <li>
                <a href="index.html">Inicio</a>
              </li>
              <li className="active">Contactanos</li>
            </ol>
          </div>
        </div>
      </section>
      <div>
        <br></br>
        <hr className="my-4" />
        <br></br>
        <h2 className="post-title">Estamos Ubicados en: carrera 80a#2-15</h2>
        <br></br>
        {/* <div className="container">
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
        </div> */}
        <br></br>
        <br></br>
      </div>
      <Footer />
    </div>
  );
}

export default Contacto;
