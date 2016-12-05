import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCount } from '../actions/counter'
import { Button } from 'react-bootstrap'

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  handleAdd = () => {
    const { dispatch } = this.props;
    dispatch(addCount());
  }

  render() {
    const { count } = this.props;
    return (
      <div className="counter">
      <h2>Counter: {count}</h2>
      <Button bsStyle="primary" onClick={this.handleAdd} > Add </Button>
      </div>
   );
  }
}

const mapStateToProps = (state) => {
    return {
        count: state.counter.count
    };
};

export default connect(mapStateToProps)(Counter)


