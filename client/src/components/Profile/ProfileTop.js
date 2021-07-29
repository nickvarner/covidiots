import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Loading from '../layout/Loading';

function ProfileTop (props) {
	const profile = useSelector((state) => state.profile.profile);
	const { avatar, age, gender, politicalParty, bio, social, user: { username } } = profile;
	const isLoading = useSelector((state) => state.auth.loading);
	console.log(profile);
	if (isLoading) return <Loading />;
	return (
		<div className='profile-top'>
			<Row>
				<Col>
					<Image
						variant='top'
						src={

								avatar ? avatar :
								'holder.js/100px180'
						}
						roundedCircle='true'
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<h1>{username}</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<h4>
						{age} | {gender} | {politicalParty}
					</h4>
				</Col>
			</Row>
			<Row>
				<Col>{bio}</Col>
			</Row>
			<Row>
				<Col />
				<Col />
				<Col />
				<Col />
			</Row>
		</div>
	);
}

export default ProfileTop;
