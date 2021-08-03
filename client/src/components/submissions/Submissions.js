import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../layout/Loading';
import { getSubmissions } from '../../actions/submission';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import SubmissionItem from './SubmissionItem';
import '../../styles/submissions.css';

const Submissions = () => {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.auth.loading);
	const submissions = useSelector((state) => state.submission.submissions);
	React.useEffect(
		() => {
			dispatch(getSubmissions());
		},
		[ getSubmissions, dispatch ]
	);
	if (loading) return <Loading />;
	return (
		<Container>
			<h1 className='large text-primary'>all submissions</h1>
			<div className='submissions'>
				{submissions.map((submission) => <SubmissionItem key={submission._id} submission={submission} />)}
			</div>
		</Container>
	);
};

export default Submissions;
