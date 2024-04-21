import React from 'react'

function TableElements() {
    return (
        <div className='card border-0'>
            <div className='card-header'>
                <h5 className='card-title'> Tabla Huéspedes</h5>
                <h6 className='card-subtitle'> Mejores Huéspedes
                </h6>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col">APELLIDO</th>
                        <th scope="col">CORREO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>EDGAR CAMILO</td>
                        <td>MUÑOZ ALONZO</td>
                        <td>edgar123_dg@gmail.com</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>CRISTOFER </td>
                        <td>BENITEZ</td>
                        <td>cristo_fer9087@gmail.com</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>LARRY</td>
                        <td>VAZQUEZ ROMERO</td>
                        <td>la12-9097@hotmail.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default TableElements