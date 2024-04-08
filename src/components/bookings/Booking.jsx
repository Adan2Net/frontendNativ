import React, { useState } from "react";
import Booking_info from "./Booking_info";

function Booking({ id }) {
  const [bookingId, setBookingId] = useState("");
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      <h1>Formulario de Reserva</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">Nombre:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="last_name">Apellido:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="date_of_birth">Fecha de Nacimiento:</label>
        <input
          type="date"
          id="date_of_birth"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="gender">Género:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>
        <br />

        <button type="submit">Enviar</button>
      </form>
      {bookingId && (
        // eslint-disable-next-line react/jsx-pascal-case
        <Booking_info idBooking={bookingId} />
      )}
    </div>
  );
}

export default Booking;
