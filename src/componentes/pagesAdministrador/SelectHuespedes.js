import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
import Select from "react-select";

function SelectHuespedes({ name, handleChangeData, value = null, url }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getHuespedes = async () => {
      try {
        axios
          .request({
            method: "get",
            url: url,
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            setData(response.data);
            //console.log(response.data);
          });
      } catch (error) {
        console.log("error al obtener las opciones:", error);
      }
    };
    getHuespedes();
  }, [url]);

  const handleChange = ({ label, value, apellido, numCelular, correo, tipoDocumento: { codTipoDocumento, nomTipoDocumento },
    numDocumento, nacionalidad: { codNacion, nombre }, lugarOrigen, nomContactoEmergencia, numContactoEmergencia, estadoHuesped,
  }) => {
    handleChangeData({
      target: {
        name,
        value: {
          codHuesped: value,
          nombre: label,
          apellido: apellido,
          numCelular: numCelular,
          correo: correo,
          tipoDocumento: {
            codTipoDocumento: codTipoDocumento,
            nomTipoDocumento: nomTipoDocumento,
          },
          numDocumento: numDocumento,
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
    <div className="huesped">
      <Select
        options={data.map((docu) => ({
          value: docu.codHuesped,
          label: docu.nombre,
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
