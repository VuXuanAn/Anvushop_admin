import React, { useEffect } from 'react';
import './App.css';
import Home from './container/Home';
import Signin from './container/SignIn'
import Signup from './container/SignUp'
import Product from './container/Product'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './container/HOC/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, isUserLoggedIn } from './actions';
import Categories from './container/Category'
import Order from './container/Order'

const App = () => {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    if (!auth.authenticate) {
      dispatch(getInitialData());
    }
  }, []);
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/products" component={Product} />
        <PrivateRoute exact path="/orders" component={Order} />
        <PrivateRoute exact path="/categories" component={Categories} />


        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>);
}

export default App;
