import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import Footer from '../LandingPage/Footer'

const Monthly = () => {

  const [month, setMonth] = useState(moment().month() + 1);
  // let month = moment().month;
  console.log(month);
  let daysInMonth = moment(month, 'MM').daysInMonth();
  let startDay = moment(`${month}-2020`, "MM-YYYY").startOf('month').weekday();
  console.log(startDay)
  let weeks = Math.ceil(daysInMonth/7);
  console.log(weeks);

  const [searchQuery, setSearchQuery] = useState(sessionStorage.getItem("location"));
  const [searchData, setSearchData] = useState({});
  const [units, setUnits] = useState(sessionStorage.getItem("units"));
  const [monthData, setMonthData] = useState([]);

  let week1 = ['', '', 1, 2, 3, 4, 5];
  let week2 = [6, 7, 8, 9, 10, 11, 12];
  let week3 = [13,14,15,16,17,18,19];
  let week4 = [20,21,22,23,24,25,26];
  let week5 = [27,28,29,30,31, '', ''];
  let weekArray = [week1, week2, week3, week4, week5];

  const [daysOfWeek] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])

  useEffect(async () => {
    let response;
    if (units === "celsius") {
      response = await axios.get('http://localhost:3001/monthly/celsius', { params: { CityStateCountry: searchQuery } })
    } else {
      response = await axios.get('http://localhost:3001/monthly/farenheit', { params: { CityStateCountry: searchQuery } })
    }
    console.log(response.data);
    setSearchData(response.data);
    setMonthData(response.data.list);
    // console.log(response.data.list.filter((data, index) => moment.unix(data.dt).format("D") === 10));
  }, []);

  //console.log('list', monthData.length > 0 && monthData.filter((data, index) => (moment.unix(data.dt).format("D") === '10')))
  console.log('list', typeof monthData);

  let day = (val) => {
    return (
      <div className="col" style={{ width: "125px", border: "solid black 0.5px", textAlign: "center", backgroundColor:"#c0f2fa" }}>
        <b>{ val }</b>
      </div>
    )
  }

  let checkCondition = (val) => {
    let data = monthData.filter((data, index) => moment.unix(data.dt).format("D") === '' + val);
    if (data[0]) {
      return true
    } else {
      return false
    }
  }

  let getIcon = (val) => {
    let data = monthData.filter((data, index) => moment.unix(data.dt).format("D") === '' + val);
    if (data[0]) {
      return (<img src={"http://openweathermap.org/img/wn/" + data[0].weather[0].icon + ".png"}></img>)
    } else {
      return ""
    }
  }

  let getMaxValue = (val) => {
    let data = monthData.filter((data, index) => moment.unix(data.dt).format("D") === '' + val);
    if (data[0]) {
      return (Math.trunc(data[0].temp.max))
    } else {
      return ""
    }
  }

  let getMinValue = (val) => {
    let data = monthData.filter((data, index) => moment.unix(data.dt).format("D") === '' + val);
    if (data[0]) {
      return (Math.trunc(data[0].temp.min))
    } else {
      return ""
    }
  }

  let monthCard = (val) => {
    // console.log("in card");
      return (
        <div className="col" style={{ height: "175px", width: "125px", border: "solid black 0.5px" }}>
          <div>{val}</div>
          {val && monthData && monthData.length > 0 && checkCondition(val) &&
          (<div>
            <div style={{ fontSize: "35px", textAlign: "center" }}>
              {getIcon(val)}
            </div>
            <div style={{fontSize:"35px", textAlign:"center"}}>
              {getMaxValue(val)}&deg;
            </div>
            <div style={{ fontSize: "30px", textAlign: "center" }}>
              {getMinValue(val)}&deg;
            </div>
          </div>)}
        </div>
      )
  }

  return (
    <div className="container" style={{paddingTop: "2rem"}}>
      <div className="row" style={{ textAlign: "center", fontSize: "25px" }}><b>December</b></div>
      <div className="row">
        {daysOfWeek && daysOfWeek.map((val) => (day(val)))}
      </div>
          {weekArray && weekArray.map((week) => {
            return (<div className="row"> {week.map((day) => monthCard(day))} </div>)
          })}
          <Footer />
    </div>
  );
}

export default Monthly;