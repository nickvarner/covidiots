import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';

function ProfileItem ({ profile: { user: { _id, username, avatar }, age, politicalParty, bio, gender } }) {
	const isLoading = useSelector((state) => state.auth.loading);
	const profiles = useSelector((state) => state.profile.profiles);
	return (
		<Col>
			<Card>
				<Image
					variant='top'
					src={

							avatar ? avatar :
							'holder.js/100px180'
					}
					roundedCircle='true'
					thumbnail='true'
				/>
				<Card.Body>
					<Card.Title>{username && <span>{username}</span>}</Card.Title>
					<Card.Subtitle className='mb-2 text-muted'>
						{age && <span>{age}</span>} {gender && <span>| {gender}</span>}{' '}
						{politicalParty && <span>| {politicalParty}</span>}
					</Card.Subtitle>
					<Card.Text>{bio}</Card.Text>
					<Link to={`/profile/${_id}`}>
						<Button variant='primary'>view profile</Button>
					</Link>
				</Card.Body>
			</Card>
		</Col>
	);
}

export default ProfileItem;
