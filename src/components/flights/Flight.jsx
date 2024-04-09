import { useState } from "react";
import Flight_info from "./Flight_info";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Flight({
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleFlightClick = (id) => {
    setIdDataSelected(id);
    setShow(true);
  };

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.1zoom.me%2Fbig2%2F41%2F282362-alexfas01.jpg&f=1&nofb=1&ipt=83c207ed090be388a95027d416e7aa26fe3d8a1ba9a0d71af21aad8b0d96d24d&ipo=images" />
        <Card.Body>
          <Card.Title>Vuelo {id}</Card.Title>
          <Card.Text>
            <p><strong>Aerolinea:</strong> {airline}</p>
            <p><strong>Destino:</strong> {destination}</p>
            <p><strong>Precio:</strong> ${price}</p>
          </Card.Text>
          <Button variant="primary" onClick={() => handleFlightClick(id)}>Detalles</Button>
        </Card.Body>
      </Card>
      {idDataSelected && (
        // eslint-disable-next-line react/jsx-pascal-case
        <Flight_info
          show={show}
          setShow={setShow}
          handleClose={handleClose}
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
