import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from "apollo-link-http";

import HomePage from '../component/HomePage';
import './App.css';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

/*const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      }
    }
  });*/

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

class App extends Component {
 
  render() {
    return(
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={HomePage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
