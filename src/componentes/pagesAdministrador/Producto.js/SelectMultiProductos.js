import React, { useState, useEffect } from 'react';
import axios from "axios";
import Select from "react-select";

import { Apiurl } from '../../../services/userService';
const url = Apiurl + "producto/listarProductos";

const SelectMultiProductos = ({ name, handleChangeData, value = null }) => {
    const [data, setData] = useState([]);
    const [selectedValues, setSelectedValues] = useState(value || []);

    const getHuespedes = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                }
            })
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            alert("Error al traer los Productos");
            console.log("Error al traer tipos documentos", error.message)
        }
    };

    useEffect(() => {
        getHuespedes();
    }, []);


    const handleChange = (selectedOptions) => {
        setSelectedValues(selectedOptions)
        handleChangeData({
            target: {
                name,
                value: selectedOptions.map(option => ({
                    codProducto: option.value,
                    nombreProducto: option.label,
                    marca: option.marca,
                    cantidad: option.cantidad,
                    precio: option.precio,
                    fechaRegistro: option.fechaRegistro,
                    horaRegistro: option.horaRegistro
                }))
            }
        })
    }
    return (
        <div className='SelectProductos' style={{ width: "100%" }}>
            <Select
                value={selectedValues}
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
                isMulti
                placeholder="Seleccione los Productos"
            />
        </div>
    );
}

export default SelectMultiProductos;
