import React from "react";
import {Link} from 'react-router-dom'

const LoginComponent =()=>{
    return(
        <div>
            <nav className="navbar navbar-dark bg-dark" id="mainNav">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="index.html">Aparta Hotel Santandereano</a>
                <div className="navbar-brand" id="navbarResponsive">
                        <Link className="badge badge-light" to={`/Inicio`} >Inicio</Link>
                        <Link className="badge badge-light" to={`/QuienesSomos`}>¿Quienes somos?</Link>
                        <Link className="badge badge-light" to={`/Servicios`}>Servicios</Link>
                        <Link className="badge badge-light" to={`/Contacto`}>Contacto</Link>
                        <Link className="badge badge-light" to={`/Login`}>Login</Link>
                  </div>
               </div>
            </nav>

            <div class="my-5" style={{width:"300px;", margin:"300px"}}>
                            <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                                <div class="form-floating">
                                    <input class="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                    <label for="name">Usuario</label>
                                    <br></br>
                                    <div class="invalid-feedback" data-sb-feedback="name:required">El usuario es requerido</div>
                                </div>
                                <br></br>
                                
                                <div class="form-floating">
                                    <input class="form-control" id="email" type="email" placeholder="Enter your email..." data-sb-validations="required,email" />
                                    <label for="email">Contraseña</label>
                                    <div class="invalid-feedback" data-sb-feedback="email:required">Requerido</div>
                                    <div class="invalid-feedback" data-sb-feedback="email:email">Correo no es valido</div>
                                </div>
                                <br></br>
                                <button class="btn btn-primary " id="submitButton" type="submit" style={{widh:"250px"}}>Enviar</button>
                            </form>

                            </div>
           <footer className="navbar navbar-dark bg-dark">
                <div  className="badge badge-light"  >
                <a className="navbar-brand" href="index.html">Aparta Hotel Santandereano</a>
                </div>
            </footer>
        
         
 </div>
    )
}
export default LoginComponent