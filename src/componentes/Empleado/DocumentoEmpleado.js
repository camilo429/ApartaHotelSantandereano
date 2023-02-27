import React from "react";
import { Component } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Empleado.css";
import { Label } from "reactstrap";
const url = "http://localhost:8002/tipoDocumento/listarTipoDocumentos";

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
          <select name="documentos" className="form-control">
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
