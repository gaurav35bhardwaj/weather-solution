import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const styles = theme => ({
    paperBody: {
        padding: theme.spacing.unit * 2,
        minHeight: "60vh",
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    paperForcast : {
        padding: theme.spacing.unit * 2,
        marginLeft : theme.spacing.unit * 2,
        marginRight :  theme.spacing.unit * 2, 
    },
    typo :{
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    
});


const Body = (props) => {
    const { 
        classes,
        isError,
        isLoading,
        isData,
        humidity,
        precipitationIn,
        precipitationMm ,
        tempC,
        tempF,
        comment,
        errMsg,
        forecast,
    } = props;
    
    return (
        <Grid item xs={12} >
            <Paper className={classes.paperBody}>
                {isLoading && <CircularProgress className={classes.progress} color="secondary" />}
                {isError && <div>{errMsg}</div>}
                {isData && 
                    <Grid  container item xs={12}>
                        <Grid item xs={3} >
                            <Paper className={classes.paper} >
                                <Typography color = {"primary"} className={classes.typo}>
                                    Today's Weather Forecast...
                                </Typography>
                                <Typography component="div">
                                    <div>
                                        {comment}...
                                    </div>
                                    <div>
                                        Humidity : {humidity}
                                    </div>
                                    <div>
                                        precipitationin : {precipitationIn}
                                    </div>
                                    <div>
                                        precipitationmm : {precipitationMm}
                                    </div>
                                    <div>
                                        Temp(C) : {tempC}
                                    </div>
                                    <div>
                                        Temp(F) : {tempF}
                                    </div>
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper className={classes.paperForcast}>
                                <Typography color = {"primary"} >
                                    Forecast of 4 days...
                                </Typography>
                                {
                                    forecast.map((element,index) => {
                                        return(
                                            <Paper className={classes.paper} key={`paper${index}`}>
                                                <div>
                                                    Date : {element.date}
                                                </div>
                                                <div>
                                                    Max Temp(C) : {element.maxTempC}
                                                </div>
                                                <div>
                                                    Min Temp(C) : {element.minTempC}
                                                </div>
                                                <div>
                                                    Max Temp(F) : {element.maxTempF}
                                                </div>
                                                <div>
                                                    Min Temp(F) : {element.minTempF}
                                                </div>
                                            </Paper>
                                        );
                                    })
                                }
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                                <Paper>
                                    <Typography color = {"primary"} className={classes.typo}>
                                        Graph representation of 4 days forecast ...
                                    </Typography>
                                    <LineChart width={600} height={300} data={forecast} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                        <Line type="monotone" dataKey="maxTempC" stroke="#FF0000" />
                                        <Line type="monotone" dataKey="minTempC" stroke="#386EFF" />
                                        <Line type="monotone" dataKey="precipMm" stroke="#F9EA00" />
                                        <Line type="monotone" dataKey="precipIn" stroke="#30164B" />
                                        <Line type="monotone" dataKey="humidity" stroke="#8EDB8B" />
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                    </LineChart>
                                </Paper>
                        </Grid>
                    </Grid>
                }
            </Paper>
        </Grid>
    );
  }
  
  Body.propTypes = {
    classes: PropTypes.object.isRequired,

  };
  
  export default withStyles(styles)(Body);