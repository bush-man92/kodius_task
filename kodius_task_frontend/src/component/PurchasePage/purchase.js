import React, { Component } from 'react';
import { Container, Row, Button, FormGroup, Input, Label, Form } from 'reactstrap';
import { graphql, Mutation} from 'react-apollo';
import gql from 'graphql-tag';

import Sidebar from '../Sidebar/Sidebar';

const createPurchase = gql`
  mutation createPurchase ($email: String!, $address: String!, $security_number: String!, $credit_card: String!, $promotion: String) {
    createPurchase (email: $email, address: $address, security_number: $security_number, credit_card: $credit_card, promotion: $promotion) {
        item_name
        item_quantity
        item_price
		total_price
		discount
    }
  }
`;

class PurchasePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
          email: '',
          address: '',
          credit_card: '',
          security_number: '',
          promotion: '',
      }
    }
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };

    render() {
        return (
            <Container>
                <Row>
                    <h1>PURCHASE</h1>
                </Row>
                <Sidebar id={this.props.id} handlePurchase={this.props.handlePurchase}
                closePurchase={this.props.closePurchase} purchase={this.props.purchase}></Sidebar>
                <Form>
                <FormGroup>
                    <Label className= 'white' htmlFor='Email'>Email</Label>
                        <Input 
                            type="email"
                            name="email"
                            placeholder="Type your email"
                            value = {this.state.email}
                            onChange = {e => this.handleChange(e)} />
                    <Label className= 'white' >Address</Label>
                        <Input 
                            type="text"
                            name="address" 
                            placeholder="Type your address"
                            value = {this.state.address}
                            onChange = {e => this.handleChange(e)} />
                    <Label className= 'white' >Credit Card</Label>
                        <Input 
                            type="text" 
                            name="credit_card"
                            placeholder="Type your credit card number"
                            value = {this.state.credit_card}
                            onChange = {e => this.handleChange(e)} />
                    <Label className= 'white' >Security number</Label>
                        <Input 
                            type="text" 
                            name="security_number"
                            placeholder="Type your security number"
                            value = {this.state.security_number}
                            onChange = {e => this.handleChange(e)} />
                    <Label className= 'white' >Promotion</Label>
                        <Input 
                            type="text"
                            name="promotion"
                            placeholder="Type your promotion"
                            value = {this.state.promotion}
                            onChange = {e => this.handleChange(e)} />
                    <Mutation mutation={createPurchase} variables={{ 
                            email: this.state.email,
                            address: this.state.address,
                            security_number: this.state.security_number,
                            credit_card: this.state.credit_card,
                            promotion: this.state.promotion
          				}}>
          				{createPurchase => <Button onClick={createPurchase}>Purchase</Button>}
        			</Mutation>}
                </FormGroup>
                </Form>
            </Container>
        )
    }
}

export default graphql(createPurchase) (PurchasePage)