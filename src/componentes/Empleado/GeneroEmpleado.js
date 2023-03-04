import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import axios from "axios";
import "./Empleado.css";

const url = "http://localhost:8001/genero/listarGenero";

function GeneroEmpleado({ name, handleChangeData }) {
  const [data, setData] = useState([]);

  const getGeneros = async () => {
    await axios.get(url).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    getGeneros();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: { name, value: { id_tip_documento: value, tipDocumento: label } },
    });
  };

  return (
    <div className="GeneroEmpleado">
      <Select
        options={data.map((docu) => ({
          label: docu.sexoBio,
          value: docu.idSexoBio,
        }))}
        onChange={handleChange}
      />
    </div>
  );
}

export default GeneroEmpleado;
