import { React, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";
import { Card, Form, Button, Container } from "react-bootstrap";
import app from "../firebase";
import Welcome from "./Welcome";
import Footer from "./Footer";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpw, setConfPw] = useState("");
  const signInHandler = async e => {
    e.preventDefault();
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    setTimeout(() => {
      return <h1>Loading.....</h1>;
    }, 2000);
    return <Redirect to='/' />;
  }
  return (
    <>
      <Welcome />
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "100vh" }}
      >
        <div className='w-100' style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign In</h2>
              <Form onSubmit={signInHandler}>
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
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default SignIn;
