import React from 'react'
import { Row, Col } from 'react-bootstrap';

import { Link } from 'react-router'

export default class Index extends React.Component {
  static getData(){

  }

  render() {
    return (
      <Row>
        <Col md={6}>
          <h2>Welcome to my demo app.</h2>
          <h3>Check out these links</h3>
          <ul>
            <li><Link to="/localCounter">Counter</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </Col>
      </Row>
    )
  }
}


