import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './components/layout/Navigation';
import Landing from '../src/components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Navigation />
				<Route exact path='/' component={Landing} />
				<Container>
					<Switch>
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</Container>
			</BrowserRouter>
		</div>
	);
};

export default App;
