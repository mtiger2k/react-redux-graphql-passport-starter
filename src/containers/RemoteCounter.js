import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'react-addons-update'
import { Row, Button } from 'react-bootstrap'

import COUNT_SUBSCRIPTION from '../graphql/CountSubscription.graphql'
import COUNT_QUERY from '../graphql/CountQuery.graphql'
import ADD_COUNT from '../graphql/AddCount.graphql'

class Counter extends React.Component {

  constructor(args) {
    super(args);
      this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
      if (!this.subscription && !nextProps.loading) {
          this.subscription = this.props.subscribeToMore({
              document: COUNT_SUBSCRIPTION,
              variables: {},
              updateQuery: (previousResult, { subscriptionData }) => {
                  let newAmount = subscriptionData.data.countUpdated.amount;
                  return update(previousResult, {
                      count: {
                          amount: {
                              $set: newAmount,
                          },
                      },
                  });
              }
          });
      }
  }

  render() {
    const { loading, count, addCount } = this.props;
    if (loading) {
      return (
        <Row>
          Loading...
        </Row>
      );
    } else {
      return (
        <Row>
          <div>
            Current count, is {count.amount}. This is being stored server-side in the database and using Apollo subscription for real-time updates.
          </div>
          <br />
          <Button bsStyle="primary" onClick={addCount(1)}>
            Click to increase count
          </Button>
        </Row>
      );
    }
  }
}

Counter.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  count: React.PropTypes.object,
  updateCountQuery: React.PropTypes.func,
  addCount: React.PropTypes.func.isRequired,
  subscribeToMore: React.PropTypes.func.isRequired
};

export default compose(
  graphql(COUNT_QUERY, {
    props({data: {loading, count, subscribeToMore}}) {
      return {loading, count, subscribeToMore};
    }
  }),
  graphql(ADD_COUNT, {
    props: ({ ownProps, mutate }) => ({
      addCount(amount) {
        return () => mutate({
          variables: { amount },
          updateQueries: {
            getCount: (prev, { mutationResult }) => {
              const newAmount = mutationResult.data.addCount.amount;
              return update(prev, {
                count: {
                  amount: {
                    $set: newAmount,
                  },
                },
              });
            },
          },
          optimisticResponse: {
            __typename: 'Mutation',
            addCount: {
              __typename: 'Count',
              amount: ownProps.count.amount + 1,
            },
          },
        });
      },
    }),
  })
)(Counter);
