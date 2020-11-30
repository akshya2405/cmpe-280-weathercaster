const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/hourly/celsius', async (req, res)=>{
    const CityStateCountry = req.query.CityStateCountry;
    const units=req.query.units;
    const api_key = process.env.API_KEY;
    const api_key2=process.env.API;
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
                const weather_url_cel= `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&units=metric&appid=${api_key}`;
                request(weather_url_cel, function (err, response, body) {
                    if(err){
                      console.log('error:', error);
                    } else {
                      console.log('body:', body);
                      let data_cel=JSON.parse(body);
                      res.status(200).json(data_cel);
                    }
            });
        }    
});

});
router.get('/hourly/farenheit', async (req, res)=>{
  const CityStateCountry = req.query.CityStateCountry;
  const units=req.query.units;
  const api_key = process.env.API_KEY;
  const api_key2=process.env.API;
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
              const weather_url_cel= `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&units=imperial&appid=${api_key}`;
              request(weather_url_cel, function (err, response, body) {
                  if(err){
                    console.log('error:', error);
                  } else {
                    console.log('body:', body);
                    let data_far=JSON.parse(body);
                    res.status(200).json(data_far);
                  }
          });
      }    
});

});


module.exports = router;
