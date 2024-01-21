import React, { useState, useEffect } from "react";
import { getData } from "../middleware/GetData";

import Datosr from "../images/Datosr.png";
import "./datosremotos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

const URL = process.env.REACT_APP_URL;

const DatosR = () => {
  const [PLANTA, setPLANTA] = useState(0);
  const [FRUTO, setFRUTO] = useState(0);
  const [SEVERIDAD, setSEVERIDAD] = useState(0);
  const [description, setDescritcion] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [offlineData, setOfflineData] = useState({}); 

  useEffect(() => {
    const fetchData = async () => {
      const datos = await getData();
      setOfflineData(datos);
    };
    fetchData();
  }, []);

  console.log(offlineData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (navigator.onLine) {
      const res = await fetch(`${URL}/api/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PLANTA,
          FRUTO,
          SEVERIDAD,
          Date: offlineData.Date,
          Dew_Point: offlineData.Dew_Point,
          Gust_Speed: offlineData.Gust_Speed,
          RH: offlineData.RH,
          Rain: offlineData.Rain,
          Temperature: offlineData.Temperature,
          Wind_Direction: offlineData.Wind_Direction,
          Wind_Speed: offlineData.Wind_Speed,
          _id: offlineData._id,
        }),
      });
      const responseData = await res.json();
      setDescritcion(responseData);
      console.log(description);
    } else {
      const offlineDataManual = JSON.parse(
        localStorage.getItem("offlineDataManual") || "[]"
      );
      offlineDataManual.push({
        PLANTA,
        FRUTO,
        SEVERIDAD,
        Date: offlineData.Date,
        Dew_Point: offlineData.Dew_Point,
        Gust_Speed: offlineData.Gust_Speed,
        RH: offlineData.RH,
        Rain: offlineData.Rain,
        Temperature: offlineData.Temperature,
        Wind_Direction: offlineData.Wind_Direction,
        Wind_Speed: offlineData.Wind_Speed,
        _id: offlineData._id,
      });
      localStorage.setItem(
        "offlineDataManual",
        JSON.stringify(offlineDataManual)
      );
    }
  };

  const handleButtonClick = (e) => {
    handleSubmit(e);
    setShowModal(true);
  };

  return (
    <div className="col-md-5 offset-md-3 container mb-4">
      <br />
      <h4 className="my-auto text-center mb-4 text-light">DATOS REMOTOS</h4>
      <div className="text-center mb-4">
        <img className="imagen_logo" src={Datosr} alt="Logo de la Aplicacion" />
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <h5 className="text-light mb-4">Numero de la Planta</h5>
          <input
            className="form-control mb-4 rounded-pill"
            type="text"
            value={PLANTA}
            onChange={(e) => setPLANTA(e.target.value)}
          />
          <h5 className="text-light mb-4">Fruto de la Planta</h5>
          <input
            className="form-control mb-4 rounded-pill"
            type="text"
            value={FRUTO}
            onChange={(e) => setFRUTO(e.target.value)}
          />
          <h5 className="text-light mb-4">Severidad de la Planta</h5>
          <input
            className="form-control mb-4 rounded-pill"
            type="text"
            value={SEVERIDAD}
            onChange={(e) => setSEVERIDAD(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleButtonClick}
          >
            Predecir
          </button>
        </div>
      </form>
      <br />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Descripción de su cultivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default DatosR;
