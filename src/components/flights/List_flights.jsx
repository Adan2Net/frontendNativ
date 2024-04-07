import { useEffect } from "react";
import { useState } from "react";
import Flight from "./Flight";


function List_flights() {
    const [ flightsData, setFlightsData ] =  useState([]);
    const [ statusData, setStatusData ] = useState([]);
    const [ statusDataSelected, setStatusDataSelected ] = useState('');
    //TODO://Agregar mas estados para el retos de filtros como ciudad y la aereolinea, agregar los function handleStatus para cada uno  y agregar el select con el valor correspondiente: <select name="" id="" onClick={handdleStatus}>
        /*<option value="" disabled selected>Estado del vuelo</option>
        {statusData.map((status) => {
        return (<option value={status}>{status}</option>);
    })}</select>*/

    const handdleStatus = (e) => {
        const selectedValue = e.target.value;
        setStatusDataSelected(selectedValue);
        console.log(selectedValue);
    };

    let filteredFlights = flightsData;
    if (statusDataSelected !== '') {
      filteredFlights = flightsData.filter(flight => flight.name === statusDataSelected);
    }    console.log(filteredFlights);

    useEffect(() => {
        let dataFetch = fetch('https://proxyfood-production.up.railway.app/api/v8/foodPrices');
        dataFetch.then( (res) => {
            return res.json();
        }).then((res) => {
            setFlightsData(res);
            setStatusData(res.map ( (status) => {
                return status.name;
            }));
        })
    }, []);
    return <div> <select name="" id="" onClick={handdleStatus}>
        <option value="" disabled selected>Estado del vuelo</option>
        {statusData.map((status) => {
        return (<option value={status}>{status}</option>);
    })}</select>
        {filteredFlights.map((flight) => {
        return (<Flight id={flight.id} name={flight.name}></Flight>);
    })}</div>;
}

export default List_flights;