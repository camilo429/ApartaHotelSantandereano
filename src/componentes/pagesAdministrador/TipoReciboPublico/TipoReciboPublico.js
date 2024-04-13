import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Apiurl } from '../../../services/userService';
import MUIDataTable from 'mui-datatables';
const url = Apiurl + "tipRecibo/listarTipoRecibos";

const TipoReciboPublico = () => {
    const [data, setData] = useState([]);
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
    useEffect(() => {
        peticionGet();
    }, [])
    const columns = [
        {
            name: "codTipRecibo",
            label: "Código"
        }, {
            name: "empresaPub",
            label: "Empresa"
        }
    ]
    return (
        <div className='tipoReciboPublico'>
            <div>
                <MUIDataTable
                    title="Lista Empresas Recibos"
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    );
}

export default TipoReciboPublico;
