import React from "react";
import { Container, Card, Image } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#212529",
        position: "absolute",
        bottom: "0"
      }}
    >
      <Card
        className='w-100'
        style={{
          backgroundColor: "#212529",
          color: "whitesmoke"
        }}
      >
        <Card.Body style={{ textAlign: "center" }}>
          <footer>
            <p
              style={{ display: "inline", marginTop: "2%", fontSize: "1.5vw" }}
            >
              Created for the Computer Science and Engg department , BIT
            </p>
            <Image
              src='https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Bangalore_Institute_of_Technology_logo.png/220px-Bangalore_Institute_of_Technology_logo.png'
              style={{
                width: "3vw",
                height: "auto",
                float: "right",
                objectFit: "cover",
                margin: "0"
              }}
            />
          </footer>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Footer;
