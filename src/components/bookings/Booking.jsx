import React, { useState } from "react";
import Booking_info from "./Booking_info";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Booking({ id, showModal, setShowModal, handleCloseModal }) {
  const [bookingId, setBookingId] = useState("");
  const [showModal1, setShowModal1] = useState(false);
  const handleCloseModal1 = () => setShowModal1(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const phoneRegex = /^[0-9-]*$/;

      if (phoneRegex.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormEmpty = Object.values(formData).some((value) => value === "");

    if (isFormEmpty) {
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    try {
      const userResponse = await fetch(
        "https://backendnativ-production.up.railway.app/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!userResponse.ok) {
        console.error("Error al enviar los datos del usuario");
        return;
      }

      const userData = await userResponse.json();
      const userId = userData.id;

      const reservationData = {
        reservation_date: formattedDate,
        status: "Confirmado",
        userId: userId,
        flightId: id,
        paymentMethod: "Tarjeta De Credito",
      };

      const BookingResponse = await fetch(
        "https://backendnativ-production.up.railway.app/api/v1/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // eslint-disable-next-line no-use-before-define
          body: JSON.stringify(reservationData),
        }
      );

      if (BookingResponse.ok) {
        const BookingData = await BookingResponse.json();
        const bookingId = BookingData.id;
        setBookingId(bookingId);
        setShowModal1(true);
        setShowModal(false);
        console.log("Solicitud POST de reserva enviada con éxito");
      } else {
        console.error("Error al enviar la solicitud de reserva");
      }
    } catch (error) {
      console.error("Error en las solicitudes POST:", error);
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
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
          <h1>Formulario de Reserva</h1>
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="first_name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="last_name">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Correo"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Telefono"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="address"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="date_of_birth">
              <Form.Label>Fecha de Nacimiento:</Form.Label>
              <Form.Control
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <label htmlFor="gender">Género:</label>
            <Form.Select
              aria-label="Genero"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </Form.Select>
            <br />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
      {bookingId && (
        // eslint-disable-next-line react/jsx-pascal-case
        <Booking_info
          idBooking={bookingId}
          showModal1={showModal1}
          setShowModal={setShowModal1}
          handleCloseModal1={handleCloseModal1}
        />
      )}
    </div>
  );
}

export default Booking;
