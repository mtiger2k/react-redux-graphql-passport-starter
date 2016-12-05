import React from 'react';
import { connect } from 'react-redux';
import { redirectToLoginWithMessage } from '../actions/auth';

const mapStateToProps = (state) => ({
    loading: state.user.loading,
    currentUser: state.user.currentUser
});
const mapDispatchToProps = {
    redirectToLoginWithMessage
};

const privateRoute = (Wrapped) => connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {

    componentDidMount() {
        this.redirectIfNotLogged(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.redirectIfNotLogged(nextProps);
    }

    redirectIfNotLogged(props) {
        const {loading, currentUser} = props;
        if (!loading && !currentUser) {
            this.props.redirectToLoginWithMessage();
        }
    }

    render() {
        const {loading, currentUser} = this.props;
        if (loading || !currentUser) {
            return (
                <div>Loading...</div>
            );
        }

        return <Wrapped {...this.props} />;
    }
});

export default privateRoute;
