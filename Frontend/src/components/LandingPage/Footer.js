import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="container-fluid" style={{ textAlign: "center", paddingTop: "1rem", margin: "auto", height: "50px" }}>
        <footer>
          <div>Data sourced from <a href="https://openweathermap.org/api">OpenWeatherMap API</a> &nbsp;
                  and &nbsp;
                  <img
              src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
              alt="Powered by Google"
            />
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer;