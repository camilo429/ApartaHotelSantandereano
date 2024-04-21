import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Apiurl } from '../../../services/userService';
import { FormGroup, Label } from "reactstrap";
import { Modal } from 'react-bootstrap';
import TipoDocumento from '../../pagesAdministrador/TipoDocumento';
import SelectHabitacionesDisponibles from '../../PaginaInicio/SelectHabitacionesDisponibles';
import { EXPRESION_REGULAR_NOMBRE_APELLIDO, EXPRESION_REGULAR_EMAIL } from "../../../services/ExpresionsRegular";

import MUIDataTable from 'mui-datatables';
import { Spinner } from 'reactstrap';
import { Link } from "react-router-dom";

const url = Apiurl + "reservaciones/listarReservas";
const urlG = Apiurl + "reservaciones/crearReservacion";
const urlD = Apiurl + "reservaciones/eliminarReservacion/";
const urlE = Apiurl + "reservaciones/actualizarReservacion/"

function Reservacion() {
    const [data, setData] = useState();
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [showReservacion, setReservacion] = useState(false);
    const handleReservacionClose = () => setReservacion(false);
    const handleReservacionShow = () => setReservacion(true);

    const [smShow, setSmShow] = useState(false);
    const handleMensajeClose = () => setSmShow(false);
    const handleShowMensaje = () => setSmShow(true);

    const [showEliminar, setShowEliminar] = useState(false);
    const handleEliminarClose = () => setShowEliminar(false);
    const handleEliminarShow = () => setShowEliminar(true);

    const [showEditar, setShowEditar] = useState(false);
    const handleEditarClose = () => setShowEditar(false);
    const handleEditarShow = () => setShowEditar(true);

    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        fechaEntrada: "",
        fechaSalida: "",
        adultos: "",
        ninos: "",
        tipoDocumento: {
            codTipoDocumento: "",
            nomTipoDocumento: "",
        },
        numDocumento: "",
        nombre: "",
        apellido: "",
        email: "",
        habitacion: {
            codHabitacion: "",
            nombreHabitacion: {
                codTipoHabitacio: "",
                nombre: "",
                precioXPersona: "",
                precioXAcompanante: ""
            },
            descripHabitacion: "",
            numHabitacion: "",
            pisoHabitacion: "",
            maxPersonasDisponibles: "",
            estadoHabitacion: {
                codEstadoHabitacion: "",
                nombre: ""
            },
            imagenHabitacion: null
        }
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

    function getCurrentDate() {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; // January is 0!
        const yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        return yyyy + '-' + mm + '-' + dd;
    }

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
            } else {
                console.log("Error Reservación", response.status);
            }
        } catch (error) {
            console.log("Error Reservación Get", error);
        }
    }

    const abrirCerrarModalMensaje = () => {
        handleShowMensaje();
        setTimeout(() => {
            handleMensajeClose();
        }, 2000); // 2000 milisegundos = 2 segundos
    };
    const peticionPost = async (e) => {
        try {
            e.preventDefault();
            console.log("ConsolaSeleccionada", consolaSeleccionada);
            setErrors(validationsForm(consolaSeleccionada));
            if (Object.keys(errors).length === 0) {
                setLoading(true);
                const response = await axios.post(urlG, consolaSeleccionada, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                    }
                });

                if (response.status === 201) {
                    setErrors({});
                    setData(data.concat(response.data));
                    handleReservacionClose();
                    setMensaje("Reservación Exitosa");
                    abrirCerrarModalMensaje();
                    peticionGet();
                    setConsolaSeleccionada({
                        tipoDocumento: {
                            codTipoDocumento: "",
                            nomTipoDocument: "",
                        },
                        habitacion: {
                            codHabitacion: "",
                            nombreHabitacion: {
                                codTipoHabitacio: "",
                                nombre: "",
                                precioXPersona: "",
                                precioXAcompanante: ""
                            },
                            descripHabitacion: "",
                            numHabitacion: "",
                            pisoHabitacion: "",
                            maxPersonasDisponibles: "",
                            estadoHabitacion: {
                                codEstadoHabitacion: "",
                                nombre: ""
                            },
                            imagenHabitacion: null
                        }
                    })
                }
                setLoading(false);
            } else {
                setErrors({});
                setMensaje("Error al realizar reservación");
                abrirCerrarModalMensaje();
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Realizar Reservación. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const peticionDelete = async () => {
        try {
            console.log("consolaSeleccionada", consolaSeleccionada);
            const response = await axios.delete(urlD + consolaSeleccionada.codReservacion, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            });
            if (response.status === 200) {
                setData(data.filter((consola) => consola[0] !== consolaSeleccionada));
                setMensaje("Reservación Eliminada");
                handleEliminarClose();
                abrirCerrarModalMensaje();
                peticionGet();
            } else {
                setMensaje("Error", response.status);
                handleEliminarShow();
            }
        } catch (error) {
            console.log(error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Realizar Reservación. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
            setLoading(false);
        }
    }
    const peticionPut = async (e) => {
        try {
            e.preventDefault();
            setErrors(validationsForm(consolaSeleccionada));
            if (Object.keys(errors).length === 0) {
                setLoading(true);
                console.log("put")
                const response = await axios.put(urlE + consolaSeleccionada.codReservacion, consolaSeleccionada, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                    }
                })
                if (response.status === 201) {
                    const dataNueva = data.map((consola) => {
                        if (consolaSeleccionada.codReservacion === consola.codReservacion) {
                            consola.codReservacion = consolaSeleccionada.codReservacion;
                            consola.fechaEntrada = consolaSeleccionada.fechaEntrada;
                            consola.fechaSalida = consolaSeleccionada.fechaSalida;
                            consola.totalDias = consolaSeleccionada.totalDias;
                            consola.adultos = consolaSeleccionada.adultos;
                            consola.ninos = consolaSeleccionada.ninos;
                            consola.tipoDocumento = {
                                codTipoDocumento: consolaSeleccionada.tipoDocumento.codTipoDocumento,
                                nomTipoDocumento: consolaSeleccionada.tipoDocumento.nomTipoDocumento
                            };
                            consola.habitacion = {
                                codHabitacion: consolaSeleccionada.habitacion.codHabitacion,
                                nombreHabitacion: {
                                    codTipoHabitacio: consolaSeleccionada.habitacion.nombreHabitacion.codTipoHabitacio,
                                    nombre: consolaSeleccionada.habitacion.nombreHabitacion.nombre,
                                    precioXPersona: consolaSeleccionada.habitacion.nombreHabitacion.precioXPersona,
                                    precioXAcompanante: consolaSeleccionada.habitacion.nombreHabitacion.precioXAcompanante,
                                },
                                descripHabitacion: consolaSeleccionada.habitacion.descripHabitacion,
                                numHabitacion: consolaSeleccionada.habitacion.numHabitacion,
                                pisoHabitacion: consolaSeleccionada.habitacion.pisoHabitacion,
                                maxPersonasDisponibles: consolaSeleccionada.habitacion.maxPersonasDisponibles,
                                estadoHabitacion: {
                                    codEstadoHabitacion: consolaSeleccionada.habitacion.estadoHabitacion.codEstadoHabitacion,
                                    nombre: consolaSeleccionada.habitacion.estadoHabitacion.nombre,
                                },
                                imagenHabitacion: consolaSeleccionada.habitacion.imagenHabitacion,
                            };
                            consola.numDocumento = consolaSeleccionada.numDocumento;
                            consola.nombre = consolaSeleccionada.nombre;
                            consola.apellido = consolaSeleccionada.apellido;
                            consola.email = consolaSeleccionada.email;
                            consola.totalHuespedes = consolaSeleccionada.totalHuespedes;
                            consola.totalPersona = consolaSeleccionada.totalPersona;

                        }
                        return consola;
                    })
                    setData(dataNueva);
                    peticionGet();
                    handleEditarClose();
                    setMensaje("Reservación Actualizada");
                    abrirCerrarModalMensaje();
                    setLoading(false);
                } else {
                    setLoading(false);
                    setErrors({});
                }
            }
        } catch (error) {
            console.log(error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Realizar Reservación. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
            setLoading(false);

        } finally {
            setLoading(false);
            setErrors({});
        }
    }

    const seleccionarReservacion = (consola, caso) => {
        console.log("consola", consola);
        setConsolaSeleccionada({
            codReservacion: consola[0],
            fechaEntrada: consola[1],
            fechaSalida: consola[2],
            totalDias: consola[3],
            adultos: consola[4],
            ninos: consola[5],
            tipoDocumento: {
                codTipoDocumento: consola[6].codTipoDocumento,
                nomTipoDocumento: consola[6].nomTipoDocumento,
            },
            habitacion: {
                codHabitacion: consola[7].codHabitacion,
                descripHabitacion: consola[7].descripHabitacion,
                estadoHabitacion: {
                    codEstadoHabitacion: consola[7].estadoHabitacion.codEstadoHabitacion,
                    nombre: consola[7].estadoHabitacion.nombre,
                },
                imagenHabitacion: consola[7].imagenHabitacion,
                maxPersonasDisponibles: consola[7].maxPersonasDisponibles,
                nombreHabitacion: {
                    codTipoHabitacio: consola[7].nombreHabitacion.codTipoHabitacio,
                    nombre: consola[7].nombreHabitacion.nombre,
                    precioXPersona: consola[7].nombreHabitacion.precioXPersona,
                    precioXAcompanante: consola[7].nombreHabitacion.precioXAcompanante,
                },
                numHabitacion: consola[7].numHabitacion,
                pisoHabitacion: consola[7].pisoHabitacion,
            },
            numDocumento: consola[8],
            nombre: consola[9],
            apellido: consola[10],
            email: consola[11],
        })
        //console.log("consolaSeleccionada", consolaSeleccionada);
        if (caso === "Eliminar") {
            handleEliminarShow();
        }
        if (caso === "Editar") {
            handleEditarShow();
        }
    }

    useEffect(() => {
        peticionGet();
    }, []);

    const validationsForm = (form) => {
        let errors = {};

        if (!form.fechaEntrada || form.fechaEntrada === "") {
            errors.fechaEntrada = "El campo 'Fecha de Entrada'es requerido";
        }
        if (!form.fechaSalida || form.fechaSalida === "") {
            errors.fechaSalida = "El campo 'Fecha de Entrada'es requerido";
        }
        if (form.fechaSalida < form.fechaEntrada) {
            errors.fechaSalida = "El campo 'Fecha Salida' No es valida"
        }
        //if (form.adultos < 1) {
        //  errors.adultos = "El campo 'Número Adultos' no puede ser menor a 1";
        //}
        if (form.ninos < 0) {
            errors.ninos = "El campo 'Número Niños' no puede ser negativo";
        }
        if (!form.nombre || form.nombre === "") {
            errors.nombre = "El campo 'Nombre' es requerido";
        } else if (!EXPRESION_REGULAR_NOMBRE_APELLIDO.test(form.nombre)) {
            errors.nombre = "El campo 'Nombre' no es valido";
        }
        if (!form.apellido || form.apellido === "") {
            errors.apellido = "El campo 'Apellido' es requerido";
        } else if (!EXPRESION_REGULAR_NOMBRE_APELLIDO.test(form.apellido)) {
            errors.apellido = "El campo 'Apellido' no es valido";
        }
        if (!form.email || form.email === "") {
            errors.email = "El campo 'Correo' es requerido";
        } else if (!EXPRESION_REGULAR_EMAIL.test(form.email.trim())) {
            errors.email = "El campo 'Correo' no es valido";
        }
        if (!form.numDocumento || form.numDocumento === "") {
            errors.numDocumento = "Número de documento es Requerido";
        }
        if (!form || !form.tipoDocumento || !form.tipoDocumento.nomTipoDocumento || form.tipoDocumento.nomTipoDocumento === "" || form.tipoDocumento.nomTipoDocumento === undefined) {
            errors.tipoDocumento = "Tipo documento es Requerido";
        }
        return errors;
    }

    const cerrarReservacion = () => {
        handleReservacionClose();
        setConsolaSeleccionada({
            tipoDocumento: {
                codTipoDocumento: "",
                nomTipoDocument: "",
            },
            habitacion: {
                codHabitacion: "",
                nombreHabitacion: {
                    codTipoHabitacio: "",
                    nombre: "",
                    precioXPersona: "",
                    precioXAcompanante: ""
                },
                descripHabitacion: "",
                numHabitacion: "",
                pisoHabitacion: "",
                maxPersonasDisponibles: "",
                estadoHabitacion: {
                    codEstadoHabitacion: "",
                    nombre: ""
                },
                imagenHabitacion: null
            }
        })
    }
    const cerrarEditarReservacion = () => {
        handleEditarClose();
        setConsolaSeleccionada({
            tipoDocumento: {
                codTipoDocumento: "",
                nomTipoDocument: "",
            },
            habitacion: {
                codHabitacion: "",
                nombreHabitacion: {
                    codTipoHabitacio: "",
                    nombre: "",
                    precioXPersona: "",
                    precioXAcompanante: ""
                },
                descripHabitacion: "",
                numHabitacion: "",
                pisoHabitacion: "",
                maxPersonasDisponibles: "",
                estadoHabitacion: {
                    codEstadoHabitacion: "",
                    nombre: ""
                },
                imagenHabitacion: null
            }
        })
    }
    const bodyInsertar = (
        <div>
            <form onSubmit={peticionPost}>
                <div className="flex" id="fomularioReservacion">
                    <FormGroup>
                        <div id="reservacion">
                            <Label for="exampleEmail">Fecha de Entrada</Label>
                            <input required name="fechaEntrada" type="date" placeholder="fechaEntrada" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.fechaEntrada || ""} onChange={handleChange} min={getCurrentDate()} />
                            {errors.fechaEntrada && <p id="errores">{errors.fechaEntrada}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup  >
                        <div id="reservacion">
                            <Label for="exampleEmail">Fecha de Salida</Label>
                            <input required name="fechaSalida" type="date" placeholder="fechaSalida" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.fechaSalida || ""} onChange={handleChange} min={getCurrentDate()} />
                            {errors.fechaSalida && <p id="errores">{errors.fechaSalida}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div id="reservacion">
                            <Label for="exampleEmail">Número de Adultos</Label>
                            <input required name="adultos" type="number" placeholder="# Adultos" max="5" min="1" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.adultos || 1} onChange={handleChange} />
                            {errors.adultos && <p id="errores">{errors.adultos}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div id="reservacion">
                            <Label for="exampleEmail">Número de Niños</Label>
                            <input required name="ninos" type="number" placeholder="# Niños" min="0" max="4" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.ninos || 0} onChange={handleChange} />
                            {errors.ninos && <p id="errores"> {errors.ninos}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup style={{ marginLeft: "7px" }}>
                        <div id="reservacion">
                            <Label for="exampleEmail">Tipo de Documento</Label>
                            <TipoDocumento name="tipoDocumento" handleChangeData={handleChange} value={consolaSeleccionada?.tipoDocumento || ""} onBlur={handleBlur} />
                            {errors.tipoDocumento && <p id="errores">{errors.tipoDocumento}</p>}
                        </div>
                    </FormGroup>
                </div>
                <div className="flex" id="fomularioReservacion">
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail"># Documento</Label>
                            <input name="numDocumento" type="number" placeholder="Número de Documento" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.numDocumento || ""} onChange={handleChange} />
                            {errors.numDocumento && <p id="errores">{errors.numDocumento}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail">Nombre</Label>
                            <input required name="nombre" placeholder="Nombre" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.nombre || ""} onChange={handleChange} />
                            {errors.nombre && <p id="errores">{errors.nombre}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail">Apellido</Label>
                            <input name="apellido" placeholder="Apellido" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.apellido || ""} onChange={handleChange} />
                            {errors.apellido && <p id="errores">{errors.apellido}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail">Correo Electronico</Label>
                            <input name="email" type="email" placeholder="email" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.email || ""} onChange={handleChange} />
                            {errors.email && <p id="errores">{errors.email}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup style={{ marginLeft: "7px" }}>
                        <div id="reservacion">
                            <Label for="exampleEmail">Tipo Habitación </Label>
                            <SelectHabitacionesDisponibles name="habitacion" handleChangeData={handleChange} value={consolaSeleccionada?.habitacion || ""} onBlur={handleBlur} />
                        </div>
                    </FormGroup>
                </div>
                <div className="flex">
                    {/* Indicador de carga */}
                    {loading && (
                        <div className="loading-container">
                            <div className="flex">
                                <Spinner color="primary" style={{ marginLeft: "200px" }} />
                                <div className="loading-spinner">Cargando</div>
                            </div>
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary">Agendar</button>
                    <button type="submit" className="btn btn-secondary" onClick={cerrarReservacion}>Cancelar</button>
                </div>
            </form >
            <br />
        </div >
    );

    const bodyEditar = (
        <form onSubmit={peticionPut}>
            <div className="flex" id="fomularioReservacion">
                <FormGroup>
                    <div id="reservacion">
                        <Label for="exampleEmail">Fecha de Entrada</Label>
                        <input required name="fechaEntrada" type="date" placeholder="fechaEntrada" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.fechaEntrada || ""} onChange={handleChange} min={getCurrentDate()} />
                        {errors.fechaEntrada && <p id="errores">{errors.fechaEntrada}</p>}
                    </div>
                </FormGroup>
                <FormGroup  >
                    <div id="reservacion">
                        <Label for="exampleEmail">Fecha de Salida</Label>
                        <input required name="fechaSalida" type="date" placeholder="fechaSalida" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.fechaSalida || ""} onChange={handleChange} min={getCurrentDate()} />
                        {errors.fechaSalida && <p id="errores">{errors.fechaSalida}</p>}
                    </div>
                </FormGroup>
                <FormGroup>
                    <div id="reservacion">
                        <Label for="exampleEmail">Número de Adultos</Label>
                        <input required name="adultos" type="number" placeholder="# Adultos" max="5" min="1" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.adultos || 1} onChange={handleChange} />
                        {errors.adultos && <p id="errores">{errors.adultos}</p>}
                    </div>
                </FormGroup>
                <FormGroup>
                    <div id="reservacion">
                        <Label for="exampleEmail">Número de Niños</Label>
                        <input required name="ninos" type="number" placeholder="# Niños" min="0" max="4" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.ninos || 0} onChange={handleChange} />
                        {errors.ninos && <p id="errores"> {errors.ninos}</p>}
                    </div>
                </FormGroup>
                <FormGroup style={{ marginLeft: "7px" }}>
                    <div id="reservacion">
                        <Label for="exampleEmail">Tipo de Documento</Label>
                        <TipoDocumento name="tipoDocumento" handleChangeData={handleChange} value={consolaSeleccionada?.tipoDocumento || ""} onBlur={handleBlur} />
                        {errors.tipoDocumento && <p id="errores">{errors.tipoDocumento}</p>}
                    </div>
                </FormGroup>
            </div>
            <div className="flex" id="fomularioReservacion">
                <FormGroup >
                    <div id="reservacion">
                        <Label for="exampleEmail"># Documento</Label>
                        <input name="numDocumento" type="number" placeholder="Número de Documento" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.numDocumento || ""} onChange={handleChange} />
                        {errors.numDocumento && <p id="errores">{errors.numDocumento}</p>}
                    </div>
                </FormGroup>
                <FormGroup >
                    <div id="reservacion">
                        <Label for="exampleEmail">Nombre</Label>
                        <input required name="nombre" placeholder="Nombre" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.nombre || ""} onChange={handleChange} />
                        {errors.nombre && <p id="errores">{errors.nombre}</p>}
                    </div>
                </FormGroup>
                <FormGroup >
                    <div id="reservacion">
                        <Label for="exampleEmail">Apellido</Label>
                        <input name="apellido" placeholder="Apellido" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.apellido || ""} onChange={handleChange} />
                        {errors.apellido && <p id="errores">{errors.apellido}</p>}
                    </div>
                </FormGroup>
                <FormGroup >
                    <div id="reservacion">
                        <Label for="exampleEmail">Correo Electronico</Label>
                        <input name="email" type="email" placeholder="email" className="form-control" onBlur={handleBlur} value={consolaSeleccionada?.email || ""} onChange={handleChange} />
                        {errors.email && <p id="errores">{errors.email}</p>}
                    </div>
                </FormGroup>
                <FormGroup style={{ marginLeft: "7px" }}>
                    <div id="reservacion">
                        <Label for="exampleEmail">Tipo Habitación </Label>
                        <SelectHabitacionesDisponibles name="habitacion" handleChangeData={handleChange} value={consolaSeleccionada?.habitacion || ""} onBlur={handleBlur} />
                    </div>
                </FormGroup>
            </div>
            <div className="flex">
                {/* Indicador de carga */}
                {loading && (
                    <div className="loading-container">
                        <div className="flex">
                            <Spinner color="primary" style={{ marginLeft: "200px" }} />
                            <div className="loading-spinner">Cargando</div>
                        </div>
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Agendar</button>
                <button type="submit" className="btn btn-secondary" onClick={cerrarEditarReservacion}>Cancelar</button>
            </div>
        </form >
    );

    const bodyEliminar = (
        <div className="bodyEliminar">
            <p>
                ¿ Esta seguro de Eliminar Reservación <b>{consolaSeleccionada && consolaSeleccionada.habitacion.numHabitacion} a nombre de: {consolaSeleccionada && consolaSeleccionada.nombre} {consolaSeleccionada && consolaSeleccionada.apellido}</b> ? <br />
            </p>
            <div align="right">
                <button className="btn btn-primary" onClick={() => peticionDelete()}> Si </button>
                <button className="btn btn-secondary" onClick={handleEliminarClose}>No</button>
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
            name: "codReservacion",
            label: "Código"
        }, {
            name: "fechaEntrada",
            label: "Fecha Entrada"
        }, {
            name: "fechaSalida",
            label: "Fecha Salida"
        }, {
            name: "totalDias",
            label: "Total Días"
        }, {
            name: "adultos",
            label: "Número Adultos"
        }, {
            name: "ninos",
            label: "Número Niños"
        }, {
            name: "tipoDocumento",
            label: "Tipo Documento",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, updateValue) => {
                    try {
                        if (value && value.nomTipoDocumento) {
                            return value.nomTipoDocumento;
                        } else {
                            return "nn";
                        }
                    } catch (error) {
                        console.log("Error al obtener tipos de documento", error)
                    }
                    return value;
                },
            },
        }, {
            name: "habitacion",
            label: " # Habitación",
            options: {
                customBodyRender: (value, tableMeta) => {
                    if (value && value.numHabitacion) {
                        return value.numHabitacion;
                    } else {
                        return ""; // Otra acción adecuada si value.nombre no está definido
                    }
                }
            }
        }, {
            name: "numDocumento",
            label: "# Identificación"
        }, {
            name: "nombre",
            label: "Nombre"
        }, {
            name: "apellido",
            label: "Apellido"
        }, {
            name: "email",
            label: "Correo"
        }, {
            name: "totalHuespedes",
            label: "Total Huespedes"
        }, {
            name: "totalPersona",
            label: "Valor Habitación"
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
                                        <Link className="dropdown-item" onClick={() => seleccionarReservacion(tableMeta.rowData, "Editar")}> Editar </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" onClick={() => seleccionarReservacion(tableMeta.rowData, "Eliminar")}> Eliminar </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                </ul>
                            </li>
                        </div>
                    );
                },
            },
        }
    ]
    return (
        <div>
            <h6 className='m-0 font-weight-bold text-primary'>Lista Reservaciones</h6>
            <div> <button onClick={handleReservacionShow} className="btn btn-primary"> Agregar Reservación</button> </div>
            <div>
                <MUIDataTable
                    title="Lista Reservaciones"
                    columns={columns}
                    data={data} />
            </div>
            <Modal show={showReservacion} onHide={handleReservacionClose} animation={false} dialogClassName='Reservacion'>
                <Modal.Header closeButton>
                    <Modal.Title >Crear Reservación</Modal.Title>
                </Modal.Header>
                <Modal.Body>{bodyInsertar}</Modal.Body>
            </Modal>
            <Modal show={showEditar} onHide={handleEditarClose} animation={false} dialogClassName="crearHuesped">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Reservación</Modal.Title>
                </Modal.Header>
                <Modal.Body>{bodyEditar}</Modal.Body>
            </Modal>
            <Modal show={smShow} onHide={handleMensajeClose} animation={false}> {popUp}</Modal>
            <Modal show={showEliminar} onHide={handleEliminarClose} size="lg"> {bodyEliminar} </Modal>

        </div>
    );
}
export default Reservacion;