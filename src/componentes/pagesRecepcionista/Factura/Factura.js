import React from 'react';
import FacturaHijo from '../CheckIn/FacturaHijo';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./Factura.css";

const Factura = () => {

    const Facturaguardado = localStorage.getItem('factura');
    const objetoRecuperado = JSON.parse(Facturaguardado);

    return (
        <div className="card shadow mb-4">
            <div className='flex'>
                <h1>Detalles del Check - In y sus facturas</h1>
                <Link className='btn btn-danger' to="../CheckIn" style={{ margin: "5px" }}>Volver</Link>
            </div>
            {console.log("factura guardada", objetoRecuperado)}
            <h2>Detalles Check - In</h2>
            <div className='flex'>
                <div className='formularioFactura'>
                    <label>Fecha Entrada</label>
                    <input className='form-control' value={objetoRecuperado.checkin.fechaEntrada} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Fecha Salida</label>
                    <input className='form-control' value={objetoRecuperado.checkin.fechaSalida} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Total totalAcompañantes</label>
                    <input className='form-control' value={objetoRecuperado.checkin.totalAcompañantes} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Total Acompañantes</label>
                    <input className='form-control' value={objetoRecuperado.checkin.totalAcompañantes} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Número Niños</label>
                    <input className='form-control' value={objetoRecuperado.checkin.numNinos} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Número Adultos</label>
                    <input className='form-control' value={objetoRecuperado.checkin.numAdultos} disabled />
                </div>
            </div>
            <h2>Detalles Habitación</h2>
            <div className='flex'>
                <div className='formularioFactura'>
                    <label>Fecha Entrada</label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHabitacion.nombreHabitacion.nombre} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Precio por Persona</label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHabitacion.nombreHabitacion.precioXPersona} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Precio por Acompañante</label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHabitacion.nombreHabitacion.precioXAcompanante} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Número Habitación</label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHabitacion.numHabitacion} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Total Acompañantes</label>
                    <input className='form-control' value={objetoRecuperado.checkin.totalAcompañantes} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Capacidad ( # Personas) </label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHabitacion.maxPersonasDisponibles} disabled />
                </div>
            </div>
            <h2>Detalles Huesped</h2>
            <div className='flex'>
                <div className='formularioFactura'>
                    <label>Nombre(s)</label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHuesped.nombre} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Apellido(s)</label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHuesped.apellido} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Precio por Acompañante</label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHuesped.correo} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Número Habitación</label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHuesped.numCelular} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Total Acompañantes</label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHuesped.numDocumento} disabled />
                </div>
                <div className='formularioFactura'>
                    <label>Capacidad ( # Personas) </label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHabitacion.maxPersonasDisponibles} disabled />
                </div>
            </div>

        </div>
    );
}

export default Factura;
