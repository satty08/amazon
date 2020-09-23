import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login'
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe('pk_test_51HScaQHS2v49aqM7V9uvyUidTFtfa186KGQKrBPbqxxNzHz9jm04xbvDpseHx1AZxP4wlYMSoLACp88H0idxOtQo000vadshPv');

function App() {

  const[state, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged(authUser => {
      console.log('The user is ', authUser);

      if(authUser) {
        //the user just logged in/ the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      }else{
        //the user is logged out

        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
      <Router>
        <div className="app">
        
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/orders">
              <Header />
              <Orders />
            </Route>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <Route path="/payment">
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>
            <Route path="/">
              <Header />
              {/* Home */}
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
