import React, { useEffect, useState } from "react";
// librerias
import axios from "axios";
// css
import Select from "react-select";
// url
import { Apiurl } from "../../../services/userService";
const url = Apiurl + "tipRecibo/listarTipoRecibos";

function Empresa({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  const getEmpresa = async () => {
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
          //console.log(response.data);
        }
      });
  };
  useEffect(() => {
    getEmpresa();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: { name, value: { codTipRecibo: value, empresaPub: label } },
    });
  };

  return (
    <div className="Empresa">
      <Select
        defaultValue={
          value
            ? {
                label: value?.empresaPub,
                value: value?.codTipRecibo,
              }
            : null
        }
        options={data.map((nacio) => ({
          label: nacio.empresaPub,
          value: nacio.codTipRecibo,
        }))}
        onChange={handleChange}
        placeholder="Seleccione Empresa"
      />
    </div>
  );
}

export default Empresa;
