import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCount } from '../actions/counter'

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
      <button onClick={this.handleAdd} > Add </button>
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


