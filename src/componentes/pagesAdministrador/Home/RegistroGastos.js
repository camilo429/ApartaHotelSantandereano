import React from "react";

function RegistroGastos() {
  return (
    <div>
      <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Registro de gastos
            </h6>
          </div>
          <div className="card-body">
            <div className="chart-pie pt-4 pb-2">
              <canvas id="myPieChart"></canvas>
            </div>
            <div className="mt-4 text-center small">
              <span className="mr-2 flex">
                <i className="fas fa-circle text-primary flex"></i>
                <div style={{ color: "black" }}>Gastos</div>
              </span>
              <span className="mr-2 flex">
                <i className="fas fa-circle text-success flex"></i>
                <div style={{ color: "black" }}>Ingresos</div>
              </span>
              <span className="mr-2 flex">
                <i className="fas fa-circle text-info flex"></i>
                <div style={{ color: "black" }}>Ventas</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegistroGastos;
