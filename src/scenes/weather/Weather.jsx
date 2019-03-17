import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Header, Body } from './components';

const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: "90vh",
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginTop: '5vh',
        marginBottom: '5vh',
    },
});

class Weather extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            inputLocation : '',
            isError: false,
            isLoading: false,
            isData: false,
            humidity : '',
            precipitationIn : '',
            precipitationMm : '',
            tempC : '',
            tempF : '',
            comment : '',
            errMsg : '',
            forecast: [],

        }
    }

    stateUpdater = (updatedState) => {
        this.setState({ ...updatedState });
    };

    apiCall = () =>{
        const { inputLocation } = this.state;
        this.setState({
            isError: false,
            isLoading: true,
            isData: false,
        })
        fetch(`http://api.apixu.com/v1/forecast.json?key=f2fa2fd47c314a129f562342191603&q=${inputLocation}&days=4`)
        .then(response => response.json())
        .then((data) => {
            if ('error' in data){
                const { error } = data; 
                const obj = {
                    errMsg : error.message,
                    isError: true,
                    isLoading: false,
                    isData: false,
                }
                this.setState (obj);
            }
            else{
                const { current, forecast } = data;
                const { humidity, precip_in, precip_mm, temp_c, temp_f } = current;
                const { text } = current.condition;
                const { forecastday } = forecast;
                const forecastArray = [];
                forecastday.map(element => {
                    const forecastObj = {
                        date : element.date,
                        maxTempC : element.day.maxtemp_c,
                        maxTempF : element.day.maxtemp_f,
                        minTempC : element.day.mintemp_c,
                        minTempF : element.day.mintemp_f,
                        precipMm : element.day.totalprecip_mm,
                        precipIn : element.day.totalprecip_in,
                        humidity : element.day.avghumidity,
                    };
                    forecastArray.push(forecastObj);
                    return null;
                })

                const obj = {
                    humidity,
                    precipitationIn : precip_in,
                    precipitationMm : precip_mm,
                    tempC : temp_c,
                    tempF : temp_f,
                    comment : text,
                    isError: false,
                    isLoading: false,
                    isData: true,
                    errMsg : '',
                    forecast : forecastArray,
                }
                this.setState (obj);
            }
            
        })
        .catch(error =>   {
            console.log('Error -->>',error);
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Header stateUpdater={this.stateUpdater} apiCall={this.apiCall} />
                    <Body {...this.state} />
                </Grid>
            </div>
        );
    }

}

Weather.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Weather);