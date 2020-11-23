import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search } from '../svg/svg';

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  //handle logout to destroy the cookie
  render() {
    //if Cookie is set render Logout Button
    return (
      <div>
        <div className="container-fluid">
          <div style={{ height: "60px", paddingTop: "15px", paddingBottom: "15px", textAlign: "right", fontFamily: "Courier New", width: "70%", float: "left", margin: "auto" }} >
            <h1>WeatherCaster</h1>
          </div>
          <div style={{ height: "60px", paddingBottom: "15px", width: "30%", textAlign: "right", float: "right" }}>
            <form>
              <input
                type="text"
                id="navbar-input"
                placeholder="Search using city, state or zipcode"
              />
              <button
                type="button"
                id="navbar-button"
                className="fa fa-search"
                value="Search"
                onClick={this.search}
              >
                <Search />
              </button>
            </form>
          </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#c0f2fa" }} >
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{textDecoration: "none"}}>
            <ul className="navbar nav">
              <li className="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
              <li className="nav-item active"><NavLink className="nav-link" to="/search/today">Today</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/search/hourly">Hourly</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/search/10Day">10 Day</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/search/weekend">Weekend</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/search/monthly">Monthly</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/search/forecast">Forecast</NavLink></li>
              <li class="nav-item">
                <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-info">&#x2103;</button>
                  <button type="button" class="btn btn-info">&#x2109;</button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;