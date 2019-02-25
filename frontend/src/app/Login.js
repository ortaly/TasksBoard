import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { setUser } from '../actions/user.actions';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';



class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            redirect: false
        }  
        
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(event){
        const response = await axios.post('http://localhost:3000/user/login', {"email": this.state.email, "password": this.state.password});
        await this.props.setUser(response.data.user);
        localStorage.setItem('userToken',  response.data.token);
        console.log("Welcome " + response.data.user.name);
        this.setState({redirect : true});
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to='/boards'/>;
          }

        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Login"/>
                        <TextField hintText="Enter your Email" floatingLabelText="email" 
                            onChange = {(event,newValue) => this.setState({email:newValue})} />
                        <br/>
                        <TextField type="password" hintText="Enter your Password" floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})} />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default connect(null, {setUser})(Login)