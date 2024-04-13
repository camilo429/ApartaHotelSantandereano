import React, { useState, useEffect } from 'react';
import axios from "axios";
import Select from "react-select";

import { Apiurl } from '../../../services/userService';
const url = Apiurl + "producto/listarProductos";

const SelectMultiProductos = ({ name, handleChangeData, value = [] }) => {
    const [data, setData] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(value);

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
        setSelectedProducts(selectedOptions);
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
                    horaRegistro: option.horaRegistro,
                }))
            }
        })
    }

    const handleQuantityChange = (index, event) => {
        const newSelectedProducts = [...selectedProducts];
        newSelectedProducts[index].cantidad = event.target.value;
        setSelectedProducts(newSelectedProducts);
        handleChangeData({
            target: {
                name,
                value: newSelectedProducts
            }
        });
    };

    return (
        <div className='SelectProductos' style={{ width: "100%" }}>
            <Select
                value={selectedProducts}
                options={data.map((producto) => ({
                    value: producto.codProducto,
                    label: producto.nombreProducto,
                    marca: producto.marca,
                    cantidad: producto.cantidad,
                    precio: producto.precio,
                    fechaRegistro: producto.fechaRegistro,
                    horaRegistro: producto.horaRegistro
                }))}
                onChange={handleChange}
                isMulti
                placeholder="Seleccione los Productos"
            />
            {selectedProducts.map((selectedProduct, index) => (
                <div key={index}>
                    <span>{selectedProduct.producto?.label}</span>
                    <input
                        type="number"
                        value={selectedProduct.cantidad}
                        onChange={(event) => handleQuantityChange(index, event)}
                        placeholder="Cantidad"
                    />
                </div>
            ))}
        </div>
    );
}

export default SelectMultiProductos;
