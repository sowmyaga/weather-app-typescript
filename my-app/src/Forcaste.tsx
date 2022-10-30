import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Forcaste.css";


const Forcaste = ():JSX.Element => {
    const [weatherData, setweatherData] = useState<any>([]);//to set week weather data
    const [currentweather, setcurrentweather] = useState<any>([])//to current day weather data
    const [City, setCity] = useState("bangalore");//default taking current location to display weather data.
    const [unit, setUnit] = useState("");//to switch between different units
    const [isImperialUnitSelected, setIsImperialUnitSelected] = useState(false);//boolen to switch different units.


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }, [])

    //to get onload data to display weather data
    useEffect(() => {
        handleSearchByLocation();
    }, [])

    // onchange function to get input location value
    const handleCityInput = (e: any) => {
        setCity(e.target.value);
    }

    //switch units between imperial/metric units
    const handleUnits = (e: any) => {
        setUnit(e.target.value);
        if (e.target.value == "imperial") {
            setIsImperialUnitSelected(true);
        }
        else {
            setIsImperialUnitSelected(false);
        }
    }

    //onclick function to get searched location data
    const handleSearchByLocation = async () => {
        const data = {
            days: 7,
            location: City,
        };
        const headers = {
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
            'Content-Type': 'application/json'
        };
        await axios.post(`${process.env.REACT_APP_API}`, data, { headers })
            .then((response) => {
                if (!response) {
                    return false;
                }
                else {
                    setcurrentweather(response ? response.data : null)
                    setweatherData(response ? response.data : null)
                }
            });
    }
    //to get Ui week weather data
    const weatherUi: any = Object.keys(currentweather).length ? weatherData.forecast.map((item: any) => {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(item.date);
        var dayName = days[d.getDay()];

        return (
            <>
                <div>
                    <div className="weather-day">{dayName}</div>
                    <img src={item.icon_url} />
                    <div>
                        <span>
                            {isImperialUnitSelected ? <b>{item.max_temp_f}&deg;F</b> : <b>{item.max_temp_c}&deg;C</b>}
                        </span>&nbsp;&nbsp;
                        <span id="weather-min-temp">
                            {isImperialUnitSelected ? <span>{item.min_temp_f}&deg;F</span> : <span>{item.min_temp_c}&deg;C</span>}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    {/* <p id="weather-codndition">{item.condition}</p> */}
                </div>

            </>
        )
    }) : ""

    //formatting date
    var dob = new Date(Object.keys(currentweather).length ? currentweather.forecast[0].date : "");
    var dobArr = dob.toDateString().split(' ');
    var dobFormat = dobArr[0] + ',' + dobArr[1] + ' ' + dobArr[2]
    return (
        <>
            <Card>
                <Card.Header as="h5">Weather Application</Card.Header>
                <Card.Body className="card-body">
                    <Container>
                        {Object.keys(currentweather).length ?
                            <Row className="justify-content-md-center">
                                <Form>
                                    <Row className="align-items-center">
                                        <Col xs="auto">
                                            <Form.Control placeholder="Location" value={City} onChange={handleCityInput} />
                                        </Col>
                                        <Col xs="auto">
                                            <Button onClick={handleSearchByLocation}>
                                                Search
                                            </Button>
                                        </Col>

                                        <Col>
                                            <Form.Select size="sm" style={{ "width": "30%" }} aria-label="Default select example" onChange={handleUnits} value={unit}>
                                                <option>select units</option>
                                                <option value="metric">metric</option>
                                                <option value="imperial">imperial</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </Form>
                                <Col xs lg="4" style={{ "textAlign": "left", "marginTop": "47px" }}>
                                    <div style={{ "fontSize": "22px" }}>
                                        <b>{Object.keys(currentweather).length ? currentweather.location : ""}</b></div>
                                    <div>{dobFormat} &nbsp;Overcast</div>
                                    <img src={Object.keys(currentweather).length ? currentweather.forecast[0].icon_url : ""} style={{ "width": "109px" }} />&nbsp;
                                    {isImperialUnitSelected ? <span style={{ "marginTop": "44px" }}><b>{Object.keys(currentweather).length ? currentweather.forecast[0].max_temp_f : ""}&deg;F</b></span> : <span style={{ "marginTop": "44px" }}><b>{Object.keys(currentweather).length ? currentweather.forecast[0].max_temp_c : ""}&deg;C</b></span>}
                                </Col>
                                <Col xs lg="4">
                                    <div className="weather-data">
                                        <p>Precipitation: {Object.keys(currentweather).length ? currentweather.forecast[0].chance_of_rain : ""}%</p>
                                        <p>Humidity:97%</p>
                                        {isImperialUnitSelected ? <p>Wind:{Object.keys(currentweather).length ? <span>{currentweather.forecast[0].max_wind_mph}mph SW</span> : ""}</p> : <p>Wind:{Object.keys(currentweather).length ? <span>{currentweather.forecast[0].max_wind_kph}kph SW</span> : ""}</p>}
                                        <p>Pollen Count:36</p>
                                    </div>
                                </Col>
                            </Row> : "Loading...."}
                    </Container>
                    <Row>
                        <Col sm={8}>
                            <div className="weather-details">
                                {weatherUi}
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}
export default Forcaste;