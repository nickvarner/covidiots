import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile, deleteAccount, getProfiles } from '../../actions/profile';
import Loading from '../layout/Loading';
import DashboardActions from './DashboardActions';

const Dashboard = () => {
	const isLoading = useSelector((state) => state.auth.loading);
	const profile = useSelector((state) => state.profile.profile);
	const dispatch = useDispatch();
	React.useEffect(
		() => {
			dispatch(getCurrentProfile());
			dispatch(getProfiles());
		},
		[ isLoading, dispatch ]
	);
	if (isLoading) {
		return <Loading />;
	} else {
		return (
			<Container>
				<Row>
					<h1>dashboard</h1>
				</Row>
				<Row>
					<h4>
						<i className='fas fa-user' /> welcome {profile && profile.user.username}
					</h4>
				</Row>
				{
					profile !== null ? <Row>
						<DashboardActions />
					</Row> :
					<Container>
						<Row>
							<h5>You have not yet created a profile, please add some information</h5>
						</Row>
						<Row>
							<Link to='/create-profile'>
								<Button size='sm' variant='dark'>
									create profile
								</Button>
							</Link>
						</Row>
					</Container>}
				<Row>
					<Button size='sm' variant='danger' onClick={() => dispatch(deleteAccount())}>
						<i className='fas fa-user-minus' /> delete my account
					</Button>
				</Row>
			</Container>
		);
	}
};
export default Dashboard;
