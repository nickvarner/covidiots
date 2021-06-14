import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/layout/Navigation';
import Landing from '../src/components/layout/Landing';
import Container from 'react-bootstrap/Container';

const App = () => {
	return (
		<Container>
			<div className='App'>
				<Navigation />
				<Landing />
			</div>
		</Container>
	);
};

export default App;
