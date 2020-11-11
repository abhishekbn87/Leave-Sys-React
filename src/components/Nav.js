import React, { useContext, useState, useEffect } from "react";
import { Navbar, Button } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import app from "../firebase";
import { AuthContext } from "../Auth";

const Nav = () => {
  const { currentUser } = useContext(AuthContext);
  const url = `http://localhost/api/nav/${currentUser.email}`;
  const [name, setName] = useState(null);

  const getName = async () => {
    const data = await fetch(url).then(response => response.json());
    setName(data[0].name);
  };

  useEffect(getName, []);
  return (
    <Router>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Text>Signed In as : {name}</Navbar.Text>
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={() => app.auth().signOut()}>Sign Out</Button>
        </Navbar.Collapse>
      </Navbar>
    </Router>
  );
};

export default Nav;
