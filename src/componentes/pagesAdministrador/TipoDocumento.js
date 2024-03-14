import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
import Select from "react-select";
// url
import { Apiurl } from "../../services/userService";
const url = Apiurl + "tipoDocumento/listarTipoDocumentos";

function TipoDocumento({ name, handleChangeData, value = null }) {

  const [data, setData] = useState([]);
  const getTipoDocumento = async () => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setData(response.data);
        //console.log(response.data);
      }
    } catch (error) {
      alert("Error al traer los documentos");
      console.log("Error al traer tipos documentos", error.response.data)
    }
  }

  useEffect(() => {
    getTipoDocumento();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: {
        name,
        value: {
          codTipoDocumento: value,
          nomTipoDocumento: label,
        },
      },
    });
  };

  return (
    <div className="TipoDocumento" style={{ height: "25px", width: "175px", margin:"0px" }}>
      <Select
        defaultValue={
          value
            ? {
              label: value?.nomTipoDocumento,
              value: value?.codTipoDocumento,
            }
            : null
        }
        options={data.map((docu) => ({
          label: docu.nomTipoDocumento,
          value: docu.codTipoDocumento,
        }))}
        onChange={handleChange}
      />
    </div>
  );
}
export default TipoDocumento;
