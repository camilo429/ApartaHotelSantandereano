import React, { useState, useEffect } from 'react';
import { Apiurl } from '../../services/userService';
import axios from 'axios';
import Select from "react-select";
const url = Apiurl + "role/listarRole";
const SelectRoles = ({ name, handleChangeData, value = null }) => {
    const [data, setData] = useState([]);
    const [selectedValues, setSelectedValues] = useState(value || []);

    useEffect(() => {
        const getRoles = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                    }
                });
                if (response.status === 200) {
                    setData(response.data);
                    //console.log(response.data);
                }
            } catch (error) {
                alert("Error al traer los documentos");
                console.log("Error al traer tipos documentos", error.message)
            }
        }
        getRoles();
    }, []);

    const handleChange = (selectedOptions) => {
        setSelectedValues(selectedOptions);
        handleChangeData({
            target: {
                name,
                value: selectedOptions.map(option => ({
                    codRole: option.value,
                    nombre: option.label,
                }))
            },
        });
    };

    return (
        <div className="TipoDocumento" style={{ width: "200px", margin: "0px" }}>
            <Select
                value={selectedValues}
                options={data.map((role) => ({
                    label: role.nombre,
                    value: role.codRole,
                }))}
                onChange={handleChange}
                isMulti
                required
                placeholder="Seleccione Rol" />
        </div>
    );
}

export default SelectRoles;
