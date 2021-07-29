import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Loading from '../layout/Loading';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';

function Profile ({ match }) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const isLoading = useSelector((state) => state.auth.loading);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const profile = useSelector((state) => state.profile.profile);
	React.useEffect(
		() => {
			dispatch(getProfileById(match.params.id));
		},
		[ dispatch, match.params.id ]
	);

	if (profile === null || isLoading) return <Loading />;

	return (
		<Container>
			<Row>
				<Col>
					<h1>profile</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<Link to='/profiles'>
						<Button size='sm' variant='dark'>
							go back
						</Button>
					</Link>
					{isAuthenticated &&
					isLoading === false &&
					auth.user._id === profile.user._id && (
						<Link to='/edit-profile'>
							<Button size='sm' variant='dark'>
								edit profile
							</Button>
						</Link>
					)}
				</Col>
			</Row>
			<ProfileTop profile={profile} />
		</Container>
	);
}

export default Profile;
