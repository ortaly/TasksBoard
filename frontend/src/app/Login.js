import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setUser } from '../actions/user.actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import userService from '../services/user';
import  { Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../assets/override-styles';
import TextField from '@material-ui/core/TextField';



class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            redirectToBoards: false,
            redirectToRegister: false
        }  
        
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(event){
        const data = await userService.login(this.state.email, this.state.password);
        await this.props.setUser(data.user);
        localStorage.setItem('userToken',  data.token);
        console.log("Welcome " + data.user.name);
        this.setState({redirectToBoards : true});
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    register = event => {
        this.setState({redirectToRegister : true});
    }
    
    render() {
        if (this.state.redirectToBoards) {
            console.log('redirect to boards');
            return <Redirect to='/boards'/>;
        }

        if (this.state.redirectToRegister) {
            return <Redirect to='/register'/>;
        }

        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6" color="inherit">
                                    Login
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <form className={this.props.classes.formControl}>
                            <TextField id="email" label="Email"
                                InputProps={{ className: this.props.classes.whiteName }}
                                onChange={this.handleChange('email')} value={this.state.email} margin="normal" />
                            <br/>
                            <TextField id="pass" label="Password" type="password"
                                InputProps={{ className: this.props.classes.whiteName }}
                                onChange={this.handleChange('password')} value={this.state.password} margin="normal" />
                            <br/>
                        </form>
                        <Button variant="contained" color="primary" style={style} onClick={(event) => this.handleClick(event)}>Login</Button>
                        <br/><br/>
                        <label>Not Registered Yet? Tegister Now:</label>
                        <br/>
                        <Button variant="contained" color="primary" style={style} onClick={(event) => this.register(event)}>Register</Button>

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};


export default compose(
    withStyles(Styles),
    connect(null, {setUser})
 )(Login);