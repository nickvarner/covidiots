import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Fade from 'react-bootstrap/Fade';
import { useHistory, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import { createProfile } from '../../../actions/profile';

import '../../../styles/profile.css';

function CreateProfile () {
	const history = useHistory();
	const dispatch = useDispatch();

	const [ formData, setFormData ] = React.useState({
		age            : '',
		politicalParty : '',
		bio            : '',
		gender         : '',
		youtube        : '',
		twitter        : '',
		facebook       : '',
		instagram      : ''
	});

	const [ open, setOpen ] = React.useState(false);

	const { age, bio, gender, politicalParty, youtube, twitter, facebook, instagram } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createProfile(formData, history));
	};

	return (
		<div className='create-profile'>
			<Container>
				<h1>dashboard</h1>
				<h3>create your profile</h3>
				<Form onSubmit={(e) => handleSubmit(e)}>
					<Form.Group controlId='formAge'>
						<Form.Label>Age</Form.Label>
						<Form.Control
							type='input'
							placeholder='how old are you?'
							name='age'
							value={age}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group controlId='bio'>
						<Form.Label>bio</Form.Label>
						<Form.Control
							as='textarea'
							name='bio'
							placeholder='tell us a bit about yourself'
							value={bio}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group controlId='formGender' name='gender' value={gender} onChange={(e) => handleChange(e)}>
						<Form.Control
							as='select'
							aria-label='select a political party'
							onChange={(e) => handleChange(e)}>
							<option>What gender are you?</option>
							<option value='male'>male</option>
							<option value='female'>female</option>
							<option value='nonConforming'>non conforming</option>
						</Form.Control>
					</Form.Group>
					<Form.Group
						controlId='formPoliticalParty'
						name='politicalParty'
						value={politicalParty}
						onChange={(e) => handleChange(e)}>
						<Form.Control
							as='select'
							aria-label='select a political party'
							onChange={(e) => handleChange(e)}>
							<option>What Political Party do you most closely identify with?</option>
							<option value='Republican'>Republican</option>
							<option value='Democrat'>Democrat</option>
							<option value='Libertarian'>Libertarian</option>
							<option value='Independent'>Independent</option>
						</Form.Control>
					</Form.Group>
					<h3>social platforms</h3>
					<Button
						onClick={() => setOpen(!open)}
						variant='secondary'
						aria-controls='social-inputs'
						aria-expanded='open'
						size='sm'>
						optional
					</Button>
					<Fade in={open}>
						<div className='social-inputs'>
							<Container>
								<Row>
									<Col>
										<Form.Group controlId='formYoutube'>
											<i className='fab fa-youtube fa-2x' />
											<Form.Control
												type='input'
												placeholder='YouTube Username'
												name='youtube'
												value={youtube}
												onChange={(e) => handleChange(e)}
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId='formTwitter'>
											<i className='fab fa-twitter fa-2x' />
											<Form.Control
												type='input'
												placeholder='Twitter Username'
												name='twitter'
												value={twitter}
												onChange={(e) => handleChange(e)}
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId='formFacebook'>
											<i className='fab fa-facebook fa-2x' />
											<Form.Control
												type='input'
												placeholder='Facebook Username'
												name='facebook'
												value={facebook}
												onChange={(e) => handleChange(e)}
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId='formInstagram'>
											<i className='fab fa-instagram fa-2x' />
											<Form.Control
												type='input'
												placeholder='Instagram Username'
												name='instagram'
												value={instagram}
												onChange={(e) => handleChange(e)}
											/>
										</Form.Group>
									</Col>
								</Row>
							</Container>
						</div>
					</Fade>
					<div className='submit'>
						<Button variant='primary' type='submit' className='mr-1'>
							Submit
						</Button>
						<Link to='/dashboard'>
							<Button variant='secondary'>go back</Button>
						</Link>
					</div>
				</Form>
			</Container>
		</div>
	);
}

export default CreateProfile;
