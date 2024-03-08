let fechaEntrada = 0;
let fechaSalida = 0;

const getFechaEntrada = (value) => {
    console.log(value);
    fechaEntrada = value;
}

const getFechaSalida = (value) => {
    console.log(value);
    fechaSalida = value;
}

const fechaValidador = () => {
    getFechaEntrada();
    getFechaSalida();
    return fechaEntrada >= fechaSalida;
}


export { fechaValidador }