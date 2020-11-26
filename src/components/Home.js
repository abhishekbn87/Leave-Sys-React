import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  ButtonGroup,
  Navbar,
  Spinner,
  Image,
  Toast
} from "react-bootstrap";
import app from "../firebase";
import { AuthContext } from "../Auth";
import { useFetch } from "../useFetch";
import Nav from "../components/Nav";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const url = `http://localhost/api/Faculty/${currentUser.email}`;
  const history = useHistory();
  var data;

  const [img, setImg] = useState(null);
  const [name, setName] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [isHOD, setIsHOD] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const getData = async () => {
    data = await axios.get(url);
    data = data.data;
    console.log(data);
    try {
      setName(data[0].name);
      setDesignation(data[0].designation);
      if (data[0].designation === "Prof & Head") setIsHOD(true);
      setImg(data[0].url);
    } catch {
      window.location.reload();
    }
  };

  useEffect(getData, []);

  if (name) {
    return (
      <Router>
        <Nav />
        <Container
          className='d-flex align-items-center justify-content-center w-100 mb-0'
          style={{ marginTop: "3%" }}
          fluid
        >
          <Card
            className='d-flex align-items-center justify-content-center w-100'
            style={{
              padding: "1rem",
              backgroundColor: "teal",
              color: "whitesmoke"
            }}
          >
            <Image
              src={img}
              style={{
                width: "300px",
                height: "500px",
                marginBottom: "4%",
                borderRadius: "1rem",
                marginTop: "4%",
                objectFit: "cover"
              }}
            />
            <p>Welcome , {name}</p>
            <p>{designation}</p>
          </Card>
        </Container>
        <Container
          className='d-flex align-items-center justify-content-center'
          style={{
            marginTop: "4%",
            marginBottom: "10%",
            padding: "2%"
          }}
          fluid
        >
          <ButtonGroup className='ml-5'>
            <Button
              className='mr-5'
              onClick={() => history.push("/applyLeave")}
            >
              Apply Leave
            </Button>
            <Button
              className='mr-5'
              onClick={() => history.push("/checkLeaves")}
            >
              Check Leaves
            </Button>
            <Button
              className='mr-5'
              onClick={() => history.push("/facultyDetails")}
            >
              Faculty Details
            </Button>
            <Button className='mr-5' onClick={() => history.push("/checkAlt")}>
              Check Aternate Arrangements
            </Button>
          </ButtonGroup>
          {isHOD && (
            <>
              <Button
                className='mr-5'
                onClick={() => history.push("/facultyDetails", true)}
              >
                Manage Leaves
              </Button>
              <Button
                className='mr-5'
                onClick={() => history.push("/leavesToday", true)}
              >
                Check Leaves Applied Today
              </Button>
            </>
          )}
        </Container>
      </Router>
    );
  } else {
    return (
      <>
        <Nav />
        <Container className='d-flex align-items-center justify-content-center mt-5'>
          <Toast
            style={{
              textAlign: "center",
              backgroundColor: "#212529",
              color: "whitesmoke"
            }}
          >
            <Toast.Body>
              Please refresh or check your internet connection
            </Toast.Body>
          </Toast>
        </Container>
        <Container
          className='d-flex align-items-center justify-content-center'
          style={{ minHeight: "100vh" }}
        >
          <Spinner animation='grow' />
          <h1 className='mt-10 ml-2'>Loading....</h1>
        </Container>
      </>
    );
  }
};

export default Home;
