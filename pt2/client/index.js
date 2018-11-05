import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

// Effectively allows for mutations to an entity
// with a certain identifier to be broadcast to all 
// sources whose query results contain said entity
const client = new ApolloClient({
	dataIdFromObject: o => o.id
});

const Root = () => {
	return (
		// Assumes graphQL client is on /graphql
		<ApolloProvider client={client}>
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={SongList}/>
					<Route path="/songs/new" component={SongCreate}/>
					<Route path="/songs/:id" component={SongDetail}/>
				</Route>
			</Router>
		</ApolloProvider>
	);
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
