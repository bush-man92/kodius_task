import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Container, Row, Button, ButtonGroup, Form, Input } from 'reactstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import './buttons.css';
import Login from '../Signup/Login';
import Sidebar from '../Sidebar/Sidebar'
import ItemsView from './ItemsView';
import PurchasePage from '../PurchasePage/purchase';

const logoutMutation = gql`
  mutation logout($logged_token: String!) {
    logout(logged_token: $logged_token)
  }
`;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      sidebar: false,
      token: false,
      id: null,
      search: false,
      search_input: "",
      purchase: false
    }
  }
  
  handleSignup = () => {
    this.setState({
      signup: true,
    });
  }
  handleBack = () => {
    this.setState({
      signup: false,
    })
  }

  handleSidebar = () => {
    this.setState({
      sidebar: true,
    });
  }
  closeSidebar = () => {
    this.setState({
      sidebar: false,
    })
  }
  setId = (num) => {
    this.setState({
      id: num
    })
  }
  handleToken = () => {
    const getToken = JSON.parse(localStorage.getItem('jwt'))
    if (getToken !== null) {
      this.setState({
        token: true,
      })
      this.setId({
        id: getToken.data.login.id
      })
    }
    else {
      this.setState({
        token: false,
      })
    }
  }
  handleSearch = async () => {
    this.setState({
      search: true,
    })
  }
  closeSearch = () => {
    this.setState({
      search: false,
    })
  }
	handleKeyPress = async (e) => {
		if(e.key === "Enter") {
			this.handleSearch()
    }
  }
  handlePurchase = () => {
    this.setState({
      purchase: true,
    })
  }
  closePurchase = () => {
    this.setState({
      purchase: false,
    })
  }

  componentDidMount() {
    this.handleToken();
  }

  handleLogout = async () => {
    const logged_token = JSON.parse(localStorage.getItem('jwt'));
		await this.props.mutate( {
			variables: {
				logged_token: logged_token.data.login.response
				}
			}
    )
    localStorage.removeItem('jwt');
    this.setState({
      token: false,
    })
  }

  render() {
    const particleOptions= {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 1000,
          }
        },
        "color": {
          "value": "random",
        },
      },
    };
    return(
      <>
        <Particles className='particles' params={particleOptions} />
        {this.state.purchase ? <PurchasePage id={this.state.id} handlePurchase={this.handlePurchase}
            closePurchase={this.closePurchase} purchase={this.state.purchase}></PurchasePage> :
        <div>
          {this.state.signup ? <Login handleBack={this.handleBack} handleToken={this.handleToken} setId={this.setId} /> :
          <Container>
            {this.state.sidebar ? <Sidebar id={this.state.id} handlePurchase={this.handlePurchase}
            closePurchase={this.closePurchase} purchase={this.state.purchase} token={this.state.token}/> : null}
            <Row>
              <ButtonGroup md= 'auto' className="positionOfButtons">
                <Form>
                  <Input
                    id = 'button'
                    placeholder="Search for..."
                    value={this.state.search_input}
                    onChange={e => this.setState( {search_input: e.target.value} )}
							      onKeyPress={this.handleKeyPress}
                  />
                </Form>
                <Button id='button' onClick={this.handleSearch}>Search</Button>
                {this.state.sidebar ?
                  <Button id='button' onClick={this.closeSidebar}>Close</Button> :
                  <Button id='button' onClick={this.handleSidebar}>Cart</Button>}
                {this.state.token ?
                  <Button id='button' onClick={this.handleLogout}>Signout</Button>:
                  <Button id='button' onClick={this.handleSignup}>Signup</Button>}
              </ButtonGroup>
            </Row>
            <ItemsView id={this.state.id} search={this.state.search} search_input = {this.state.search_input} token={this.state.token}></ItemsView>
          </Container> }
        </div>}
      </>
    );
  }
}

export default graphql(logoutMutation) (HomePage);