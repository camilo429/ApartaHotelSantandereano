import React, { useEffect, useState } from 'react'
//librerias
import axios from "axios";
import Select from "react-select";

import { Apiurl } from "../../services/userService";
const url = Apiurl + "region/regionByNacion/";

function Region({ name, handleChangeData, value = null, codNacion }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getRegion = async () => {
            try {
                axios
                    .request({
                        method: "get",
                        url: url + codNacion,
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                        },
                    })
                    .then((response) => {
                        setData(response.data);
                        console.log(response.data);
                    });
            } catch (error) {
                console.log("error al obtener las opciones:", error);
            }
        };
        getRegion();
    }, [url]);

    const handleChange = ({ label, value
    }) => {
        handleChangeData({
            target: {
                name,
                value: {
                    codRegion: value,
                    nombre: label,

                }
            }
        })
    }

    return (
        <div className='Region'>
            <Select
                defaultValue={
                    value
                        ? {
                            label: value?.nombre,
                            value: value?.codRegion
                        } : null
                }
                options={data.map((naci) => ({
                    label: naci.nombre,
                    value: naci.codRegion
                }))}
                onChange={handleChange}
                placeholder={"Seleccione Region"}
            />
        </div>
    )
}
export default Region