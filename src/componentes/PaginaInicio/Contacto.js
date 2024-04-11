//importaciones de biblioteas o módulos externos
import React, { useState } from 'react'
import { EXPRESION_REGULAR_NOMBRE_APELLIDO, EXPRESION_REGULAR_EMAIL, EXPRESION_REGULAR_COMENTARIO } from "../../services/ExpresionsRegular";
import axios from "axios";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
//Estilos
import "../../vendors/bootstrap-datepicker/bootstrap-datetimepicker.min.css";
import "../../vendors/nice-select/css/nice-select.css";
import "../estilos/style.css";
import "../../css/responsive.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "../../css/sb-admin-2.min.css";
import "../../vendor/fontawesome-free/css/all.min.css";
//Importaciones Locales
import NavbarInicio from "./Navbar/NavbarInicio";
import Footer from "./Footer";
//Reactrap
import { FaCheck } from "react-icons/fa";
import { Modal } from 'react-bootstrap';
//url
import { Apiurl } from "../../services/userService";
const url = Apiurl + "comentarios/crearComentario";


function Contacto() {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});

  const [smShow, setSmShow] = useState(false);
  const handleMensajeClose = () => setSmShow(false);
  const handleShowMensaje = () => setSmShow(true);

  const [formulario, setFormulario] = useState({
    codComentario: "",
    nombre: "",
    email: "",
    numTelefono: "",
    comentario: "",
    fechaEnviado: "",
    horaEnviado: "",
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB98G8_CHNNlhya9B1iiolBxsxp4UDZc60',
    // Otros parámetros opcionales
  });
  //const { isLoaded } = useLoadScript({
  //  googleMapsApiKey: "AIzaSyB98G8_CHNNlhya9B1iiolBxsxp4UDZc60",
  //});

  const mapCenter = {
    lat: 4.632369452800604,
    lng: -74.15449512172077,
  };

  //if (!isLoaded) {
  //  return (
  //    <div className="container">
  //      {" "}
  //      <p>Está cargando el mapa</p>
  //    </div>
  //  );
  //}
  if (loadError) return <div>Error al cargar la API de Google Maps</div>;
  if (!isLoaded) return <div>Cargando la API de Google Maps...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validationsForm(formulario));
  }
  const validationsForm = (form) => {
    let errors = {};

    if (!form.nombre.trim()) {
      errors.nombre = "El campo 'Nombre' es requerido";
    } else if (!EXPRESION_REGULAR_NOMBRE_APELLIDO.test(form.nombre.trim())) {
      errors.nombre = "El campo 'Nombre' no es valido";
    }
    if (!form.email.trim()) {
      errors.email = "El campo 'Correo' es requerido";
    } else if (!EXPRESION_REGULAR_EMAIL.test(form.email.trim())) {
      errors.email = "El campo 'Correo' no es valido";
    }
    if (!form.comentario.trim()) {
      errors.comentario = "El campo 'Comentario'es requerido";
    } else if (!EXPRESION_REGULAR_COMENTARIO.test(form.comments.trim())) {
      errors.comentario = "No puede superar los 255 caracteres";
    }
    if (!form.numTelefono.trim()) {
      errors.numTelefono = "El campo '# Celular'es requerido";
    }
    return errors;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Object.keys(errors).length === 0) {
        const response = await axios.post(url, formulario);
        console.log(response.status);
        if (response.status === 201) {
          setData(data.concat(response.data));
          abrirCerrarModalMensaje();
          setFormulario({
            codComentario: "",
            nombre: "",
            email: "",
            numTelefono: "",
            comentario: "",
            fechaEnviado: "",
            horaEnviado: "",
          });
        }
      }
    }
    catch (error) {
      console.log("error mensaje", error);
    };
  }
  const resetFormulario = () => {
    setFormulario({
      codComentario: "",
      nombre: "",
      email: "",
      numTelefono: "",
      comentario: "",
      fechaEnviado: "",
      horaEnviado: "",
    });
  }
  const popUp = (
    <div>
      <div style={{ alignContent: "center", alignItems: "center", marginLeft: "15px" }}>
        <div className="flex" style={{ alignContent: "center", alignItems: "center", margin: "auto" }}>
          <FaCheck className="me-3" color="green" />
          <p> "¡Gracias por ser parte de la familia y por compartir tus pensamientos y sugerencias con nosotros!"</p>
        </div>
      </div>
    </div>
  )

  const abrirCerrarModalMensaje = () => {
    handleShowMensaje();
    setTimeout(() => {
      handleMensajeClose();
    }, 2000); // 2000 milisegundos = 2 segundos
  };

  return (
    <div className="Contacto">
      <NavbarInicio />
      <section className="breadcrumb_area">
        <div className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background="" />
        <div className="container">
          <div className="page-cover text-center"><h2 className="page-cover-tittle">Contactanos</h2></div>
        </div>
      </section>
      <section>
        <div> <br></br>
          <h2 className="post-title">Estamos Ubicados en: Carrera 80a#2-15</h2> <br></br>
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
          <form onSubmit={onSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <div>
                  <label>Nombre y Apellido</label>
                  <input type="text" name='nombre' className="form-control" onBlur={handleBlur} value={formulario.nombre} onChange={handleChange} placeholder="Ingrese su nombre y apellido" />
                  {errors.nombre && <p id='errores'>{errors.nombre}</p>}
                </div>
                <div>
                  <label>Email ó correo Electronico</label>
                  <input type="text" name='email' className="form-control" onBlur={handleBlur} value={formulario.email} onChange={handleChange} placeholder="Ingrese su correo o email" />
                  {errors.email && <p id='errores'>{errors.email}</p>}
                </div>
                <div style={{ width: "85%", height: "35px" }}>
                  <label>Número Celular</label>
                  <input type="number" name="numTelefono" className="form-control" onBlur={handleBlur} value={formulario.numTelefono} onChange={handleChange} placeholder="Ingrese su número de telefono" />
                  {errors.numTelefono && <p id='errores'>{errors.numTelefono}</p>}
                </div>
              </div>
              <div className="" style={{ width: "45%" }}>
                <label> Comentario</label>
                <textarea type="texarea" name="comentario" className="form-control" onBlur={handleBlur} value={formulario.comentario} onChange={handleChange} rows="3" placeholder="Ingrese Comentario o Sugerencia" style={{ height: "70%" }} />
                {errors.comentario && <p id="errores">{errors.comentario}</p>}
              </div>
            </div>
            <div className='flex' id="botones">
              <button type="submit" className="btn btn-success">Enviar</button>
              <button className="btn btn-danger" onClick={() => resetFormulario()}>Cancelar</button>
            </div >
          </form>
        </div>
      </section>
      <Modal show={smShow} onHide={handleMensajeClose} animation={false}> {popUp}</Modal>
      <Footer />
    </div>
  );
}
export default Contacto;