import React, { Component } from 'react'
import { Container, Col, Row, Button } from 'reactstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';

import './items.css';

const view = gql`
  query itemsOverview ($name: String) {
    itemsOverview (name: $name) {
      id
      name
      picture
      price
      about
    }
  }
`;

const add = gql`
  mutation addToCart ($token: String!, $item_id: Int!, $modifier: String!) {
    addToCart (token: $token, item_id: $item_id, modifier: $modifier)
  }
`;

const AddButton = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: false,
    }
  }

  handleToken = async () => {
    const getToken = JSON.parse(localStorage.getItem('jwt'))
    if (getToken !== null) {
      this.setState({
        token: true,
      })
    }
    else {
      this.setState({
        token: false,
      })
    }
  }

  componentDidMount() {
    this.handleToken();
  }

  returnToken = () => {
    const getToken = JSON.parse(localStorage.getItem('jwt'));
    const token = getToken.data.login.response || getToken.data.register.response;
    return token;
  };

  render() {
    return (
      <div>
        {this.props.token ?
        <Mutation mutation={add} variables={{ 
          token: this.returnToken(),
          item_id: this.props.item_id,
          modifier: '+'
          }}>
          {addToCart => <Button onClick={addToCart}>Add to cart</Button>}
        </Mutation> :
        <p>You have to signup</p>}
      </div>
    );
  }
}

const Item = class extends Component {
  render() {
    const data = this.props.data
    return (
      <Container id='itemcontainer'>
      <Row className='row' id="item_row">
        <Col className="col-md-" id='item_image'>
          <img src={data.picture} alt="No image"></img>
        </Col>
        <Col className="col-lg-" id='item_col'>
          <Row id='item_name'>
            <h1>{data.name}</h1>
          </Row>
          <Row id='about_item'>
            <p>{data.about}</p>
          </Row>
        </Col>
        <Col className="col-" id='item_price'>
          <h3>PRICE</h3>
          <p>{data.price}$</p>
          <AddButton item_id = { data.id } token = { this.props.token }></AddButton>
        </Col>
      </Row>
      </Container>
    )
  }
}

const ItemsView = class extends Component {
  objectify = () => {
    const search_input = this.props.search_input
    class search_Input {
      constructor (name) {
        this.name = name
      }
    }
    return new search_Input(search_input)
  }
  render() {
    return (
      <div>
        <Query query={view} variables={this.objectify()}>
          {({ loading, error, data, refetch}) => {
            refetch()
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return <div>{data.itemsOverview.map(data => <Item key = {data.id} data = {data} token ={this.props.token}></Item>)}
            </div>;
        }}
        </Query>
      </div>
    );
  }
}

export default graphql(view, add) (ItemsView);