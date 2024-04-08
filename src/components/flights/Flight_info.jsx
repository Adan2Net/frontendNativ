import { useState } from "react";
import Booking from "../bookings/Booking";

function Flight_info({
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

  const handleBookingClick = (id) => {
    setIdDataSelected(id);
  };

  return (
    <div>
      <h2>{id}</h2>
      <h2>{origin}</h2>
      <h2>{destination}</h2>
      <h1>{airline}</h1>
      <h2>{departureTime}</h2>
      <h2>{arrivalTime}</h2>
      <h2>{duration}</h2>
      <h2>{status}</h2>
      <h2>{aircraftType}</h2>
      <h2>{capacity}</h2>
      <h2>{price}</h2>
      <button
        onClick={() => {
          handleBookingClick(id);
        }}
      >
        Reservar
      </button>
      {idDataSelected && (
        // eslint-disable-next-line react/jsx-pascal-case
        <Booking
          id={idDataSelected}
        />
      )}
    </div>
  );
}

export default Flight_info;
