import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
	const [ formData, setFormData ] = React.useState({
		email    : '',
		password : ''
	});

	const { email, password } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('success');
	};

	return (
		<div className='Login'>
			<h1>sign in to your account</h1>
			<Form onSubmit={(e) => handleSubmit(e)}>
				<Form.Group controlId='formGroupEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						name='email'
						value={email}
						onChange={(e) => handleChange(e)}
						required
					/>
				</Form.Group>
				<Form.Group controlId='formGroupPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={(e) => handleChange(e)}
						required
					/>
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
			<p className='sub'>
				don't have an account? <Link to='/register'>sign up</Link>
			</p>
		</div>
	);
};

export default Login;
