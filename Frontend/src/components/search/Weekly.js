import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState, Component } from 'react';
var moment_timezone = require('moment-timezone');

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });
  
  let id = 0;
  
function createData(Time,Temperature, Weather_like, Feels_Like_Temp, Wind, Humidity,Precipitation,UV_Index) {
    id += 1;
return { Time,Temperature, Weather_like, Feels_Like_Temp, Wind, Humidity,Precipitation,UV_Index };
}

class Weekly extends Component {

    constructor(props){
        super(props);
        // this.search = this.search.bind(this);
        this.state = { 
            apiResponse: "",
            searchQuery : sessionStorage.getItem("location"),
            units       : sessionStorage.getItem("units")
        }; 

    }

    async callAPI() {
        const { searchQuery } = this.state
        const { units  } = this.state
        let response;

        if (units === "celsius") {
            response = await axios.get('http://localhost:3001/weekly/celsius', { params: { CityStateCountry: searchQuery } })
          } else {
            response = await axios.get('http://localhost:3001/weekly/farenheit', { params: { CityStateCountry: searchQuery } })
          }

        console.log(response.data);
        this.setState({ apiResponse: response })
    }

    

    componentDidMount() {
        this.callAPI();
    }

   

    simpleTable(classes,resp) {
        // const { classes } = props;
        
        let data=resp.data;

        if(data){
            var weekly = data
            console.log(data,weekly,typeof(resp.data),"response structure");

            return ( 
                <Paper className={classes.root}>
                     <div><h5>{data.timezone}</h5></div> 
                     <div><h6>As of {moment(new Date()).tz(data.timezone).format("LT")} on {moment(new Date()).tz(data.timezone).format("MM/DD/YYYY")}</h6></div>
                <div className="d-flex justify-content-center" style={{ border: "solid black", width: "90%", margin: "auto" }}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                            <TableCell align="right">Temp</TableCell>
                            <TableCell align="right">Weather Condition</TableCell>
                            <TableCell align="right">Sunrise</TableCell>
                            <TableCell align="right">Sunset</TableCell>
                            <TableCell align="right">Wind</TableCell>
                            <TableCell align="right">Humidity</TableCell>
                            <TableCell align="right">Dew Point</TableCell>
                            <TableCell align="right">UV Index</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {weekly.daily.map(row => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {moment.unix(row.dt).format("ddd DD")}
                        </TableCell>
                            <TableCell align="right"><h3>{Math.trunc(row.temp.max)}&deg; / {Math.trunc(row.temp.min)}&deg; </h3></TableCell>
                            {/* <TableCell align="right">{row.weather[0].main}</TableCell> */}
                            <TableCell align="right">
                            <img src={"http://openweathermap.org/img/wn/" + row.weather[0].icon + "@2x.png"}></img>
                            <p>{row.weather[0].description}</p>
                            </TableCell>
                            <TableCell align="right">{moment.unix(row.sunrise, "LT").tz(data.timezone).format("LT")}</TableCell>
                            <TableCell align="right">{moment.unix(row.sunset, "LT").tz(data.timezone).format("LT")}</TableCell>
                            <TableCell align="right">{Math.trunc(row.wind_speed)}</TableCell>
                            <TableCell align="right">{row.humidity}&#37;</TableCell>
                            <TableCell align="right">{row.dew_point}</TableCell>
                            <TableCell align="right">{row.uvi}</TableCell> 
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
                </Paper>
            );
        }
    }

    render(){
        

        const { apiResponse } = this.state;
        const { classes } = this.props;

        const { searchQuery } = this.state;

        return(
            <div>
                <p>Weekly Weather</p>
                {/* <p className="App-intro">;{apiResponse}</p> */}
                <div><h3>{searchQuery}</h3></div>
                <div>{this.simpleTable(classes,apiResponse)}</div> 
            </div>
        )
    }
}



Weekly.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(SimpleTable);  
export default withStyles(styles)(Weekly);  
// export default weekend;