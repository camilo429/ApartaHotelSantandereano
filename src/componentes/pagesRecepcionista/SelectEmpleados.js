import React, { useEffect, useState } from "react";
//librerias
import axios from "axios";
import Select from "react-select";
import { Apiurl } from "../../services/userService";
const url = Apiurl + "empleados/listarEmpleados";
function SelectEmpleados({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getEmpleado = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          }
        })
        console.log(response.status);
        if (response.status === 200) {
          setData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log("error al obtener las opciones:", error);
      }
    };
    getEmpleado();
  }, []);

  const handleChange = ({
    value,
    label,
    apellido,
    tipDocumento: {
      codTipoDocumento,
      nomTipoDocumento,
    },
    numDocumento,
    edad,
    numTelefono,
    correo,
    fechaNacimiento,
    direccion,
    nomContactoEmergencia,
    numContactoEmergencia,
    eps,
    arl,
    sexo: {
      codSexo,
      nomSexo,
    },
    tipoSangre: {
      codTipoSangre,
      nomTipoSangre,
    },
    fotoEmpleado,
    actividad,
    fechaIngreso,
    fechaSalida,
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
          numDocumento: numDocumento,
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
          actividad: actividad,
          fechaIngreso: fechaIngreso,
          fechaSalida: fechaSalida,
        },
      },
    });
  };

  return (
    <div className="empleado">
      <Select
        value={
          value
            ? {
              label: value?.nombre,
              value: value?.codEmpleado,
            }
            : null
        }
        options={data.map((docu) => ({
          value: docu.codEmpleado,
          label: docu.nombre,
          apellido: docu.apellido,
          tipDocumento: {
            codTipoDocumento: docu.tipDocumento.codTipoDocumento,
            nomTipoDocumento: docu.tipDocumento.nomTipoDocumento,
          },
          numDocumento: docu.numDocumento,
          edad: docu.edad,
          numTelefono: docu.numTelefono,
          correo: docu.correo,
          fechaNacimiento: docu.fechaNacimiento,
          direccion: docu.direccion,
          nomContactoEmergencia: docu.nomContactoEmergencia,
          numContactoEmergencia: docu.numContactoEmergencia,
          eps: docu.eps,
          arl: docu.arl,
          sexo: {
            codSexo: docu.sexo.codSexo,
            nomSexo: docu.sexo.nomSexo,
          },
          tipoSangre: {
            codTipoSangre: docu.tipoSangre.codTipoSangre,
            nomTipoSangre: docu.tipoSangre.nomTipoSangre,
          },
          fotoEmpleado: docu.fotoEmpleado,
          actividad: docu.actividad,
          fechaIngreso: docu.fechaIngreso,
          fechaSalida: docu.fechaSalida,
        }
        ))}
        onChange={handleChange}
        placeholder="Seleccione el Empleado"
      />
    </div>
  );
}
export default SelectEmpleados;