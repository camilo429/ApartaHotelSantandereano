import React from 'react';
import Tarjeta from "../Home/Tarjeta";
import Ocupacion from "./Ocupacion";

const AnalisisHuespedes = () => {
    return (
        <div>
            <div style={{ margin: "30px" }}>
                <div className='flex'>
                    <Tarjeta propiedad={"Huéspedes Registrados"} cantidad={"60"} />
                    <Tarjeta propiedad={"Huéspedes Recurrentes"} cantidad={"60%"} />
                    <Tarjeta propiedad={"Huéspedes poco Frecuentes retorno "} cantidad={"20%"} />
                    <Tarjeta propiedad={"Huéspedes No Frecuentes"} cantidad={"20%"} />
                </div>
                <div>
                    <Ocupacion />
                </div>
            </div>
        </div>
    );
}
export default AnalisisHuespedes;