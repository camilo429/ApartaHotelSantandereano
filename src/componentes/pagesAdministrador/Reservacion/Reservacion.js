import React, { useState } from 'react';
import axios from "axios";



import { Apiurl } from '../../../services/userService';
import MUIDataTable from 'mui-datatables';
const url = Apiurl + "reservaciones/listarReservas";
const Reservacion = () => {
    const [data, setData] = useState();

    const peticionGet = async () => {
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
            } else {
                console.log("Error Reservación", response.status);
            }
        } catch (error) {
            console.log("Error Reservación Get", error);
        }
    }

    const columns = [
        {
            name: "codReservacion",
            label: "Código"
        }, {
            name: "fechaEntrada",
            label: "Fecha Entrada"
        }, {
            name: "fechaSalida",
            label: "Fecha Salida"
        }, {
            name: "totalDias",
            label: "Total Días"
        }, {
            name: "adultos",
            label: "Número Adultos"
        }, {
            name: "ninos",
            label: "Número Niños"
        }, {
            name: "nomTipoDocumento",
            label: "Tipo Documento",
            customBodyRender: (value, tableMeta) => {
                if (value && value.nomtipoDocumento) {
                    return value.nomtipoDocumento;
                } else {
                    return "";
                }
            }
        }, {
            name: "numDocumento",
            label: "# Identificación"
        }, {
            name: "nombre",
            label: "Nombre"
        }, {
            name: "apellido",
            label: "Apellido"
        }, {
            name: "email",
            label: "Correo"
        }, {
            name: "habitacion",
            label: "# Habitacion",
            customBodyRender: (value, tableMeta) => {
                if (value && value.numHabitacion) {
                    return value.numHabitacion;
                } else {
                    return "";
                }
            }
        }, {
            name: "habitacion",
            label: "# Habitacion",
            customBodyRender: (value, tableMeta) => {
                if (value && value.nombreHabitacion) {
                    return value.nombreHabitacion;
                } else {
                    return "";
                }
            }
        }, {
            name: "totalHuespedes",
            label: "Total Huespedes"
        }, {
            name: "totalREservacion",
            label: "Valor Habitación"
        }
    ]
    const bodyInsertar = (
        <div>
            <form>

            </form>
        </div>
    );


    return (
        <div>
            <br />
            <h6 className='m-0 font-weight-bold text-primary'>Lista Reservaciones</h6>
            <div>
                <MUIDataTable
                    title="Lista Reservaciones"
                    columns={columns}
                    data={data} />
            </div>
        </div>
    );
}

export default Reservacion;
