import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Layout from '../../component/Layout/index'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
        marginTop: '50px'
    },
}));

const SignUp = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');



    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    const register = (e) => {
        e.preventDefault()
        const user = {
            lastName, firstName, email, password
        }
        dispatch(signup(user))
    }

    if (user.loading) {
        return <h1>loading...</h1>
    }
    return (
        <Layout>
            <Container className={classes.container} maxWidth="xs">
                <form onSubmit={register}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        size="small"
                                        variant="outlined"
                                        autoComplete='false'
                                        value={firstName}
                                        onChange={e => setfirstName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="LastName"
                                        size="small"
                                        variant="outlined"
                                        autoComplete='false'
                                        value={lastName}
                                        onChange={e => setlastName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        size="small"
                                        variant="outlined"
                                        autoComplete='false'
                                        value={email}
                                        onChange={e => setemail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        size="small"
                                        type="password"
                                        variant="outlined"
                                        value={password}
                                        onChange={e => setpassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" fullWidth type="submit" variant="contained">
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Layout>
    );
};

export default SignUp;