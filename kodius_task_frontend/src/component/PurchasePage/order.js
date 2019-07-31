import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap'

import '../Signup/Login.css'

class Order extends Component {
    
    render() {
        const data = this.props.data
        return(
            <Container>
                <Row><p>ORDER</p></Row>
                <div>{data.data.createPurchase.map(data => <Item key = {data.item_id} data = {data} token ={this.props.token}></Item>)}
                </div>
                <Row><h1>DISCOUNT: {data.data.createPurchase[0].cupon_password}</h1></Row>
                <Row><h1>TOTAL COST: {data.data.createPurchase[0].total_price}$</h1></Row>
                <Button id='button' onClick={this.props.closeOrder && this.props.closePurchase}>Confirm</Button>
            </Container>
        )
    }
}

const Item = class extends Component {
    render() {
      const data = this.props.data
      return (
        <Container>
        <Row className='row' id='your_cart'>
            <Col>
                <p>{data.item_quantity}X</p>
            </Col>
            <Col>
                <p>{data.item_name}</p>
            </Col>
            <Col>
                <p>{data.item_price}$</p>
            </Col>
        </Row>
        </Container>
      )
    }
}

export default Order