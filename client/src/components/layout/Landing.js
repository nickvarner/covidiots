import React from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Landing = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const currentProfile = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	React.useEffect(
		() => {
			dispatch(getCurrentProfile());
		},
		[ dispatch ]
	);
	return (
		<Container>
			<Row>
				<Col>
					<div className='Landing'>
						<h1>landing</h1>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Landing;
