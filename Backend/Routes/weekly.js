const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/weekly/celsius', async (req, res)=>{
    const CityStateCountry = req.query.CityStateCountry;
    //const units=req.query.units;
    const api_key = process.env.API_KEY;//api for open weather api
    const api_key2=process.env.API;//api for google maps
    let lat;
    let lon;
    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${CityStateCountry}&key=${api_key2}`, function (err, response, body) {
        if(err){
            console.log('error:', error);
            } else {
                let bodydata= JSON.parse(body);
                console.log('body:', bodydata.results[0].geometry.location);
                // console.log(moment(row.sunrise).tz(bodydata.timezone).format("h A"));
                lat= bodydata.results[0].geometry.location.lat;
                lon=bodydata.results[0].geometry.location.lng;
                const weather_url= `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${api_key}`;
                request(weather_url, function (err, response, body) {
                    if(err){
                      console.log('error:', error);
                    } else {
                      console.log('body:', body);
                      let data=JSON.parse(body);
                      res.status(200).json(data);
                      //console.log(moment(row.sunrise).tz(data.timezone).format("h A"));
                    }
            });
        }    
});

});

router.get('/weekly/farenheit', async (req, res)=>{
  const CityStateCountry = req.query.CityStateCountry;
  //const units=req.query.units;
  const api_key = process.env.API_KEY;//api for open weather api
  const api_key2=process.env.API;//api for google maps
  let lat;
  let lon;
  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${CityStateCountry}&key=${api_key2}`, function (err, response, body) {
      if(err){
          console.log('error:', error);
          } else {
              let bodydata= JSON.parse(body);
              console.log('body:', bodydata.results[0].geometry.location);
              lat= bodydata.results[0].geometry.location.lat;
              lon=bodydata.results[0].geometry.location.lng;
              const weather_url= `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=imperial&appid=${api_key}`;
              request(weather_url, function (err, response, body) {
                  if(err){
                    console.log('error:', error);
                  } else {
                    console.log('body:', body);
                    let data=JSON.parse(body);
                    res.status(200).json(data);
                  }
          });
      }    
});

});

module.exports = router;
