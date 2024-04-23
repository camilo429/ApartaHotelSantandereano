import React, { useState, useEffect } from 'react';
import axios from "axios";
import Select from "react-select";

import { Apiurl } from '../../../services/userService';
const url = Apiurl + "producto/listarProductos";

const SelectMultiProductos = ({ name, handleChangeData, value = null }) => {
    const [data, setData] = useState([]);
    const [selectedValues, setSelectedValues] = useState(value || []);
    const [quantities, setQuantities] = useState({});

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

    useEffect(() => {
        // Construimos el valor que se pasa a handleChangeData usando el estado actualizado de las cantidades
        handleChangeData({
            target: {
                name,
                value: selectedValues.map(option => ({
                    cantidad: quantities[option.value] || 0, // Usamos la cantidad del estado quantities
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
    }, [quantities, handleChangeData, name, selectedValues]); // Se dispara cada vez que el estado quantities cambia

    const handleChange = (selectedOptions) => {
        setSelectedValues(selectedOptions);
        // Actualizamos el estado de las cantidades
        const updatedQuantities = { ...quantities };
        selectedOptions.forEach(option => {
            if (!updatedQuantities.hasOwnProperty(option.value)) {
                updatedQuantities[option.value] = 0;
            }
        });
        setQuantities(updatedQuantities);
    };

    const handleQuantityChange = (productId, event) => {
        const { value } = event.target;
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: value
        }));
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
            <div className='flex'>
                {selectedValues.map((option) => (
                    <div key={option.value} className="product-quantity">
                        <label htmlFor={`quantity-${option.value}`}>{option.label}</label>
                        <input
                            id={`quantity-${option.value}`}
                            className='form-control'
                            type="number"
                            value={quantities[option.value] || ""}
                            onChange={(e) => handleQuantityChange(option.value, e)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectMultiProductos;
