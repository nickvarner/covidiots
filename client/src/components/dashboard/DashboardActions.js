import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function DashboardActions () {
	return (
		<div className='dashboardActions mt-3'>
			<Link to='/edit-profile'>
				<Button variant='outline-primary' size='sm'>
					<i className='fas fa-user-circle' /> edit profile
				</Button>
			</Link>
		</div>
	);
}

export default DashboardActions;
