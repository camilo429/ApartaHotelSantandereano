import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import axios from "axios";
import "./Empleado.css";
import Select from "react-select";

const url = "http://localhost:8001/tipoDocumento/listarTipoDocumentos";

function DocumentoEmpleado({ name, handleChangeData,value=null }) {

  const [data, setData] = useState([]);

  const getDocumentos = async () => {
    await axios.get(url).then((response) => {
      setData(response.data);
    });
  };
  
  useEffect(() => {
    getDocumentos();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: { name, value: { id_tip_documento: value, tipDocumento: label } },
    });
  };

  return (
    <div className="DocumentoEmpleado">
      <Select
      defaultValue={value?{
        label:value?.tipDocumento,
        value: value?.idTipDocumento
      }:null}
        options={data.map((docu) => ({
          label: docu.tipDocumento,
          value: docu.idTipDocumento,
        }))}
        onChange={handleChange}
        placeholder="Seccione Documento"
      />
    </div>
  );
}

export default DocumentoEmpleado;
