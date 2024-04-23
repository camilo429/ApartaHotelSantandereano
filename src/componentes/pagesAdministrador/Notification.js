import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Notification.css";
import { Apiurl } from '../../services/userService';
const url = Apiurl + "recibosPublicos/listarRecibosPublicos";

const Notification = () => {
    const [recibos, setRecibos] = useState();

    const traterRecibos = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            if (response.status === 200) {
                setRecibos(response.data);
                //console.log(response.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const analizarRecibos = () => {
        const recibosPendientes = [];
        try {
            if (recibos && recibos.length > 0) {
                const fechaActual = new Date(); // Obtiene la fecha actual
                for (let index = 0; index < recibos.length; index++) {
                    const pagoOportuno = new Date(recibos[index].pagoOportuno); // Convierte la fecha de pago a objeto de fecha
                    const diferenciaMilisegundos = pagoOportuno.getTime() - fechaActual.getTime(); // Resta las fechas en milisegundos
                    const diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 3600 * 24)); // Convierte la diferencia en días
                    // console.log("Diferencia en días:", diferenciaDias);
                    if (diferenciaDias === 0 || diferenciaDias === 1 || diferenciaDias === 2) {
                        recibosPendientes.push(recibos[index]);
                    }
                }
            }
        } catch (error) {
            console.error('Error al analizar recibos:', error);
        }
        // console.log('recibosPendientes:', recibosPendientes);
        return recibosPendientes;
    }


    const analizarRecibosII = () => {
        const recibosMora = [];
        try {
            if (recibos && recibos.length > 0) {
                const fechaActual = new Date(); // Obtiene la fecha actual
                for (let index = 0; index < recibos.length; index++) {
                    const pagoOportuno = new Date(recibos[index].pagoOportuno); // Convierte la fecha de pago a objeto de fecha
                    const diferenciaMilisegundos = pagoOportuno.getTime() - fechaActual.getTime(); // Resta las fechas en milisegundos
                    const diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 3600 * 24)); // Convierte la diferencia en días
                    // console.log("Diferencia en días:", diferenciaDias);
                    if (diferenciaDias === -1 || diferenciaDias === -2) {
                        recibosMora.push(recibos[index]);
                    }
                }
            }
        } catch (error) {
            console.error('Error al analizar recibos:', error);
        }
        // console.log('recibosMora:', recibosMora);
        return recibosMora;
    }


    useEffect(() => {
        traterRecibos();
    }, []);

    return (
        <div>
            {
                recibos && recibos.length > 0 && analizarRecibos().map((recibo) => (
                    <div key={recibo.codRecibo}>
                        <button key={recibo.codRecibo} type="button" className="btn btn-info" style={{ width: "100%", margin: "2px", padding: "0" }}>
                            <div className='flex'> <p className='notification'> Empresa: {recibo.tipRecibo.empresaPub}  -  Fecha:{recibo.pagoOportuno} - Total:{recibo.totalPagar} </p> </div>
                        </button>
                    </div>
                ))
            }
            {
                recibos && recibos.length > 0 && analizarRecibosII().map((recibo) => (
                    <div key={recibo.codRecibo}>
                        <button key={recibo.codRecibo} type="button" className="btn btn-danger" style={{ width: "100%", margin: "2px", padding: "0" }}>
                            <div className='flex'> <p className='notification'> Empresa: {recibo.tipRecibo.empresaPub}  -  Fecha:{recibo.pagoOportuno} - Total:{recibo.totalPagar} </p> </div>
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default Notification;
