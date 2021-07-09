import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Fade from 'react-bootstrap/Fade';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../../actions/profile';

import '../../../styles/profile.css';
import Loading from '../Loading';

function EditProfile () {
	const history = useHistory();
	const dispatch = useDispatch();
	const { profile, loading } = useSelector((state) => state.profile);

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

	React.useEffect(
		() => {
			dispatch(getCurrentProfile());
			setFormData({
				age            :

						loading || !profile.age ? '' :
						profile.age,
				bio            :

						loading || !profile.bio ? '' :
						profile.bio,
				gender         :

						loading || !profile.gender ? '' :
						profile.gender,
				politicalParty :

						loading || !profile.politicalParty ? '' :
						profile.politicalParty,
				youtube        :

						loading || !profile.social ? '' :
						profile.social.youtube,
				twitter        :

						loading || !profile.social ? '' :
						profile.social.twitter,
				facebook       :

						loading || !profile.social ? '' :
						profile.social.facebook,
				instagram      :

						loading || !profile.social ? '' :
						profile.social.instagram
			});
		},
		[ loading, profile, dispatch ]
	);

	const { age, bio, gender, politicalParty, youtube, twitter, facebook, instagram } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createProfile(formData, history, true));
	};

	if (loading) {
		return <Loading />;
	} else {
		return (
			<div className='edit-profile'>
				<Col>
					<Row>
						<h1>dashboard</h1>
					</Row>
					<Row>
						<h3>edit your profile</h3>
					</Row>
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
						<Form.Group
							controlId='formGender'
							name='gender'
							value={gender}
							onChange={(e) => handleChange(e)}>
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
						<Row>
							<h3>social platforms</h3>
						</Row>
						<Row>
							<Button
								onClick={() => setOpen(!open)}
								variant='secondary'
								aria-controls='social-inputs'
								aria-expanded='open'
								size='sm'>
								optional
							</Button>
						</Row>
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
						<Row>
							<Button variant='primary' type='submit' size='sm'>
								submit
							</Button>
							<Link to='/dashboard'>
								<Button variant='secondary' size='sm'>
									go back
								</Button>
							</Link>
						</Row>
					</Form>
				</Col>
			</div>
		);
	}
}

export default EditProfile;
