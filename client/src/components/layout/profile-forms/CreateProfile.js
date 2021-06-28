import React from 'react';
import { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile';
import CreateProfile from '../../../styles/CreateProfile.css';
import Loading from '../Loading';

function ProfileForm () {
	const auth = useSelector((state) => state.auth);
	const isLoading = useSelector((state) => state.profile.loading);
	const { profile } = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	React.useEffect(
		() => {
			dispatch(getCurrentProfile());
		},
		[ profile ]
	);
	const [ formData, setFormData ] = React.useState({
		age            : '',
		politicalParty : '',
		bio            : '',
		youtube        : '',
		twitter        : '',
		facebook       : '',
		instagram      : ''
	});

	const [ displaySocialInputs, toggleSocialInputs ] = React.useState(false);

	const { age, bio, politicalParty, youtube, twitter, facebook, instagram } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	};
	return (
		<div className='Dashboard'>
			<h1>dashboard</h1>
			<h3>update your profile</h3>
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
					<small className='form-text'>tell us a bit about yourself</small>
					<Form.Control
						as='textarea'
						name='bio'
						placeholder='tell us a bit about yourself'
						value={bio}
						onChange={(e) => handleChange(e)}
					/>
				</Form.Group>
				<Form.Group
					controlId='formPoliticalParty'
					name='politicalParty'
					value={politicalParty}
					onChange={(e) => handleChange(e)}>
					<Form.Control as='select' aria-label='select a political party' onChange={(e) => handleChange(e)}>
						<option>What Political Party do you most closely identify with?</option>
						<option value='Republican'>Republican</option>
						<option value='Democrat'>Democrat</option>
						<option value='Libertarian'>Libertarian</option>
						<option value='Independent'>Independent</option>
					</Form.Control>
				</Form.Group>
				<h3>social platforms</h3>
				<Button onClick={() => toggleSocialInputs(!displaySocialInputs)} variant='secondary'>
					optional
				</Button>
				{displaySocialInputs && (
					<Fragment>
						<div className='social media inputs'>
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
						</div>
					</Fragment>
				)}
				<div className='submit'>
					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default ProfileForm;
