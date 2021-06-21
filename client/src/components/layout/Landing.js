import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import Container from 'react-bootstrap/Container';

const Landing = () => {
	const { user } = React.useContext(UserContext);
	return (
		<Container>
			<div className='Landing'>
				<div className='h1'>landing page</div>
			</div>
		</Container>
	);
};

export default Landing;
