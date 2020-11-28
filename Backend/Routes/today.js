
const express = require('express');
const router = express.Router();
//const fetch = require('node-fetch');
const request = require('request');
const moment = require('moment');

router.get('/today', async (req, res) => {
  // console.log(req.query);
  // console.log(req.body);
  const CityStateCountry = req.query.CityStateCountry;
  console.log(CityStateCountry);
  // const city = CityStateCountry[0];
  // const state = CityStateCountry[1];
  // const country = CityStateCountry[2];
  const units = req.query.units;
  //console.log(city, state, country, units);
  const api_key = process.env.API_KEY;
  //const weather_url=`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=${units}&appid=${api_key}`;
  //const weather_response=await fetch(weather_url);
  //const weather_data=await weather_response.json();
  // const weather_url = '';
  let lat;
  let lon;
  // if(!CityStateCountry )
  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${CityStateCountry}&key=${process.env.MAPS_KEY}`, function (err, response, body) {
    if (err) {
      console.log('error:', err);
    } else {
      // console.log('re:', response);  
      console.log('body:', body);
      let bodydata = JSON.parse(body);
      console.log('body:', bodydata.results[0].geometry.location);
      lat = bodydata.results[0].geometry.location.lat;
      lon = bodydata.results[0].geometry.location.lng;
      const weather_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=${units}&appid=${api_key}`;
      request(weather_url, function (err, response, body) {
        if (err) {
          console.log('error:', error);
        } else {
          console.log('body:', body);
          let data = JSON.parse(body);
          //console.log('date:', new Date(data.current.dt*1000));
          console.log('date:', moment.unix(data.current.dt).format("MM/DD/YYYY"));
          console.log('time:', moment.unix(data.current.dt).format("LTS"));
          res.status(200).json(data);
        }
      });
    }
  });


});

module.exports = router;