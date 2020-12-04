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
  const [isNonTeaching, setIsNonTeaching] = useState(false);
  const getData = async () => {
    data = await axios.get(url);
    data = data.data;
    var flag = await axios.get(
      `http://localhost/api/checkTeaching/${currentUser.email}`
    );
    flag = flag.data;
    if (!flag) setIsNonTeaching(true);
    if (data[0].designation) {
      setName(data[0].name);
      setDesignation(data[0].designation);
      if (data[0].designation === "Prof & Head") setIsHOD(true);
      setImg(data[0].url);
    } else {
      console.log("Caught");
      setTimeout(() => {
        window.location.reload();
      }, 125);
    }
  };

  useEffect(getData, []);
  console.log(name, designation, url);

  if (designation) {
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
              backgroundColor: "#5499C7",
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
            <h4 style={{ fontSize: "2.5vw" }}>Welcome , {name}</h4>
            <p style={{ fontSize: "2.5vw" }}>{designation}</p>
          </Card>
        </Container>
        <section
          style={{
            margin: "1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
            padding: "1%"
          }}
        >
          <Button onClick={() => history.push("/applyLeave")}>
            Apply Leave
          </Button>
          <Button onClick={() => history.push("/checkLeaves")}>
            Check Leaves
          </Button>
          <Button onClick={() => history.push("/facultyDetails")}>
            Faculty Details
          </Button>
          {!isNonTeaching && (
            <Button onClick={() => history.push("/checkAlt")}>
              Check Alternate Arrangements
            </Button>
          )}
          {isHOD && (
            <Button onClick={() => history.push("/facultyDetails", true)}>
              Manage Leaves
            </Button>
          )}
          {isHOD && (
            <Button onClick={() => history.push("/leavesToday")}>
              Check Leaves Applied Today
            </Button>
          )}
          {isHOD && (
            <Button onClick={() => history.push("/signup")}>
              Sign Up New Faculty
            </Button>
          )}
        </section>
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
