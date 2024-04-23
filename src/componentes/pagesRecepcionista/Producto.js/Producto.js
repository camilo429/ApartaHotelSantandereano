import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

import { Apiurl } from '../../../services/userService';
import MUIDataTable from 'mui-datatables';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./Producto.css";

const url = Apiurl + "producto/listarProductos";
const urlG = Apiurl + "producto/crearProducto";
const urlE = Apiurl + "producto/actualizarProducto/";
const urlD = Apiurl + "producto/eliminarProducto/"

const Producto = () => {
    const [data, setData] = useState();

    const [showProducto, setShowProducto] = useState(false);
    const handleProductoClose = () => setShowProducto(false);
    const handleProductoShow = () => setShowProducto(true);

    const [smShow, setSmShow] = useState(false);
    const handleMensajeClose = useCallback(() => setSmShow(false), [setSmShow]);
    const handleShowMensaje = useCallback(() => setSmShow(true), [setSmShow]);

    const [mensaje, setMensaje] = useState("");

    const [showEditar, setShowEditar] = useState(false);
    const handleEditarClose = () => setShowEditar(false);
    const handleEditarShow = () => setShowEditar(true);

    const [showEliminar, setShowEliminar] = useState(false);
    const handleEliminarClose = () => setShowEliminar(false);
    const handleEliminarShow = () => setShowEliminar(true);

    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        codProducto: "",
        nombreProducto: "",
        marca: "",
        cantidad: "",
        precio: "",
        fechaRegistro: "",
        horaRegistro: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsolaSeleccionada((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const abrirCerrarModalMensaje = useCallback(() => {
        handleShowMensaje();
        setTimeout(() => {
            handleMensajeClose();
        }, 2000); // 2000 milisegundos = 2 segundos
    }, [handleShowMensaje, handleMensajeClose]);

    const peticionGet = useCallback(async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,

                }
            });
            //console.log("Response Producto Get", response.status);
            if (response.status === 200) {
                setData(response.data);
            } else {
                console.log("Error al traer Productos", response.status);
            }
        } catch (error) {
            console.log(error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al dar ingreso al Huesped. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
        }
    }, [abrirCerrarModalMensaje]);
    useEffect(() => {
        peticionGet();
    }, [peticionGet]);
    const peticionPost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(urlG, consolaSeleccionada, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            });
            console.log("Post producto", response.status);
            if (response.status === 201) {
                setData(data.concat(response.data));
                peticionGet();
                setMensaje("Producto Agregado");
                handleProductoClose();
                abrirCerrarModalMensaje();
                setConsolaSeleccionada({
                    codProducto: "",
                    nombreProducto: "",
                    marca: "",
                    cantidad: "",
                    precio: "",
                    fechaRegistro: "",
                    horaRegistro: ""
                });
            }
        } catch (error) {
            console.log(error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al dar ingreso al Huesped. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
        }
    }
    const peticionPut = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(urlE + consolaSeleccionada.codProducto, consolaSeleccionada, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            console.log("Editar Producto", response.status);
            if (response.status === 201) {
                const dataNueva = data.map((consola) => {
                    if (consolaSeleccionada.codProducto === consola.codProducto) {
                        consola.nombreProducto = consolaSeleccionada.nombreProducto;
                        consola.marca = consolaSeleccionada.marca;
                        consola.cantidad = consolaSeleccionada.cantidad;
                        consola.precio = consolaSeleccionada.precio;
                        consola.fechaRegistro = consolaSeleccionada.fechaRegistro;
                        consola.horaRegistro = consolaSeleccionada.horaRegistro;
                    }
                    return consola;
                });
                setData(dataNueva);
                peticionGet();
                handleEditarClose();
                setMensaje("Producto Editado");
                abrirCerrarModalMensaje();
            }
        } catch (error) {
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al dar ingreso al Huesped. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
        }
    }

    const peticionDelete = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.delete(urlD + consolaSeleccionada.codProducto, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            console.log("Eliminar Producto", response.status);
            if (response.status === 200) {
                setData(data.filter((consola) => consola[0] !== consolaSeleccionada.codProducto));
                setMensaje("Producto Eliminado");
                handleEliminarClose();
                abrirCerrarModalMensaje();
                peticionGet();
            } else {
                console.log("Error al aliminar Producto", response.status);
            }
        } catch (error) {
            console.log("Error al eliminar producto", error);
        }
    }
    const bodyCrearProducto = (
        <div>
            <form onSubmit={peticionPost}>
                <div className='flex'>
                    <div>
                        <label>Nombre</label>
                        <input name='nombreProducto' className='form-control' required onChange={handleChange} />
                    </div>
                    <div>
                        <label>Empresa</label>
                        <input name='marca' className='form-control' required onChange={handleChange} />
                    </div>
                    <div>
                        <label>Cantidad</label>
                        <input name='cantidad' className='form-control' required onChange={handleChange} />
                    </div>
                </div>
                <div className='flex'>
                    <div>
                        <label>Precio (Unidad)</label>
                        <input name='precio' className='form-control' required onChange={handleChange} />
                    </div>
                </div>
                <div className='flex botones'>
                    <button className='btn btn-primary' type='submit'>Agregar</button>
                    <button className='btn btn-secondary' type='submit' onClick={handleProductoClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
    const bodyEditar = (
        <div>
            <form onSubmit={peticionPut}>
                <div className='flex'>
                    <div>
                        <label>Nombre</label>
                        <input name='nombreProducto' className='form-control' required onChange={handleChange} value={consolaSeleccionada.nombreProducto} />
                    </div>
                    <div>
                        <label>Empresa</label>
                        <input name='marca' className='form-control' required onChange={handleChange} value={consolaSeleccionada.marca} />
                    </div>
                    <div>
                        <label>Cantidad</label>
                        <input name='cantidad' className='form-control' required onChange={handleChange} value={consolaSeleccionada.cantidad} />
                    </div>
                </div>
                <div className='flex'>
                    <div>
                        <label>Precio (Unidad)</label>
                        <input name='precio' className='form-control' required onChange={handleChange} value={consolaSeleccionada.precio} />
                    </div>
                </div>
                <div className='flex botones'>
                    <button className='btn btn-primary' type='submit'>Agregar</button>
                    <button className='btn btn-secondary' type='submit' onClick={handleEditarClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
    const bodyEliminar = (
        <div className='bodyEliminar'>
            <p> ¿Está seguro de Eliminar el Producto?</p>
            <br />
            <b>{consolaSeleccionada && consolaSeleccionada.nombreProducto + "   De la marca:   " + consolaSeleccionada.marca}</b>
            <div align="right">
                <button className="btn btn-primary" type="submit" onClick={() => peticionDelete()} style={{ margin: "5px" }}> Eliminar </button>
                <button className="btn btn-danger" type="submit" onClick={handleEliminarClose} > Cancelar </button>
            </div>
        </div>
    )
    const popUp = (
        <div>
            <Modal size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {mensaje}
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        </div>
    )
    const seleccionarProducto = (consola, caso) => {
        console.log("consola", consola);
        setConsolaSeleccionada({
            codProducto: consola[0],
            nombreProducto: consola[1],
            marca: consola[2],
            cantidad: consola[3],
            precio: consola[4],
            fechaRegistro: consola[5],
            horaRegistro: consola[6]
        })
        console.log("ConsolaSeleccionada", consolaSeleccionada);
        if (caso === "Editar") {
            handleEditarShow();
        }
        if (caso === "Eliminar") {
            handleEliminarShow();
        }
    }
    const columns = [
        {
            name: "codProducto",
            label: "Código"
        }, {
            name: "nombreProducto",
            label: "Nombre"
        }, {
            name: "marca",
            label: "Empresa"
        }, {
            name: "cantidad",
            label: "Catidad"
        }, {
            name: "precio",
            label: "Precio (Unidad)"
        }, {
            name: "fechaRegistro",
            label: "Fecha Registro"
        }, {
            name: "horaRegistro",
            label: "Hora Registro"
        }, {
            name: "acciones",
            label: "Acciones",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <li className='nav-item dropdown'>
                                <Link className="nav-link dropdown-toggle" to="information.html" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Información
                                </Link>
                                <ul className='dropdown-menu' aria-labelledby='navbardropdown'>
                                    <li>
                                        <Link className="dropdown-item" onClick={() => seleccionarProducto(tableMeta.rowData, "Editar")} >Editar</Link>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    )
                }
            }
        }
    ]
    return (
        <div className='Producto'>
            <br />
            <div className='card shadow mb-t'>
                <button className='btn btn-primary' type='submit' onClick={handleProductoShow} >Agregar producto</button>
            </div>
            <div>
                <MUIDataTable
                    title="Lista Productos"
                    data={data}
                    columns={columns} />
            </div>
            <Modal show={showProducto} onHide={handleProductoClose} animation={false} size={"lg"} >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">{bodyCrearProducto}</Modal.Body>
            </Modal>
            <Modal show={smShow} onHide={handleMensajeClose} animation={false} > {popUp}</Modal>
            <Modal show={showEditar} onHide={handleEditarShow} animation={false} dialogClassName='TipoHabitacion' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">{bodyEditar}</Modal.Body>
            </Modal>
            <Modal show={showEliminar} onHide={handleEliminarClose}> {bodyEliminar}</Modal>
        </div>
    );
}

export default Producto;
