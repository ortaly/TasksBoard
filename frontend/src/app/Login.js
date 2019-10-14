import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect, useSelector } from 'react-redux';
import { setUser } from '../redux/feature/user/user.actions';
import { userLogin } from '../redux/feature/auth/auth.actions';
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



function Login ({ setUser, userLogin} ) {

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [userCard, setUserCard] = useState({email: '', password: ''});
    const [redirectToBoards, setRedirectToBoards] = useState(false);
    const [redirectToRegister, setRedirectToRegister] = useState(false);

    async function handleClick () {
        const data = await userService.login(userCard);
        setUser(data.user);
        userLogin(data.token);
        setRedirectToBoards(true);
    };

    const handleChange=(e) => {

        const {id, value} = e.target;
        console.log(value);
        console.log({...userCard});
        setUserCard({...userCard, [id]: value})
    };

    const register=() => {
        setRedirectToRegister(true);
    };
    

    if (redirectToBoards) {
        console.log('redirect to boards');
        return <Redirect to='boards'/>;
    }

    if (redirectToRegister) {
        return <Redirect to='register'/>;
    }

    return (
        <div>
            <MuiThemeProvider>
                <div className={Styles.loginControl}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Login
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <form className={Styles.formControl}>
                        <TextField id="email" label="Email"
                            InputProps={{ className: Styles.whiteName }}
                            onChange={handleChange} value={userCard.email} margin="normal" />
                        <br/>
                        <TextField id="password" label="Password" type="password"
                            InputProps={{ className: Styles.whiteName }}
                            onChange={handleChange} value={userCard.password} margin="normal" />
                        <br/>
                    </form>
                    <Button variant="contained" color="primary" style={style} onClick={(event) => handleClick(event)}>Login</Button>
                    <br/><br/>
                    <label>Not Registered Yet? Tegister Now:</label>
                    <br/>
                    <Button variant="contained" color="primary" style={style} onClick={(event) => register(event)}>Register</Button>

                </div>
            </MuiThemeProvider>
        </div>
    );

};

const style = {
    margin: 15,
};

const mapDispatchToProps = {
    setUser,
    userLogin
};

export default connect(
    null,
    mapDispatchToProps
)(Login)

// export default compose(
//     withStyles(Styles),
//     connect(null, mapDispatchToProps)
//  )(Login);