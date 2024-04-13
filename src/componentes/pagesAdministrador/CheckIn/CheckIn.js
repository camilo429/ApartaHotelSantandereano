import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Apiurl } from '../../../services/userService';
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import SelectMultiProductos from '../Producto.js/SelectMultiProductos';
const url = Apiurl + "checkin/listarCheckin";
const urlC = Apiurl + "checkin/crearCheckin";

const CheckIn = () => {
    const [data, setData] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [errors, setErrors] = useState({});


    const [smShow, setSmShow] = useState(false);
    const handleMensajeClose = () => setSmShow(false);
    const handleShowMensaje = () => setSmShow(true);

    const [showProductos, setShowProductos] = useState(false);
    const handleProductosClose = () => setShowProductos(false);
    const handleProductosShow = () => setShowProductos(true);

    const [consolaFactura, setConsolaFactura] = useState({
        codFactura: "",
        descripcion: "",
        itemFactura: [{
            cantidad: "",
            producto: {
                codProducto: "",
                nombreProducto: "",
                marca: "",
                cantidad: "",
                precio: "",
                fechaRegistro: "",
                horaRegistro: ""
            }
        }],
        fechaCreacion: "",
        horaCreacion: "",
        estado: "",
        checkin: {
            codCheckin: "",
            fechaEntrada: "",
            fechaSalida: "",
            codHuesped: {
                codHuesped: "",
                nombre: "",
                apellido: "",
                numCelular: "",
                correo: "",
                tipoDocumento: {
                    codTipoDocumento: "",
                    nomTipoDocumento: ""
                },
                numDocumento: "",
                fechaNacimiento: "",
                edad: "",
                nacionalidad: {
                    codNacion: "",
                    nombre: ""
                },
                lugarOrigen: {
                    codRegion: "",
                    nacionalidad: {
                        codNacion: "",
                        nombre: ""
                    },
                    nombre: ""
                },
                nomContactoEmergencia: "",
                numContactoEmergencia: "",
                estadoHuesped: ""
            },
            codHabitacion: {
                codHabitacion: "",
                nombreHabitacion: {
                    codTipoHabitacion: "",
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
                imagenHabitacion: ""
            },
            numAdultos: "",
            numNinos: "",
            totalAcompañantes: "",
            totalPersona: ""
        },
        total: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsolaFactura((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const peticionGet = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            });
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.log("CheckIn get", error.status);
        }
    }
    const peticionPost = async (e) => {
        e.preventDefault();
        try {
            console.log("Factura", consolaFactura);
            const response = await axios.post(urlC, consolaFactura, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            console.log(response.status);
            if (response.status === 201) {
                setData(data.concat(response.data));
                setMensaje("Factura Creada");
                peticionGet();
                abrirCerrarModalMensaje();
                setConsolaFactura({});
            }

        } catch (error) {
            console.log(error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error Crear Factura. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
        }
    }
    const abrirCerrarModalMensaje = () => {
        handleShowMensaje();
        setTimeout(() => {
            handleMensajeClose();
        }, 2000); // 2000 milisegundos = 2 segundos
    };

    const seleccionarCheckIn = (consola, caso) => {
        console.log("consola", consola);
        setConsolaFactura({
            checkin: {
                codCheckin: consola[0],
                fechaEntrada: consola[1],
                fechaSalida: consola[2],
                codHuesped: {
                    codHuesped: consola[3].codHuesped,
                    nombre: consola[3].nombre,
                    apellido: consola[3].apellido,
                    numCelular: consola[3].numCelular,
                    correo: consola[3].correo,
                    edad: consola[3].edad,
                    estadoHuesped: consola[3].estado,
                    fechaNacimiento: consola[3].fechaNacimiento,
                    lugarOrigen: {
                        codRegion: consola[3].lugarOrigen.codRegion,
                        nombre: consola[3].lugarOrigen.nombre,
                        nacionalidad: {
                            codNacion: consola[3].lugarOrigen.nacionalidad.codNacion,
                            nombre: consola[3].lugarOrigen.nacionalidad.nombre,
                        }
                    },
                    nacionalidad: {
                        codNacion: consola[3].nacionalidad.codNacion,
                        nombre: consola[3].nacionalidad.nombre,
                    },
                    nomContactoEmergencia: consola[3].nomContactoEmergencia,
                    numContactoEmergencia: consola[3].numContactoEmergencia,
                    numDocumento: consola[3].numDocumento,
                    tipoDocumento: {
                        codTipoDocumento: consola[3].tipoDocumento.codTipoDocumento,
                        nomTipoDocumento: consola[3].tipoDocumento.nomTipoDocumento,
                    },
                },
                codHabitacion: {
                    codHabitacion: consola[4].codHabitacion,
                    nombreHabitacion: {
                        codTipoHabitacion: consola[4].nombreHabitacion.codTipoHabitacion,
                        nombre: consola[4].nombreHabitacion.nombre,
                        precioXPersona: consola[4].nombreHabitacion.precioXPersona,
                        precioXAcompanante: consola[4].nombreHabitacion.precioXAcompanante
                    },
                    numHabitacion: consola[4].numHabitacion,
                    pisoHabitacion: consola[4].pisoHabitacion,
                    descripHabitacion: consola[4].descripHabitacion,
                    maxPersonasDisponibles: consola[4].maxPersonasDisponibles,
                    estadoHabitacion: {
                        codEstadoHabitacion: consola[4].estadoHabitacion.codEstadoHabitacion,
                        nombre: consola[4].estadoHabitacion.nombre
                    },
                    imagenHabitacion: consola[4].imagenHabitacion
                },

            },

        })

        if (caso === "Factura") {
            handleProductosShow();
        }
    }

    const bodyProductos = (
        <div>
            <form onSubmit={peticionPost}>
                <div className='flex' style={{ width: "100%" }}>
                    <div>
                        <label>Productos</label>
                        <SelectMultiProductos name="producto" value={consolaFactura?.itemFactura || []} handleChangeData={handleChange} />
                    </div>
                </div>
                <div className='flex'>
                    <div>
                        <label>Nombre</label>
                        <input type='text' disabled name='nombre' value={consolaFactura?.checkin?.codHuesped?.nombre || ""} className='form-control' />
                    </div>
                    <div>
                        <label>Apellido</label>
                        <input type='text' disabled name='apellido' value={consolaFactura?.checkin?.codHuesped?.apellido || ""} className='form-control' />
                    </div>
                    <div>
                        <label>total</label>
                        <input type='text' name='total' value={consolaFactura?.total || ""} onChange={handleChange} className='form-control' />
                    </div>
                    <div>
                        <label>estado</label>
                        <input type='text' name='estado' value={consolaFactura?.estado || ""} onChange={handleChange} className='form-control' />
                    </div>
                    <div>
                        <label>descripcion</label>
                        <input type='text' name='descripcion' value={consolaFactura?.descripcion || ""} onChange={handleChange} className='form-control' />
                    </div>
                </div>
                <div className='flex'>
                    <button type='submit' className='btn btn-primary'>Crear Factura</button>
                    <button type='submit' className='btn btn-secondary' onClick={handleProductosClose}>Cancelar Factura</button>
                </div>
            </form>
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
    const columns = [
        {
            name: "codCheckin",
            label: "Código"
        }, {
            name: "fechaEntrada",
            label: "Fecha Entrada"
        }, {
            name: "fechaSalida",
            label: "Fecha Salida"
        }, {
            name: "codHuesped",
            label: "Nombre Huesped",
            options: {
                customBodyRender: (value, tableMeta) => {
                    if (value && value.nombre) {
                        return value.nombre;
                    } else {
                        return "";
                    }
                }
            }
        }, {
            name: "codHabitacion",
            label: " # Habitación",
            options: {
                customBodyRender: (value, tableMeta) => {
                    if (value && value.numHabitacion) {
                        return value.numHabitacion;
                    } else {
                        return "";
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
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="Informacion.html" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Información
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" onClick={() => seleccionarCheckIn(tableMeta.rowData, "Factura")}> Factura </Link>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    );
                }
            }
        }
    ]
    useEffect(() => {
        peticionGet();
    }, [])
    return (
        <div>
            checkIn
            <MUIDataTable
                data={data}
                columns={columns}
            />
            <Modal show={showProductos} onHide={handleProductosClose} animation={false} size='xl'>
                <Modal.Header>
                    <Modal.Title>Registrar Agregar Factura</Modal.Title>
                </Modal.Header>
                <Modal.Body>{bodyProductos}</Modal.Body>
            </Modal>
            <Modal show={smShow} onHide={handleMensajeClose} animation={false} > {popUp}</Modal>
        </div>
    );
}
export default CheckIn;