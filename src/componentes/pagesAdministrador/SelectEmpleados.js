import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
import Select from "react-select";

function SelectEmpleados({ name, handleChangeData, value = null, url }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getEmpleado = async () => {
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
            console.log(response.data);
          });
      } catch (error) {
        console.log("error al obtener las opciones:", error);
      }
    };
    getEmpleado();
  }, [url]);

  const handleChange = ({
    label,
    value,
    apellido,
    codTipoDocumento,
    nomTipoDocumento,
    edad,
    numTelefono,
    correo,
    fechaNacimiento,
    direccion,
    nomContactoEmergencia,
    numContactoEmergencia,
    eps,
    arl,
    codSexo,
    nomSexo,
    codTipoSangre,
    nomTipoSangre,
    fotoEmpleado,
  }) => {
    handleChangeData({
      target: {
        name,
        value: {
          codEmpleado: value,
          nombre: label,
          apellido: apellido,
          tipDocumento: {
            codTipoDocumento: codTipoDocumento,
            nomTipoDocumento: nomTipoDocumento,
          },
          edad: edad,
          numTelefono: numTelefono,
          correo: correo,
          fechaNacimiento: fechaNacimiento,
          direccion: direccion,
          nomContactoEmergencia: nomContactoEmergencia,
          numContactoEmergencia: numContactoEmergencia,
          eps: eps,
          arl: arl,
          sexo: {
            codSexo: codSexo,
            nomSexo: nomSexo,
          },
          tipoSangre: {
            codTipoSangre: codTipoSangre,
            nomTipoSangre: nomTipoSangre,
          },
          fotoEmpleado: fotoEmpleado,
        },
      },
    });
  };

  return (
    <div className="huesped">
      <Select
        options={data.map((docu) => ({
          label: docu.nombre,
          value: docu.codEmpleado,
          apellido: docu.apellido,
          codTipoDocumento: docu.codTipoDocumento,
          nomTipoDocumento: docu.nomTipoDocumento,
          edad: docu.edad,
          numTelefono: docu.numTelefono,
          correo: docu.correo,
          fechaNacimiento: docu.fechaNacimiento,
          direccion: docu.direccion,
          nomContactoEmergencia: docu.nomContactoEmergencia,
          numContactoEmergencia: docu.numContactoEmergencia,
          eps: docu.eps,
          arl: docu.arl,
          codSexo: docu.codSexo,
          nomSexo: docu.nomSexo,
          codTipoSangre: docu.codTipoSangre,
          nomTipoSangre: docu.nomTipoSangre,
          fotoEmpleado: docu.fotoEmpleado,
        }))}
        onChange={handleChange}
        placeholder="Seleccione el Empleado"
      />
    </div>
  );
}
export default SelectEmpleados;
