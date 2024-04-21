import React from 'react'

function Footer() {
    return (
        <div className='footer'>
            <div className='container-fluid'>
                <div className='row text-muted'>
                    <div className='col-6 text-start'>
                        <p className='mb-0'>
                            <a href='#html' className='text-muted'><strong>Santandereano</strong></a>
                        </p>
                    </div>
                    <div className='col-6 text-end'>
                        <ul className='list-inline'>
                            <li className='list-inline-item'>
                                <a href='#html' className='text-muted'>Contacto</a>
                            </li>
                            <li className='list-inline-item'>
                                <a href='#html' className='text-muted'>Información</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer