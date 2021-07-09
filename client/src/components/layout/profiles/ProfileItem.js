import React from 'react';
import Link from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

function ProfileItem ({ profile: { user: { _id, username, avatar }, age, politicalParty, bio } }) {
	const isLoading = useSelector((state) => state.auth.loading);
	const profiles = useSelector((state) => state.profile.profiles);
	return (
		<Card>
			<Card.Img
				variant='top'
				src={

						avatar ? { avatar } :
						'holder.js/100px180'
				}
			/>
			<Card.Body>
				<Card.Title>{username && username}</Card.Title>
				<Card.Subtitle className='mb-2 text-muted'>
					{age} | {politicalParty}
				</Card.Subtitle>
				<Card.Text>{bio}</Card.Text>
				<Button variant='primary'>Go somewhere</Button>
			</Card.Body>
		</Card>
	);
}

export default ProfileItem;
