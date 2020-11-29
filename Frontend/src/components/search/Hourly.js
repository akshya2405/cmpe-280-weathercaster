import React,{Component, useEffect, useState } from 'react';
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
import { useHistory } from "react-router-dom";



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



      
// const rows = [
//     createData('6 PM', 67, 'Sunny', 'Feels Like 67', '20 mph', '96 %' ,'46', 0),
//     createData('7 PM', 68, 'Sunny', 'Feels Like 65', '15 mph', '96 %' ,'46', 0),
//     createData('8 PM', 69, 'Cloudy', 'Feels Like 50', '10 mph', '96 %' ,'46', 0),
//     createData('9 PM', 70, 'Rainy', 'Feels Like 45', '05 mph', '96 %' ,'46', 0),
//     createData('10 PM', 71, 'Sunny', 'Feels Like 40', '30 mph', '96 %' ,'46', 0),

// ];
  
// const classes = useStyles();


    

class Hourly extends Component {
    constructor(props){
        super(props);
        // this.search = this.search.bind(this);
        this.state = { 
            apiResponse: "",
            searchQuery : sessionStorage.getItem("location")
        };
        

    }

    // search() {
    //     const { dispatch, history } = this.props;
    //     history.push('/search/today');
    //     console.log('search component');
    // }
    
    async callAPI() {
        // fetch("http://localhost:3001/hourly/celsius?CityStateCountry=London")
        //     .then(res => res.text())
        //     .then(res => this.setState({ apiResponse: res }));

        const { searchQuery } = this.state

        const response = await axios.get("http://localhost:3001/hourly/celsius", { params: { CityStateCountry: searchQuery } })
        console.log(response.data);
        this.setState({ apiResponse: response })
    }
    
    componentDidMount() {
        this.callAPI();
    }

    simpleTable(classes,resp) {
        // const { classes } = props;
        
        let data=resp.data;

        if(data && data.hourly){
            var hourly = data.hourly
            console.log(data,data.hourly,typeof(resp.data),"response structure")


            return ( 
                <Paper className={classes.root}>
                     <div><h5>{data.timezone}</h5></div> 
                     <div><h6>As of {moment.unix(hourly[0].dt).format("LT")} on {moment.unix(hourly[0].dt).format("MM/DD/YYYY")}</h6></div>
              
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                            <TableCell align="right">Temperature</TableCell>
                            <TableCell align="right">Weather Condition</TableCell>
                            <TableCell align="right">Feels Like Temp</TableCell>
                            <TableCell align="right">Wind</TableCell>
                            <TableCell align="right">Humidity</TableCell>
                            <TableCell align="right">Precipitation</TableCell>
                            <TableCell align="right">UV Index</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {hourly.map(row => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {moment.unix(row.dt).format("hh:mm A")}
                        </TableCell>
                            <TableCell align="right">{row.temp}</TableCell>
                            <TableCell align="right">{row.weather[0].main}</TableCell>
                            <TableCell align="right">{row.feels_like}</TableCell>
                            <TableCell align="right">{row.wind_speed}</TableCell>
                            <TableCell align="right">{row.humidity}</TableCell>
                            <TableCell align="right">{row.dew_point}</TableCell>
                            <TableCell align="right">{row.uvi}</TableCell> 
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Paper>
            );
        }
    }


    render(){

        //const classes = useStyles();
        const { apiResponse } = this.state;
        const { classes } = this.props;

        const { searchQuery } = this.state;


        // const searchQuery = this.state.sessionStorage.getItem("location");

        return(
            <div>
                <p>Hourly Weather</p>
                {/* <p className="App-intro">;{apiResponse}</p> */}
                <div><h3>{searchQuery}</h3></div>
                <div>{this.simpleTable(classes,apiResponse)}</div> 
            </div>
        )
    }
}

Hourly.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(SimpleTable);  
export default withStyles(styles)(Hourly);  
// export default Hourly;