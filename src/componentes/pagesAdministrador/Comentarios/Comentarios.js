import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Apiurl } from '../../../services/userService';
import MUIDataTable from 'mui-datatables';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const url = Apiurl + "comentarios/listarComentarios";
const urlD = Apiurl + "comentarios/eliminarComentario/";

const Comentarios = () => {
    const [data, setData] = useState([]);

    const [showEliminar, setShowEliminar] = useState(false);
    const handleEliminarClose = () => setShowEliminar(false);
    const handleEliminarShow = () => setShowEliminar(true);

    const [smShow, setSmShow] = useState(false);
    const handleMensajeClose = () => setSmShow(false);
    const handleShowMensaje = () => setSmShow(true);

    const [mensaje, setMensaje] = useState("");

    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        codComentario: "",
        nombre: "",
        email: "",
        numTelefono: "",
        comentario: "",
        fechaEnviado: "",
        horaEnviado: ""
    })

    const peticionGet = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            });
            console.log("Get Comentario", response.status);
            if (response.status === 200) {
                setData(response.data);
            } else {
                alert("¡No hay comentarios!");
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
    const peticionDelete = async () => {
        try {
            const response = await axios.delete(urlD + consolaSeleccionada.codComentario, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            console.log("Comentario Delete", response.status);
            if (response.status === 200) {
                setMensaje("Comentario Eliminado");
                setData(data.filter((consola) => consola[0] !== consolaSeleccionada.codComentario));
                handleEliminarClose();
                handleShowMensaje();
                peticionGet();
            } else {
                console.log("Error", response.error);
            }
        } catch (error) {
            console.log("Error al eliminar Comentario", error);
        }
    }

    const bodyEliminar = (
        <div className="bodyEliminar">
            <p>
                ¿ Esta seguro de Eliminar el Comentario enviado por: <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b>enviado en: <b>{consolaSeleccionada && consolaSeleccionada.fechaEnviado}</b> ? <br />
            </p>
            <div align="right">
                <button className="btn btn-primary" onClick={() => peticionDelete()}> Si </button>
                <button className="btn btn-secondary" onClick={handleEliminarClose}>No</button>
            </div>
        </div>
    );
    useEffect(() => {
        peticionGet();
    }, [])

    const seleccionarComentario = (consola, caso) => {
        console.log("Consola", consola);
        setConsolaSeleccionada({
            codComentario: consola[0],
            nombre: consola[1],
            email: consola[2],
            numTelefono: consola[3],
            comentario: consola[4],
            fechaEnviado: consola[5],
            horaEnviado: consola[6]
        })
        if (caso === "Eliminar") {
            handleEliminarShow();
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
    );
    const columns = [
        {
            name: "codComentario",
            label: "Código"
        }, {
            name: "nombre",
            label: "Nombre"
        }, {
            name: "email",
            label: "Correo"
        }, {
            name: "numTelefono",
            label: "Número Celular"
        }, {
            name: "comentario",
            label: "Comentario"
        }, {
            name: "fechaEnviado",
            label: "Fecha Enviado"
        }, {
            name: "horaEnviado",
            label: "horaEnviado"
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
                                        <Link className="dropdown-item" onClick={() => seleccionarComentario(tableMeta.rowData, "Eliminar")}> Eliminar </Link>
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
        <div>
            <MUIDataTable
                title="Lista Comentarios"
                columns={columns}
                data={data}
            />
            <Modal show={showEliminar} onHide={handleEliminarClose} size="lg"> {bodyEliminar} </Modal>
            <Modal show={smShow} onHide={handleMensajeClose} animation={false}> {popUp}</Modal>
        </div>
    );
}

export default Comentarios;
