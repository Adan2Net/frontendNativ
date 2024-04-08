import React, { useState, useEffect } from "react";

function Booking_info({ idBooking }) {
  const [bookingData, setBookingData] = useState(null);

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
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (bookingDelete.ok) {
        console.log("Se elimino la reserva");
        return;
      }

      else {
        console.error("Error al eliminar la reserva");
        return;
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
  };

  return (
    <div>
      <h1>Datos Del Usuario</h1>
      <h2>
        Usuario: {first_name} {last_name}
      </h2>
      <h2>Correo electrónico: {email}</h2>
      <h2>Teléfono: {phone}</h2>
      <h2>Dirección: {address}</h2>
      <h2>Fecha de nacimiento: {date_of_birth}</h2>
      <h2>Género: {gender}</h2>
      <h1>Datos Del vuelo</h1>
      <h2>Origen: {origin}</h2>
      <h2>Destino: {destination}</h2>
      <h1>Aerolínea: {airline}</h1>
      <h2>Hora de salida: {departureTime}</h2>
      <h2>Hora de llegada: {arrivalTime}</h2>
      <h2>Duración del vuelo: {duration} minutos</h2>
      <h2>Tipo de aeronave: {aircraftType}</h2>
      <h2>Capacidad: {capacity}</h2>
      <h2>Precio: {price}</h2>
      <h1>Datos De La Reserva</h1>
      <h2>Estado: {status}</h2>
      <h2>Método de pago: {paymentMethod}</h2>
      <button
        onClick={() => {
            handdleBookingDelete(idBooking);
        }}
      >
        Eliminar Reserva
      </button>
    </div>
  );
}

export default Booking_info;
