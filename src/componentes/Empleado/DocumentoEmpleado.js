import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import axios from "axios";
import "./Empleado.css";
import Select from "react-select";

const url = "http://localhost:5000/tipoDocumento/listarTipoDocumentos";
const urlAuth = "http://localhost:5000/oauth/token";

function DocumentoEmpleado({ name, handleChangeData,value=null }) {
  const [localStorage, setLocalStorage] = useState({token:""});

  const [data, setData] = useState([]);

  const getDocumentos = async () => {
    if(localStorage.token){
      await axios.get(url,{headers:{
        'Authorization': localStorage.token
      }}).then((response) => {
        setData(response.data);
      }).catch(()=>setLocalStorage({token:""}))
    }else{
      await axios.post(urlAuth,{data:{
        username: "localStorage.token",
        password:"",
        grant_type:'',
      }}).then((response) => {
        setLocalStorage(response.data.access_token);
      });
    }
   
  };

  useEffect(() => {
    getDocumentos();
  }, [localStorage]);
  
  useEffect(() => {
    getDocumentos();
  }, []);
  
  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: { name, value: { idTipDocumento: value, tipDocumento: label } },
    });
  };

  return (
    <div className="DocumentoEmpleado">
      <Select
      defaultValue={value?{
        label:value?.tipDocumento,
        value: value?.idTipDocumento
      }:null}
        options={data.map((docu) => ({
          label: docu.tipDocumento,
          value: docu.idTipDocumento,
        }))}
        onChange={handleChange}
        placeholder="Seccione Documento"
      />
    </div>
  );
}

export default DocumentoEmpleado;
