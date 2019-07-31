import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {Form, FormGroup, Label, Input, Button, ButtonGroup} from 'reactstrap'; 
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Registration from './Registration';
import './Login.css';

class Login extends Component {
	constructor(props) {
  	super(props);
  	this.state = {
  		username: '',
  		password: '',
      usernameValid: '',
      passwordValid: '',
      register: false,
  	}
	};

  checkValid = () => {
    let usernameValid = "";
    let passwordValid = "";

    if(!this.state.username) {
      usernameValid = "Username can't be empty";
    }
    if(this.state.password.length < 5) {
      passwordValid = "Password needs to have more than 5 characters";
    }

  if (usernameValid || passwordValid) {
    this.setState({ usernameValid, passwordValid});
    return false;
  }
  else {
    this.setState({ usernameValid, passwordValid});
    return true;
  }
}

	handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

	handleSubmit = async (e) => {
    e.preventDefault();
    const check = await this.checkValid();    
    if(!check) {  
    }
    else {
      var token = await this.props.mutate({
        variables: {
          username : this.state.username,
          password : this.state.password
        },
      });
      if (token.data.login.response === "There is no user with that username") {
        var usernameValid = "There is no user with that username";
        this.setState({ usernameValid })
      }
      else if (token.data.login.response === "Incorrect password") {
        var passwordValid = 'Incorrect password';
        this.setState({ passwordValid })
      }
      else {
        localStorage.setItem('jwt', JSON.stringify(token));
        this.props.setId(token.data.login.id)
        this.props.handleToken();
        this.props.handleBack();
      }
    }
  };

  handleRegister = () => {
    this.setState({
      register: true,
    })
  }

  closeRegister = () => {
    this.setState({
      register: false,
    })
  }

 render() {
    return (
      <div className="col-md-8" id='bc-login'>
        <Form onSubmit={e => this.handleSubmit(e)}>
          {this.state.register ? <Registration handleBack={this.props.handleBack} closeRegister={this.closeRegister}
            handleToken={this.props.handleToken} setId={this.props.setId}/> :
          <FormGroup>
            <Label className= 'white' htmlFor="username">Username</Label>
              <Input 
                type="text" 
                name="username" 
                id="username" 
                placeholder="Type your username"
                value={this.state.username}
                onChange = {e => this.handleChange(e)} />
                <div style={{color: "red"}}> {this.state.usernameValid} </div>
            <Label className= 'white' htmlFor="password">Password</Label>
              <Input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Type your password"
                value={this.state.password}
                onChange = {e => this.handleChange(e)} />
                <div style={{color: "red"}}> {this.state.passwordValid} </div>
              <ButtonGroup className="positionOfButtons">
                <Button type="submit" name="submit" id="button" color="primary">Submit</Button>
                <Button id="button" color="primary" onClick={this.handleRegister}>Register</Button>
                <Button id="button" color="primary" onClick={this.closeRegister && this.props.handleBack}>Back</Button>
              </ButtonGroup>
          </FormGroup>
          }
        </Form>
      </div>      
    );
  }
}

const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username : $username, password : $password) {
      response
      id
    }
  }
`;

export default graphql(loginMutation) (withRouter(Login));

