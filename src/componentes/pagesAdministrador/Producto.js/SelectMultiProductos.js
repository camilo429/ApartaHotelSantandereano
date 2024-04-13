import React, { useState, useEffect } from 'react';
import axios from "axios";
import Select from "react-select";

import { Apiurl } from '../../../services/userService';
const url = Apiurl + "producto/listarProductos";

const SelectMultiProductos = ({ name, handleChangeData, value = null }) => {
    const [data, setData] = useState([]);
    const [selectedValues, setSelectedValues] = useState(value || []);
    const [cantidad, setCantidad] = useState('');

    const getProductos = async () => {
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
        getProductos();
    }, []);

    const handleCantidadChange = (event) => {
        setCantidad(event.target.value);
    };

    const handleChange = (selectedOptions) => {
        setSelectedValues(selectedOptions);
        handleChangeData({
            target: {
                name,
                value: selectedOptions.map(option => ({
                    cantidad: cantidad,
                    producto: {
                        codProducto: option.value,
                        nombreProducto: option.label,
                        marca: option.marca,
                        cantidad: option.cantidad,
                        precio: option.precio,
                        fechaRegistro: option.fechaRegistro,
                        horaRegistro: option.horaRegistro
                    }
                })),
            }
        });
    };

    return (
        <div className='SelectProductos'>
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
            <input type='number' name='cantidad' value={1} onChange={handleCantidadChange} />
        </div>
    );
};

export default SelectMultiProductos;
