import React from 'react'
import { Row, Col } from 'react-bootstrap';

export default class About extends React.Component {
  render() {
    return (
      <Row>
        <Col md={6}>
          <h2>About</h2>
          <p>
            About page.
          </p>
        </Col>
      </Row>
    )
  }
}


