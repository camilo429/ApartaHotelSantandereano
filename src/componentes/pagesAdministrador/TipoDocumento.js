import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
// css
import Select from "react-select"
// url
import { Apiurl } from "../../services/userService";
const url = Apiurl + "tipoDocumento/listarTipoDocumentos"

function TipoDocumento({ name, handleChangeData, value = null }) {
    const [data, setData] = useState([]);
    const [state, setState] = useState({
        form: {
            "usuario": "",
            "password": ""
        },
        error: false,
        errorMsg: ""
    });

    const getTipoDocumento = async () => {
        axios.request({
            method: "get",
            url: url,
            withCredentials: true,
            crossdomain: true,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            }
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
        }).catch(error => {
            setState({
                error: true,
                errorMsg: "Error:400"
            })
            //  console.log(error.message);
        })
    }

    useEffect(() => {
        getTipoDocumento();
    }, [])

    const handleChange = ({ label, value }) => {
        handleChangeData({
            target: { name, value: { codTipoDocumento: value, nomTipoDocumento: label } },
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