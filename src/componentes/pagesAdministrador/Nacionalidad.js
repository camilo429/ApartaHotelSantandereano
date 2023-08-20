import React, { useEffect, useState } from "react";


import Select from "react-select"

function Nacionalidad({ name, handleChangeData, value = null }) {
    const [data, setData] = useState([]);

    const getNacionalidad = async () => {
        await axios.get(url).then((response) => {
            setData(response.data);
        })
    }

    useEffect(() => {
        getNacionalidad();
    }, [])

    const handleChange = ({ label, value }) => {
        handleChangeData({
            target: { name, value: { codNacion: value, nombre: labe } },
        });
    };

    return (
        <div className="Nacionalidad">
            <Select
                defaultValue={
                    value
                        ? {
                            label: value?.nombre,
                            value: value?.codNacion,
                        } : null
                }
                options={
                    data.map((naci) => ({
                        lael: naci.nombre,
                        value: naci.codNacion,
                    }))
                }
                onChange={handleChange}
                placeholder="Seleccione Nacionalidad"
            />

        </div>
    )
}
export default Nacionalidad;