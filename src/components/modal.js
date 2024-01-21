import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Button, Modal } from "react-bootstrap";
import Datosr from "../images/Datosr.png";
import logoI from "../images/logoI.png";

const DatosR = () => {
  //constantes del modal:
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal1 = () => {
    setShowModal1(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };
  //fin de constantes
  //varaibles del grafico:
  const chartRef = useRef(null);

  useEffect(() => {
    if (showModal1) {
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["PCA", "IPCA", "KPCA", "Regresion", "SVR"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                //"rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [showModal1]);

  return (
    <>
      <div className="col-md-6 offset-md-3 custom-border container">
        <h4 className="my-auto text-center mb-4 text-light">DATOS REMOTOS</h4>
        <div className="text-center mb-4">
          <img
            className="imagen_logo"
            src={Datosr}
            alt="Logo de la Aplicacion"
          />
        </div>
        <div className="form-group">
          <h5 className="text-light mb-4">Nombre de la Planta</h5>
          <input className="form-control mb-4 rounded-pill" type="text" />
          <h5 className="text-light mb-4">Fruto de la Planta</h5>
          <input className="form-control mb-4 rounded-pill" type="text" />
          <h5 className="text-light mb-4">Severidad de la Planta</h5>
          <input className="form-control mb-5 rounded-pill" type="text" />
        </div>
        <div className="mb-4"></div>
      </div>
      <div className="Button">
        <button
          type="submit"
          className="btn btn-primary rounded-pill"
          onClick={handleOpenModal}
        >
          Guardar
        </button>
      </div>

      <div className="Button1">
        <button
          type="submit"
          className="btn btn-danger rounded-pill"
          onClick={handleOpenModal1}
        >
          Predecir
        </button>
      </div>
      <div>
        <Modal
          className="d-flex align-items-center justify-content-center"
          show={showModal}
          onHide={handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Guardar Datos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Se han Guardado correctamente los datos</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal
          className="d-flex align-items-center justify-content-center"
          id="Moda1"
          show={showModal1}
          onHide={handleCloseModal1}
        >
          <Modal.Body>
            <h3 className="text-center text-dark">RESULTADO</h3>
            <div className="text-center">
              <img
                className="imagen_logo"
                src={logoI}
                alt="Logo de la Aplicacion"
              />
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  INCIDENCIA
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
              <Button variant="danger" onClick={handleCloseModal1}>
                Cerrar
              </Button>
            </div>
            <canvas ref={chartRef} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default DatosR;
