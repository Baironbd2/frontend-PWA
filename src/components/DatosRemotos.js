import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getData } from '../middleware/GetData';

import Datoss from "../images/datoss.png";
import "./datosremotos.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Predecir = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const datos = await getData();
      setData(datos);
    }
    fetchData();
  }, []);

  return (
    <div className="col-md-5 offset-md-3 container mb-4">
      <br />
      <h4 className="my-auto text-center mb-4 text-light">DATOS SENSOR {data.Date}</h4>
      <div className="text-center mb-4">
        <img className="imagen_logo" src={Datoss} alt="Logo de la Aplicacion" />
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <h5 className="text-light mb-4">Lluvia</h5>
            <input className="form-control mb-3 rounded-pill" type="text" readOnly value={data ? data.Rain : ''} />
            <h5 className="text-light mb-4">Temperatura</h5>
            <input className="form-control mb-3 rounded-pill" type="text" readOnly value={data ? data.Temperature : ''} />
            <h5 className="text-light mb-4">RH</h5>
            <input className="form-control mb-3 rounded-pill" type="text" readOnly value={data ? data.RH : ''} />
            <h5 className="text-light mb-4">Punto de rocío</h5>
            <input className="form-control mb-3 rounded-pill" type="text"  readOnly value={data ? data.Dew_Point : ''} />
          </div>
          <br />
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <h5 className="text-light mb-4">Velocidad del viento</h5>
            <input className="form-control mb-3 rounded-pill" type="text" readOnly value={data ? data.Wind_Speed : ''} />
            <h5 className="text-light mb-4">Velocidad de ráfaga</h5>
            <input className="form-control mb-3 rounded-pill" type="text" readOnly value={data ? data.Gust_Speed : ''} />
            <h5 className="text-light mb-4">Dirección del viento</h5>
            <input className="form-control mb-3 rounded-pill" type="text" readOnly value={data ? data.Wind_Direction : ''} />
            <br />
            <div className="d-flex justify-content-center">
              <Link className="btn btn-success" type="button" to="/Predecir">
                Continuar
              </Link>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Predecir;