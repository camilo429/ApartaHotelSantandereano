import React from 'react';
import Tarjeta from '../Home/Tarjeta';
import IngresoComenarios from "../Home/IngresoComentarios"

const AnalisisComentario = () => {
    return (
        <div>
            <div style={{ margin: "30px" }}>
                <div className='flex'>
                    <Tarjeta propiedad={"Total Comentarios"} cantidad={23} />
                    <Tarjeta propiedad={"Buenos"} cantidad={10} />
                    <Tarjeta propiedad={"Regulares"} cantidad={8} />
                    <Tarjeta propiedad={"Malos"} cantidad={5} />
                </div>
                <div >
                    <IngresoComenarios />
                </div>
            </div>
        </div>
    );
}

export default AnalisisComentario;
