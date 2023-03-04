import React from "react";
import { Component } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";

import axios from "axios";
import "./Empleado.css";
import { Input } from "reactstrap";
const url = "http://localhost:8001/tipoSangre/listarTipoSangre";

class TipoSangre extends Component {
  state = {
    tiposSangres: [],
  };

  componentDidMount() {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.setState({ tiposSangres: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="TipoSangre">
        <div className="form-group">
          <Input type="select" className="w-90">
            {this.state.tiposSangres.map((elemento) => (
              <option
                key={elemento.idTipoSangre}
                value={elemento.idTipoSangre}
              >
                {elemento.tipoSangre}
              </option>
            ))}
          </Input>
        </div>
      </div>
    );
  }
}

export default TipoSangre;
