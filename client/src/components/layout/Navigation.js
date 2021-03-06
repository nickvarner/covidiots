import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import '../../styles/Navigation.css';
import Container from 'react-bootstrap/Container';

const Navigation = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	return (
		<div className='Navbar'>
			<Navbar bg='dark' expand='lg' variant='dark'>
				<Link to='/'>
					<Navbar.Brand>
						<span className='cov'>COV</span>
						<span className='id'>ID</span>
						<span className='iots'>IOTS</span>
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Container>
							<NavDropdown title='submissions' id='basic-nav-dropdown'>
								<NavDropdown.Item>
									<Link to='/add-submission'>add a submission</Link>
								</NavDropdown.Item>

								<NavDropdown.Item>
									<Link to='/'>my submissions</Link>
								</NavDropdown.Item>

								<NavDropdown.Item>
									<Link to='/submissions'>go to all submissions</Link>
								</NavDropdown.Item>

								{isAuthenticated && (
									<NavDropdown.Item onClick={() => dispatch(logout())}>logout</NavDropdown.Item>
								)}
								<NavDropdown.Divider />
								<NavDropdown.Item>
									<Link to='/dashboard'>my dashboard</Link>
								</NavDropdown.Item>
								{isAuthenticated && (
									<NavDropdown.Item>
										<Link to='/profiles'>user profiles</Link>
									</NavDropdown.Item>
								)}
							</NavDropdown>
							{
								isAuthenticated ? <Nav.Link onClick={() => dispatch(logout())}>logout</Nav.Link> :
								<Nav.Link>
									<Link to='/register'>register</Link>
								</Nav.Link>}
							{!isAuthenticated && (
								<Nav.Link>
									<Link to='/login'>login</Link>
								</Nav.Link>
							)}
						</Container>
					</Nav>
					<Form inline>
						<FormControl type='text' placeholder='Search' className='mr-sm-2' />
						<Button variant='outline-light' size='sm'>
							Search
						</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default Navigation;
