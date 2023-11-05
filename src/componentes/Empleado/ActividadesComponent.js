import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import axios from "axios";
import "./Empleado.css";
import Select from "react-select";
import { Apiurl } from "../../services/userService";

const url = Apiurl + "actividades/listarActividades";

function ActividadesComponent({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);
  const getActividadesComponent = async () => {
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
          console.log(response.data);
        }
      });
  };

  useEffect(() => {
    getActividadesComponent();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: { name, value: { codActividad: value, titulo: label } },
    });
  };

  return (
    <div className="ActividadesComponent">
      <Select
        defaultValue={
          value
            ? {
                label: value?.titulo,
                value: value?.codActividad,
              }
            : null
        }
        options={data.map((docu) => ({
          label: docu.titulo,
          value: docu.codActividad,
        }))}
        onChange={handleChange}
        placeholder="seleccione Tipo Genero"
      />
    </div>
  );
}

export default ActividadesComponent;
