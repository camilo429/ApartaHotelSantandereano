import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Apiurl } from "../../../services/userService";
const DIRECTION_LISTAR_TIPOHABITACIONES = Apiurl + "tipoHabiatcion/listarTipoHabitacion";

const SelectTipoHabitacion = ({ name, handleChangeData, value = null }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getTipoHabitacion = async () => {
            try {
                const response = await axios.get(DIRECTION_LISTAR_TIPOHABITACIONES, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,

                    }
                });
                console.log("Select tipo habitación", response.status);
                console.log(response.data);
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log("Hubo un error Tipo de habitación", response.status)
                }
            } catch (error) {
                console.log("error tipo habitación", error);
            }
        }
        getTipoHabitacion();
    }, []);

    const handleChange = ({ label, value, precioXPersona, precioXAcompanante }) => {
        handleChangeData({
            target: {
                name,
                value: {
                    codTipoHabitacion: value,
                    nombre: label,
                    precioXPersona: precioXPersona,
                    precioXAcompanante: precioXAcompanante
                }
            }
        })
    }
    return (
        <div className="TipoDocumento" style={{ width: "170px", margin: "0px" }}>
            <Select
                value={
                    value
                        ? {
                            label: value?.nombre,
                            value: value?.codTipoHabitacion
                        } : null
                }
                options={data.map((habi) => ({
                    label: habi.nombre,
                    value: habi.codTipoHabitacion,
                    precioXPersona: habi.precioXPersona,
                    precioXAcompanante: habi.precioXAcompanante
                }))}
                onChange={handleChange}
                required
                placeholder="Seleccione Tipo Habitación" />
        </div>
    );
}

export default SelectTipoHabitacion;
