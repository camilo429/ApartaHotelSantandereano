import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Apiurl } from '../../../services/userService';
import MUIDataTable from 'mui-datatables';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

const url = Apiurl + "tipRecibo/listarTipoRecibos";
const urlC = Apiurl + "tipRecibo/crearTipoRecibo";
const urlU = Apiurl + "tipRecibo/actualizarTipoRecibo/";
const urlD = Apiurl + "tipRecibo/eliminarTipoRecibo/";


const TipoReciboPublico = () => {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [mensaje, setMensaje] = useState("");

    const [showTipoRecibo, setTipoReciboShow] = useState(false);
    const handleTipoReciboClose = () => setTipoReciboShow(false);
    const handleTipoReciboShow = () => setTipoReciboShow(true);

    const [smShow, setSmShow] = useState(false);
    const handleMensajeClose = useCallback(() => setSmShow(false), [setSmShow]);
    const handleShowMensaje = useCallback(() => setSmShow(true), [setSmShow]);

    const [showEditar, setShowEditar] = useState(false);
    const handleEditarClose = () => setShowEditar(false);
    const handleEditarShow = () => setShowEditar(true);

    const [showEliminar, setShowEliminar] = useState(false);
    const handleEliminarClose = () => setShowEliminar(false);
    const handleEliminarShow = () => setShowEliminar(true);

    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        codTipRecibo: "",
        empresaPub: ""
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
        }, 2000);
    }, [handleShowMensaje, handleMensajeClose])
    const peticionGet = useCallback(async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            });
            console.log("data tipoRecibo", response.data);
            if (response.status === 200) {
                setData(response.data);

            } else {
                alert("¡No hay comentarios!");
            }
        } catch (error) {
            console.log("post", error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al traer Empresa. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
        }
    }, [abrirCerrarModalMensaje])
    useEffect(() => {
        peticionGet();
    }, [peticionGet])
    const peticionPost = async (e) => {
        try {
            e.preventDefault();
            console.log("data empresa", consolaSeleccionada)
            const response = await axios.post(urlC, consolaSeleccionada, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            });
            console.log("Get Comentario", response.status);
            if (response.status === 201) {
                setData(data.concat(response.data));
                peticionGet();
                setMensaje("Empresa Creada");
                handleTipoReciboClose();
                abrirCerrarModalMensaje();
                setConsolaSeleccionada({});
            } else {
                alert("¡No hay comentarios!");
                setConsolaSeleccionada({});
            }
        } catch (error) {
            console.log("post", error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Actualizar Empresa. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
        }
    }
    const peticionPut = async (e) => {
        try {
            e.preventDefault();
            console.log("data empresa", consolaSeleccionada)
            const response = await axios.put(urlU + consolaSeleccionada.codTipRecibo, consolaSeleccionada, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            });
            if (response.status === 201) {
                const dataNueva = data.map((consola) => {
                    if (consolaSeleccionada.codTipRecibo === consola.codTipRecibo) {
                        return { ...consola, ...consolaSeleccionada };
                    }
                    return consola;
                })
                setData(dataNueva);
                peticionGet();
                setMensaje("Empresa Actualizada");
                handleEditarClose();
                abrirCerrarModalMensaje();
                setConsolaSeleccionada({});
            } else {
                setConsolaSeleccionada({});
            }
        } catch (error) {
            console.log("post", error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Actualizar Empresa. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
        }
    }
    const peticionDelete = async () => {
        try {
            const response = await axios.delete(urlD + consolaSeleccionada.codTipRecibo, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            console.log("Eliminar Producto", response.status);
            if (response.status === 200) {
                setData(data.filter((consola) => consola[0] !== consolaSeleccionada.codTipRecibo));
                setMensaje("Empresa Eliminado");
                handleEliminarClose();
                handleShowMensaje();
                peticionGet();
            } else {
                console.log("Error al aliminar Empresa", response.status);
            }
        } catch (error) {
            console.log("post", error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Actualizar Empresa. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
            setErrors({});
        }
    }

    const cerrarBodyInsetar = () => {
        handleTipoReciboClose();
        setConsolaSeleccionada({});
    }
    const cerrarBodyActualizar = () => {
        handleEditarClose();
        setConsolaSeleccionada({});
    }
    const seleccionarEmpresa = (consola, caso) => {
        console.log("consola", consola)
        setConsolaSeleccionada({
            codTipRecibo: consola[0],
            empresaPub: consola[1]
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
                    <label>Nombre Empresa</label>
                    <input name='empresaPub' type='text' className='form-control' required onChange={handleChange} placeholder='Empresa' value={consolaSeleccionada.empresaPub || ""} />
                    {errors.empresaPub && <p id='errors'>{errors.empresaPub}</p>}
                </div>
                <button className='btn btn-primary' type='submit'>Agregar Empresa</button>
                <button className='btn btn-secondary' type='submit' onClick={cerrarBodyInsetar}>Cancelar</button>
            </div>
        </form>
    );
    const bodyEditar = (
        <form onSubmit={peticionPut}>
            <div className='flex'>
                <div className='formActividad'>
                    <label>Nombre Empresa</label>
                    <input name='empresaPub' type='text' className='form-control' required onChange={handleChange} placeholder='Empresa' value={consolaSeleccionada.empresaPub || ""} />
                    {errors.empresaPub && <p id='errors'>{errors.empresaPub}</p>}
                </div>
                <button className='btn btn-primary' type='submit'>Actualizar Empresa</button>
                <button className='btn btn-secondary' type='submit' onClick={cerrarBodyActualizar}>Cancelar</button>
            </div>
        </form>
    );
    const bodyEliminar = (
        <div className='bodyEliminar'>
            <p> ¿Está seguro de Eliminar el Empresa?</p>
            <br />
            <b>{consolaSeleccionada && consolaSeleccionada.empresaPub}</b>
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


    const columns = [
        {
            name: "codTipRecibo",
            label: "Código"
        }, {
            name: "empresaPub",
            label: "Empresa"
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
                                    <Link className="dropdown-item" onClick={() => seleccionarEmpresa(tableMeta.rowData, "Editar")}> Editar </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={() => seleccionarEmpresa(tableMeta.rowData, "Eliminar")}> Eliminar </Link>
                                </li>
                            </ul>
                        </div>
                    )
                }
            }
        }
    ]
    return (
        <div className='tipoReciboPublico'>
            <div>
                <button className='btn btn-primary' type='submit' onClick={handleTipoReciboShow} >Crear Empresa Recibo</button>
            </div>
            <div>
                <MUIDataTable
                    title="Lista Empresas Recibos"
                    columns={columns}
                    data={data}
                />
            </div>
            <Modal show={showTipoRecibo} onHide={handleTipoReciboClose} animation={false} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Empresa Recibo</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">{bodyInsertar}</Modal.Body>
            </Modal>
            <Modal show={smShow} onHide={handleMensajeClose} animation={false} > {popUp}</Modal>
            <Modal show={showEditar} onHide={handleEditarClose} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Nombre Empresa</Modal.Title>
                </Modal.Header>
                <Modal.Body>{bodyEditar}</Modal.Body>
            </Modal>
            <Modal show={showEliminar} onHide={handleEliminarClose}> {bodyEliminar}</Modal>
        </div>
    );
}
export default TipoReciboPublico;