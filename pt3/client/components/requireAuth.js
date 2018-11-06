import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';

export default (WrappedComponent) => {
	class RequireAuth extends Component {
		componentWillUpdate(nextProps) {
			if (!nextProps.data.loading && !nextProps.data.user) {
				hashHistory.push("/login");
			}
		}

		render() {
			return <WrappedComponent { ...this.props} />;
		}
	}

	return graphql(query)(RequireAuth);
}