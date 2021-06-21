import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alert';

const Register = () => {
	const [ formData, setFormData ] = React.useState({
		username  : '',
		email     : '',
		password  : '',
		password2 : ''
	});

	const { username, email, password, password2 } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const passwordCheck = (pass1, pass2) => {
		if (pass1 === pass2) {
			return true;
		}
	};

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!passwordCheck(password, password2)) {
			dispatch(setAlert('passwords do not match', 'danger'));
		} else {
			console.log('send request here to db');
		}
	};

	return (
		<div className='Register'>
			<h1>sign up</h1>
			<h3>register a new account</h3>
			<Form onSubmit={(e) => handleSubmit(e)}>
				<Form.Group controlId='formUsername'>
					<Form.Label>Display Name</Form.Label>
					<Form.Control
						type='input'
						placeholder='enter a display name'
						name='username'
						value={username}
						onChange={(e) => handleChange(e)}
						required
					/>
				</Form.Group>
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
				<Form.Group controlId='formGroupPassword2'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						onChange={(e) => handleChange(e)}
						required
					/>
				</Form.Group>
				{/* lets save this for the dashboard page */}
				{/* <Form.Group controlId='formAge'>
					<Form.Label>Age</Form.Label>
					<Form.Control
						type='input'
						placeholder='How old are you?'
						name='age'
						value={age}
						onChange={(e) => handleChange(e)}
					/>
				</Form.Group>
				<Form.Group
					controlId='formPoliticalParty'
					name='politicalParty'
					value={politicalParty}
					onChange={(e) => handleChange(e)}>
					<Form.Control as='select' aria-label='select a political party'>
						<option>What Political Party do you most closely identify with?</option>
						<option value='Republican'>Republican</option>
						<option value='Democrat'>Democrat</option>
						<option value='Libertarian'>Libertarian</option>
						<option value='Independent'>Independent</option>
					</Form.Control>
				</Form.Group>
				<h3>social platforms</h3>
				<Form.Group controlId='formYoutube'>
					<Form.Label>YouTube</Form.Label>
					<Form.Control
						type='input'
						placeholder='YouTube Username'
						name='youtube'
						value={youtube}
						onChange={(e) => handleChange(e)}
					/>
				</Form.Group>
				<Form.Group controlId='formTwitter'>
					<Form.Label>Twitter</Form.Label>
					<Form.Control
						type='input'
						placeholder='Twitter Username'
						name='twitter'
						value={twitter}
						onChange={(e) => handleChange(e)}
					/>
				</Form.Group>
				<Form.Group controlId='formFacebook'>
					<Form.Label>Facebook</Form.Label>
					<Form.Control
						type='input'
						placeholder='Facebook Username'
						name='facebook'
						value={facebook}
						onChange={(e) => handleChange(e)}
					/>
				</Form.Group>
				<Form.Group controlId='formInstagram'>
					<Form.Label>Instagram</Form.Label>
					<Form.Control
						type='input'
						placeholder='Instagram Username'
						name='instagram'
						value={instagram}
						onChange={(e) => handleChange(e)}
					/>
				</Form.Group>
				<Form.Group controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='Check me out' />
				</Form.Group> */}
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
			<div className='div'>
				already have an account? <Link to='/login'>sign in</Link>
			</div>
		</div>
	);
};

export default Register;
