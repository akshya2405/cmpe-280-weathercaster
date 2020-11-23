import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import '../../App.css'
import { Search } from '../svg/svg';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search() {
    this.props.history.push('/search/today');
  }

  render() {
    return (
      <div className="container-fluid">
        <header style={{ fontFamily: "Courier New", height:"50px", paddingTop:"10px", margin:"auto" }}>
          <h1>WeatherCaster</h1>
        </header>
        <div className="center">
          <form>
            <input
              type="text"
              // className="rounded-pill"
              placeholder="Search using city, state or zipcode"
            />
            <button
              type="button"
              className="fa fa-search"
              value="Search"
              onClick={this.search}
            >
              <Search />
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default HomePage;