import React, { useEffect, useState } from 'react';
import "./TipoHabitacion.css";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Apiurl } from "../../../services/userService";
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const url = Apiurl + "tipoHabiatcion/listarTipoHabitacion";
const urlG = Apiurl + "tipoHabiatcion/crearTipoHabitacion";
const urlE = Apiurl + "tipoHabiatcion/actualizarTipoHabitacion/";
const urlD = Apiurl + "tipoHabiatcion/"
const TipoHabitacion = () => {
    const [data, setData] = useState([]);

    const [showTipoHabitacion, setShowTipoHabitacion] = useState(false);
    const handleTipoHabitacionClose = () => setShowTipoHabitacion(false);
    const handleTipoHabitacionShow = () => setShowTipoHabitacion(true);

    const [smShow, setSmShow] = useState(false);
    const handleMensajeClose = () => setSmShow(false);
    const handleShowMensaje = () => setSmShow(true);

    const [mensaje, setMensaje] = useState("");

    const [showEditar, setShowEditar] = useState(false);
    const handleEditarClose = () => setShowEditar(false);
    const handleEditarShow = () => setShowEditar(true);

    const [showEliminar, setShowEliminar] = useState(false);
    const handleEliminarClose = () => setShowEliminar(false);
    const handleEliminarShow = () => setShowEliminar(true);

    const { handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        codTipoHabitacion: "",
        nombre: "",
        precioXAcompanante: "",
        precioXPersona: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsolaSeleccionada((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const peticionGet = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            console.log("get tipoHabitación", response.data);
            if (response.status === 200) {
                setData(response.data);
            } else {
                console.log("Get Tipo Habitación", response.status);
            }
        } catch (error) {
            console.log("Get Tipo Habitación", error);
        }
    }

    const peticionPost = async () => {
        try {
            const response = await axios.post(urlG, consolaSeleccionada, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            console.log("response post tipohabitación", response.status);

            if (response.status === 201) {
                setData(data.concat(response.data));
                setMensaje("Tipo Habitación Agregado");
                peticionGet();
                handleShowMensaje();
                handleTipoHabitacionClose();
                setConsolaSeleccionada({
                    codTipoHabitacion: "",
                    nombre: "",
                    precioXAcompanante: "",
                    precioXPersona: "",
                })
                reset();
            } else {
                console.log("Error post Habitación");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const peticionPut = async () => {
        try {
            const response = await axios.put(urlE + consolaSeleccionada.codTipoHabitacion, consolaSeleccionada, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            });
            console.log("Editar tipo Habitación:", response.status);
            if (response.status === 201) {
                const dataNueva = data.map((consola) => {
                    if (consolaSeleccionada.codTipoHabitacion === consola.codTipoHabitacion) {
                        consola.codTipoHabitacion = consolaSeleccionada.codTipoHabitacion;
                        consola.nombre = consolaSeleccionada.nombre;
                        consola.precioXAcompanante = consolaSeleccionada.precioXAcompanante;
                        consola.precioXPersona = consolaSeleccionada.precioXPersona;
                    }
                    return consola;
                })
                setData(dataNueva);
                peticionGet();
                handleEditarClose();
                setMensaje("Tipo Habitación Actualizada");
                handleShowMensaje();
                reset();
            } else {
                console.log("Error Actualizar Tipo Habitación", response.status);
            }
        } catch (error) {
            console.log("error put", error);
        }
    }

    const peticionDelete = async () => {
        try {
            const response = await axios.delete(urlD + consolaSeleccionada.codTipoHabitacion, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })

            if (response.status === 200) {
                setData(data.filter((consola) => consola[0] !== consolaSeleccionada.codTipoHabitacion));
                setMensaje("Tipo Habitación Eliminada");
                handleEliminarClose();
                handleShowMensaje();
                peticionGet();
            } else {
                console.log("Error al eliminar Tipo Habitación", response.status);
            }
        } catch (error) {
            console.log("Error al Eliminar habitación", error);

        }
    }
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
    const bodyTipoHabitacion = (
        <div className='bodyCrearTipoHabitación'>
            <form onSubmit={handleSubmit(peticionPost)}>
                <div className='flex'>
                    <div className='formulario'>
                        <label>Nombre Habitación</label>
                        <input className='form-control' name='nombre' onChange={handleChange}></input>
                    </div>
                    <div className='formulario'>
                        <label>Precio * Persona</label>
                        <input className='form-control' name='precioXPersona' onChange={handleChange}></input>
                    </div>
                    <div className='formulario'>
                        <label>Precio * Acompañante</label>
                        <input className='form-control' name='precioXAcompanante' onChange={handleChange}></input>
                    </div>
                </div>
                <div className='flex'>
                    <button type='submit' className='btn btn-primary'>Agregar</button>
                    <button type='submit' className='btn btn-secondary' onClick={handleTipoHabitacionClose}>Cancelar</button>
                </div>
            </form>
        </div>
    )

    const bodyEditar = (
        <div className='bodyCrearTipoHabitación'>
            <form onSubmit={handleSubmit(peticionPut)}>
                <div className='flex'>
                    <div className='formulario'>
                        <label>Nombre Habitación</label>
                        <input className='form-control' name='nombre' onChange={handleChange} value={consolaSeleccionada.nombre}></input>
                    </div>
                    <div className='formulario'>
                        <label>Precio * Persona</label>
                        <input className='form-control' name='precioXPersona' onChange={handleChange} value={consolaSeleccionada.precioXPersona}></input>
                    </div>
                    <div className='formulario'>
                        <label>Precio * Acompañante</label>
                        <input className='form-control' name='precioXAcompanante' onChange={handleChange} value={consolaSeleccionada.precioXAcompanante}></input>
                    </div>
                </div>
                <div className='flex'>
                    <button type='submit' className='btn btn-primary'>Agregar</button>
                    <button type='submit' className='btn btn-secondary' onClick={handleTipoHabitacionClose}>Cancelar</button>
                </div>
            </form>
        </div>
    )

    const bodyEliminar = (
        <div className='bodyEliminar'>
            <p> ¿Está seguro de Eliminar El tipo Habitación?</p>
            <br />
            <b>{consolaSeleccionada && consolaSeleccionada.nombre + "Precio:" + consolaSeleccionada.precioXAcompanante}</b>
            <div align="right">
                <button className="btn btn-primary" type="submit" onClick={() => peticionDelete()} style={{ margin: "5px" }}> Eliminar </button>
                <button className="btn btn-danger" type="submit" onClick={handleEliminarClose} > Cancelar </button>
            </div>
        </div>
    )
    const seleccionarTipoHabitacion = (consola, caso) => {
        console.log("consola", consola);
        setConsolaSeleccionada({
            codTipoHabitacion: consola[0],
            nombre: consola[1],
            precioXAcompanante: consola[2],
            precioXPersona: consola[3],
        })
        console.log("consolaSeleccionada", consolaSeleccionada);
        if (caso === "Editar") {
            handleEditarShow();
        }
        if (caso === "Eliminar") {
            handleEliminarShow();
        }
    }
    useEffect(() => {
        peticionGet();
    }, [])
    const columns = [
        {
            name: "codTipoHabitacion",
            label: "Código"
        }, {
            name: "nombre",
            label: "nombre"
        }, {
            name: "precioXPersona",
            label: "Precio * Persona"
        }, {
            name: "precioXAcompanante",
            label: "Precio * Acompanante"
        }, {
            name: "acciones",
            label: "Acciones",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="Informacion.html" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Información
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" onClick={() => seleccionarTipoHabitacion(tableMeta.rowData, "Editar")}> Editar </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" onClick={() => seleccionarTipoHabitacion(tableMeta.rowData, "Eliminar")}> Eliminar </Link>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    );
                },
            },
        },
    ]
    return (
        <div className='TipoHabitacion'>
            <br />
            <div className='card shadow mb-4'>
                <div className='flex'>
                    <button onClick={handleTipoHabitacionShow} className='btn btn-primary'>Agregar Tipo Habitación</button>
                </div>
                <h6 className='m-0 font-weight-bold text-primary'> Tipo de Habitaciones</h6>
                <div>
                    <MUIDataTable
                        title={"Lista Tipo Habitaciones"}
                        data={data}
                        columns={columns}
                    />
                </div>
            </div>
            <Modal show={showTipoHabitacion} onHide={handleTipoHabitacionClose} animation={false} dialogClassName='TipoHabitacion' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Insertar Tipo Habitación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">{bodyTipoHabitacion}</Modal.Body>
            </Modal>
            <Modal show={smShow} onHide={handleMensajeClose} animation={false} > {popUp}</Modal>
            <Modal show={showEditar} onHide={handleEditarShow} animation={false} dialogClassName='TipoHabitacion' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Tipo Habitación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">{bodyEditar}</Modal.Body>
            </Modal>
            <Modal show={showEliminar} onHide={handleEliminarClose}>
                {bodyEliminar}
            </Modal>
        </div>
    );
}
export default TipoHabitacion;