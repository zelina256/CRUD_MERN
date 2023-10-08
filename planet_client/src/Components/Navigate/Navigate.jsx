import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { UserContext } from '../../UserContext';
import axios from 'axios';

const Navigate = () => {
  // Do te perdoret per te mbajtur dhe ndryshuar info per user e loguar
  const { userInfo, setUserInfo } = useContext(UserContext);

  // Merr info nga backend per user-in e loguar
  useEffect(() => {
    // Nese email eshte bosh apo 
    // Therritja e apit
    /* Sintaksa:

    await axios.method('path backend', variable).
    then(()=>{}.catch(err=>{}))
    */
    if (!userInfo.email) {
      axios.get('http://localhost:3001/user/', {
        withCredentials: true,
      })
        .then(response => {
          // Update-hen te dhenat per user-in
          setUserInfo(response.data);
        })
        // Nese nuk ndodh loin
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  },
    // useEffect do te therritet sa here qe behet nje ndryshim tek UserContext
    [userInfo, setUserInfo]);

  // Funksioni log out, fshin informacionet na UserContext
  // Therritja e apit
  /* Sintaksa:

  await axios.method('path backend', variable).
  then(()=>{}.catch(err=>{}))
  */
  const logout = () => {
    // { withCredentials: true } kalon cookies me ane te kerkese (perdoret per token qe eshte marre nga jwt)
    axios.post('http://localhost:3001/logout', null, { withCredentials: true })
      .then(res => {
        // Fshin te dhenat nga UserContext
        setUserInfo({});
      })
      // Nese nuk ndodh logout
      .catch(error => {
        console.error('Error logging out:', error);
      });
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">CRUD MERN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Planets</Nav.Link>
            {/* nese user eshte i loguar do te shfaqen Create dhe logout; perndryshe do te shfaqen register dhe login */}
            {userInfo.email ?
              <>
                <Nav.Link href="/create_planet">Create Planet</Nav.Link>
                <Nav.Link onClick={logout}>Logout ({userInfo.email})</Nav.Link>
              </>
              :
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigate;
