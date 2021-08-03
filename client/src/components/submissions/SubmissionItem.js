import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SubmissionItem = ({ submission }) => {
	const auth = useSelector((state) => state.auth);
	return (
		<Card>
			<Card.Img
				variant='top'
				src={

						submission.imgURL ? submission.imgURL :
						'holder.js/100px180'
				}
			/>
			<Card.Body>
				<Card.Title>{submission.title}</Card.Title>
				<Card.Text>{submission.description && submission.description}</Card.Text>
				<Card.Text>
					<small className='text-muted'>
						{submission.date && <Moment format='MM/DD/YYYY'>{submission.date}</Moment>}
					</small>
				</Card.Text>
				{/* <Card.Text>
					<Button size='sm' variant='primary'>
						<i className='fas fa-thumbs-up' />
					</Button>
					<span>score</span>
					<Button size='sm' variant='danger'>
						<i className='fas fa-thumbs-up' />
					</Button>
				</Card.Text> */}
				<Button variant='primary' size='sm'>
					read post
				</Button>
				<Link to={`/submission/${submission._id}`}>
					{' '}
					<Button variant='secondary' size='sm'>
						view discussion ({submission.comments && submission.comments.length})
					</Button>
				</Link>
				<Button size='sm' variant='primary' className='fas fa-thumbs-up' />
				<small>{submission.votes && submission.votes.length}</small>
				<Button size='sm' variant='danger' className='fas fa-thumbs-down' />
				{!auth.loading &&
				submission.user === auth.user._id && (
					<Button size='sm' variant='danger' className='fas fa-times'>
						delete post
					</Button>
				)}
			</Card.Body>
		</Card>
	);
};

export default SubmissionItem;
