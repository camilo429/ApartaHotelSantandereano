import React from 'react';

const FacturaHijo = (factura) => {
    return (
        <div>
            {console.log("Factura hijo", factura)}
            <div>
                <label>Detalles Habitación</label>
            </div>
        </div>
    );
}

export default FacturaHijo;
