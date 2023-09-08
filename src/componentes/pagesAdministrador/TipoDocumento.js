import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
import Select from "react-select"
// url
import { Apiurl } from "../../services/userService";
const url = Apiurl + "tipoDocumento/listarTipoDocumentos";

function TipoDocumento({ name, handleChangeData, value = null }) {
    const [data, setData] = useState([]);

    const getTipoDocumento = async () => {
        axios.request({
            method: "get",
            url: url,
        }).then(response => {
            if (response.status === 200) {
                setData(response.data);
                // console.log(response.data);
            } else {
                this.setState({
                    error: true,
                    errorMsg: response.data.error_description
                })
            }
            // console.log(response.data);
        })
    }

    useEffect(() => {
        getTipoDocumento();
    }, [])

    const handleChange = ({ label, value }) => {
        handleChangeData({
            target: {
                name, value: {
                    codTipoDocumento: value, nomTipoDocumento: label
                }
            },
        });
    };

    return (
        <div className="TipoDocumento">
            <Select
                defaultValue={
                    value
                        ? {
                            label: value?.nomTipoDocumento,
                            value: value?.codTipoDocumento,
                        } : null
                }
                options={
                    data.map((docu) => ({
                        label: docu.nomTipoDocumento,
                        value: docu.codTipoDocumento,
                    }))
                }
                onChange={handleChange}
                placeholder="Seleccione TipoDocumento"
            />
        </div>
    )
}
export default TipoDocumento;