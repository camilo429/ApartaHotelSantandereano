import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Apiurl } from '../../../services/userService';
import MUIDataTable from 'mui-datatables';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SelectEmpresaPublica from '../TipoReciboPublico/SelectEmpresaPublica';
const url = Apiurl + "recibosPublicos/listarRecibosPublicos";
const urlD = Apiurl + "recibosPublicos/eliminarRegistro/";
const urlC = Apiurl + "recibosPublicos/crearReciboPublico";

const ReciboPublico = () => {
    const [data, setData] = useState([]);
    const [mensaje, setMensaje] = useState("");

    const [handleReciboPublicoShow, setHandleReciboPublicoShow] = useState(false);
    const handleReciboClose = () => setHandleReciboPublicoShow(false);
    const handleReciboShow = () => setHandleReciboPublicoShow(true);

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
        codRecibo: "",
        docRecibo: "",
        numReferencia: "",
        pagoOportuno: "",
        supension: "",
        tipRecibo: {
            codTipRecibo: "",
            empresaPub: "",
        },
        totalPagar: ""
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
            });

            if (response.status === 200) {
                setData(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

    const peticionPost = async (e) => {
        e.preventDefault();
        try {
            console.log("recibo", consolaSeleccionada);
            const response = await axios.post(urlC, consolaSeleccionada, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,

                }
            })
            if (response.status === 201) {
                setData(data.concat(response.data));
                peticionGet();
                handleReciboClose();
                setMensaje("Recibo Agregado");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const peticionPut = async (e) => {
        e.preventDefault();
        try {
            console.log("recibo", consolaSeleccionada);
            const response = await axios.put(urlC + consolaSeleccionada.codRecibo, consolaSeleccionada, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            if (response.status === 200) {
                const dataNueva = data.map((consola) => {
                    if (consolaSeleccionada.codRecibo === consola.codRecibo) {
                        consola.codRecibo = consolaSeleccionada.codRecibo;
                        consola.docRecibo = consolaSeleccionada.docRecibo;
                        consola.numReferencia = consolaSeleccionada.numReferencia;
                        consola.pagoOportuno = consolaSeleccionada.pagoOportuno;
                        consola.supension = consolaSeleccionada.supension;
                        consola.tipRecibo = {
                            codTipRecibo: consolaSeleccionada.tipRecibo.codTipRecibo,
                            empresaPub: consolaSeleccionada.tipRecibo.empresaPub
                        };
                        consola.totalPagar = consolaSeleccionada.totalPagar;
                    }
                    return consola;
                })
                setData(dataNueva);
                peticionGet();
                handleEditarClose();
                setMensaje("Recibo Editado");
                abrirCerrarModalMensaje();
                setConsolaSeleccionada({});
            }
        } catch (error) {
            console.error("Error al realizar la solicitud PUT:", error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Editar el Recibo. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
        }
    }
    const peticionDelete = async () => {
        try {
            const response = await axios.delete(urlD + consolaSeleccionada.codRecibo, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })

            if (response.status === 200) {
                setData(data.filter((consola) => consola.codRecibo !== consolaSeleccionada.codRecibo));
                peticionGet();
                setMensaje("Recibo Eliminado");
                handleEliminarClose();
                abrirCerrarModalMensaje();

            }
        } catch (error) {
            console.error("Error al realizar la solicitud PUT:", error);
            const mensajeError = error.response && error.response.data && error.response.data.mensaje ? error.response.data.mensaje : "Hubo un error al Eliminar Recibo. Por favor, intenta nuevamente.";
            setMensaje(mensajeError);
            abrirCerrarModalMensaje();
        }
    }
    useEffect(() => {
        peticionGet();
    }, []);

    const abrirCerrarModalMensaje = () => {
        handleShowMensaje();
        setTimeout(() => {
            handleMensajeClose();
        }, 2000); // 2000 milisegundos = 2 segundos
    };
    const seleccionarRecibo = (consola, caso) => {
        console.log("Consola", consola);
        setConsolaSeleccionada({
            codRecibo: consola[0],
            tipRecibo: {
                codTipRecibo: consola[1].codTipRecibo,
                empresaPub: consola[1].empresaPub,
            },
            numReferencia: consola[2],
            pagoOportuno: consola[3],
            supension: consola[4],
            totalPagar: consola[5],
            docRecibo: consola[6],
        })
        if (caso === "Editar") {
            handleEditarShow();
        }
        if (caso === "Eliminar") {
            handleEliminarShow();
        }
    }

    const bodyCrearRecibo = (
        <form onSubmit={peticionPost}>
            <div className='flex'>
                <div>
                    <label>Empresa</label>
                    <SelectEmpresaPublica name="tipRecibo" value={consolaSeleccionada?.tipRecibo || ""} handleChangeData={handleChange} />
                </div>
                <div>
                    <label>Número Documento</label>
                    <input name='docRecibo' className='form-control' value={consolaSeleccionada?.docRecibo || ""} onChange={handleChange} />
                </div>
                <div>
                    <label>Número Referencia</label>
                    <input name='numReferencia' className='form-control' value={consolaSeleccionada?.numReferencia || ""} onChange={handleChange} />
                </div>
            </div>
            <div className='flex'>
                <div>
                    <label>Fecha Pago Oportuno</label>
                    <input name='pagoOportuno' type='date' className='form-control' value={consolaSeleccionada?.pagoOportuno || ""} onChange={handleChange} />
                </div>
                <div>
                    <label>Fecha Suspensión</label>
                    <input name='supension' type='date' className='form-control' value={consolaSeleccionada?.supension || ""} onChange={handleChange} />
                </div>
                <div>
                    <label>Total</label>
                    <input name='totalPagar' className='form-control' value={consolaSeleccionada?.totalPagar || ""} onChange={handleChange} />
                </div>
            </div>
            <div className='flex'>
                <button className='btn btn-primary' type='submit'>Agregar</button>
                <button className='btn btn-secondary' type='submit' onClick={handleReciboClose}>Cancelar</button>
            </div>
        </form>
    );
    const bodyEditar = (
        <form onSubmit={peticionPost}>
            <div className='flex'>
                <div>
                    <label>Empresa</label>
                    <SelectEmpresaPublica name="tipRecibo" value={consolaSeleccionada?.tipRecibo || ""} handleChangeData={handleChange} />
                </div>
                <div>
                    <label>Número Referencia</label>
                    <input name='numReferencia' className='form-control' value={consolaSeleccionada?.numReferencia || ""} onChange={handleChange} />
                </div>
                <div>
                    <label>Fecha Pago Oportuno</label>
                    <input name='pagoOportuno' type='date' className='form-control' value={consolaSeleccionada?.pagoOportuno || ""} onChange={handleChange} />
                </div>
            </div>
            <div className='flex'>
                <div>
                    <label>Fecha Suspensión</label>
                    <input name='supension' type='date' className='form-control' value={consolaSeleccionada?.supension || ""} onChange={handleChange} />
                </div>
                <div>
                    <label>Número Documento</label>
                    <input name='docRecibo' className='form-control' value={consolaSeleccionada?.docRecibo || ""} onChange={handleChange} />
                </div>
                <div>
                    <label>Total</label>
                    <input name='totalPagar' className='form-control' value={consolaSeleccionada?.totalPagar || ""} onChange={handleChange} />
                </div>
            </div>
            <div className='flex'>
                <button className='btn btn-primary' type='submit'>Agregar</button>
                <button className='btn btn-secondary' type='submit' onClick={handleEditarClose}>Cancelar</button>
            </div>
        </form>
    );

    const bodyEliminar = (
        <div className="bodyEliminar">
            <p>
                Esta seguro de Eliminar Recibo <b>{(consolaSeleccionada && consolaSeleccionada?.tipRecibo?.empresaPub) || ""} Valor: {consolaSeleccionada.totalPagar || ""} </b> ? <br />
            </p>
            <div align="right">
                <button className="btn btn-primary" onClick={() => peticionDelete()}> Si </button>
                <button className="btn btn-secondary" onClick={handleEliminarClose}>No</button>
            </div>
        </div>
    );
    const columns = [
        {
            name: "codRecibo",
            label: "Código"
        }, {
            name: "tipRecibo",
            label: "Empresa",
            options: {
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    if (value && value.empresaPub) {
                        return value.empresaPub;
                    } else {
                        return "";
                    }
                }
            }
        }, {
            name: "numReferencia",
            label: "Número Referencia"
        }, {
            name: "pagoOportuno",
            label: "Fecha Pago Oportuno"
        }, {
            name: "supension",
            label: "Fecha  supension"
        }, {
            name: "totalPagar",
            label: "Valor a Pagar"
        }, {
            name: "docRecibo",
            label: "docRecibo"
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
                                        <Link className="dropdown-item" onClick={() => seleccionarRecibo(tableMeta.rowData, "Editar")} >Editar</Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-item' onClick={() => seleccionarRecibo(tableMeta.rowData, "Eliminar")}>Eliminar</Link>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    )
                }
            }
        }]
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
    const options = {
        filterType: "dropdown",
        responsive: "standard",
        scrollX: true
    };

    return (
        <div className='ReciboPublic'>
            <div className="card shadow mb-4">
                <div className='card shadow mb-t'>
                    <div className='flex' style={{ marginLeft: "350px" }}>
                        <button className='btn btn-primary' type='submit' onClick={handleReciboShow} >Agregar Recibo</button>
                        <a className='btn btn-secondary' href='https://www.enel.com.co/es/personas/boton-de-pago.html?ecid=EnlaceInterno-BotonesWeb-CO_btnflotante_Hogar_ZonaPrivada_202303_CO_btn_flotante-Hogar_pago' target='_black' rel='noopener noreferrer' >Pagar Luz</a>
                        <a className="btn btn-success" href="https://pagos.acueducto.com.co/" target="_blank" rel="noopener noreferrer">Pagar Agua</a>
                        <a className="btn btn-danger" href="https://www.grupovanti.com/tramites-y-ayuda/factura/paga-tu-factura" target="_blank" rel="noopener noreferrer">Pagar Gas</a>
                        <a className="btn btn-warning" href="https://www.conexiondigital.co/cancelatufactura/" target="_blank" rel="noopener noreferrer">Ir a Ejemplo.com</a>
                    </div>
                    <div className="card-body">
                        <MUIDataTable
                            title="Lista Comentarios"
                            columns={columns}
                            data={data}
                            options={options}
                        />
                    </div>
                </div>
                <Modal show={handleReciboPublicoShow} onHide={handleReciboClose} animation={false} size={"lg"} >
                    <Modal.Header>
                        <Modal.Title>Agregar Recibo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >{bodyCrearRecibo}</Modal.Body>
                </Modal>
                <Modal show={smShow} onHide={handleMensajeClose} animation={false} > {popUp}</Modal>
                <Modal show={showEditar} onHide={handleEditarClose} animation={false} dialogClassName="crearHuesped">
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Huesped</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{bodyEditar}</Modal.Body>
                </Modal>
                <Modal show={showEliminar} onHide={handleEliminarClose} size="lg"> {bodyEliminar} </Modal>
            </div>
        </div>
    );
}
export default ReciboPublico;