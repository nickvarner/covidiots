import React from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { useDispatch, useSelector } from 'react-redux';

const ProfileSubmissionListItem = ({ submission }) => {
	return (
		<div className='profile-submission-list-item'>
			<ListGroupItem>{submission.title}</ListGroupItem>
		</div>
	);
};

export default ProfileSubmissionListItem;
