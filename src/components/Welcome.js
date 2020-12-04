import React from "react";
import { Container, Card, Image, Heading } from "react-bootstrap";
import logo from "../assets/Leave-Sys_Logo.png";
const Welcome = () => {
  return (
    <>
      <Container
        fluid
        style={{ backgroundColor: "#000000", color: "whitesmoke" }}
      >
        <Card
          className=' w-100'
          style={{ backgroundColor: "#000000", color: "whitesmoke" }}
        >
          <Card.Body className='text-align-center'>
            <Image
              src={logo}
              style={{
                marginRight: "2%",
                marginBottom: "2%",
                width: "7vw",
                height: "auto"
              }}
            />
            <h1
              style={{
                display: "inline",
                marginLeft: "2rem",
                fontSize: "4vw",
                textAlign: "center",
                fontFamily: "Satisfy"
              }}
            >
              Welcome to Leave-Sys!!
            </h1>
            <Image
              src='https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Bangalore_Institute_of_Technology_logo.png/220px-Bangalore_Institute_of_Technology_logo.png'
              style={{
                width: "5vw",
                height: "auto",
                float: "right",
                objectFit: "cover",
                marginTop: "0.2rem",
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
