import React from 'react';
import { Link } from "react-router-dom";
import "./Factura.css";

const Factura = () => {

    const Facturaguardado = localStorage.getItem('factura');
    const objetoRecuperado = JSON.parse(Facturaguardado);

    return (
        <div className="card shadow mb-4">
            <div className='flex'>
                <h1>¡Detalles del Recibo!</h1>
                <Link className='btn btn-danger' to="../CheckIn" style={{ margin: "5px" }}>Volver</Link>
            </div>
            {console.log("factura guardada", objetoRecuperado)}
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
                    <label>Total Acompañantes</label>
                    <input className='form-control' value={objetoRecuperado.checkin.numAcompanantes} disabled />
                </div>
            </div>
            <h2>Detalles Habitación</h2>
            <div className='flex'>
                <div className='formularioFactura'>
                    <label>Nombre Habitación</label>
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
                    <label>Capacidad ( # Personas) </label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHabitacion.maxPersonasDisponibles} disabled />
                </div>
            </div>
            <h2>Detalles Huésped</h2>
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
                    <label>Número Documento</label>
                    <input className='form-control' value={objetoRecuperado.checkin.codHuesped.numDocumento} disabled />
                </div>
            </div>
            <h2>Detalles Acompañante</h2>
            <div>
                {objetoRecuperado.checkin.acompanantes.map((acompanante, index) => (
                    <div key={index} className='formularioAcompanante'>
                        <div>
                            <label>Nombre(s)</label>
                            <input className='form-control' value={acompanante.nombre} disabled />
                        </div>
                        <div>
                            <label>Apellido(s)</label>
                            <input className='form-control' value={acompanante.apellido} disabled />
                        </div>
                        <div>
                            <label>Número Documento</label>
                            <input className='form-control' value={acompanante.numDocumento} disabled />
                        </div>
                        <div>
                            <label>Tipo Documento</label>
                            <input className='form-control' value={acompanante.tipoDocumento.nomTipoDocumento} disabled />
                        </div>
                    </div>
                ))}
            </div>
            <h2>Detalles Compras</h2>
            <div>
                <div>
                    {objetoRecuperado.checkin.facturas.length > 0 && objetoRecuperado.checkin.facturas.map((factura, index) => (
                        <div key={index} className='formulariRecibo'>
                            <div className='formularioRecibo'>
                                <div>
                                    <label>Descripción</label>
                                    <textarea name='descripcion' className='form-control' value={factura.descripcion} disabled />
                                </div>
                                <div>
                                    <label>Estado</label>
                                    <input name='estado' className='form-control' value={factura.estado} disabled />
                                </div>
                                <div>
                                    <label>Fecha Creada</label>
                                    <input name='fechaCreada' className='form-control' value={factura.fechaCreacion} disabled />
                                </div>
                                <div>
                                    <label>Hora Creada</label>
                                    <input name='fechaCreada' className='form-control' value={factura.horaCreacion} disabled />
                                </div>
                            </div>
                            <div>
                                <h2>Productos</h2>
                                {factura.itemFactura.length > 0 && factura.itemFactura.map((items, index) => (
                                    <div key={index} className='itemsFactura'>
                                        <div>
                                            <label>Unidades Compradas</label>
                                            <input name='total' className='form-control' value={items.cantidad} disabled />
                                        </div>
                                        <div>
                                            <label>Producto</label>
                                            <input name='total' className='form-control' value={items.producto.nombreProducto} disabled />
                                        </div>
                                        <div>
                                            <label>Precio Unidad</label>
                                            <input name='total' className='form-control' value={items.producto.precio} disabled />
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <label>Total</label>
                                    <input name='total' className='form-control' value={factura.total} disabled />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Factura;