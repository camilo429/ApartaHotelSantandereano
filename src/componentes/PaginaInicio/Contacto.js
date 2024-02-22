//componentes
import Footer from "./Footer";
import NavbarInicio from "./Navbar/NavbarInicio";
//Hooks
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
//Estilos
import "../../vendors/bootstrap-datepicker/bootstrap-datetimepicker.min.css";
import "../../vendors/nice-select/css/nice-select.css";
import "../estilos/style.css";
import "../../css/responsive.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "../../css/sb-admin-2.min.css";
import "../../vendor/fontawesome-free/css/all.min.css";
//librerias
import axios from "axios";
import { Apiurl } from "../../services/userService";
//Dirrección
const url = Apiurl + "comentarios/crearComentario";
//Expresiones Regulares
const nameRegex = /^[a-zA-Z\s]+$/;
const correoExpresion = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
let estilos = {
  fontWeight: "bold",
  color: "#dc3545",
};
function Contacto() {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formulario, setFormulario] = useState({
    codComentario: "",
    nombre: "",
    email: "",
    numTelefono: "",
    comentario: "",
    fechaEnviado: "",
    horaEnviado: "",
  });

  function validacionesFormulario(formulario) {
    if (!nameRegex.test(formulario.nombre)) {
      errors.nombre = "Nombre no valido";
    }
    if (!correoExpresion.test(formulario.email)) {
      errors.email = "Correo No valido";
    }
    if (
      formulario.numTelefono.length < 10 ||
      formulario.numTelefono.length > 10
    ) {
      errors.numTelefono = "El número debe tener 10 digitos";
    }
    if (formulario.comentario.length === 0) {
      errors.comentario = "El Comentario está vacio";
    }
    if (formulario.comentario.length > 100) {
      errors.comentario = "El comentario enviado supera los 100 caracteres";
    }
    return errors;
  }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB98G8_CHNNlhya9B1iiolBxsxp4UDZc60",
  });
  const mapCenter = {
    lat: 4.632369452800604,
    lng: -74.15449512172077,
  };

  if (!isLoaded) {
    return (
      <div className="container">
        {" "}
        <p>Está cargando el mapa</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionPost = async (e) => {
    try {
      let fechaActual = new Date();
      let hora = fechaActual.getHours();
      let dia = fechaActual.getDay();
      setFormulario.horaEnviado = hora;
      setFormulario.fechaActual = dia;
      console.log("data seleccionada", formulario);
      validacionesFormulario(formulario);
      setErrors(validacionesFormulario(formulario));
      if (Object.keys(errors).length === 0) {
        const response = await axios.post(url, formulario);
        setData(data.concat(response.data));
        setFormulario({
          codComentario: "",
          nombre: "",
          email: "",
          numTelefono: "",
          comentario: "",
          fechaEnviado: "",
          horaEnviado: "",
        });
        alert(
          "¡Gracias por ser parte de la familia" +
          " y por compartir tus pensamientos y sugerencias con nosotros!"
        );
      }
    } catch (error) {
      console.log("error mensaje", error);
    }
  };

  return (
    <div className="Contacto">
      <NavbarInicio />
      <section className="breadcrumb_area">
        <div className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background="" />
        <div className="container">
          <div className="page-cover text-center"> <h2 className="page-cover-tittle">Contactanos</h2></div>
        </div>
      </section>
      <section>
        <div>
          <br></br>
          <h2 className="post-title">Estamos Ubicados en: Carrera 80a#2-15</h2>
          <br></br>
          <div className="container">
            <GoogleMap mapContainerStyle={{ height: "400px", with: "400px" }} zoom={13} center={mapCenter}>
              <Marker position={{ lat: 4.632369452800604, lng: -74.15449512172077 }} />
            </GoogleMap>
          </div>
        </div>
      </section>
      {/* //mostramos la información para el mensaje */}
      <section className="accomodation_area section_gap" style={{ paddingTop: "20px" }}>
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">  ¡Queremos conocer tu opinión! </h2>
            <p>
              En El Santandereano, nos importa profundamente lo que piensas. Estamos constantemente buscando maneras de mejorar tu
              experiencia como huésped. Si has tenido una estancia reciente con nosotros o tienes alguna sugerencia que pueda hacer
              que tu próxima visita sea aún mejor, por favor, compártela con nosotros a través de nuestra caja de comentarios.
              Tu opinión es invaluable y nos ayuda a perfeccionar nuestros servicios para ti. Estamos ansiosos por escucharte y asegurarnos
              de que cada experiencia en El Santandereano sea excepcional. ¡Gracias por ser parte de nuestra comunidad!
            </p>
          </div>
        </div>
        <div className="Formulario" style={{ width: "900px", alignItems: "center", margin: "auto" }}>
          <h2 className="title_color" style={{ marginLeft: "14%" }}>Caja de Comentarios y Sugerencias</h2>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <div>
                  <label for="inputEmail4">Email</label>
                  <input type="email" className="form-control" id="inputEmail4" value={formulario.nombre} placeholder="Ingrese su Nombre Completo" onChange={handleChange} />
                  {errors.nombre && (
                    <div style={estilos}>
                      <p>{errors.nombre}</p>
                    </div>
                  )}
                </div>
                <div>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="email" name="email" value={formulario.email} placeholder="Ingrese su correo o email" onChange={handleChange} />
                  {errors.email && (
                    <div style={estilos}>
                      <p>{errors.email}</p>
                    </div>
                  )}
                </div>
                <div>
                  <input type="number" className="form-control" name="numTelefono" placeholder="Ingrese su número de telefono" onChange={handleChange} value={formulario.numTelefono} />
                  {errors.numTelefono && (
                    <div style={estilos}>
                      <p>{errors.numTelefono}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="" style={{ width: "45%" }}>
                <label for="comentarios"> Comentario</label>
                <textarea className="form-control" name="comentario" rows="3" type="texarea" placeholder="Ingrese Comentario o Sugerencia" onChange={handleChange} value={formulario.comentario} style={{ height: "70%" }} />
                {errors.comentario && (
                  <div style={estilos}>
                    <p>{errors.comentario}</p>
                  </div>
                )}
              </div>
            </div>
          </form>
          <div className="col-md-12 text-center">
            <button type="submit" value="submit" className="btn btn-primary" onClick={(e) => peticionPost(e)}>
              Enviar Mensaje
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contacto;