import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import AlertModal from '../AlertModal'

import { getCurrentData } from '../../actions/search'

const Today = (props) => {
  // if (!(props.location.state === undefined || props.location.state === '' || props.location.state === null)) {
  //   sessionStorage.setItem("location", props.location.state)
  // }
  const [searchQuery, setSearchQuery] = useState(sessionStorage.getItem("location"))
  const [searchData, setSearchData] = useState({});
  const [units, setUnits] = useState("imperial");
  const [mainImg, setmainImg] = useState("");
  const [otherImg, setOtherImg] = useState("");
  const [openModal, setOpenModal] = useState(false); 
  useEffect(async () => {
    const response = await axios.get('http://localhost:3001/today', { params: { CityStateCountry: searchQuery, units: units } })
    console.log(response.data);
    setSearchData(response.data);
    let img = "http://openweathermap.org/img/wn/" + response.data.current.weather[0].icon + "@4x.png";
    setmainImg(img);
    let otherimg = "http://openweathermap.org/img/wn/" + response.data.daily[0].weather[0].icon + "@2x.png";
    setOtherImg(otherimg);
  }, []);

  let openModalFn = (e) => {
    console.log("calling modal");
    e.preventDefault();
    setOpenModal(true);
  }
  return (
    <div className="d-flex justify-content-center" style={{ border: "solid black", width: "80%", margin: "auto", height: "80vh" }}>
      <div className="card" style={{ width: "100%", height: "100%" }}>
        <div className="card-body">
          {/* style={{ border: "solid blue" }}> */}
          <div className="row">
            {/* style={{ border: "solid green" }}> */}
            <div className="col-sm-6" style={{ marginLeft: "1rem", marginTop: "1rem" }}>
              <div className="row"><h3>{searchQuery}</h3></div>
              <div className="row"><h5>{searchData.timezone}</h5></div>
              <div className="row"><h6>As of {searchData.current && moment.unix(searchData.current.dt).format("LT")} on {searchData.current && moment.unix(searchData.current.dt).format("MM/DD/YYYY")}</h6></div>
              <div className="row"><h1>{searchData.current && searchData.current.temp}&deg;&emsp;</h1>
                <h5 style={{ paddingTop: "1rem" }}>feels like {searchData.current && searchData.current.feels_like}&deg;</h5></div>
              <div className="row"><h6>{searchData.current && searchData.current.weather[0].main}</h6></div>
            </div>
            <div className="col-sm-4" style={{ textAlign: "center" }}>
              <img src={mainImg}
                alt={searchData.current && searchData.current.weather[0].description}></img>
            </div>
          </div>
          <div className="row">
            {/* style={{border: "coral solid"}}> */}
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-4">Sunrise {searchData.current && moment.unix(searchData.current.sunrise).format("LT")}</div>
                <div className="col-sm-4">UV index {searchData.current && searchData.current.uvi}</div>
                <div className="col-sm-4">Dew point {searchData.current && searchData.current.dew_point}</div>
              </div>
              <div className="row">
                <div className="col-sm-4">Sunset {searchData.current && moment.unix(searchData.current.sunset).format("LT")}</div>
                <div className="col-sm-4">Humidity {searchData.current && searchData.current.humidity}</div>
                <div className="col-sm-4">Wind {searchData.current && searchData.current.wind_speed}</div>
              </div>
            </div>
          </div>
          <div className="row">
            {searchData.alerts ? (
              searchData.alerts.map((alert, index) => (
                <AlertModal {...alert} />
              ))
            ) : (<div class="alert alert-success" role="alert">There are no alerts today</div>)}
          </div>
        </div>
        <div className="card-body">
          {/* style={{border: "orange solid"}}> */}
          <div>
            Today's forecast for {searchData.timezone}
          </div>
          <div className="row">
            <div className="col-sm-2" style={{ border: "black solid 0.5px", marginLeft: "1rem", textAlign: "center", backgroundColor:"#92d2fc" }}>
              <div>Morning</div>
              <h3>{searchData.daily && searchData.daily[0].temp.morn}&deg;</h3>
              <img src={otherImg}
                alt={searchData.daily && searchData.daily[0].weather[0].description}></img>
            </div>
            <div className="col-sm-2" style={{ border: "black solid 0.5px", marginLeft: "1rem", textAlign: "center", backgroundColor: "#92d2fc" }}>
              <div>Afternoon</div>
              <h3>{searchData.daily && searchData.daily[0].temp.day}&deg;</h3>
              <img src={otherImg}
                alt={searchData.daily && searchData.daily[0].weather[0].description}></img>
            </div>
            <div className="col-sm-2" style={{ border: "black solid 0.5px", marginLeft: "1rem", textAlign: "center", backgroundColor: "#013557", color:"#FFFFFF" }}>
              <div>Evening</div>
              <h3>{searchData.daily && searchData.daily[0].temp.eve}&deg;</h3>
              <img src={otherImg}
                alt={searchData.daily && searchData.daily[0].weather[0].description}></img>
            </div>
            <div className="col-sm-2" style={{ border: "black solid 0.5px", marginLeft: "1rem", textAlign: "center", backgroundColor: "#013557", color:"#FFFFFF" }}>
              <div>Night</div>
              <h3>{searchData.daily && searchData.daily[0].temp.night}&deg;</h3>
              <img src={otherImg}
                alt={searchData.daily && searchData.daily[0].weather[0].description}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Today;