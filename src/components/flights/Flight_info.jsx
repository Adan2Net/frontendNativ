import { useState } from "react";
import Booking from "../bookings/Booking";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Flight_info({
  show,
  setShow,
  handleClose,
  id,
  airline,
  origin,
  destination,
  price,
  status,
  departureTime,
  arrivalTime,
  aircraftType,
  capacity,
  duration,
}) {
  const [idDataSelected, setIdDataSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const handleBookingClick = (id) => {
    setIdDataSelected(id);
    setShowModal(true);
    setShow(false);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del vuelo</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          <img
            style={{ width: "100%", marginBottom: "10px" }}
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.1zoom.me%2Fbig2%2F41%2F282362-alexfas01.jpg&f=1&nofb=1&ipt=83c207ed090be388a95027d416e7aa26fe3d8a1ba9a0d71af21aad8b0d96d24d&ipo=images"
            alt=""
          />
          <p>
            <strong>Ciudad de origen:</strong> {origin}
          </p>
          <p>
            <strong>Ciudad de destino:</strong> {destination}
          </p>
          <p>
            <strong>Aerolínea:</strong> {airline}
          </p>
          <p>
            <strong>Hora de salida:</strong> {departureTime}
          </p>
          <p>
            <strong>Hora de llegada:</strong> {arrivalTime}
          </p>
          <p>
            <strong>Duración del vuelo:</strong> {duration} minutos
          </p>
          <p>
            <strong>Estado del vuelo:</strong> {status}
          </p>
          <p>
            <strong>Modelo:</strong> {aircraftType}
          </p>
          <p>
            <strong>Capacidad de pasajeros:</strong> {capacity}
          </p>
          <p>
            <strong>Precio:</strong> ${price}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleBookingClick(id);
            }}
          >
            Reservar
          </Button>
        </Modal.Footer>
      </Modal>
      {idDataSelected && (
        // eslint-disable-next-line react/jsx-pascal-case
        <Booking id={idDataSelected} showModal={showModal} setShowMOdal={setShowModal} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
}

export default Flight_info;
