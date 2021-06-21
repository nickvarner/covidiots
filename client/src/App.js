import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { UserContext } from './components/hooks/UserContext';
import Navigation from './components/layout/Navigation';
import Landing from '../src/components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

//Redux Boiler Plate
// need a provider which we will wrap everything with
import { Provider } from 'react-redux';
// also need to bring in the store
import store from './store';
// we want to auth user throughout our app so we'll use that here
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	const [ user, setUser ] = React.useState(null);
	const value = React.useMemo(() => ({ user, setUser }), [ user, setUser ]);
	React.useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	// wrap everything with the provider tab and reference our store
	return (
		<Provider store={store}>
			<div className='App'>
				<BrowserRouter>
					<UserContext.Provider value={value}>
						<Navigation />
						<Route exact path='/' component={Landing} />
						<Container>
							<Alert />
							<Switch>
								<Route exact path='/register' component={Register} />
								<Route exact path='/login' component={Login} />
							</Switch>
						</Container>
					</UserContext.Provider>
				</BrowserRouter>
			</div>
		</Provider>
	);
};

export default App;
