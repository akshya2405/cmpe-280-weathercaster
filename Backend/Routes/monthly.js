const express = require('express');
const router = express.Router();
//const fetch = require('node-fetch');
const request = require('request');

router.get('/monthly/celsius', async (req, res) => {
  const CityStateCountry = req.query.CityStateCountry;
  const api_key = process.env.API_KEY;
  const maps_key = process.env.API;
  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${CityStateCountry}&key=${maps_key}`, function (err, response, body) {
    if (err) {
      console.log('error:' , error);
    } else {
      let bodydata = JSON.parse(body);
      console.log('body:', bodydata.results[0].geometry.location);
      lat = bodydata.results[0].geometry.location.lat;
      lon = bodydata.results[0].geometry.location.lng;
      const weather_url = `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
      request(weather_url, function (err, response, body) {
        if (err) {
          console.log('error:', error);
        } else {
          console.log('body:', body);
          let data = JSON.parse(body);
          //console.log('date:', new Date(data.current.dt*1000));
          // console.log('date:', moment.unix(data.current.dt).format("MM/DD/YYYY"));
          // console.log('time:', moment.unix(data.current.dt).format("LTS"));
          res.status(200).json(data);
        }
      });
    }
  })
})

module.exports = router;