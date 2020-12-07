import React, { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import { useHistory, useLocation } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Card,
  FormGroup,
  Image
} from "react-bootstrap";
import upload from "../assets/upload.png";

import axios from "axios";

const Register = () => {
  const newUser = useLocation().state;
  const hiddenFileInput = useRef(null);
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [type, setType] = useState(null);
  const [name, setName] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [FID, setFID] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [sex, setSex] = useState(null);
  const [fids, setFids] = useState([]);
  const [exists, setExists] = useState(false);

  const checkExists = fid => {
    try {
      var check = fids.includes(fid);
    } catch {
      getFIDs();
    }
    setExists(check);
  };

  const getFIDs = async () => {
    var fids = await axios.get(`http://localhost/api/getFIDs`);
    fids = fids.data[0].fid;
    setFids(fids);
  };

  const handleClick = e => {
    hiddenFileInput.current.click();
  };

  const submitHandler = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("file", selectedFile);
    console.log(fd);
    await axios.post(`http://localhost/api/upload/${FID}`, fd).then(res => {
      console.log(res.data);
      alert("Upload successful");
    });
    console.log(type, name, FID, designation, newUser, phone, address, sex);
    var response = await axios
      .post("http://localhost/api/register", {
        type: type,
        name: name,
        fid: FID,
        designation: designation,
        email: newUser,
        phone: phone,
        address: address,
        sex: sex
      })
      .then(res => {
        console.log(res);
        alert("Success");
        history.push("/");
      })
      .catch(alert("Something went wrong"));
  };

  useEffect(getFIDs, []);
  console.log(selectedFile);
  return (
    <>
      <Nav />
      <h3 style={{ textAlign: "center", margin: "1rem" }}>
        Register New Faculty To Database
      </h3>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5rem",
          marginBottom: "5rem"
        }}
      >
        <Card className='w-100'>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <FormGroup
                onChange={e => {
                  console.log(e.target.value);
                  setType(e.target.value);
                }}
              >
                <Form.Label>Staff Type: </Form.Label>
                <Form.Check
                  style={{ marginLeft: "0.5rem" }}
                  inline
                  label='Teaching'
                  type='radio'
                  name='stafftype'
                  value='teaching'
                />
                <Form.Check
                  inline
                  label='Non Teaching'
                  type='radio'
                  name='stafftype'
                  value='nonTeaching'
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  onChange={e => setName(e.target.value)}
                  required
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>FID:</Form.Label>
                <Form.Control
                  onChange={e => {
                    checkExists(e.target.value.toUpperCase());
                    setFID(e.target.value);
                  }}
                  required
                ></Form.Control>
                {exists && (
                  <p style={{ color: "red" }}>The FID is already assigned</p>
                )}
              </FormGroup>
              <FormGroup>
                <Form.Label>Designation : </Form.Label>
                <Form.Control
                  onChange={e => setDesignation(e.target.value)}
                  required
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>Email : </Form.Label>
                <Form.Control type='email' value={newUser} readOnly />
              </FormGroup>
              <FormGroup>
                <Form.Label>Phone : </Form.Label>
                <Form.Control
                  type='tel'
                  onChange={e => setPhone(e.target.value)}
                  required
                ></Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>Address : </Form.Label>
                <Form.Control
                  as='textarea'
                  rows={5}
                  required
                  onChange={e => setAddress(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                onChange={e => {
                  console.log(e.target.value);
                  setSex(e.target.value);
                }}
              >
                <Form.Label>Sex : </Form.Label>
                <Form.Check
                  style={{ marginLeft: "0.5rem" }}
                  inline
                  label='M'
                  type='radio'
                  name='sex'
                  value='M'
                />
                <Form.Check
                  inline
                  label='F'
                  type='radio'
                  name='sex'
                  value='F'
                />
              </FormGroup>
              <FormGroup>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#E3F2FD",
                    borderRadius: "10px",
                    height: "40rem",
                    width: "auto",
                    textAlign: "center"
                  }}
                >
                  <Image
                    src={upload}
                    style={{
                      width: "15rem",
                      height: "auto",
                      marginTop: "1rem"
                    }}
                  ></Image>
                  <Button onClick={handleClick}>Upload Image</Button>
                  <Form.File
                    type='file'
                    id='input-file'
                    ref={hiddenFileInput}
                    hidden
                    style={{ zIndex: "1" }}
                    accept='image/*'
                    onChange={e => setSelectedFile(e.target.files[0])}
                  />
                  {selectedFile && (
                    <Image
                      src={URL.createObjectURL(selectedFile)}
                      style={{
                        height: "15rem",
                        width: "auto",
                        margin: "2rem",
                        borderRadius: "10px"
                      }}
                    />
                  )}
                </div>
              </FormGroup>
              <FormGroup
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Button type='submit' style={{ width: "25rem" }}>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Register;
