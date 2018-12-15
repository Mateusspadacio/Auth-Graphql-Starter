import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/CurrentUser';
import logoutMutation from '../mutations/Logout';

class Header extends Component {

    onLogout() {
        this.props.mutate({
            refetchQueries: [{ query }]
        });
    }

    renderButtons() {
        const { loading, user } = this.props.data;

        if (loading) { return <div />; }

        if (user) {
            return (
                <li>
                    <a onClick={this.onLogout.bind(this)}>Logout</a>
                </li>
            );
        } else {
            return (
                <div>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </div>
            )
        }
    }

    render() {
        console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">
                        Home
                    </Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default compose(
    graphql(query),
    graphql(logoutMutation)
)(Header)
