import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import Loading from '../layout/Loading';

const Dashboard = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const isLoading = useSelector((state) => state.auth.loading);
	const currentProfile = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(getCurrentProfile());
	}, []);
	const [ formData, setFormData ] = React.useState({
		username       : '',
		age            : '',
		politicalParty : '',
		youtube        : '',
		twitter        : '',
		facebook       : '',
		instagram      : ''
	});

	const { username, age, politicalParty, youtube, twitter, facebook, instagram } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	};
	if (isLoading) {
		return <Loading />;
	} else {
		return (
			<div className='Dashboard'>
				<h1>dashboard</h1>
				<h3>update your profile</h3>
				<Form onSubmit={(e) => handleSubmit(e)}>
					<Form.Group controlId='formUsername'>
						<Form.Label>Display Name</Form.Label>
						<Form.Control
							type='input'
							placeholder={

									currentProfile ? currentProfile.profile.user.username :
									'enter a display name'
							}
							name='username'
							value={username}
							onChange={(e) => handleChange(e)}
							disabled
						/>
					</Form.Group>
					<Form.Group controlId='formAge'>
						<Form.Label>Age</Form.Label>
						<Form.Control
							type='input'
							placeholder={

									currentProfile ? currentProfile.profile.age :
									'How old are you?'
							}
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
							placeholder={

									currentProfile ? currentProfile.profile.social.youtube :
									'YouTube Username'
							}
							name='youtube'
							value={youtube}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group controlId='formTwitter'>
						<Form.Label>Twitter</Form.Label>
						<Form.Control
							type='input'
							placeholder={

									currentProfile ? currentProfile.profile.social.twitter :
									'Twitter Username'
							}
							name='twitter'
							value={twitter}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group controlId='formFacebook'>
						<Form.Label>Facebook</Form.Label>
						<Form.Control
							type='input'
							placeholder={

									currentProfile ? currentProfile.profile.social.youtube :
									'Facebook Username'
							}
							name='facebook'
							value={facebook}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group controlId='formInstagram'>
						<Form.Label>Instagram</Form.Label>
						<Form.Control
							type='input'
							placeholder={

									currentProfile ? currentProfile.profile.social.youtube :
									'Instagram Username'
							}
							name='instagram'
							value={instagram}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</div>
		);
	}
};
export default Dashboard;
