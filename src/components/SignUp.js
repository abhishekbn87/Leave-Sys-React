import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import app from "../firebase";
import { Container, Card, Button, Form } from "react-bootstrap";
import Footer from "./Footer";
import Nav from "./Nav";
import axios from "axios";
import "../../src/signin.css";

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async e => {
    e.preventDefault();
    try {
      var user = await axios.post(
        `http://localhost/api/signUp/${email}/${password}`,
        { email, password }
      );
      console.log(user);
      console.log("Signed In");
      history.push("/register", email);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <section className='signin'>
      <Nav />
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "100vh" }}
      >
        <div className='w-100' style={{ maxWidth: "400px" }}>
          <Card style={{ backgroundColor: "#D1C4E9", boxShadow: "1rem" }}>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign Up</h2>
              <Form onSubmit={handleSignUp}>
                <Form.Group id='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button type='sumbit' className='w-100'>
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <Footer />
      </Container>
    </section>
  );
};

export default SignUp;
