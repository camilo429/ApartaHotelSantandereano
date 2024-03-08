import React from 'react'

function CaracteristicaHabitacion({ componenteImg, caracteristica, description }) {
    return (
        <div style={{ margin: "5px" }}>
            <div>
                <div className='me-2'> {componenteImg} <b className="title_color">{caracteristica}: </b></div>
                <p>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default CaracteristicaHabitacion;