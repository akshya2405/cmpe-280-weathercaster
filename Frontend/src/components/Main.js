import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Navbar from './LandingPage/Navbar';
import HomePage from './LandingPage/HomePage';
import Today from './search/Today';
import Hourly from './search/Hourly';
import Weekend from './search/Weekend';
import Weekly from './search/Weekly';
import Monthly from './search/Monthly';
import Forecast from './search/Forecast';
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={Navbar} />
        <Route path="/home" component={HomePage} />
        <Route path="/search/today" component={Today} />
        <Route path="/search/hourly" component={Hourly} />
        <Route path="/search/weekend" component={Weekend} />
        <Route path="/search/weekly" component={Weekly} />
        {/* <Route path="/search/Monthly" component={Monthly}/> */}
        <Route path="/search/forecast" component={Forecast} />
      </div>
    )
  }
}
//Export The Main Component
export default Main;