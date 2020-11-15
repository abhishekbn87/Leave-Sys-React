import React, { useContext, useState, useEffect } from "react";
import { Navbar, Button, Image } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import app from "../firebase";
import { AuthContext } from "../Auth";

const Nav = () => {
  const { currentUser } = useContext(AuthContext);
  const url = `http://localhost/api/nav/${currentUser.email}`;
  const [name, setName] = useState(null);
  const [img, setImg] = useState(null);

  const getName = async () => {
    const data = await fetch(url).then(response => response.json());
    setName(data[0].name);
    setImg(data[0].url);
  };

  useEffect(getName, []);
  return (
    <Router>
      <Navbar bg='dark' variant='dark'>
        <Image
          src={img}
          style={{
            width: "100px",
            height: "100px",
            marginRight: "2%",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
        <Navbar.Text style={{ color: "whitesmoke" }}>
          Signed In as : {name}
        </Navbar.Text>
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={() => app.auth().signOut()}>Sign Out</Button>
        </Navbar.Collapse>
      </Navbar>
    </Router>
  );
};

export default Nav;
