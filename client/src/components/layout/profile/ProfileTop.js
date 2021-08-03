import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Loading from '../Loading';
import '../../../styles/profile.css';

function ProfileTop (props) {
	const profile = useSelector((state) => state.profile.profile);
	const { age, gender, politicalParty, social, user: { username, avatar } } = profile;
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
						{age && <span>{age}</span>} {gender && <span> | {gender}</span>}{' '}
						{politicalParty && <span> | {politicalParty}</span>}
					</h4>
				</Col>
			</Row>
			<Row xs={2} md={4} lg={6}>
				{social.youtube && (
					<Col>
						<a href={`http://www.youtube.com/${social.youtube}`} target='_blank' rel='noopener noreferrer'>
							<i className='fab fa-youtube fa-2x' />
							{social.youtube}
						</a>
					</Col>
				)}
				{social.twitter && (
					<Col>
						<a href={`http://www.twitter.com/${social.twitter}`} target='_blank' rel='noopener noreferrer'>
							<i className='fab fa-twitter fa-2x' />
							{social.twitter}
						</a>
					</Col>
				)}
				{social.faceboook && (
					<Col>
						<a
							href={`http://www.faceboook.com/${social.faceboook}`}
							target='_blank'
							rel='noopener noreferrer'>
							<i className='fab fa-faceboook fa-2x' />
							{social.faceboook}
						</a>
					</Col>
				)}
				{social.instagram && (
					<Col>
						<a
							href={`http://www.instagram.com/${social.instagram}`}
							target='_blank'
							rel='noopener noreferrer'>
							<i className='fab fa-instagram fa-2x' />
							{social.instagram}
						</a>
					</Col>
				)}
			</Row>
		</div>
	);
}

export default ProfileTop;
