import { BrowserRouter,Routes, Route } from 'react-router-dom';
import React from 'react'

import NacionalidadComponent from './componentes/Nacionalidad/NacionalidadComponent';
import PaginaInicio from './componentes/PaginaInicio/PaginaInicio'
import QuienesSomosComponent from './componentes/PaginaInicio/QuienesSomosComponent';
import ServiciosComponent from './componentes/PaginaInicio/Servicios';
import ContactoComponent from './componentes/PaginaInicio/ContactoComponent';
import LoginComponent from './componentes/PaginaInicio/LoginComponent';
// import ListTipoDocumentoComponent from './componentes/tipo/ListTipoDocumentoComponent';
import HuespedComponent from './componentes/Huesped/HuespedComponent';
// import TipoDocumentoComponent from './componentes//TipoDocumentoComponent';
import EmpleadoComponent from './componentes/Empleado/EmpleadoComponent';


function App() {
  return (
    <div>
       <BrowserRouter>
       <div className='pagian'>
        <Routes>
        <Route path='/' exament element={<PaginaInicio/>}></Route>
        <Route path='/inicio' element={<PaginaInicio/>}></Route>
        <Route path='/QuienesSomos' element={<QuienesSomosComponent/>}></Route>
        <Route path='/Servicios' element={<ServiciosComponent/>}></Route>
        <Route path='/Contacto'  element={<ContactoComponent/>}></Route>
        <Route path='/Login'  element={<LoginComponent/>}></Route>


        <Route path='/ListarNacionalidades' element={<NacionalidadComponent/>}></Route>
        {/* <Route path='/ListarTipoDocumento' element={<ListTipoDocumentoComponent/>}></Route> */}
        <Route path='/ListarHuespedes' element={<HuespedComponent/>}></Route>
        {/* <Route path='/ListarTipoDocumentoEmpleado' element={<TipoDocumentoComponent/>}></Route> */}
        <Route path='/ListarEmpleado' element={<EmpleadoComponent/>}></Route>
        
        </Routes>
       </div>
       </BrowserRouter>
      
    </div>
  );
}

export default App;