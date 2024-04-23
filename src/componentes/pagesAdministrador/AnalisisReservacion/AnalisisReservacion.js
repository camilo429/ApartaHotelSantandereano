import React from 'react';
import Llamadas from "./Llamadas";
import Tarjeta from "../Home/Tarjeta";
const AnalisisFactura = () => {
    return (
        <div>
            <div style={{ margin: "30px" }}>
                <div className='flex'>
                    <Tarjeta propiedad={"Tipo Habitación más solicitada"} cantidad={"Matrimonial #15"} />
                    <Tarjeta propiedad={"Reservaciones porCelular"} cantidad={10} />
                    <Tarjeta propiedad={"Reservaciones por WEB"} cantidad={8} />
                    <Tarjeta propiedad={"Reservaciones Presencial"} cantidad={5} />
                </div>
                <div style={{ width: "750px" }}><Llamadas /></div>
            </div>
        </div>
    );
}
export default AnalisisFactura;