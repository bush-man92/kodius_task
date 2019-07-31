import React, { Component } from 'react';
import {Form, FormGroup, Label, Input, Button, ButtonGroup} from 'reactstrap';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import './Registration.css';

class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      usernameValid: "",
      emailValid: "",
      passwordValid: "",
      confirmPasswordValid:""
     }
  };

  checkValid = () => {
  	let usernameValid = "";
  	let emailValid = "";
  	let passwordValid = "";
  	let confirmPasswordValid = "";

  	if(!this.state.username) {
  		usernameValid = "Username can't be empty";
  	}
  	if(this.state.password.length < 5) {
  		passwordValid = "Password needs to have more than 5 characters";
  	}
  	if(this.state.password !== this.state.confirmPassword) {
  		confirmPasswordValid = "Password and confirm password don't match!";
  	}
 	if (usernameValid || passwordValid || confirmPasswordValid || emailValid) {
     this.setState({ usernameValid, passwordValid, confirmPasswordValid, emailValid });
     return false;
 	}
  else {
    this.setState({ usernameValid, passwordValid, confirmPasswordValid, emailValid });
    return true;
  }
}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
          email : this.state.email,
          password : this.state.password
        },
      });
      if (token.data.register.response === "Username already taken") {
        var usernameValid = 'Username already taken';
        this.setState({ usernameValid })
      }
      else if (token.data.register.response === "Email already exists") {
        var emailValid = 'Email already exists';
        this.setState({ emailValid })
      }
      else {
        this.props.setId(token.data.register.id)
        this.props.handleToken();
        this.props.closeRegister();
      }
    }}

  render() {
    return (     
          <div className="col-md-8" id='bc-reg'>
            <Form onSubmit={e => this.handleSubmit(e)}>
                <FormGroup>
                  <Label className= 'white' htmlFor="username">Username</Label>
                  <Input 
                  type="text" 
                  name="username" 
                  id="username" 
                  placeholder="Type your username"
                  value={this.state.username}
                  onChange = {e => this.handleChange(e)}  />
                  <div style={{color: "red"}}> {this.state.usernameValid} </div>
                  <Label className= 'white' htmlFor="email">Email</Label>
                  <Input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange = {e => this.handleChange(e)}
                  />
                  <div style={{color: "red"}}> {this.state.emailValid} </div>
                  <Label className= 'white' htmlFor="password"> Password </Label>
                  <Input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange = {e => this.handleChange(e)} />
                  <div style={{color: "red"}}> {this.state.passwordValid} </div>
                  <Label className= 'white' htmlFor="password"> Confirm Password </Label>
                  <Input 
                  type="password" 
                  name="confirmPassword" 
                  id="password1" 
                  placeholder="Confirm your password"
                  value={this.state.confirmPassword}
                  onChange = {e => this.handleChange(e)}
                  />
                  <div style={{color: "red"}}> {this.state.confirmPasswordValid} </div>
                  <ButtonGroup className="positionOfButtons">
                    <Button id="button" color="primary" onClick={this.props.closeRegister} >Login</Button>
                    <Button type="submit" name="submit" id="button" color="primary">Submit</Button>
                    <Button id="button" color="primary" onClick={this.props.handleBack}>Back</Button>
                  </ButtonGroup>
                </FormGroup>
            </Form>

          </div>
    );
  }
}

const registerMutation = gql`
  mutation register($username: String!, $password: String!, $email: String!) {
    register(username : $username, password : $password, email : $email) {
      response
      id
    }
  }
`;

export default graphql(registerMutation)(Registration);