import React, { useEffect, useState } from "react";
// librerias
import axios from "axios";
// css
import Select from "react-select"

function Habitaciones({ name, handleChangeData, value = null, url }) {
    const [data, setData] = useState([]);

    const getHabitaciones = async () => {
        axios.request({
            method: "get",
            url: url,
        }).then(response => {
            if (response.status === 200) {
                setData(response.data);
                console.log(response.data);
            }
        })
    };
    
    useEffect(() => {
        getHabitaciones();
    }, []);

    const handleChange = ({ label, value }) => {
        handleChangeData({
            target: { 
                name, value:
                 { 
                    codHabitacion: value, 
                    nombreHabitacion: label 
                } },
        });
    };

    return (
        <div className="Habitaciones">
            <Select
                defaultValue={
                    value
                        ? {
                            label: value?.nombreHabitacion,
                            value: value?.codHabitacion,
                        } : null
                }
                options={
                    data.map((nacio) => ({
                        label: nacio.nombreHabitacion,
                        value: nacio.codHabitacion,
                    }))
                }
                onChange={handleChange}
                placeholder="Seleccione Habitación"
            />
        </div>
    );
}

export default Habitaciones;
