import React, { useState, useEffect } from 'react';
import axios from "axios";
import Select from "react-select";

import { Apiurl } from '../../../services/userService';
const url = Apiurl + "producto/listarProductos";

const SelectMultiProductos = ({ name, handleChangeData, value = null }) => {
    const [data, setData] = useState([]);


    const getHuespedes = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            if (response.status === 200) {
                setData(response.data);
            } else {
                alert("Hubo error Select Productos");
            }
        } catch (error) {
            console.log("error al obtener las opciones:", error);
        }
    };

    useEffect(() => {
        getHuespedes();
    }, []);

    const handleChange = ({
        label, value, nombreProducto, marca, cantidad, precio, fechaRegistro, horaRegistro
    }) => {
        handleChangeData({
            target: {
                name,
                value: {
                    codProducto: value,
                    nombreProducto: label,
                    marca: marca,
                    cantidad: cantidad,
                    precio: precio,
                    fechaRegistro: fechaRegistro,
                    horaRegistro: horaRegistro
                }
            }
        })
    }
    return (
        <div className='SelectProductos'>
            <Select
                options={data.map((produ) => ({
                    value: produ.codProducto,
                    label: produ.nombreProducto,
                    marca: produ.marca,
                    cantidad: produ.cantidad,
                    precio: produ.precio,
                    fechaRegistro: produ.fechaRegistro,
                    horaRegistro: produ.horaRegistro
                }))}
                onChange={handleChange}
                placeholder="Seleccione los Productos"
            />
        </div>
    );
}

export default SelectMultiProductos;
