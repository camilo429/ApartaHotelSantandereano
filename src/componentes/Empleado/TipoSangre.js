import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import axios from "axios";
import "./Empleado.css";
import Select from "react-select";

const url = "http://localhost:8001/tipoSangre/listarTipoSangre";

function TipoSangre({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  const getTipoSangre = async () => {
    await axios.get(url).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    getTipoSangre();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: { name, value: { idTipoSangre: value, tipoSangre: label } },
    });
  };

  return (
    <div className="TipoSangre">
      <Select
        defaultValue={
          value
            ? {
                label: value?.tipoSangre,
                value: value?.idTipoSangre,
              }
            : null
        }
        options={data.map((docu) => ({
          label: docu.tipoSangre,
          value: docu.idTipoSangre,
        }))}
        onChange={handleChange}
        placeholder="Seleccionar Tipo Sangre"
      />
    </div>
  );
}

export default TipoSangre;
