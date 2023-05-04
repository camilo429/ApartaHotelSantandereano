import React from 'react'
import * as FaHandHoldingWater from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Recibos() {

    return (

        <div>
            <h1>PSE en un medio de pago electrónico</h1>
            <h2>¿Qué es PSE?</h2>
            <p>PSE es el botón de Pagos Seguros en Línea, un servicio de ACH Colombia que
                le permite a las empresas vender o recaudar a través de Internet, en el
                cual los clientes o usuarios autorizan mediante la banca virtual de su banco
                el débito de los fondos desde sus cuentas de ahorro, corrientes o depósitos electrónicos</p>
            <p>
                En esta sección de SISPART, podra encontrar los links directos para realizar los
                pagos en las diferentes entidades correspondiente. <br />
                De esta manera como primer versión no tendra opciones de pago directas o incorporadas en el
                mismo software.  <br />
                Para tener encuenta, mantenga los minimos riesgos de seguridad al pagar por medio de
                transacciones online. Primero a un puesto los link directos tenga en cuenta, que la
                pagina a la que este entrando sea segura y cuente con el cadado al lado izquierdo de la dirección url.
                No de información que nunca le halla pedido de manera transaccional anteriormente.


            </p>

            <NavLink
                className="text-blue rounded py-2 w-100 d-inline-block px-1"
                to="https://www.enel.com.co/es/personas/servicio-al-cliente/boton-de-pago.html"
                exact="true"
                activeclassname="active"
            >
                <FaHandHoldingWater.FaHandHoldingWater className="me-2" />
                Pagar Agua
            </NavLink>


        </div>

    );
}

export default Recibos;