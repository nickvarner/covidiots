import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Loading from '../layout/Loading';
import DashboardActions from './DashboardActions';

const Dashboard = () => {
	const isLoading = useSelector((state) => state.auth.loading);
	const profile = useSelector((state) => state.profile.profile);
	const dispatch = useDispatch();
	React.useEffect(
		() => {
			dispatch(getCurrentProfile());
		},
		[ isLoading, dispatch ]
	);
	if (isLoading || !profile) {
		return <Loading />;
	} else {
		return (
			<Container className='align-items-center d-flex'>
				<h1 className='row'>dashboard</h1>
				<h4 className='my-3 row'>
					<i className='fas fa-user' /> welcome {profile && profile.user.username}
				</h4>
				{
					profile !== null ? <Container>
						<DashboardActions />
					</Container> :
					<Container>
						<h5 className='row'>You have not yet created a profile, please add some information</h5>
						<Link to='/create-profile'>
							<Button variant='dark'>create profile</Button>
						</Link>
					</Container>}
				<Button variant='danger' onClick={() => dispatch(deleteAccount())} className='row'>
					<i className='fas fa-user-minus' /> delete my account
				</Button>
			</Container>
		);
	}
};
export default Dashboard;
