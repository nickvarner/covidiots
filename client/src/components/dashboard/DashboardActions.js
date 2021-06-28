import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function DashboardActions () {
	return (
		<div className='dashboardActions'>
			<Link to='/edit-profile'>
				<Button variant='outline-primary'>
					<i className='fas fa-user-circle' /> edit profile
				</Button>
			</Link>
			<Button variant='danger'>delete profile</Button>
		</div>
	);
}

export default DashboardActions;
