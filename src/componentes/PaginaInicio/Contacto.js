//importaciones de biblioteas o módulos externos
import React, { useState } from 'react'
import axios from "axios";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Form } from "reactstrap";
import { useForm } from 'react-hook-form';
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
import { styled } from "@mui/system";
import { Modal } from "@mui/material";
//url
import { Apiurl } from "../../services/userService";
const url = Apiurl + "comentarios/crearComentario";


function Contacto() {
  const [data, setData] = useState([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [modalMensaje, setModalMensaje] = useState(false);
  const [setFormulario] = useState({
    codComentario: "",
    nombre: "",
    email: "",
    numTelefono: "",
    comentario: "",
    fechaEnviado: "",
    horaEnviado: "",
  });
  const usoEstilos = {
    position: "absolute",
    width: "40%",
    height: "15%",
    backgroundColor: "white",
    padding: "1%",
    boder: "2px solid #000",
    top: "40%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: "1.25rem",
    borderRadius: "5px",
  }

  const ModalContainer = styled("div")(usoEstilos);

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

  const onSubmit = async (info) => {
    console.log(info);
    try {
      const response = await axios.post(url, info);
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
      abrirCerrarModalMensaje();
      reset();
    }
    catch (error) {
      console.log("error mensaje", error);
    };
  }
  const resetFormulario = () => {
    reset();
  }
  const abrirCerrarModalMensaje = () => {
    setModalMensaje(!modalMensaje);
    setTimeout(() => {
      setModalMensaje(false);
    }, 3000); // 3000 milisegundos = 3 segundos
  };
  const popUp = (
    <div>
      <ModalContainer>
        <div style={{ alignContent: "center", alignItems: "center", marginLeft: "15px" }}>
          <div className="flex" style={{ alignContent: "center", alignItems: "center", margin: "auto" }}>
            <FaCheck className="me-3" color="green" />
            <p> "¡Gracias por ser parte de la familia y por compartir tus pensamientos y sugerencias con nosotros!"</p>
          </div>
        </div>
      </ModalContainer>
    </div>
  )

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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <div>
                  <label>Nombre y Apellido</label>
                  <input type="text" className="form-control" placeholder="Ingrese su nombre y apellido" onChange={handleChange} {...register('nombre', {
                    required: "El campo es requerido",
                    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/u
                  })} />
                  {errors.nombre?.type === 'pattern' && <p id='errores'>Nombres y Apellidos No validos</p>}
                  {errors.nombre && <p id="errores">{errors.nombre.message}</p>}
                </div>
                <div>
                  <label>Email ó correo Electronico</label>
                  <input type="text" className="form-control" placeholder="Ingrese su correo o email" onChange={handleChange}  {...register('email', {
                    required: "El campo es requerido",
                    pattern: /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/
                  })} />
                  {errors.email?.type === "pattern" && <p id='errores'>Correo No valido</p>}
                  {errors.email && <p id="errores">{errors.email.message}</p>}
                </div>
                <div style={{ width: "85%", height: "35px" }}>
                  <label>Número Celular</label>
                  <input type="number" className="form-control" name="numTelefono" placeholder="Ingrese su número de telefono" onChange={handleChange}  {...register('numTelefono', {
                    required: "El campo es requerido",
                    pattern: /^[3]\d{9}$/
                  })} />
                  {errors.numTelefono?.type === "pattern" && <p id='errores'>Número de Colombia NO valido</p>}
                  {errors.numTelefono && <p id="errores">{errors.numTelefono.message}</p>}
                </div>
              </div>
              <div className="" style={{ width: "45%" }}>
                <label for="comentarios"> Comentario</label>
                <textarea className="form-control" name="comentario" rows="3" type="texarea" placeholder="Ingrese Comentario o Sugerencia" onChange={handleChange} style={{ height: "70%" }}  {...register('comentario', {
                  required: "El campo es requerido"
                })} />
                {errors.comentario && <p id="errores">{errors.comentario.message}</p>}
              </div>
            </div>
            <div id="botones">
              <button type="submit" className="btn btn-success">Enviar</button>
              <button className="btn btn-danger" onClick={() => resetFormulario()}>Cancelar</button>
            </div >
          </Form>
        </div>
      </section>
      <Footer />
      <Modal open={modalMensaje} onClose={abrirCerrarModalMensaje}>
        {popUp}
      </Modal>
    </div>
  );
}
export default Contacto;