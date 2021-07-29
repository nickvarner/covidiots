import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
					<Col>
						<h1>dashboard</h1>
					</Col>
				</Row>
				<Row>
					<Col>
						<h4>
							<i className='fas fa-user' /> welcome {profile && profile.user.username}
						</h4>
					</Col>
				</Row>
				{
					profile !== null ? <Row>
						<Col>
							<DashboardActions />
						</Col>
					</Row> :
					<Container>
						<Row>
							<Col>
								<h5>You have not yet created a profile, please add some information</h5>
							</Col>
						</Row>
						<Row>
							<Col>
								<Link to='/create-profile'>
									<Button size='sm' variant='dark'>
										create profile
									</Button>
								</Link>
							</Col>
						</Row>
					</Container>}
				<Row>
					<Col>
						<Button size='sm' variant='danger' onClick={() => dispatch(deleteAccount())}>
							<i className='fas fa-user-minus' /> delete my account
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}
};
export default Dashboard;
