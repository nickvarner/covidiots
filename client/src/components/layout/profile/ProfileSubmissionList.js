import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import ProfileSubmissionListItem from './ProfileSubmissionListItem';
import { getSubmissions } from '../../../actions/submission';
import Loading from '../Loading';

function ProfileSubmissionList () {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.auth.loading);
	React.useEffect(
		() => {
			dispatch(getSubmissions());
		},
		[ getSubmissions, dispatch ]
	);
	const submissions = useSelector((state) => state.submission.submissions);
	if (loading) return <Loading />;
	return (
		<div className='profile-submissions-list'>
			<ListGroup>
				{submissions.map((submission) => <ProfileSubmissionListItem submission={submission} />)}
			</ListGroup>
		</div>
	);
}

export default ProfileSubmissionList;
