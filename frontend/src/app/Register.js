import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../assets/override-styles';
import  { Redirect } from 'react-router-dom';
import { createUser } from '../redux/feature/user/user.actions';
import { userLogin } from '../redux/feature/auth/auth.actions';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            firstName:'',
            lastName: '',
            email:'',
            password:'',
            repeatPassword: '',
            PasswordErrorText: ''
        }
    }

    componentDidMount = () => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    };

    handleSubmit = async() => {
        this.props.createUser({
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            email: this.state.email, 
            password: this.state.password
        });
        
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div  className={this.props.classes.registerControl}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6" color="inherit">
                                    Register
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <ValidatorForm onSubmit={(event) => this.handleSubmit(event)}>
                            <TextValidator label="First Name" InputProps={{ className: this.props.classes.whiteName }}
                                onChange={this.handleChange('firstName')} 
                                validators={['required']} errorMessages={['this field is required']} value={this.state.firstName}/>
                            <br/>
                            <TextValidator label="Last Name" InputProps={{ className: this.props.classes.whiteName }}
                                onChange={this.handleChange('lastName')} 
                                validators={['required']} errorMessages={['this field is required']} value={this.state.lastName} />
                            <br/>
                            <TextValidator label="Email" InputProps={{ className: this.props.classes.whiteName }}
                                onChange={this.handleChange('email')} validators={['required', 'isEmail']} 
                                errorMessages={['this field is required', 'email is not valid']} value={this.state.email}/>
                            <br/>
                            <TextValidator label="Password" InputProps={{ className: this.props.classes.whiteName }}
                                onChange={this.handleChange('password')} type="password"
                                validators={['required']} errorMessages={['this field is required']} value={this.state.password} />
                            <br/>
                            <TextValidator label="Repeat password" InputProps={{ className: this.props.classes.whiteName }}
                                onChange={this.handleChange('repeatPassword')} type="password" value={this.state.repeatPassword}
                                validators={['isPasswordMatch', 'required']} errorMessages={['password mismatch', 'this field is required']} />
                            <br/><br/>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        
                        </ValidatorForm>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapDispatchToProps = {
    userLogin,
    createUser
};

export default compose(
    withStyles(Styles),
    connect(null, mapDispatchToProps)
 )(Register);