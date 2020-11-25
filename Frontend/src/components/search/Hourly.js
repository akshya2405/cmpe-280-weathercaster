import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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
  
  let id = 0;
  
function createData(Time,Temperature, Weather_like, Feels_Like_Temp, Wind, Humidity,Precipitation,UV_Index) {
    id += 1;
return { Time,Temperature, Weather_like, Feels_Like_Temp, Wind, Humidity,Precipitation,UV_Index };
}



      
const rows = [
    createData('6 PM', 67, 'Sunny', 'Feels Like 67', '20 mph', '96 %' ,'46', 0),
    createData('7 PM', 68, 'Sunny', 'Feels Like 65', '15 mph', '96 %' ,'46', 0),
    createData('8 PM', 69, 'Cloudy', 'Feels Like 50', '10 mph', '96 %' ,'46', 0),
    createData('9 PM', 70, 'Rainy', 'Feels Like 45', '05 mph', '96 %' ,'46', 0),
    createData('10 PM', 71, 'Sunny', 'Feels Like 40', '30 mph', '96 %' ,'46', 0),

];
  
// const classes = useStyles();

function SimpleTable(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                    <TableCell align="right">Temperature</TableCell>
                    <TableCell align="right">Weather like</TableCell>
                    <TableCell align="right">Feels Like Temp</TableCell>
                    <TableCell align="right">Wind</TableCell>
                    <TableCell align="right">Humidity</TableCell>
                    <TableCell align="right">Precipitation</TableCell>
                    <TableCell align="right">UV Index</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.Time}
                  </TableCell>
                    <TableCell align="right">{row.Temperature}</TableCell>
                    <TableCell align="right">{row.Weather_like}</TableCell>
                    <TableCell align="right">{row.Feels_Like_Temp}</TableCell>
                    <TableCell align="right">{row.Wind}</TableCell>
                    <TableCell align="right">{row.Humidity}</TableCell>
                    <TableCell align="right">{row.Precipitation}</TableCell>
                    <TableCell align="right">{row.UV_Index}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
    

class Hourly extends Component {
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

        //const classes = useStyles();

        return(
            <div>
                <p>Hourly Weather</p>
                {/* <form action={this.search} class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
                SimpleTable(props);
            </div>
        )
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SimpleTable);  
//export default Hourly;