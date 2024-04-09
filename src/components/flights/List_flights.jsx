import { useEffect, useState } from "react";
import Flight from "./Flight";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function List_flights() {
  const [flightsData, setFlightsData] = useState([]);
  const [statusDataSelected, setStatusDataSelected] = useState("");
  const [originDataSelected, setOriginSelected] = useState("");
  const [destinationDataSelected, setDestinationSelected] = useState("");

  const handdleStatus = (e) => {
    const selectedValue = e.target.value;
    setStatusDataSelected(selectedValue);
  };

  const handdleOrigin = (e) => {
    const selectedValue = e.target.value;
    setOriginSelected(selectedValue);
  };

  const handdleDestination = (e) => {
    const selectedValue = e.target.value;
    setDestinationSelected(selectedValue);
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

  if (destinationDataSelected !== "") {
    filteredFlights = filteredFlights.filter(
      (flight) => flight.destination === destinationDataSelected
    );
  }

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
      });
  }, []);

  return (
    <div>
      {" "}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Simulador de reservas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Filtros" id="basic-nav-dropdown">
                <div className="input-group mb-3">
                  <select
                    className="form-select form-select-sm"
                    name=""
                    id=""
                    onClick={handdleStatus}
                  >
                    <option value="" disabled selected>
                      Estado del vuelo
                    </option>
                    {flightsData
                      .filter(
                        (flight, index, self) =>
                          index ===
                          self.findIndex((t) => t.status === flight.status)
                      )
                      .map((flight) => (
                        <option key={flight.status} value={flight.status}>
                          {flight.status}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <select
                    className="form-select form-select-sm"
                    name=""
                    id=""
                    onClick={handdleOrigin}
                  >
                    <option value="" disabled selected>
                      Lugar de origen
                    </option>
                    {flightsData
                      .filter(
                        (flight, index, self) =>
                          index ===
                          self.findIndex((t) => t.origin === flight.origin)
                      )
                      .map((flight) => (
                        <option key={flight.origin} value={flight.origin}>
                          {flight.origin}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <select
                    className="form-select form-select-sm"
                    name=""
                    id=""
                    onClick={handdleDestination}
                  >
                    <option value="" disabled selected>
                      Lugar de destino
                    </option>
                    {flightsData
                      .filter(
                        (flight, index, self) =>
                          index ===
                          self.findIndex(
                            (t) => t.destination === flight.destination
                          )
                      )
                      .map((flight) => (
                        <option
                          key={flight.destination}
                          value={flight.destination}
                        >
                          {flight.destination}
                        </option>
                      ))}
                  </select>
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          {filteredFlights.map((flight) => {
            return (
              <Col sm={4} key={flight.id}>
                <Flight
                  id={flight.id}
                  airline={flight.airline}
                  origin={flight.origin}
                  destination={flight.destination}
                  price={flight.price}
                  departureTime={flight.departureTime}
                  arrivalTime={flight.arrivalTime}
                  duration={flight.duration}
                  status={flight.status}
                  aircraftType={flight.aircraftType}
                  capacity={flight.capacity}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default List_flights;
