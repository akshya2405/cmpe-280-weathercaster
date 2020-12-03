import React,{Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import Footer from '../LandingPage/Footer';
import { API_URL } from '../../config';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

  const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));

  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
  });
  
  let id = 0;
  
function createData(Time,Temperature, Weather_like, Feels_Like_Temp, Wind, Humidity,Precipitation,UV_Index) {
    id += 1;
return { Time,Temperature, Weather_like, Feels_Like_Temp, Wind, Humidity,Precipitation,UV_Index };
}



      
// const rows = [
//     createData('6 PM', 67, 'Sunny', 'Feels Like 67', '20 mph', '96 %' ,'46', 0),
//     createData('7 PM', 68, 'Sunny', 'Feels Like 65', '15 mph', '96 %' ,'46', 0),
//     createData('8 PM', 69, 'Cloudy', 'Feels Like 50', '10 mph', '96 %' ,'46', 0),
//     createData('9 PM', 70, 'Rainy', 'Feels Like 45', '05 mph', '96 %' ,'46', 0),
//     createData('10 PM', 71, 'Sunny', 'Feels Like 40', '30 mph', '96 %' ,'46', 0),

// ];
  
// const classes = useStyles();


    

class Hourly extends Component {
    constructor(props){
        super(props);
        // this.search = this.search.bind(this);
        this.state = { 
            apiResponse: "",
            searchQuery : sessionStorage.getItem("location"),
            units       : sessionStorage.getItem("units"),
            page        : 0,
            rowsPerPage : 5
        };
        

    }

    // search() {
    //     const { dispatch, history } = this.props;
    //     history.push('/search/today');
    //     console.log('search component');
    // }
    
    async callAPI() {
        // fetch("http://localhost:3001/hourly/celsius?CityStateCountry=London")
        //     .then(res => res.text())
        //     .then(res => this.setState({ apiResponse: res }));

        const { searchQuery } = this.state
        const { units  } = this.state
        const { page  } = this.state
        const { rowsPerPage  } = this.state
        let response;

        if (units === "celsius") {
            response = await axios.get(`${API_URL}hourly/celsius`, { params: { CityStateCountry: searchQuery } })
          } else {
            response = await axios.get(`${API_URL}hourly/farenheit`, { params: { CityStateCountry: searchQuery } })
          }

        console.log(response.data);
        this.setState({ apiResponse: response })
        
    }
    
    componentDidMount() {
        this.callAPI();
    }

    simpleTable(classes,resp) {
        // const { classes } = props;
        
        let data=resp.data;
        
        if(data && data.hourly){
            console.log(data,data.hourly,typeof(resp.data),"response structure")

            var hourly = data.hourly

            // classes = useStyles2();
            const { page, rowsPerPage }  = this.state;
            //const newPage = this.state;
        
            const emptyRows = rowsPerPage - Math.min(rowsPerPage, hourly.length - page * rowsPerPage);
        
            const handleChangePage = (event, newPage) => {
            this.setState({ page: newPage })
            };
        
            const handleChangeRowsPerPage = (event) => {
            this.setState({ rowsPerPage: parseInt(event.target.value, 10)  })
            this.setState({ page: 0 })
            };

            return ( 
                <Paper className={classes.root}>
                     <div><h5>{data.timezone}</h5></div> 
                     <div><h6>As of {moment(new Date()).tz(data.timezone).format("LT")} on {moment(new Date()).tz(data.timezone).format("MM/DD/YYYY")}</h6></div>
                <div className="d-flex justify-content-center" style={{ border: "solid black", width: "90%", margin: "auto" }}> 
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                                <TableCell align="right">Temp</TableCell>
                                <TableCell align="right">Weather Condition</TableCell>
                                {/* <TableCell align="right"></TableCell> */}
                                <TableCell align="right">Feels Like</TableCell>
                                <TableCell align="right">Wind</TableCell>
                                <TableCell align="right">Humidity</TableCell>
                                <TableCell align="right">Dew Point</TableCell>
                                <TableCell align="right">UV Index</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? hourly.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : hourly
                            ).map((row) => (    
                                <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {moment.unix(row.dt, "hh:mm A").tz(data.timezone).format("hh:mm A")}
                                </TableCell>
                                    <TableCell align="right"><h3>{Math.trunc(row.temp)}&deg;</h3></TableCell>
                                    {/* <TableCell align="right">{row.weather[0].main}</TableCell> */}
                                    <TableCell align="right">
                                    <img src={"http://openweathermap.org/img/wn/" + row.weather[0].icon + "@2x.png"}></img>
                                    <p>{row.weather[0].description}</p>
                                    </TableCell>
                                    <TableCell align="right">{Math.trunc(row.feels_like)}&deg;</TableCell>
                                    <TableCell align="right">{Math.trunc(row.wind_speed)}</TableCell>
                                    <TableCell align="right">{row.humidity}&#37;</TableCell>
                                    <TableCell align="right">{row.dew_point}</TableCell>
                                    <TableCell align="right">{row.uvi}</TableCell> 
                                </TableRow>
                        ))}

                        {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                        )}
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={hourly.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>    
                </div>
                </Paper> 
            );
        }
    }


    render(){

        //const classes = useStyles();
        const { apiResponse } = this.state;
        const { classes } = this.props;

        const { searchQuery } = this.state;


        // const searchQuery = this.state.sessionStorage.getItem("location");

        return(
            <div style={{paddingLeft:"2rem"}}>
                <p>Hourly Weather</p>
                {/* <p className="App-intro">;{apiResponse}</p> */}
                <div><h3>{searchQuery}</h3></div>
                <div>{this.simpleTable(classes,apiResponse)}</div> 
                <Footer />
            </div>
        )
    }
}

Hourly.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(SimpleTable);  
export default withStyles(styles)(Hourly);  
// export default Hourly;