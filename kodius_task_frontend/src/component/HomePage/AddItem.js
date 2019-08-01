import React, { Component } from 'react';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Container, Button, Input, FormGroup, Label } from 'reactstrap';

const addItem = gql`
  mutation addItem($name: String!, $price: Int!, $picture: String, $about: String) {
    addItem(name: $name, price: $price, picture: $picture, about: $about )
  }
`;

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          price: 0,
          picture: 'no_image',
          about: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return(
            <Container>
                <FormGroup>
                    <Label className= 'white' htmlFor='Name'>Name</Label>
                        <Input 
                            type="text"
                            name="name"
                            placeholder="Type name"
                            value = {this.state.name}
                            onChange = {e => this.handleChange(e)} />
                    <Label className= 'white' >Price</Label>
                        <Input 
                            type="text"
                            name="price" 
                            placeholder="Type price"
                            value = {this.state.price}
                            onChange = {e => this.handleChange(e)} />
                    <Label className= 'white' >About</Label>
                        <Input 
                            type="text" 
                            name="about"
                            placeholder="Type description"
                            value = {this.state.about}
                            onChange = {e => this.handleChange(e)} />
                    <Mutation mutation={addItem} variables={{ 
                            name: this.state.name,
                            price: parseInt(this.state.price),
                            picture: this.state.picture,
                            about: this.state.about,
          				}}>
          				{(addItem) => {
                              return <Button id='button' onClick={addItem}>Add Item</Button>}}
        			</Mutation>
                    <Button id='button' onClick={this.props.closeAddItem}>Back</Button>
                </FormGroup>
            </Container>
        )
    }
}

export default graphql(addItem) (AddItem)