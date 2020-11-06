import React,{Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
    }
    //handle logout to destroy the cookie
    render(){
        //if Cookie is set render Logout Button
        return(
            <div>
                {/* <div class="container-fluid"> */}
                <header>
                    <h1>WeatherCaster</h1>
                </header>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    {/* <div class="navbar-header">
                        <a class="navbar-brand">WeatherCaster</a>
                    </div> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
                                <li className="nav-item active"><NavLink className="nav-link" to="/search/today">Today</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link" to="/search/hourly">Hourly</NavLink></li>
                            </ul>
                        </div>
                {/* </div> */}
            </nav>
        </div>
        )
    }
}

export default Navbar;