import React, { Component } from 'react';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Container, Button, Input, FormGroup, Label } from 'reactstrap';

const addCupon = gql`
  mutation createCupon($discount: Int!, $cupon_password: String!, $modifier: String!) {
    createCupon(discount: $discount, cupon_password: $cupon_password, modifier: $modifier)
  }
`;

class AddCupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
          discount: 0,
          cupon_password: '',
          modifier: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return(
            <Container>
                <FormGroup>
                    <Label className= 'white' htmlFor='Name'>Disount (INTEGAR)</Label>
                        <Input 
                            type="text"
                            name="discount"
                            placeholder="Type INT discount"
                            value = {this.state.discount}
                            onChange = {e => this.handleChange(e)} />
                    <Label className= 'white' >Password</Label>
                        <Input 
                            type="text"
                            name="cupon_password" 
                            placeholder="Type cupon password"
                            value = {this.state.cupon_password}
                            onChange = {e => this.handleChange(e)} />
                    <Label className= 'white' >Modifier(% or -)</Label>
                        <Input 
                            type="text" 
                            name="modifier"
                            placeholder="Type % or -"
                            value = {this.state.modifier}
                            onChange = {e => this.handleChange(e)} />
                    <Mutation mutation={addCupon} variables={{ 
                            discount: parseInt(this.state.discount),
                            cupon_password: this.state.cupon_password,
                            modifier: this.state.modifier,
          				}}>
          				{(addCupon) => {
                              return <Button id='button' onClick={addCupon}>Add Cupon</Button>}}
        			</Mutation>
                    <Button id='button' onClick={this.props.closeAddCupon}>Back</Button>
                </FormGroup>
            </Container>
        )
    }
}

export default graphql(addCupon) (AddCupon)