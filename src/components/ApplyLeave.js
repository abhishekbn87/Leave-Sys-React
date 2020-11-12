import React, { useState, useEffect, useContext } from "react";
import { BroswerRouter as Redirect } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Card,
  Navbar,
  Button,
  FormLabel
} from "react-bootstrap";
import Nav from "./Nav";
import { AuthContext } from "../Auth";

const ApplyLeave = () => {
  const [data, setData] = useState({
    from: "",
    to: "",
    type: "",
    reason: "",
    contactAdress: ""
  });

  const [leaveTypes, setLeaveTypes] = useState([]);
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const submitHandler = async e => {
    e.preventDefault();
    const prop = {
      from_date: data.from,
      to_date: data.to
    };
    setData(data);
    // const differenceInDays = data.to.getTime() - data.from.getTime();
    const url = `http://localhost/api/apply/${currentUser.email}/${data.from}/${data.to}/${data.type}/${data.reason}/${data.contactAdress}`;
    const obj = { data };
    await axios.post(url, data).then(response => {
      if (response.data == false) {
        alert("Too many leaves applied for mentioned type");
      } else {
        alert("Leave applied successfully");
        history.push("/alternateArrangement", prop);
      }
    });
  };

  const getOptions = async () => {
    let options = await axios.get(
      `http://localhost/api/leaveTypes/${currentUser.email}`
    );
    options = options.data;
    console.log(options);
    setLeaveTypes(options);
  };

  useEffect(getOptions, []);

  return (
    <>
      <Nav />
      <h2 style={{ textAlign: "center", marginTop: "5%" }}>Apply Leave</h2>
      <Container
        className='d-flex justify-content-center align-items-center'
        style={{ marginTop: "2%", padding: "1rem" }}
      >
        <Card className='w-100'>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <FormGroup>
                <Form.Label>From : </Form.Label>
                <Form.Control
                  type='date'
                  value={data.from}
                  onChange={e => {
                    setData({ ...data, from: e.target.value });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>To : </Form.Label>
                <Form.Control
                  type='date'
                  value={data.to}
                  onChange={e => {
                    setData({ ...data, to: e.target.value });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Type : </Form.Label>
                <Form.Control
                  as='select'
                  value={data.type}
                  onChange={e => {
                    setData({ ...data, type: e.target.value });
                  }}
                >
                  <option></option>
                  {leaveTypes.map(m => {
                    return <option key={m.lid}>{m.description}</option>;
                  })}
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>Reason :</Form.Label>
                <Form.Control
                  type='text'
                  value={data.reason}
                  onChange={e => {
                    setData({ ...data, reason: e.target.value });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Contact Address when on Leave : </Form.Label>
                <Form.Control
                  type='text'
                  value={data.contactAdress}
                  onChange={e => {
                    setData({ ...data, contactAdress: e.target.value });
                  }}
                />
              </FormGroup>
              <Button
                type='submit'
                style={{ maxWidth: "200px" }}
                className='w-100'
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ApplyLeave;
