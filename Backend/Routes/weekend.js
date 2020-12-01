
const express = require('express');
const router = express.Router();
//const fetch = require('node-fetch');
const request = require('request');
const moment = require('moment');

router.get('/weekend/celsius', async (req, res) => {
    const CityStateCountry = req.query.CityStateCountry;
    //const units = req.query.units;
    const api_key = process.env.API_KEY;
    const api_key2=process.env.API;
    let lat;
    let lon;
    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${CityStateCountry}&key=${api_key2}`, function (err, response, body) {
        if (err) {
            console.log('error:', error);
        } else {
            //console.log('body:', body);  
            //console.log('body:', body.results[0]);
            let bodydata = JSON.parse(body);
            //console.log('body:', bodydata.results[0].geometry.location);
            lat = bodydata.results[0].geometry.location.lat;
            lon = bodydata.results[0].geometry.location.lng;
            const weather_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&units=metric&appid=${api_key}`;
            request(weather_url, function (err, response, body) {
                if (err) {
                    console.log('error:', error);
                } else {
                    //console.log('body:', body);
                    let data = JSON.parse(body);
                    let timezone=data.timezone;
                    //console.log('date:', moment.unix(data.daily[0].dt).format("MM/DD/YYYY"));
                    //console.log('time:', moment.unix(data.daily.dt).format("LTS"));
                    var week_end = [];
                    week_end.push({'timezone':timezone});
                    data.daily.map(function(value, i) {
                        var d=moment.unix(value.dt).format('ddd');
                        //console.log(i);
                        //console.log(moment.unix(value.dt).format('dddd'));
                        //console.log(i);
                        if (d=="Sun"||d=="Sat"||d=="Fri"){
                           console.log(moment.unix(value.dt).format('dddd'));
                            week_end.push(value);
                        }

                    });
                    //console.log(week_end);
                    //res.status(200).json(data);
                    res.status(200).json(week_end);
                }
            });

        }
    });
});

router.get('/weekend/farenheit', async (req, res) => {
    const CityStateCountry = req.query.CityStateCountry;
    //const units = req.query.units;
    const api_key = process.env.API_KEY;
    const api_key2=process.env.API;
    let lat;
    let lon;
    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${CityStateCountry}&key=${api_key2}`, function (err, response, body) {
        if (err) {
            console.log('error:', error);
        } else {
            //console.log('body:', body);  
            //console.log('body:', body.results[0]);
            let bodydata = JSON.parse(body);
            //console.log('body:', bodydata.results[0].geometry.location);
            lat = bodydata.results[0].geometry.location.lat;
            lon = bodydata.results[0].geometry.location.lng;
            const weather_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&units=imperial&appid=${api_key}`;
            request(weather_url, function (err, response, body) {
                if (err) {
                    console.log('error:', error);
                } else {
                    //console.log('body:', body);
                    let data = JSON.parse(body);
                    //console.log(data);
                    let timezone=data.timezone;
                    //const size=data.length();//this is an array. loop through this array and get dt values out of the array. 
                    //console.log('date:', new Date(data.current.dt*1000));
                    //console.log('date:', moment.unix(data.daily.dt).format("MM/DD/YYYY"));//here 'd' will give a value 0-6. whenever the d is 4/5/6--> push this data to another array and return this array out to frontend.
                    //console.log('time:', moment.unix(data.daily.dt).format("LTS"));

                    var week_end = [];
                    week_end.push({'timezone':timezone});
                    data.daily.map(function(value, i) {
                        var d=moment.unix(value.dt).format('ddd');
                        //console.log(i);
                        //console.log(moment.unix(value.dt).format('dddd'));
                         //console.log(i);
                        if (d=="Sun"||d=="Sat"||d=="Fri"){
                            console.log(moment.unix(value.dt).format('dddd'));
                            week_end.push(value);
                        }
                        //console.log(week_end);
                    });
                    //console.log(week_end);
                    res.status(200).json(week_end);
            
                    }

                    
                
            });

        }
    });
});

module.exports = router;