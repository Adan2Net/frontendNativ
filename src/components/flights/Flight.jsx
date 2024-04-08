import { useState } from "react";
import Flight_info from "./Flight_info";

function Flight({ id, airline, origin, destination, price, status, departureTime, arrivalTime, aircraftType, capacity, duration  }) {
  const [idDataSelected, setIdDataSelected] = useState(null);

  const handleFlightClick = (id) => {
    setIdDataSelected(id);
  };

  return (
    <div>
      <h2>{id}</h2>
      <h1>{airline}</h1> 
      <h2>{destination}</h2>
      <h2>{price}</h2>
      <button onClick={() => handleFlightClick(id)}>Detalles</button>
      {idDataSelected && (
        // eslint-disable-next-line react/jsx-pascal-case
        <Flight_info
          id={idDataSelected}
          airline={airline}
          origin={origin}
          destination={destination}
          departureTime={departureTime}
          arrivalTime={arrivalTime}
          duration={duration}
          status={status}
          aircraftType={aircraftType}
          capacity={capacity}
          price={price}
        />
      )}
    </div>
  );
}

export default Flight;
