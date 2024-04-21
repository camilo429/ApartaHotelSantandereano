import React from 'react';
import Tarjeta from "../Home/Tarjeta";
import Ocupacion from "./Ocupacion";

const AnalisisHuespedes = () => {
    return (
        <div>
            <div style={{ margin: "30px" }}>
                <div className='flex'>
                    <Tarjeta propiedad={"Huéspedes Registrados"} cantidad={"40"} />
                    <Tarjeta propiedad={"Huéspedes Recurrentes"} cantidad={"20%"} />
                    <Tarjeta propiedad={"Huéspedes No retorno 25%"} cantidad={"30%"} />
                    <Tarjeta propiedad={"Presencial No Regresan"} cantidad={"50%"} />
                </div>
                <div>
                    <Ocupacion />
                </div>
            </div>
        </div>
    );
}
export default AnalisisHuespedes;