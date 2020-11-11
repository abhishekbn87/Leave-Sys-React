import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  ButtonGroup,
  Navbar,
  Spinner,
  Image
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
    const file = data[0].fid + ".jpg";
    setName(data[0].name);
    setDesignation(data[0].designation);
    if (data[0].designation === "Prof & Head") setIsHOD(true);
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file);
    const fileUrl = await fileRef.getDownloadURL();
    console.log(fileUrl);
    setImg(fileUrl);
  };

  useEffect(getData, []);
  if (designation)
    return (
      <Router>
        <Nav />
        <Container
          className='d-flex align-items-center justify-content-center w-100 mb-0'
          style={{ marginTop: "3%", width: "100%" }}
        >
          <Card
            className='d-flex align-items-center justify-content-center w-100'
            style={{
              padding: "1rem",
              backgroundColor: "teal",
              color: "mistyrose"
            }}
          >
            <Image
              src={img}
              style={{
                width: "200px",
                height: "300px",
                marginBottom: "4%",
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
          style={{ marginTop: "4%", width: "fit-content", marginBottom: "10%" }}
        >
          <ButtonGroup className='ml-5'>
            <Button
              className='mr-5'
              onClick={() => history.push("/applyLeave")}
            >
              Apply Leave
            </Button>
            <Button className='mr-5'>Check Leaves</Button>
          </ButtonGroup>
          {isHOD && (
            <>
              <Button className='mr-5'>Manage Leaves</Button>
              <Button>Faculty Details</Button>
            </>
          )}
        </Container>
      </Router>
    );
  else {
    return (
      <>
        <Nav />
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
