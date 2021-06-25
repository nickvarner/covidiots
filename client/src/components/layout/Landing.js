import React from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Landing = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const currentProfile = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(getCurrentProfile());
	}, []);
	return (
		<Container>
			<div className='Landing'>
				<div className='h1'>landing page</div>
			</div>
		</Container>
	);
};

export default Landing;
