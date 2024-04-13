import React, { useEffect, useState } from 'react';
import "./TipoHabitacion.css";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Apiurl } from "../../../services/userService";
import { Modal } from 'react-bootstrap';
import { EXPRESION_REGULAR_NOMBRE_APELLIDO } from "../../../services/ExpresionsRegular";
const url = Apiurl + "tipoHabiatcion/listarTipoHabitacion";
const urlG = Apiurl + "tipoHabiatcion/crearTipoHabitacion";
const urlE = Apiurl + "tipoHabiatcion/actualizarTipoHabitacion/";
const urlD = Apiurl + "tipoHabiatcion/"
const TipoHabitacion = () => {
    const [data, setData] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [errors, setErrors] = useState({});

    const [showTipoHabitacion, setShowTipoHabitacion] = useState(false);
    const handleTipoHabitacionClose = () => setShowTipoHabitacion(false);
    const handleTipoHabitacionShow = () => setShowTipoHabitacion(true);

    const [smShow, setSmShow] = useState(false);
    const handleMensajeClose = () => setSmShow(false);
    const handleShowMensaje = () => setSmShow(true);

    const [showEditar, setShowEditar] = useState(false);
    const handleEditarClose = () => setShowEditar(false);
    const handleEditarShow = () => setShowEditar(true);

    const [showEliminar, setShowEliminar] = useState(false);
    const handleEliminarClose = () => setShowEliminar(false);
    const handleEliminarShow = () => setShowEliminar(true);

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
    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validationsForm(consolaSeleccionada));
    }
    const validationsForm = (form) => {
        let errors = {};
        if (!form.nombre.trim()) {
            errors.nombre = "El campo 'Nombre' es requerido";
        } else if (!EXPRESION_REGULAR_NOMBRE_APELLIDO.test(form.nombre.trim())) {
            errors.nombre = "El campo 'Nombre' no es valido";
        }
        if (!form || form.precioXPersona === "") {
            errors.precioXPersona = "Precio Por Persona Es Requerido";
        }
        if (!form || form.precioXAcompanante === "") {
            errors.precioXAcompanante = "Precio Por Acompañante Es Requerido";
        }
        return errors;
    }

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

    const peticionPost = async (e) => {
        try {
            e.preventDefault();
            if (Object.keys(errors).length === 0) {
                const response = await axios.post(urlG, consolaSeleccionada, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                    }
                })
                if (response.status === 201) {
                    setData(data.concat(response.data));
                    setMensaje("Tipo Habitación Agregado");
                    peticionGet();
                    handleTipoHabitacionClose();
                    abrirCerrarModalMensaje();
                    setConsolaSeleccionada({
                        codTipoHabitacion: "",
                        nombre: "",
                        precioXAcompanante: "",
                        precioXPersona: "",
                    })
                }
                setErrors({});
            }
        } catch (error) {
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Editar el Empleado. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
        }
    }

    const peticionPut = async (e) => {
        try {
            e.preventDefault();
            console.log(Object.keys(errors).length, "put");
            if (Object.keys(errors).length === 0) {
                const response = await axios.put(urlE + consolaSeleccionada.codTipoHabitacion, consolaSeleccionada, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                    }
                });
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
                    abrirCerrarModalMensaje();
                    setConsolaSeleccionada({
                        codTipoHabitacion: "",
                        nombre: "",
                        precioXAcompanante: "",
                        precioXPersona: "",
                    })
                }
            }
        } catch (error) {
            console.log(error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Editar Tipo Habitación. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
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
    const abrirCerrarModalMensaje = () => {
        handleShowMensaje();
        setTimeout(() => {
            handleMensajeClose();
        }, 2000); // 2000 milisegundos = 2 segundos
    };
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
            <form onSubmit={peticionPost}>
                <div className='flex'>
                    <div className='formulario'>
                        <label>Nombre Habitación</label>
                        <input className='form-control' type='text' name='nombre' onBlur={handleBlur} value={consolaSeleccionada?.nombre || ""} onChange={handleChange} />
                        {errors.nombre && <p id='errores'>{errors.nombre}</p>}
                    </div>
                    <div className='formulario'>
                        <label>Precio * Persona</label>
                        <input className='form-control' type='number' name='precioXPersona' onBlur={handleBlur} value={consolaSeleccionada?.precioXPersona || ""} onChange={handleChange} />
                        {errors.precioXPersona && <p id='errores'>{errors.precioXPersona}</p>}
                    </div>
                    <div className='formulario'>
                        <label>Precio * Acompañante</label>
                        <input className='form-control' type='number' name='precioXAcompanante' onBlur={handleBlur} value={consolaSeleccionada?.precioXAcompanante || ""} onChange={handleChange} />
                        {errors.precioXAcompanante && <p id='errores'>{errors.precioXAcompanante}</p>}
                    </div>
                </div>
                <div className='flex'>
                    <button type='submit' className='btn btn-primary'>Agregar</button>
                    <button type='submit' className='btn btn-secondary' onClick={handleTipoHabitacionClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );

    const bodyEditar = (
        <div className='bodyCrearTipoHabitación'>
            <form onSubmit={peticionPut}>
                <div className='flex'>
                    <div className='formulario'>
                        <label>Nombre Habitación</label>
                        <input className='form-control' name='nombre' onBlur={handleBlur} value={consolaSeleccionada?.nombre || ""} onChange={handleChange} placeholder='Tipo Habitación' />
                        {errors.nombre && <p id='errores'>{errors.nombre}</p>}
                    </div>
                    <div className='formulario'>
                        <label>Precio * Persona</label>
                        <input className='form-control' name='precioXPersona' onBlur={handleBlur} value={consolaSeleccionada?.precioXPersona || ""} onChange={handleChange} placeholder='Valor * 1 persona' />
                        {errors.precioXPersona && <p id='errores'>{errors.precioXPersona}</p>}
                    </div>
                    <div className='formulario'>
                        <label>Precio * Acompañante</label>
                        <input className='form-control' name='precioXAcompanante' onBlur={handleBlur} value={consolaSeleccionada?.precioXAcompanante || ""} onChange={handleChange} placeholder='Valor * Acompañante' />
                        {errors.precioXAcompanante && <p id='errores'>{errors.precioXAcompanante}</p>}
                    </div>
                </div>
                <div className='flex'>
                    <button type='submit' className='btn btn-primary'>Agregar</button>
                    <button type='submit' className='btn btn-secondary' onClick={handleEditarClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );

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
        setConsolaSeleccionada({
            codTipoHabitacion: consola[0],
            nombre: consola[1],
            precioXPersona: consola[2],
            precioXAcompanante: consola[3],
        })
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
            label: "Precio * Acompañante"
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
            <Modal show={showEditar} onHide={handleEditarClose} animation={false} dialogClassName='TipoHabitacion' size='lg'>
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