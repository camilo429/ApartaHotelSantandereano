import React from 'react'
import TableElements from './TableElements'
import Estadisticas from './../../image/estadisticas.png';

function AseadorDashboard() {
    return (
        <main className='content px-3 py-2'>
            <div className='container-fluid'>
                <div className='mb-3'>
                    <h4> Panel Aseador</h4>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-6 d-flex'>
                        <div className='card flex-fill border-0 illustration'>
                            <div className='card-body p-0 d-flex flex-fill'>
                                <div className='row g-0 w-100'>
                                    <div className='col-6'>
                                        <div className='p-3 m-1'>
                                            <h4>Bienvenido</h4>
                                            <p className='mb-0'> Camilo Ahumada</p>
                                        </div>
                                    </div>
                                    <div className='col-6 align-self-end text-end'>
                                        <img src={Estadisticas} className='img-fluid illustration-img' alt='estadisticas' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 d-flex'>
                        <div className='card flex-fill border-0'>
                            <div className='car-body py-4 px-3'>
                                <div className='d-flex align-items-start'>
                                    <div className='flex-grow-1'>
                                        <h4 className='mb-2'> Número de Tareas Realizadas </h4>
                                        <p className='mb-2'> 10</p>
                                        <div className='mb-0'>
                                            <span className='badge text-success me-2'> +2</span>
                                            {/*<span className='text-muted'> Subio Al mes pasado</span>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default AseadorDashboard;