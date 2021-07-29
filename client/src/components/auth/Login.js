import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { useSelector } from 'react-redux';

const Login = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
		dispatch(login(email, password));
	};
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<div className='Login'>
			<Container>
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
			</Container>
		</div>
	);
};

export default Login;
