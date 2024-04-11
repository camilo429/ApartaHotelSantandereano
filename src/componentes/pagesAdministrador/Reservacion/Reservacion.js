import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Apiurl } from '../../../services/userService';
import { useForm } from 'react-hook-form';
import { Form, FormGroup, Label } from "reactstrap";
import { Modal } from 'react-bootstrap';
import TipoDocumento from '../../pagesAdministrador/TipoDocumento';
import Habitaciones from '../../PaginaInicio/SelectHabitacionesDisponibles';

import MUIDataTable from 'mui-datatables';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
const url = Apiurl + "reservaciones/listarReservas";
const urlG = Apiurl + "reservaciones/crearReservacion";
const urlD = Apiurl + "reservaciones/eliminarReservacion/";

const Reservacion = () => {
    const [data, setData] = useState();

    const [showInsertar, setInsertarShow] = useState(false);
    const handleInsertarClose = () => setInsertarShow(false);
    const handleInsertarShow = () => setInsertarShow(true);

    const [smShow, setSmShow] = useState(false);
    const handleMensajeClose = () => setSmShow(false);
    const handleShowMensaje = () => setSmShow(true);

    const [showEliminar, setShowEliminar] = useState(false);
    const handleEliminarClose = () => setShowEliminar(false);
    const handleEliminarShow = () => setShowEliminar(true);

    const [mensaje, setMensaje] = useState("");

    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        fechaEntrada: "",
        fechaSalida: "",
        adultos: 0,
        ninos: 0,
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

    const peticionPost = async () => {
        try {
            setIsLoading(true);
            console.log("ConsolaSeleccionada", consolaSeleccionada)
            const response = await axios.post(urlG, consolaSeleccionada, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,

                }
            });

            if (response.status === 201) {
                setData(data.concat(response.data));
                handleInsertarClose();
                setMensaje("Reservación Exitosa");
                handleShowMensaje();
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
                reset();
            } else {
                alert('Error', response.status);
            }
        } catch (error) {
            console.error("Error al realizar la reservación", error);
            alert("Hubo un error al crear la reservación. Por favor, intenta nuevamente.", error.response.data);
        } finally {
            setIsLoading(false);
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
                handleShowMensaje();
                peticionGet();
            } else {
                setMensaje("Error", response.status);
                handleEliminarShow();
            }
        } catch (error) {
            console.log("error eliminar Reservación", error);
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
                nombreHabitacion: {
                    codTipoHabitacio: consola[7].nombreHabitacion.codTipoHabitacio,
                    nombre: consola[7].nombreHabitacion.nombre,
                    precioXPersona: consola[7].nombreHabitacion.precioXPersona,
                    precioXAcompanante: consola[7].nombreHabitacion.precioXAcompanante,
                },
                descripHabitacion: consola[7].descripHabitacion,
                numHabitacion: consola[7].numHabitacion,
                pisoHabitacion: consola[7].pisoHabitacion,
                maxPersonasDisponibles: consola[7].maxPersonasDisponibles,
                estadoHabitacion: {
                    codEstadoHabitacion: consola[7].codEstadoHabitacion,
                    nombre: consola[7].nombre,
                },
                imagenHabitacion: consola[7],
            },
            numDocumento: consola[8],
            nombre: consola[9],
            apellido: consola[10],
            email: consola[11],
            totalHuespedes: consola[12],
            totalPersona: consola[13]
        })
        console.log("consolaSeleccionada", consolaSeleccionada);
        if (caso === "Eliminar") {
            handleEliminarShow();
        }
    }

    useEffect(() => {
        peticionGet();
    }, []);

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
                                    <li>
                                        <Link className="dropdown-item" to={`/Login`}> Factura </Link>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    );
                },
            },
        }
    ]
    const bodyInsertar = (
        <div>
            <Form onSubmit={handleSubmit(peticionPost)}>
                <div className="flex" id="fomularioReservacion">
                    <FormGroup>
                        <div id="reservacion">
                            <Label for="exampleEmail">Fecha de Entrada</Label>
                            <input required name="fechaEntrada" type="date" placeholder="fechaEntrada" className="form-control" onChange={handleChange} />
                            {errors.fechaEntrada && <p id="errores">{errors.fechaEntrada.message}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup  >
                        <div id="reservacion">
                            <Label for="exampleEmail">Fecha de Salida</Label>
                            <input name="fechaSalida" type="date" placeholder="fechaSalida" className="form-control" onChange={handleChange} />
                            {errors.fechaSalida?.type === "required" && <p id="errores">El Campo es Requerido</p>}
                            {errors.fechaSalida?.type === 'maxLength' && <p id="errores">Fecha no valida</p>}
                            {errors.fechaSalida && <p id="errores">{errors.fechaSalida.message}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div id="reservacion">
                            <Label for="exampleEmail">Número de Adultos</Label>
                            <input required name="adultos" type="number" placeholder="# Adultos" max="5" min="1" className="form-control" onChange={handleChange} />
                            {errors.adultos?.type === "required" && <p id="errores">Es Requerido</p>}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div id="reservacion">
                            <Label for="exampleEmail">Número de Niños</Label>
                            <input required name="ninos" type="number" placeholder="# Niños" min="0" max="4" className="form-control" onChange={handleChange} defaultValue="0" />
                            {errors.ninos?.type === 'required' && <p id="errores"> Es requerido</p>}
                        </div>
                    </FormGroup>
                    <FormGroup style={{ marginLeft: "7px" }}>
                        <div id="reservacion">
                            <Label for="exampleEmail">Tipo de Documento</Label>
                            <TipoDocumento name="tipoDocumento" handleChangeData={handleChange} value={consolaSeleccionada.tipoDocumento} />
                        </div>
                    </FormGroup>
                </div>
                <div className="flex" id="fomularioReservacion">
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail"># Documento</Label>
                            <input name="numDocumento" type="number" placeholder="Número de Documento" className="form-control" onChange={handleChange} />
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail">Nombre</Label>
                            <input name="nombre" placeholder="Nombre" className="form-control" onChange={handleChange} />
                            {errors.nombre?.type === 'required' && <p id="errores">El campo es requerido</p>}
                            {errors.nombre?.type === 'maxLength' && <p id="errores">Es muy largo</p>}
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail">Apellido</Label>
                            <input name="apellido" placeholder="Apellido" className="form-control" onChange={handleChange} />
                            {errors.apellido?.type === 'required' && <p id="errores">El campo es requerido</p>}
                            {errors.apellido?.type === 'maxLength' && <p id="errores">Es muy largo</p>}
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail">Correo Electronico</Label>
                            <input name="email" type="email" placeholder="email" className="form-control" onChange={handleChange} />
                            {errors.email?.type === "pattern" && <p id="errores">Dirección no valida</p>}
                            {errors.email?.type === 'required' && <p id="errores">El campo es requerido</p>}
                        </div>
                    </FormGroup>
                    <FormGroup style={{ marginLeft: "7px" }}>
                        <div id="reservacion">
                            <Label for="exampleEmail">Tipo Habitación </Label>
                            <Habitaciones name="habitacion" handleChangeData={handleChange} value={consolaSeleccionada.habitacion} />
                        </div>
                    </FormGroup>
                </div>
                <div className="flex">
                    {/* Indicador de carga */}
                    {/*{isLoading && (
                        <div className="loading-container">
                            <div className="flex">
                                <Spinner color="primary" style={{ marginLeft: "200px" }} />
                                <div className="loading-spinner">Cargando</div>
                            </div>
                        </div>
                    )}*/}
                    <button type="submit" className="btn btn-success">Agendar</button>
                    <button type="submit" className="btn btn-danger" onClick={handleInsertarClose}> Cancelar</button>
                </div>
            </Form >
            <br />
        </div >
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
    return (
        <div>
            <br />
            <h6 className='m-0 font-weight-bold text-primary'>Lista Reservaciones</h6>
            <div> <button onClick={handleInsertarShow} className="btn btn-primary"> Agregar Reservación</button> </div>
            <div>
                <MUIDataTable
                    title="Lista Reservaciones"
                    columns={columns}
                    data={data} />
            </div>
            <Modal show={showInsertar} onHide={handleInsertarClose} animation={false} dialogClassName='Reservacion'>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Crear Reservación
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {bodyInsertar}
                </Modal.Body>
            </Modal>
            <Modal show={smShow} onHide={handleMensajeClose} animation={false}> {popUp}</Modal>
            <Modal show={showEliminar} onHide={handleEliminarClose} size="lg"> {bodyEliminar} </Modal>

        </div>
    );
}
export default Reservacion;