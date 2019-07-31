import React, {Component} from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import { graphql, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import './Sidebar.css'

const view = gql`
  query cartView ($id: Int!) {
    cartView (id: $id) {
		item_id
		item_name
		item_quantity
		item_price
    }
  }
`;

const remove = gql`
  mutation addToCart ($token: String!, $item_id: Int!, $modifier: String!) {
    addToCart (token: $token, item_id: $item_id, modifier: $modifier)
  }
`;

class Sidebar extends Component {

	objectify = () => {
		const id = this.props.id
		class Id {
		  constructor (id) {
			this.id = id
		  	}
		}
		return new Id(id)
	}

	render() {
		return(
		<>	
			<div className="d-flex justify-content-start" id='cont'>
				<Row>
					<h5 id='your_cart'>YOUR CART:</h5>
				</Row>
				{this.props.purchase ?
				<Query query={view} variables={this.objectify().id} fetchPolicy="no-cache">
					{({ loading, error, data}) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>You are not signed up!</p>;
						return <CartView data={data} handlePurchase={this.props.handlePurchase}
						closePurchase={this.props.closePurchase} purchase={this.props.purchase}/>;
					}}
				</Query> :
				<Query query={view} variables={this.objectify().id} fetchPolicy="no-cache" pollInterval={200}>
	  				{({ loading, error, data}) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>You are not signed up!</p>;
						return <CartView data={data} handlePurchase={this.props.handlePurchase}
						closePurchase={this.props.closePurchase} purchase={this.props.purchase}/>;
	  				}}
				</Query>}
				<Row>
					{this.props.purchase ? 
					<Button onClick={this.props.closePurchase} id='button'>Back</Button> :
					<Button onClick={this.props.handlePurchase} id='button'>Purchase</Button>}
				</Row>
			</div>	
		</>
		);
	}
}

const Item = class extends Component {

	returnToken = () => {
		const getToken = JSON.parse(localStorage.getItem('jwt'));
		const token = getToken.data.login.response;
		return token;
	};

	render() {

		const data = this.props.data

		return (
			<Container>
    			<Row className='row' id='row1'>
      				<Col className="col-lg-" id='cart_items'>
        				<Col>
        					<p id='items_quantity'>{data.item_quantity}X</p>
        				</Col>
        				<Col>
        					<p id='items_name'>{data.item_name}</p>
        				</Col>
						<Col>
							<p id='items_price'>{data.item_price}$</p>
						</Col>
      				</Col>
					<Col>
					{this.props.purchase ? null : 
					<Mutation mutation={remove} variables={{ 
          				token: this.returnToken(),
          				item_id: data.item_id,
          				modifier: '-'
          				}}>
          				{addToCart => <Button id='button' onClick={addToCart}>Remove</Button>}
        			</Mutation>}
					</Col>
    			</Row>
			</Container>
		)
	}
};

const CartView = class extends Component {
	render() {
		const { data } = this.props;
	  	return (
			<div>
				{data.cartView.map(data => <Item key={ data.item_id } data={ data }
				handlePurchase={this.props.handlePurchase} closePurchase={this.props.closePurchase}
				purchase={this.props.purchase}/>)}
			</div>
	  	);
	}
}

export default graphql(view, remove) (Sidebar);