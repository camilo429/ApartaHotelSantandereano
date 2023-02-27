import React from 'react'
import axios from 'axios'
import {
    Table,
    TableContainer,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Modal,
    Button,
    TextField,
  } from "@mui/material";
  import { Edit, Delete } from "@mui/icons-material";


const url = "http://localhost:8002/tipoDocumento/listarEmpleados";
const urlG = "http://localhost:8002/tipoDocumento/registrarEmpleado";
const urlE = "http://localhost:8002/tipoDocumento/actualizarEmpleado/";
const urlD = "http://localhost:8002/tipoDocumento/deleteEmpleado/";

const useStyles = makeStyles((theme) => ({
    modal: {
      position: "absolute",
      width: 800,
      backgroundColor: "white",
      padding: 50,
      boder: "2px solid #000",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    },
    icons: {
      cursor: "pointer",
    },
    inputMaterial: {
      width: "30%",
    },
    TextField: {
      marginTop: "15px",
      marginLeft: "15px",
    },
  }));
function GeneroComponent (){



    return (
        <div>

        </div>
    )

}

export default GeneroComponent;