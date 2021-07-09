import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../../../actions/profile';
import Container from 'react-bootstrap/Container';
import Loading from '../Loading';
import ProfileItem from './ProfileItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Profiles = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.auth.loading);
	const profiles = useSelector((state) => state.profile.profiles);
	React.useEffect(() => {
		dispatch(getProfiles());
	}, []);
	if (isLoading) {
		return <Loading />;
	} else {
		return (
			<Container>
				<div>
					<Row>
						<h1 className='large text-primary'>user profiles</h1>
					</Row>
					<Row>
						<p className='lead' />
						<i className='fab fa-connectdevelop' />connect with other users
					</Row>
					<Row fluid>
						{
							profiles.length > 0 ? profiles.map((profile) => (
								<Col>
									<ProfileItem key={profile._id} profile={profile} />
								</Col>
								// <div className='row'>{profile.gender}</div>
							)) :
							<h4>no profiles found</h4>}
					</Row>
				</div>
			</Container>
		);
	}
};

export default Profiles;
