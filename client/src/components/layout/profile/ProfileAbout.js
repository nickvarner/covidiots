import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProfileAbout = ({ profile : { bio } }) => {
	return (
		<div className='profile-about'>
			<Row>
				<Col>{bio && <span>{bio}</span>}</Col>
			</Row>
		</div>
	);
};

export default ProfileAbout;
