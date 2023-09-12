import React from 'react'
import * as FaHandHoldingWater from "react-icons/fa";
import * as FaRegLightbulb from "react-icons/fa"
import * as FaGasPump from "react-icons/fa"
import * as LuSatelliteDish from "react-icons/lu"
import { NavLink } from "react-router-dom";

function Recibos() {

    return (

        <div>
            <h1>PSE en un medio de pago electrónico</h1>
            <h2>¿Qué es PSE?</h2>
            <p>
                PSE es el botón de Pagos Seguros en Línea, un servicio de ACH Colombia que
                le permite a las empresas vender o recaudar a través de Internet, en el
                cual los clientes o usuarios autorizan mediante la banca virtual de su banco
                el débito de los fondos desde sus cuentas de ahorro, corrientes o depósitos electrónicos
            </p>
            <h2>¿Cualquier navegador me sirve?</h2>
            <p>
                Siempre y cuando este se encuentre actualizado a la última versión, esto para garantizar
                la seguridad de tu información transaccional, las siguientes versiones o superiores son
                necesarias para utilizar PSE: Internet Explorer 11, Firefox 72, Chrome 72, Safari 12 y Opera 56.

            </p>
            <h2>¿Cuánto se demora en procesar la transacción?</h2>
            <p>
                PSE tiene un tiempo máximo de 21 minutos en el procesamiento de una transacción.
            </p>
            <h4>Para más información de pagos PSE </h4>

            <NavLink
                className="text-blue rounded py-2 w-100 d-inline-block px-1"
                to="https://www.enel.com.co/es/personas/servicio-al-cliente/boton-de-pago.html"
                exact="true"
                activeclassname="active"
            >
                <FaHandHoldingWater.FaHandHoldingWater className="me-2" />
                Pagar Agua
            </NavLink>
            <NavLink
                className="text-blue rounded py-2 w-100 d-inline-block px-1"
                to="https://www.enel.com.co/es/personas/boton-de-pago.html"
                exact="true"
                activeclassname="active"
            >
                <FaRegLightbulb.FaRegLightbulb className="me-2" />
                Pagar Luz
            </NavLink>
            <NavLink
                className="text-blue rounded py-2 w-100 d-inline-block px-1"
                to="https://www.psepagos.co/PSEHostingUI/InvoicesTicketOffice.aspx?ID=9524"
                exact="true"
                activeclassname="active"
            >
                <FaGasPump.FaGasPump className="me-2" />
                Pagar Gas
            </NavLink>
            <NavLink
                className="text-blue rounded py-2 w-100 d-inline-block px-1"
                to="https://www.mipagoamigo.com/MPA_WebSite/ServicePayments/StartPayment?id=5724&searchedCategoryId=&searchedAgreementName=CONEXION%20DIGITAL"
                exact="true"
                activeclassname="active"
            >
                <LuSatelliteDish.LuSatelliteDish className="me-2" />
                Pagar Parabolica
            </NavLink>


        </div>

    );
}

export default Recibos;