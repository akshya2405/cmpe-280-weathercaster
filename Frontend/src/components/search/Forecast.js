import React,{Component, useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import {backendURI} from '../../common/config';


class Forecast extends Component {
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
            response = await axios.get(backendURI+'/weekly/celsius', { params: { CityStateCountry: searchQuery } })
          } else {
            response = await axios.get(backendURI+'/weekly/farenheit', { params: { CityStateCountry: searchQuery } })
          }

        
        this.setState({ apiResponse: response })
    }
    
    componentDidMount() {
        this.callAPI();
    }


    render(){

        //const classes = useStyles();
        const { apiResponse } = this.state;
        const { classes } = this.props;

        const { searchQuery } = this.state;
        var daily_data = []


        if(apiResponse && apiResponse.data && apiResponse.data.daily){
            daily_data = apiResponse.data.daily;
        }
        

          console.log("apiResponse")
          console.log(apiResponse);
          console.log("daily_data")
          console.log(daily_data);

        // const searchQuery = this.state.sessionStorage.getItem("location");

        return(
            <div>
                <p>Forecast</p>
                <div><h3>{searchQuery}</h3></div>

                <LineChart width={1000} height={400} data={daily_data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
                <Line type="monotone" dataKey="wind_speed" stroke="#82ca9d" />
                <Line type="monotone" dataKey="dew_point" stroke="#EF350D" />
                </LineChart>
                
            </div>
        )
    }
}

Forecast.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(SimpleTable);  
export default Forecast;  
// export default Forecast;