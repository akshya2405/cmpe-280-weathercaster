import React,{Component} from 'react';

class Footer extends Component {
    render(){
        return(
            <div style={{textAlign: "center"}}>
                <footer>
              <div>Data sourced from <a href="https://openweathermap.org/api">OpenWeatherMap API</a></div>
                </footer>
        </div>
        )
    }
}

export default Footer;