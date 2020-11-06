import React,{Component} from 'react';

class Today extends Component {
    constructor(props){
        super(props);
        // this.search = this.search.bind(this);
    }

    // search() {
    //     const { dispatch, history } = this.props;
    //     history.push('/search/today');
    //     console.log('search component');
    // }

    render(){
        return(
            <div>
                <p>This is the Today Page</p>
                {/* <form action={this.search} class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
            </div>
        )
    }
}

export default Today;