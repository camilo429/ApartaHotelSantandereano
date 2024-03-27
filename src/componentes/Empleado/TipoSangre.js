import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Empleado.css";
import Select from "react-select";
import { Apiurl } from "../../services/userService";

const url = Apiurl + "tipoSangre/listarTiposSangre";

function TipoSangre({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  const getTipoSangre = async () => {
    axios
      .request({
        method: "get",
        url: url,
        withCredentials: true,
        crossdomain: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
          // console.log(response.data);
        }
      });
  };

  useEffect(() => {
    getTipoSangre();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: { name, value: { codTipoSangre: value, nomTipoSangre: label } },
    });
  };

  return (
    <div className="TipoSangre" style={{ width: "170px", margin: "0px" }}>
      <Select
        defaultValue={
          value
            ? {
              label: value?.nomTipoSangre,
              value: value?.codTipoSangre,
            }
            : null
        }
        options={data.map((docu) => ({
          label: docu.nomTipoSangre,
          value: docu.codTipoSangre,
        }))}
        onChange={handleChange}
        placeholder="Seleccionar Tipo Sangre"
      />
    </div>
  );
}

export default TipoSangre;
