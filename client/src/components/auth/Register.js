import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
	const [ email, setEmail ] = React.useState('');
	const [ password, setPassword ] = React.useState('');
	const [ age, setAge ] = React.useState(null);
	const [ politicalParty, setPoliticalParty ] = React.useState('');
	const [ youtube, setYoutube ] = React.useState('');
	const [ facebook, setFacebook ] = React.useState('');
	const [ instagram, setInstagram ] = React.useState('');
	return (
		<div className='Register'>
			<Form>
				<Form.Group controlId='formGroupEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control type='email' placeholder='Enter email' />
				</Form.Group>
				<Form.Group controlId='formGroupPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' placeholder='Password' />
				</Form.Group>
				<Form.Group controlId='formAge'>
					<Form.Label>Age</Form.Label>
					<Form.Control type='input' placeholder='How old are you?' />
				</Form.Group>
				<Form.Group controlId='formPoliticalParty'>
					<Form.Control as='select' aria-label='select a political party'>
						<option>What Political Party do you most closely identify with?</option>
						<option value='Republican'>Republican</option>
						<option value='Democrat'>Democrat</option>
						<option value='Libertarian'>Libertarian</option>
						<option value='Independent'>Independent</option>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='Check me out' />
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Register;
