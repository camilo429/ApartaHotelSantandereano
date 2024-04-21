import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
import Select from "react-select";

import { Apiurl } from "../../services/userService";
const url = Apiurl + "huespedes/listarHuespedes";
function SelectHuespedes({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getHuespedes = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          }
        })
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log("error al obtener las opciones:", error);
      }
    };
    getHuespedes();
  }, []);

  const handleChange = ({ label, value, nombrep, apellido, numCelular, correo, tipoDocumento: { codTipoDocumento, nomTipoDocumento },
    numDocumento, nacionalidad: { codNacion, nombre }, lugarOrigen, nomContactoEmergencia, numContactoEmergencia, estadoHuesped,
  }) => {
    handleChangeData({
      target: {
        name,
        value: {
          codHuesped: value,
          nombre: nombrep,
          apellido: apellido,
          numCelular: numCelular,
          correo: correo,
          tipoDocumento: {
            codTipoDocumento: codTipoDocumento,
            nomTipoDocumento: nomTipoDocumento,
          },
          numDocumento: label,
          nacionalidad: {
            codNacion: codNacion,
            nombre: nombre,
          },
          lugarOrigen: lugarOrigen,
          nomContactoEmergencia: nomContactoEmergencia,
          numContactoEmergencia: numContactoEmergencia,
          estadoHuesped: estadoHuesped,
        },
      },
    });
  };

  return (
    <div className="huesped" style={{ width: "170px" }}>
      <Select
        value={
          value
            ? {
              label: value?.numDocumento,
              value: value?.codHuesped,
            }
            : null
        }
        options={data.map((docu) => ({
          value: docu.codHuesped,
          label: docu.numDocumento,
          nombrep: docu.nombre,
          apellido: docu.apellido,
          numCelular: docu.numCelular,
          correo: docu.correo,
          tipoDocumento: {
            codTipoDocumento: docu.tipoDocumento.codTipoDocumento,
            nomTipoDocumento: docu.tipoDocumento.nomTipoDocumento,
          },
          numDocumento: docu.numDocumento,
          nacionalidad: {
            codNacion: docu.nacionalidad.codNacion,
            nombre: docu.nacionalidad.nombre,
          },
          lugarOrigen: docu.lugarOrigen,
          nomContactoEmergencia: docu.nomContactoEmergencia,
          numContactoEmergencia: docu.numContactoEmergencia,
          estadoHuesped: docu.estadoHuesped,
        }))}
        onChange={handleChange}
        placeholder="Seleccione el Huesped"
      />
    </div>
  );
}
export default SelectHuespedes;
