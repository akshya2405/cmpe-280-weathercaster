import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search() {
    console.log('search component');
  }

  render() {
    return (
      <div>
        <header>
          <h1>WeatherCaster</h1>
          <form action={this.search} className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </header>
      </div>
    )
  }
}

export default Header;