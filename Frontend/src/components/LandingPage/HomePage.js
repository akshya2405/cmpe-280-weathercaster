import React,{Component} from 'react';
// import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
    }

    search() {
        this.props.history.push('/search/today');
    }

    render(){
        return(
            <div>
                <header>
                    <h1>WeatherCaster</h1>
                </header>
                <div className="center">
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <input className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.search} value="Search" />
                    </form>
                </div>
            </div>
        )
    }
}

export default HomePage;