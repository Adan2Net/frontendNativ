import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Booking_info({
  idBooking,
  showModal1,
  setShowModal1,
  handleCloseModal1,
}) {
  const [bookingData, setBookingData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await fetch(
          `https://backendnativ-production.up.railway.app/api/v1/bookings/${idBooking}`
        );
        if (response.ok) {
          const data = await response.json();
          setBookingData(data);
        } else {
          console.error("Error al obtener los datos de la reserva");
        }
      } catch (error) {
        console.error("Error en la solicitud GET:", error);
      }
    };

    fetchBookingData();
  }, [idBooking]);

  if (!bookingData) {
    return <div>Cargando...</div>;
  }

  const { status, paymentMethod, user, flight } = bookingData;
  const {
    origin,
    destination,
    airline,
    departureTime,
    arrivalTime,
    duration,
    aircraftType,
    capacity,
    price,
  } = flight;
  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    date_of_birth,
    gender,
  } = user;

  const handdleBookingDelete = async (idBooking) => {
    try {
      const bookingDelete = await fetch(
        `https://backendnativ-production.up.railway.app/api/v1/bookings/${idBooking}`,
        {
          method: "DELETE",
        }
      );

      if (bookingDelete.ok) {
        setShowDeleteModal(true);
        setShowModal1(false);
        //console.log("Se eliminó la reserva exitosamente");
      } else {
        console.error("Error al eliminar la reserva");
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
  };

  return (
    <div>
      <Modal show={showModal1} onHide={handleCloseModal1}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del vuelo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Datos Del Usuario</strong>
          </p>
          <p>
            Nombre: {first_name} {last_name}
          </p>
          <p>Correo electrónico: {email}</p>
          <p>Teléfono: {phone}</p>
          <p>Dirección: {address}</p>
          <p>Fecha de nacimiento: {date_of_birth}</p>
          <p>Género: {gender}</p>
          <p>
            <strong>Datos Del vuelo</strong>
          </p>
          <p>Origen: {origin}</p>
          <p>Destino: {destination}</p>
          <p>Aerolínea: {airline}</p>
          <p>Hora de salida: {departureTime}</p>
          <p>Hora de llegada: {arrivalTime}</p>
          <p>Duración del vuelo: {duration} minutos</p>
          <p>Tipo de aeronave: {aircraftType}</p>
          <p># Pasajeros: {capacity}</p>
          <p>Precio: {price}</p>
          <p>
            <strong>Datos De La Reserva</strong>
          </p>
          <p>Estado: {status}</p>
          <p>Método de pago: {paymentMethod}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal1}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handdleBookingDelete(idBooking);
            }}
          >
            Eliminar Reserva
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reserva eliminada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>La reserva ha sido eliminada exitosamente.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Booking_info;
