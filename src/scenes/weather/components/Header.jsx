import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    paperHeader: {
        padding: theme.spacing.unit * 2,
        minHeight: "10vh",
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


const Header = (props) => {
    const { classes, apiCall, stateUpdater } = props;
    
    const handleChange = (event) =>{
        const { value } = event.target;
        stateUpdater({ inputLocation : value });
    }
    const handleClick = () =>{
        apiCall();
    }
    return (
        <Grid item xs={12} >
            <Paper className={classes.paperHeader}>
                <Typography variant="h5" color = {"primary"} className={classes.typo}>
                    Hi, To checkout the weather condition out there enter the location below...
                </Typography>
                <TextField
                    id="searchBar"
                    margin="normal"
                    variant="outlined"
                    placeholder="Enter  here..."
                    label="Search places"
                    onChange={(event) => handleChange(event) }
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton className={classes.iconButton} aria-label="Search" onClick = {() => handleClick()}>
                                <SearchIcon/>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                />                                
            </Paper>
        </Grid>
    );
  }
  
  Header.propTypes = {
    classes: PropTypes.object.isRequired,
    stateUpdater: PropTypes.func.isRequired,
    apiCall: PropTypes.func.isRequired,

  };
  
  export default withStyles(styles)(Header);