import React, { useEffect, useState } from 'react'
//librerias
import axios from "axios";
import Select from "react-select";
import { Apiurl } from "../../services/userService";
import "./../estilos/style.css"
const REGIONES_POR_NACION_URL = Apiurl + "region/regionByNacion/";
const MENSAJE_ERROR = "Seleccionar una Nacionalidad"

function Region({ name, handleChangeData, value = null, codNacion }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRegion = async () => {
            try {
                if (codNacion !== null) {
                    const response = await axios.get(REGIONES_POR_NACION_URL + codNacion, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                        }
                    })
                    if (response.status === 200) {
                        setData(response.data)
                        // console.log(response.data)
                    } else {
                        console.log("Hubo un error al traer las regiones por nacionaliad")
                    }
                } else {
                    setError(MENSAJE_ERROR)
                }
            } catch (error) {
                console.log("error al obtener las opciones Region por Nacionalidad:", error);
                setError(MENSAJE_ERROR)
            }
        };
        getRegion();
    }, [codNacion]);

    const handleChange = ({ label, value, nacionalidad: { codNacion, nombre } }) => {
        console.log("region seleccionada", value, label, { nacionalidad: { codNacion, nombre } });
        handleChangeData({
            target: {
                name,
                value: {
                    codRegion: value,
                    nombre: label,
                    nacionalidad: {
                        codNacion: codNacion,
                        nombre: nombre,
                    }
                }
            }
        })
    }

    return (
        <div className='Region' style={{ height: "25px", width: "175px" }}>
            {error && <div id='errores'>{error}</div>}
            <Select
                defaultValue={
                    value
                        ? {
                            label: value?.nombre,
                            value: value?.codNacion,
                        } : null
                }
                options={
                    data.map((region) => ({
                        label: region.nombre,
                        value: region.codRegion,
                        nacionalidad: {
                            codNacion: region.nacionalidad.codNacion,
                            nombre: region.nacionalidad.nombre
                        }
                    }))}
                onChange={handleChange}
                placeholder={"Seleccione Region"} />
        </div>
    )
}
export default Region