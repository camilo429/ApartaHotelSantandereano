import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Apiurl } from '../../../services/userService';
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import SelectMultiProductos from '../Producto.js/SelectMultiProductos';
import { useForm } from 'react-hook-form';
const url = Apiurl + "checkin/listarCheckin";
const CheckIn = () => {
    const [data, setData] = useState([]);

    const [showProductos, setShowProductos] = useState(false);
    const handleProductosClose = () => setShowProductos(false);
    const handleProductosShow = () => setShowProductos(true);

    const { handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const [consolaFactura, setConsolaFactura] = useState({
        codFactura: "",
        descripcion: "",
        itemFactura: [],
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
            } else {
                console.log("CheckIn get", response.status);
            }

        } catch (error) {
            console.log("CheckIn get", error.status);
        }
    }
    const peticionPost = async () => {
        try {

        } catch (error) {

        }
    }

    const seleccionarCheckIn = (consola, caso) => {
        console.log("consola", consola);

        if (consola === "Factura") {
            handleProductosShow();
        }

    }

    const bodyProductos = (
        <div>
            <form onSubmit={handleSubmit(peticionPost)}>
                <div className='flex'>
                    <div>
                        <label>Productos</label>
                        <SelectMultiProductos name="itemFactura" value={consolaFactura?.itemFactura} handleChangeData={handleChange} />
                    </div>
                </div>
            </form>
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
            <Modal show={showProductos} onHide={handleProductosClose} animation={false} dialogClassName="productos">
                <Modal.Header>
                    <Modal.Title>Registrar Agregar Factura</Modal.Title>
                </Modal.Header>
                {bodyProductos}
            </Modal>
        </div>
    );
}

export default CheckIn;
