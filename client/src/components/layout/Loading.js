import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

function Loading () {
	return (
		<div className='spinner'>
			<Container>
				<Spinner animation='border' role='status' />
			</Container>
		</div>
	);
}

export default Loading;
