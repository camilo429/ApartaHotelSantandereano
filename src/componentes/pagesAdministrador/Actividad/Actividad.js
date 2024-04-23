import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";

import { Apiurl } from '../../../services/userService';
import { resetErrorsCount } from 'ajv/dist/compile/errors';
import SelectEmpleados from '../SelectEmpleados';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./Actividad.css";
import { EXPRESION_REGULAR_HORA_MINUTO_SEGUNDO } from '../../../services/ExpresionsRegular';

const url = Apiurl + "actividades/listarActividades";
const urlC = Apiurl + "actividades/crearActividad";
const urlE = Apiurl + "actividades/verActividad";
const urlD = Apiurl + "actividades/eliminarActividad/";

const Actividad = () => {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [mensaje, setMensaje] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        codActividad: "",
        descripcion: "",
        empleado: {
            codEmpleado: "",
            nombre: "",
            apellido: "",
            tipDocumento: {
                codTipoDocumento: "",
                nomTipoDocumento: "",
            },
            numDocumento: "",
            edad: "",
            numTelefono: "",
            correo: "",
            fechaNacimiento: "",
            direccion: "",
            nomContactoEmergencia: "",
            numContactoEmergencia: "",
            eps: "",
            arl: "",
            sexo: {
                codSexo: "",
                nomSexo: "",
            },
            tipoSangre: {
                codTipoSangre: "",
                nomTipoSangre: "",
            },
            fotoEmpleado: "",
            actividad: [],
            fechaIngreso: "",
            fechaSalida: "",
        },
        estadoActividad: "",
        fechaEntrega: "",
        horaEntrega: "",
        titulo: ""
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
            console.log(response.data);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.log("get", error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al traer Tareas. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
        }
    }
    const peticionPost = async (e) => {
        try {
            setErrors(validationForm(consolaSeleccionada));
            if (Object.keys(errors).length === 0) {
                e.preventDefault();
                console.log(consolaSeleccionada);
                const response = await axios.post(urlC, consolaSeleccionada, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                    }
                })
                console.log(response.status);
                if (response.status === 201) {
                    setData(data.concat(response.data));
                    setMensaje("Actividad Creada");
                    handleClose();
                    abrirCerrarModalMensaje();
                    peticionGet();
                    setConsolaSeleccionada({
                        codActividad: "",
                        descripcion: "",
                        empleado: {
                            codEmpleado: "",
                            nombre: "",
                            apellido: "",
                            tipDocumento: {
                                codTipoDocumento: "",
                                nomTipoDocumento: "",
                            },
                            numDocumento: "",
                            edad: "",
                            numTelefono: "",
                            correo: "",
                            fechaNacimiento: "",
                            direccion: "",
                            nomContactoEmergencia: "",
                            numContactoEmergencia: "",
                            eps: "",
                            arl: "",
                            sexo: {
                                codSexo: "",
                                nomSexo: "",
                            },
                            tipoSangre: {
                                codTipoSangre: "",
                                nomTipoSangre: "",
                            },
                            fotoEmpleado: "",
                            actividad: [],
                            fechaIngreso: "",
                            fechaSalida: "",
                        },
                        estadoActividad: "",
                        fechaEntrega: "",
                        horaEntrega: "",
                        titulo: ""
                    })
                    setErrors({});
                }
            }
        } catch (error) {
            console.log("post", error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Asignar Tarea. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
        }
    }
    const peticionPut = async (e) => {
        try {
            e.preventDefault();
            setErrors(validationForm(consolaSeleccionada));
            if (Object.keys(errors).length === 0) {
                const response = axios.put(urlE + consolaSeleccionada.codActividad, consolaSeleccionada, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                    }
                })
                if (response.status === 201) {
                    const dataNueva = data.map((consola) => {
                        if (consolaSeleccionada.codActividad === consola.codActividad) {

                        }
                        return consola;
                    })
                    setData(dataNueva);
                    peticionGet();
                    handleEditarShow();
                    setMensaje("Tarea Actualizada");
                    abrirCerrarModalMensaje("");
                }
            }
        } catch (error) {

        }
    }
    const peticionDelete = async (e) => {
        try {
            const response = await axios.delete(urlD + consolaSeleccionada.codActividad, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            if (response.status === 200) {
                setData(data.filter((consola) => consola.codActividad !== consolaSeleccionada.codActividad));
                setMensaje("Tarea Eliminada");
                handleEliminarClose();
                abrirCerrarModalMensaje();
                peticionGet();
            }
        } catch (error) {
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Eliminar Tarea. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
        }
    }
    const cerrarAsignarActividad = () => {
        handleClose();
        setConsolaSeleccionada({
            codActividad: "",
            descripcion: "",
            empleado: {
                codEmpleado: "",
                nombre: "",
                apellido: "",
                tipDocumento: {
                    codTipoDocumento: "",
                    nomTipoDocumento: "",
                },
                numDocumento: "",
                edad: "",
                numTelefono: "",
                correo: "",
                fechaNacimiento: "",
                direccion: "",
                nomContactoEmergencia: "",
                numContactoEmergencia: "",
                eps: "",
                arl: "",
                sexo: {
                    codSexo: "",
                    nomSexo: "",
                },
                tipoSangre: {
                    codTipoSangre: "",
                    nomTipoSangre: "",
                },
                fotoEmpleado: "",
                actividad: [],
                fechaIngreso: "",
                fechaSalida: "",
            },
            estadoActividad: "",
            fechaEntrega: "",
            horaEntrega: "",
            titulo: ""
        })

    }
    const cerrarEditarTarea = () => {
        handleEditarClose();
        setConsolaSeleccionada({
            codActividad: "",
            descripcion: "",
            empleado: {
                codEmpleado: "",
                nombre: "",
                apellido: "",
                tipDocumento: {
                    codTipoDocumento: "",
                    nomTipoDocumento: "",
                },
                numDocumento: "",
                edad: "",
                numTelefono: "",
                correo: "",
                fechaNacimiento: "",
                direccion: "",
                nomContactoEmergencia: "",
                numContactoEmergencia: "",
                eps: "",
                arl: "",
                sexo: {
                    codSexo: "",
                    nomSexo: "",
                },
                tipoSangre: {
                    codTipoSangre: "",
                    nomTipoSangre: "",
                },
                fotoEmpleado: "",
                actividad: [],
                fechaIngreso: "",
                fechaSalida: "",
            },
            estadoActividad: "",
            fechaEntrega: "",
            horaEntrega: "",
            titulo: ""
        })

    }
    const cerrarEliminarTarea = () => {
        handleEliminarClose();
        setConsolaSeleccionada({
            codActividad: "",
            descripcion: "",
            empleado: {
                codEmpleado: "",
                nombre: "",
                apellido: "",
                tipDocumento: {
                    codTipoDocumento: "",
                    nomTipoDocumento: "",
                },
                numDocumento: "",
                edad: "",
                numTelefono: "",
                correo: "",
                fechaNacimiento: "",
                direccion: "",
                nomContactoEmergencia: "",
                numContactoEmergencia: "",
                eps: "",
                arl: "",
                sexo: {
                    codSexo: "",
                    nomSexo: "",
                },
                tipoSangre: {
                    codTipoSangre: "",
                    nomTipoSangre: "",
                },
                fotoEmpleado: "",
                actividad: [],
                fechaIngreso: "",
                fechaSalida: "",
            },
            estadoActividad: "",
            fechaEntrega: "",
            horaEntrega: "",
            titulo: ""
        })

    }
    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validationForm(consolaSeleccionada));
    }
    const validationForm = () => {
        let errors = {};
        if (!consolaSeleccionada || consolaSeleccionada.titulo === "") {
            errors.titulo = "El campo 'Título' es requerido";
        }
        if (!consolaSeleccionada || consolaSeleccionada.fechaEntrega === "") {
            errors.fechaEntrega = "El campo 'Fecha Entrega' es requerido";
        }
        if (!consolaSeleccionada || consolaSeleccionada.horaEntrega === "") {
            errors.horaEntrega = "El Campo 'Hora Entrega' es requerido";
        } else if (!EXPRESION_REGULAR_HORA_MINUTO_SEGUNDO.test(consolaSeleccionada.horaEntrega)) {
            errors.horaEntrega = "El Campo 'Hora Entrega' no es válido";
        }
        if (!consolaSeleccionada || consolaSeleccionada.estadoActividad === "") {
            errors.estadoActividad = "Estado Actividad es requerido"
        }
        if (!consolaSeleccionada || !consolaSeleccionada.empleado || consolaSeleccionada.empleado.nombre === "") {
            errors.empleado = "Es necesario Elegir Empleado";
        }
        if (!consolaSeleccionada || consolaSeleccionada.descripcion === "") {
            errors.descripcion = "Es Necesario una descripción breve de la tarea";
        }


        return errors;
    }
    useEffect(() => {
        peticionGet();
    }, []);
    const abrirCerrarModalMensaje = () => {
        handleShowMensaje();
        setTimeout(() => {
            handleMensajeClose();
        }, 2000);
    };
    const seleccionarTarea = (consola, caso) => {
        console.log("consola", consola);
        setConsolaSeleccionada({
            codActividad: consola[0],
            titulo: consola[1],
            descripcion: consola[2],
            fechaEntrega: consola[3],
            horaEntrega: consola[4],
            estadoActividad: consola[5],
            empleado: {
                codEmpleado: consola[6].codEmpleado,
                nombre: consola[6].nombre,
                apellido: consola[6].apellido,
                tipDocumento: {
                    codTipoDocumento: consola[6].tipDocumento.codTipoDocumento,
                    nomTipoDocumento: consola[6].tipDocumento.nomTipoDocumento,
                },
                numDocumento: consola[6].numDocumento,
                edad: consola[6].edad,
                numTelefono: consola[6].numTelefono,
                correo: consola[6].correo,
                fechaNacimiento: consola[6].fechaNacimiento,
                direccion: consola[6].direccion,
                nomContactoEmergencia: consola[6].nomContactoEmergencia,
                numContactoEmergencia: consola[6].numContactoEmergencia,
                eps: consola[6].eps,
                arl: consola[6].arl,
                sexo: {
                    codSexo: consola[6].sexo.codSexo,
                    nomSexo: consola[6].sexo.nomSexo,
                },
                tipoSangre: {
                    codTipoSangre: consola[6].tipoSangre.codTipoSangre,
                    nomTipoSangre: consola[6].tipoSangre.nomTipoSangre,
                },
                fotoEmpleado: consola[6].fotoEmpleado,
                actividad: consola[6].actividad,
                fechaIngreso: consola[6].fechaIngreso,
                fechaSalida: consola[6].fechaSalida,
            },

        })
        if (caso === "Editar") {
            handleEditarShow();
        }
        if (caso === "Eliminar") {
            handleEliminarShow();
        }
    }
    const bodyInsertar = (
        <form onSubmit={peticionPost}>
            <div className='flex'>
                <div className='formActividad'>
                    <label>Título</label>
                    <input name='titulo' type='text' className='form-control' onBlur={handleBlur} required onChange={handleChange} placeholder='Título' value={consolaSeleccionada.titulo || ""} />
                    {errors.titulo && <p id='errors'>{errors.titulo}</p>}
                </div>
                <div className='formActividad'>
                    <label>Fecha Entrega</label>
                    <input name='fechaEntrega' type='date' className='form-control' onBlur={handleBlur} required onChange={handleChange} value={consolaSeleccionada?.fechaEntrega || ""} />
                    {errors.fechaEntrega && <p id='errors'>{errors.fechaEntrega}</p>}
                </div>
                <div className='formActividad'>
                    <label>Hora Entrega</label>
                    <input name='horaEntrega' type="text" className='form-control' required onBlur={handleBlur} onChange={handleChange} value={consolaSeleccionada?.horaEntrega || ""} placeholder='Hora:Minutos:Segundos' />
                    {errors.horaEntrega && <p id='errors'>{errors.horaEntrega}</p>}
                </div>
                <div className='formActividad'>
                    <label>Estado Actividad</label>
                    <select name='estadoActividad' className='form-select' aria-label="Default select example" required onChange={handleChange} placeholder="Seleccione Actividad">
                        <option value="COMPLETADO">COMPLETADO</option>
                        <option value="PENDIENTE">PENDIENTE</option>
                        <option value="CANCELADO">CANCELADO</option>
                        <option value="EN CURSO">EN CURSO</option>
                    </select>
                    {errors.estadoActividad && <p id='errors'>{errors.estadoActividad}</p>}
                </div>
            </div>
            <div className='flex'>
                <div className='formDescripcion'>
                    <label>Empleado</label>
                    <SelectEmpleados name="empleado" value={consolaSeleccionada?.empleado || ""} handleChangeData={handleChange} />
                    {errors.empleado && <p id='errors'>{errors.empleado}</p>}
                </div>
                <div className='formDescripcion'>
                    <label>Descripcion</label>
                    <textarea name='descripcion' type="textarea" className='form-control' onBlur={handleBlur} required onChange={handleChange} placeholder='Descripcion' value={consolaSeleccionada?.descripcion || ""} style={{ resize: "none" }} />
                    {errors.descripcion && <p id='errors'>{errors.descripcion}</p>}
                </div>
            </div>
            <div className='flex' style={{ alignItems: "center" }}>
                <button className='btn btn-primary' type='submit'>Asignar</button>
                <button className='btn btn-secondary' type='submit' onClick={cerrarAsignarActividad}>Cancelar</button>
            </div>
        </form>
    );
    const bodyEditar = (
        <form onSubmit={cerrarEditarTarea}>
            <div className='flex'>
                <div className='formActividad'>
                    <label>Título</label>
                    <input name='titulo' type='text' className='form-control' onBlur={handleBlur} onChange={handleChange} placeholder='Título' value={consolaSeleccionada.titulo || ""} />
                    {errors.titulo && <p id='errors'>{errors.titulo}</p>}
                </div>
                <div className='formActividad'>
                    <label>Fecha Entrega</label>
                    <input name='fechaEntrega' type='date' className='form-control' onBlur={handleBlur} onChange={handleChange} value={consolaSeleccionada?.fechaEntrega || ""} />
                    {errors.fechaEntrega && <p id='errors'>{errors.fechaEntrega}</p>}
                </div>
                <div className='formActividad'>
                    <label>Hora Entrega</label>
                    <input name='horaEntrega' type="text" className='form-control' onBlur={handleBlur} onChange={handleChange} value={consolaSeleccionada?.horaEntrega || ""} placeholder='Hora:Minutos:Segundos' />
                    {errors.horaEntrega && <p id='errors'>{errors.horaEntrega}</p>}
                </div>
                <div className='formActividad'>
                    <label>Estado Actividad</label>
                    <select name='estadoActividad' className='form-select' aria-label="Default select example" onChange={handleChange} placeholder="Seleccione Actividad">
                        <option value="COMPLETADO">COMPLETADO</option>
                        <option value="PENDIENTE">PENDIENTE</option>
                        <option value="CANCELADO">CANCELADO</option>
                        <option value="EN CURSO">EN CURSO</option>
                    </select>
                    {errors.estadoActividad && <p id='errors'>{errors.estadoActividad}</p>}
                </div>
            </div>
            <div className='flex'>
                <div className='formDescripcion'>
                    <label>Empleado</label>
                    <SelectEmpleados name="empleado" value={consolaSeleccionada?.empleado || ""} handleChangeData={handleChange} />
                    {errors.empleado && <p id='errors'>{errors.empleado}</p>}
                </div>
                <div className='formDescripcion'>
                    <label>Descripcion</label>
                    <textarea name='descripcion' type="textarea" className='form-control' onBlur={handleBlur} onChange={handleChange} placeholder='Descripcion' value={consolaSeleccionada?.descripcion || ""} style={{ resize: "none" }} />
                    {errors.descripcion && <p id='errors'>{errors.descripcion}</p>}
                </div>
            </div>
            <div className='flex' style={{ alignItems: "center" }}>
                <button className='btn btn-primary' type='submit'>Guardar Cambios</button>
                <button className='btn btn-secondary' type='submit' >Cerrar</button>
            </div>
        </form>
    );
    const bodyEliminar = (
        <div className="bodyEliminar">
            <p>
                Esta seguro de Eliminar la Tarea
                <br />
                <b> {(consolaSeleccionada && consolaSeleccionada.titulo)}</b> Asignada a:<b> {(consolaSeleccionada.empleado.nombre + " " + consolaSeleccionada.empleado.apellido) || ""} </b> ?
            </p>
            <div align="right">
                <button className="btn btn-primary" type="submit" onClick={() => peticionDelete()} style={{ margin: "5px" }}> Eliminar </button>
                <button className="btn btn-danger" type="submit" onClick={cerrarEliminarTarea} > Cancelar </button>
            </div>
        </div>
    );

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
    );

    const columns = [
        {
            name: "codActividad",
            label: "Código"
        }, {
            name: "titulo",
            label: "Titulo"
        }, {
            name: "descripcion",
            label: "Descripcion"
        }, {
            name: "fechaEntrega",
            label: "Fecha Entrega"
        }, {
            name: "horaEntrega",
            label: "Hora Entrega"
        }, {
            name: "estadoActividad",
            label: "Estado Entrega"
        }, {
            name: "empleado",
            label: "Nombre Empleado",
            options: {
                customBodyRender: (value, tableMeta) => {
                    if (value && value.nombre && value.apellido) {
                        return value.nombre + " " + value.apellido;
                    } else {
                        return ""
                    }
                }
            }
        }, {
            name: "acciones",
            label: "Acciones",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <Link className="nav-link dropdown-toggle" to="Informacion.html" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Información
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link className="dropdown-item" onClick={() => seleccionarTarea(tableMeta.rowData, "Editar")}> Editar </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={() => seleccionarTarea(tableMeta.rowData, "Eliminar")}> Eliminar </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                            </ul>
                        </div>
                    )
                }
            }
        }
    ]
    return (
        <div>
            <div>
                <button className='btn btn-primary' type='submit' onClick={handleShow} >Crear Actividad</button>
            </div>
            <div>
                <MUIDataTable title={"Lista Huespedes"} data={data} columns={columns} />
            </div>
            <Modal show={show} onHide={handleClose} animation={false} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Asignar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">{bodyInsertar}</Modal.Body>
            </Modal>
            <Modal show={smShow} onHide={handleMensajeClose} animation={false} > {popUp}</Modal>
            <Modal show={showEditar} onHide={handleEditarClose} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>{bodyEditar}</Modal.Body>
            </Modal>
            <Modal show={showEliminar} onHide={handleEliminarClose}> {bodyEliminar} </Modal>
        </div>
    );
}

export default Actividad;
