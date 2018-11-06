import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: []
		};
	}

	componentWillUpdate(nextProps) {
		if (!this.props.data.user && nextProps.data.user) {
			// Wait until login process finished to redirect to dashboard
			hashHistory.push('/dashboard');
		}
	}

	onSubmit({ email, password }) {
		this.props.mutate({
			variables: {
				email,
				password
			},
			refetchQueries: [{query}]
		}).catch(res => {
			const errors = res.graphQLErrors.map(error => error.message);
			this.setState({errors}); 
		});
	}

	render() {
		return (
			<div>
				<h3>Signup</h3>
				<AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)}/>
			</div>
		);
	}
}

// import query to have query rerun every time page is reloaded
export default graphql(query)(
	graphql(mutation)(SignupForm)
);