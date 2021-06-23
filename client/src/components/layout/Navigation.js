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
								<Link to='/'>
									<NavDropdown.Item href='#action/3.1'>add a submission</NavDropdown.Item>
								</Link>
								<Link to='/'>
									<NavDropdown.Item href='#action/3.2'>my submissions</NavDropdown.Item>
								</Link>
								<Link to='/submissions'>
									<NavDropdown.Item>go to all submissions</NavDropdown.Item>
								</Link>
								{isAuthenticated && (
									<NavDropdown.Item onClick={() => dispatch(logout())}>logout</NavDropdown.Item>
								)}
								<NavDropdown.Divider />
								<Link to='/'>
									<NavDropdown.Item href='#action/3.4'>my dashboard</NavDropdown.Item>
								</Link>
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
						<Button variant='outline-success'>Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default Navigation;
