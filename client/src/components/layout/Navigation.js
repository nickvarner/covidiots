import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

const Navigation = () => {
	const { user, setUser } = React.useContext(UserContext);
	return (
		<div className='Navbar'>
			<Navbar bg='dark' expand='lg' variant='dark'>
				<Link to='/'>
					<Navbar.Brand>C O V I D I O T S</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<NavDropdown title='submissions' id='basic-nav-dropdown'>
							<Link to='/'>
								<NavDropdown.Item href='#action/3.1'>add a submission</NavDropdown.Item>
							</Link>
							<Link to='/'>
								<NavDropdown.Item href='#action/3.2'>my submissions</NavDropdown.Item>
							</Link>
							<Link to='/submissions'>
								<NavDropdown.Item>go to all submissions</NavDropdown.Item>
							</Link>
							<Link to='/'>
								<NavDropdown.Item href='#action/3.3'>log out</NavDropdown.Item>
							</Link>
							<NavDropdown.Divider />
							<Link to='/'>
								<NavDropdown.Item href='#action/3.4'>my dashboard</NavDropdown.Item>
							</Link>
						</NavDropdown>
						<Link to='/login'>
							<Navbar.Text>login</Navbar.Text>
						</Link>
						<Button onClick={() => setUser('nick')} label='change value'>
							change value
						</Button>
						{user}
					</Nav>
					<Form inline>
						<Link to='/register'>
							<Navbar.Text>register</Navbar.Text>
						</Link>
						<FormControl type='text' placeholder='Search' className='mr-sm-2' />
						<Button variant='outline-success'>Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default Navigation;
