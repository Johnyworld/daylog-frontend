import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo-hooks';
import Client from './Apollo/Client';

ReactDOM.render(<ApolloProvider client={Client}><App /></ApolloProvider>, document.getElementById('root'));