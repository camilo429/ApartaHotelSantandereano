import React from "react";

function Tartajeta({ propiedad, cantidad }) {
  return (
    <div className="col-xl-3 col-md-3 mb-4 w-100">
      <div className="card border-left-primary shadow h-100 py-2 w-100">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                {propiedad}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {cantidad}
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-calendar fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Tartajeta;
