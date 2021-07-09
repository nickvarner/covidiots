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
	React.useEffect(() => {
		dispatch(getCurrentProfile());
	}, []);
	return (
		<Container>
			<Row>
				<Col>
					<div className='Landing'>
						<h1>landing page col 1</h1>
					</div>
				</Col>
				<Col>
					<h2>col 2</h2>
				</Col>
			</Row>
			<Row>
				<Col>row 2 col 1</Col>
			</Row>
		</Container>
	);
};

export default Landing;
