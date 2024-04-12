import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
import Select from "react-select";
// url
import { Apiurl } from "../../services/userService";
const url = Apiurl + "tipoDocumento/listarTipoDocumentos";

function TipoDocumento({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTipoDocumento = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setData(response.data);
          //console.log(response.data);
        }
      } catch (error) {
        alert("Error al traer los documentos");
        console.log("Error al traer tipos documentos", error.message)
      }
    }
    getTipoDocumento();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: {
        name,
        value: {
          codTipoDocumento: value,
          nomTipoDocumento: label,
        }
      },
    });
  };

  return (
    <div className="TipoDocumento" style={{ width: "200px", margin: "0px" }}>
      <Select
        value={
          value
            ? {
              label: value?.nomTipoDocumento,
              value: value?.codTipoDocumento,
            } : null
        }
        options={data.map((docu) => ({
          label: docu.nomTipoDocumento,
          value: docu.codTipoDocumento,
        }))}
        onChange={handleChange}
        required
        placeholder="Seleccione Documento" />
    </div>
  );
}
export default TipoDocumento;