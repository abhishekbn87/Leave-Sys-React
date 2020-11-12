import React from "react";
import { Container, Card, Image, Heading } from "react-bootstrap";
const Welcome = () => {
  return (
    <>
      <Container
        fluid
        style={{ backgroundColor: "#212529", color: "whitesmoke" }}
      >
        <Card
          className=' w-100'
          style={{ backgroundColor: "#212529", color: "whitesmoke" }}
        >
          <Card.Body className='text-align-center'>
            <h1 style={{ display: "inline", fontSize: "3.5vw" }}>
              Welcome to Leave-Sys!!
            </h1>
            <Image
              src='https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Bangalore_Institute_of_Technology_logo.png/220px-Bangalore_Institute_of_Technology_logo.png'
              style={{
                width: "5vw",
                height: "auto",
                float: "right",
                objectFit: "cover",
                margin: "0"
              }}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Welcome;
