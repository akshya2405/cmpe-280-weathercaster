import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search } from '../svg/svg';

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      celsius: false,
      farenheit: true,
    }
    this.search = this.search.bind(this);
  }

  search = (e) => {
    if (this.state.searchString) {
      sessionStorage.setItem("location", this.state.searchString)
      this.props.history.push(this.props.location.pathname)
    } else {
      // setError("Please enter a location");
    }
  }

  reloadPage = (e) => {
    sessionStorage.setItem("units", e.target.id);
    this.props.history.push(this.props.location.pathname);
  }

  render() {
    if (sessionStorage.getItem("units") === 'celsius') {
      this.state.celsius = true;
      this.state.farenheit = false;
    } else {
      this.state.celsius = false;
      this.state.farenheit = true;
    }
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
                onChange={(e) => this.setState({searchString: e.target.value})}
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
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#c0f2fa" }} >
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{textDecoration: "none"}}>
            <ul className="nav nav-pills">
              <li className="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/search/today">Today</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/search/hourly">Hourly</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/search/10Day">10 Day</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/search/weekend">Weekend</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/search/monthly">Monthly</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/search/forecast">Forecast</NavLink></li>
              <li className="nav-item">
                <div className="btn-group btn-group-lg" role="group" aria-label="Temp unit">
                  <button type="button" id="celsius" className="btn btn-info" disabled={this.state.celsius} onClick={this.reloadPage}>&#x2103;</button>
                  <button type="button" id="farenheit" className="btn btn-info" disabled={this.state.farenheit} onClick={this.reloadPage}>&#x2109;</button>
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