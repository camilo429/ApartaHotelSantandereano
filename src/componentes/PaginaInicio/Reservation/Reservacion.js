import useForm from "./useForm";
import { Form, FormGroup, Label } from "reactstrap";
import SelectHabitacionesDisponibles from "../SelectHabitacionesDisponibles";
import TipoDocumento from "../../pagesAdministrador/TipoDocumento";
import "./Reservacion.css";
import { EXPRESION_REGULAR_NOMBRE_APELLIDO, EXPRESION_REGULAR_EMAIL, EXPRESION_REGULAR_CELULAR, EXPRESION_REGULAR_IDENTIFICACION } from "../../../services/ExpresionsRegular";

const initialForm = {
    fechaEntrada: "",
    fechaSalida: "",
    adultos: 0,
    ninos: 0,
    tipoDocumento: {
        codTipoDocumento: "",
        nomTipoDocumento: "",
    },
    numDocumento: "",
    nombre: "",
    apellido: "",
    email: "",
    habitacion: {
        codHabitacion: "",
        nombreHabitacion: {
            codTipoHabitacio: "",
            nombre: "",
            precioXPersona: "",
            precioXAcompanante: ""
        },
        descripHabitacion: "",
        numHabitacion: "",
        pisoHabitacion: "",
        maxPersonasDisponibles: "",
        estadoHabitacion: {
            codEstadoHabitacion: "",
            nombre: ""
        },
        imagenHabitacion: null
    }
};
const validationsForm = (form) => {
    let errors = {};

    if (!form.fechaEntrada.trim()) {
        errors.fechaEntrada = "El campo 'Fecha de Entrada'es requerido";
    }
    if (!form.fechaSalida.trim()) {
        errors.fechaSalida = "El campo 'Fecha de Entrada'es requerido";
    }
    if (form.fechaSalida < form.fechaEntrada) {
        errors.fechaSalida = "El campo 'Fecha Salida' No es valida"
    }
    if (form.adultos <= 0) {
        errors.adultos = "El campo 'Número Adultos' no puede ser cero o negativo";
    }
    if (form.ninos < 0) {
        errors.ninos = "El campo 'Número Niños' no puede ser negativo";
    }
    if (!form.nombre.trim()) {
        errors.nombre = "El campo 'Nombre' es requerido";
    } else if (!EXPRESION_REGULAR_NOMBRE_APELLIDO.test(form.nombre.trim())) {
        errors.nombre = "El campo 'Nombre' no es valido";
    }
    if (!form.apellido.trim()) {
        errors.apellido = "El campo 'Apellido' es requerido";
    } else if (!EXPRESION_REGULAR_NOMBRE_APELLIDO.test(form.apellido.trim())) {
        errors.apellido = "El campo 'Apellido' no es valido";
    }
    if (!form.email.trim()) {
        errors.email = "El campo 'Correo' es requerido";
    } else if (!EXPRESION_REGULAR_EMAIL.test(form.email.trim())) {
        errors.email = "El campo 'Correo' no es valido";
    }

    return errors;
}
const Reservacion = () => {
    const { form, errors, loading, response, handleChange, handleBlur, handleSubmit } = useForm(initialForm, validationsForm);

    function getCurrentDate() {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; // January is 0!
        const yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        return yyyy + '-' + mm + '-' + dd;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex" id="fomularioReservacion">
                    <FormGroup>
                        <div id="reservacion">
                            <Label for="exampleEmail">Fecha de Entrada</Label>
                            <input required name="fechaEntrada" type="date" placeholder="fechaEntrada" className="form-control" onBlur={handleBlur} value={form.fechaEntrada} onChange={handleChange} min={getCurrentDate()} />
                            {errors.fechaEntrada && <p id="errores">{errors.fechaEntrada}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup  >
                        <div id="reservacion">
                            <Label for="exampleEmail">Fecha de Salida</Label>
                            <input required name="fechaSalida" type="date" placeholder="fechaSalida" className="form-control" onBlur={handleBlur} value={form.fechaSalida} onChange={handleChange} min={getCurrentDate()} />
                            {errors.fechaSalida && <p id="errores">{errors.fechaSalida}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div id="reservacion">
                            <Label for="exampleEmail">Número de Adultos</Label>
                            <input required name="adultos" type="number" placeholder="# Adultos" max="5" min="1" className="form-control" onBlur={handleBlur} value={form.adultos} onChange={handleChange} />
                            {errors.adultos && <p id="errores">{errors.adultos}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div id="reservacion">
                            <Label for="exampleEmail">Número de Niños</Label>
                            <input required name="ninos" type="number" placeholder="# Niños" min="0" max="4" className="form-control" onBlur={handleBlur} value={form.ninos} onChange={handleChange} defaultValue="0" />
                            {errors.ninos && <p id="errores"> {errors.ninos}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup style={{ marginLeft: "7px" }}>
                        <div id="reservacion">
                            <Label for="exampleEmail">Tipo de Documento</Label>
                            <TipoDocumento name="tipoDocumento" handleChangeData={handleChange} value={form.tipoDocumento} />
                        </div>
                    </FormGroup>
                </div>
                <div className="flex" id="fomularioReservacion">
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail"># Documento</Label>
                            <input name="numDocumento" type="number" placeholder="Número de Documento" className="form-control" onBlur={handleBlur} value={form.numDocumento} onChange={handleChange} />
                            {errors.numDocumento && <p id="errores">{errors.numDocumento}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail">Nombre</Label>
                            <input required name="nombre" placeholder="Nombre" className="form-control" onBlur={handleBlur} value={form.nombre} onChange={handleChange} />
                            {errors.nombre && <p id="errores">{errors.nombre}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail">Apellido</Label>
                            <input name="apellido" placeholder="Apellido" className="form-control" onBlur={handleBlur} value={form.apellido} onChange={handleChange} />
                            {errors.apellido && <p id="errores">{errors.apellido}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div id="reservacion">
                            <Label for="exampleEmail">Correo Electronico</Label>
                            <input name="email" type="email" placeholder="email" className="form-control" onBlur={handleBlur} value={form.email} onChange={handleChange} />
                            {errors.email && <p id="errores">{errors.email}</p>}
                        </div>
                    </FormGroup>
                    <FormGroup style={{ marginLeft: "7px" }}>
                        <div id="reservacion">
                            <Label for="exampleEmail">Tipo Habitación </Label>
                            <SelectHabitacionesDisponibles name="habitacion" handleChangeData={handleChange} value={form.habitacion} />
                        </div>
                    </FormGroup>
                </div>
                <div className="flex">
                    {/* Indicador de carga */}
                    {/*{loading && (
                        <div className="loading-container">
                            <div className="flex">
                                <Spinner color="primary" style={{ marginLeft: "200px" }} />
                                <div className="loading-spinner">Cargando</div>
                            </div>
                        </div>
                    )}*/}
                    <button type="submit" className="btn btn-success">Agendar</button>
                </div>
            </form >
            <br />
        </div >
    );
}

export default Reservacion;
