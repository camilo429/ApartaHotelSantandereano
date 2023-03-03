import React from "react";
import { Component } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";

import axios from "axios";
import "./Empleado.css";
const url = "http://localhost:8001/tipoDocumento/listarTipoDocumentos";

class DocumentoEmpleado extends Component {
  state = {
    documentos: [],
  };

  componentDidMount() {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.setState({ documentos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="DocumentoEmpleado">
        <div className="form-group">
          <select className="form-control w-90">
            {this.state.documentos.map((elemento) => (
              <option
                defaultValue={{label:elemento.id_tip_documento, value:elemento.id_tip_documento}}
                key={elemento.id_tip_documento}
                value={elemento.id_tip_documento}
              >
                {elemento.tipDocumento}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default DocumentoEmpleado;
