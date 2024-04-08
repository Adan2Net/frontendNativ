import { useEffect } from "react";
import { useState } from "react";
import Flight from "./Flight";

function List_flights() {
  const [flightsData, setFlightsData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [statusDataSelected, setStatusDataSelected] = useState("");
  const [originDataSelected, setOriginSelected] = useState("");
  const [destinationDataSelected, setDestinationSelected] = useState("");
  const handdleStatus = (e) => {
    const selectedValue = e.target.value;
    setStatusDataSelected(selectedValue);
    console.log(selectedValue);
  };

  const handdleOrigin = (e) => {
    const selectedValue = e.target.value;
    setOriginSelected(selectedValue);
    console.log(selectedValue);
  };

  const handdleDestination = (e) => {
    const selectedValue = e.target.value;
    setDestinationSelected(selectedValue);
    console.log(selectedValue);
  };

  let filteredFlights = flightsData;

  if (statusDataSelected !== "") {
    filteredFlights = filteredFlights.filter(
      (flight) => flight.status === statusDataSelected
    );
  }

  if (originDataSelected !== "") {
    filteredFlights = filteredFlights.filter(
      (flight) => flight.origin === originDataSelected
    );
  }

  if (originDataSelected !== "") {
    filteredFlights = filteredFlights.filter(
      (flight) => flight.destination === destinationDataSelected
    );
  }

  console.log(filteredFlights);

  useEffect(() => {
    let dataFetch = fetch(
      "https://backendnativ-production.up.railway.app/api/v1/flights"
    );
    dataFetch
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setFlightsData(res);
        setStatusData(
          res.map((status) => {
            return status.status;
          })
        );
      });
  }, []);
  return (
    <div>
      {" "}
      <select name="" id="" onClick={handdleStatus}>
        <option value="" disabled selected>
          Estado del vuelo
        </option>
        {flightsData
          .filter(
            (flight, index, self) =>
              index === self.findIndex((t) => t.status === flight.status)
          )
          .map((flight) => (
            <option key={flight.status} value={flight.status}>
              {flight.status}
            </option>
          ))}
      </select>
      <select name="" id="" onClick={handdleOrigin}>
        <option value="" disabled selected>
          Lugar de origen
        </option>
        {flightsData
          .filter(
            (flight, index, self) =>
              index === self.findIndex((t) => t.origin === flight.origin)
          )
          .map((flight) => (
            <option key={flight.origin} value={flight.origin}>
              {flight.origin}
            </option>
          ))}
      </select>
      <select name="" id="" onClick={handdleDestination}>
        <option value="" disabled selected>
          Lugar de destino
        </option>
        {flightsData
          .filter(
            (flight, index, self) =>
              index ===
              self.findIndex((t) => t.destination === flight.destination)
          )
          .map((flight) => (
            <option key={flight.destination} value={flight.destination}>
              {flight.destination}
            </option>
          ))}
      </select>
      {filteredFlights.map((flight) => {
        return (
          <Flight
          id={flight.id}
          airline={flight.airline}
          origin={flight.origin}
          destination={flight.destination}
          price={flight.precio}
          departureTime={flight.departureTime}
          arrivalTime={flight.arrivalTime}
          duration={flight.duration}
          status={flight.status}
          aircraftType={flight.aircraftType}
          capacity={flight.capacity}
          ></Flight>
        );
      })}
    </div>
  );
}

export default List_flights;
