import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Apiurl } from '../../../services/userService';
import Select from "react-select";
const url = Apiurl + "tipRecibo/listarTipoRecibos";

const SelectEmpresaPublica = ({ name, handleChangeData, value = null }) => {
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
    const handleChange = ({ label, value }) => {
        handleChangeData({
            target: {
                name,
                value: {
                    codTipRecibo: value,
                    empresaPub: label,
                }
            },
        });
    };
    return (
        <div className="EmpresaPublica" style={{ width: "200px", margin: "0px" }}>
            <Select
                value={
                    value
                        ? {
                            label: value?.empresaPub,
                            value: value?.codTipRecibo,
                        } : null
                }
                options={data.map((docu) => ({
                    label: docu.empresaPub,
                    value: docu.codTipRecibo,
                }))}
                onChange={handleChange}
                required
                placeholder="Seleccione Empresa" />
        </div>
    );
}

export default SelectEmpresaPublica;
