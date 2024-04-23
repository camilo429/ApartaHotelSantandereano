import React from 'react'
import TableElements from './TableElements'
import Notification from '../pagesAdministrador/Notification';

function AdminDashboard() {
    return (
        <main className='content px-3 py-2'>
            <div className='container-fluid'>
                <div className='mb-3'>
                    <h4>Geovanny Ahumada</h4>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-6 d-flex'>
                        <div className='card flex-fill border-0 illustration'>
                            <div className='card-body p-0 d-flex flex-fill'>
                                <div className='row g-0 w-100'>
                                    <div className='col-8 align-self-end '>
                                        <h4>Recibos por pagar:</h4>
                                        <Notification />
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
                                        <h4 className='mb-2'> $ 4.00.000.oo </h4>
                                        <p className='mb-2'> Ingresos Totales </p>
                                        <div className='mb-0'>
                                            <span className='badge text-success me-2'> + 2.0% </span>
                                            <span className='text-muted'> Subio Al mes pasado</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TableElements />
        </main>
    )
}
export default AdminDashboard