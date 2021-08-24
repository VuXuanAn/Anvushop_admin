import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Layout from '../../component/Layout/index'
import { makeStyles } from '@material-ui/core/styles';
import { isUserLoggedIn, login } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
        marginTop: '50px'
    },
}));

const SignIn = (props) => {
    const classes = useStyles();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [Error, setError] = useState('');
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)



    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email, password
        }
        dispatch(login(user))
    }



    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }
    return (
        <Layout>
            <Container className={classes.container} maxWidth="xs">
                <form onSubmit={userLogin}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        size="small"
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
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
                                        onChange={(e) => setpassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" fullWidth type="submit" variant="contained">
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Layout>
    );
};

export default SignIn;