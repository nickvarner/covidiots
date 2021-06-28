import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import Loading from '../layout/Loading';

const Dashboard = () => {
	const auth = useSelector((state) => state.auth);
	const isLoading = useSelector((state) => state.profile.loading);
	const profile = useSelector((state) => state.profile);
	console.log(profile);
	console.log(profile.profile);
	console.log(auth);
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(getCurrentProfile());
	}, []);
	if (isLoading) {
		return <Loading />;
	} else {
		return (
			<Fragment>
				<h1>dashboard</h1>
				<h4>
					<i className='fas fa-user' /> welcome {auth && auth.user.username}
				</h4>
				{
					profile !== null ? <Fragment /> :
					<Fragment>
						<h5>You have not yet created a profile, please add some information</h5>
						<Link to='/create-profile'>
							<Button variant='dark'>create profile</Button>
						</Link>
					</Fragment>}
			</Fragment>
		);
	}
};
export default Dashboard;
