import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Form,
  Button,
  Col,
  ButtonGroup
} from "react-bootstrap";
import Nav from "./Nav";
import { AuthContext } from "../Auth";

const AlternateArrangement = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  console.log(currentUser.email);
  console.log(useLocation().state.from_date, useLocation().state.to_date);
  const dates = {
    from: new Date(useLocation().state.from_date),
    to: new Date(useLocation().state.to_date)
  };
  console.log(dates);

  const [faculty, setFaculty] = useState([]);

  const getFaculty = async () => {
    let facultyNames = await axios.get(
      `http://localhost/api/Lecturers/${currentUser.email}`
    );
    facultyNames = facultyNames.data;
    setFaculty(facultyNames);
  };

  useEffect(getFaculty, []);

  const getDates = (start, end) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  const datesArray = getDates(dates.from, dates.to);

  const [fields, setFields] = useState([{ num: 1, value: null }]);
  const [data, setData] = useState([]);
  const dateRef = useRef();
  const semRef = useRef();
  const secRef = useRef();
  const subRef = useRef();
  const timeRef = useRef();
  const facultyRef = useRef();

  const addCard = () => {
    const values = [...fields];
    values.push({ num: values[values.length - 1].num + 1, value: null });
    setFields(values);
  };

  const submitHandler = e => {
    e.preventDefault();
    let obj = {
      date: "",
      semester: "",
      section: "",
      subject: "",
      time: "",
      faculty: ""
    };
    obj.date = dateRef.current.value;
    obj.semester = semRef.current.value;
    obj.subject = subRef.current.value;
    obj.time = timeRef.current.value;
    obj.faculty = facultyRef.current.value;
    obj.section = secRef.current.value;
    const url = `http://localhost/api/alternate/${currentUser.email}/${obj.date}/${obj.semester}/${obj.section}/${obj.subject}/${obj.time}/${obj.faculty}`;
    obj = { obj };
    axios.post(url, obj).then(response => {
      console.log(response);
      if (response.status == 200)
        alert(
          "Alternate Arrangement done!! We will let " +
            facultyRef.current.value +
            " know"
        );
    });
  };

  console.log(data);
  return (
    <>
      <Nav />
      <Container
        fluid
        className='d-flex justify-content-center align-items-center'
        style={{ marginTop: "5%" }}
      >
        <Card className='w-100 p-3'>
          <Card.Body>
            <Form>
              {fields.map(field => {
                return (
                  <Form.Row key={field.num}>
                    <Col>
                      <Form.Group>
                        <Form.Label>Date : </Form.Label>
                        <Form.Control as='select' ref={dateRef}>
                          <option></option>
                          {datesArray.map(m => {
                            return <option>{m.toDateString()}</option>;
                          })}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Semester : </Form.Label>
                        <Form.Control as='select' ref={semRef}>
                          <option></option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Section : </Form.Label>
                        <Form.Control ref={secRef}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Subject : </Form.Label>
                        <Form.Control ref={subRef}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Time : </Form.Label>
                        <Form.Control as='select' ref={timeRef}>
                          <option></option>
                          <option>08:00 - 09:00</option>
                          <option>09:00 - 10:00</option>
                          <option>10:00 - 11:00</option>
                          <option>11:30 - 12:30</option>
                          <option>12:30 - 01:30</option>
                          <option>02:00 - 03:00</option>
                          <option>03:00 - 04:00</option>
                          <option>04:00 - 05:00</option>
                          <option>08:00 - 11:00</option>
                          <option>11:00 - 02:00</option>
                          <option>02:00 - 05:00</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Faculty : </Form.Label>
                        <Form.Control as='select' ref={facultyRef}>
                          <option></option>
                          {faculty.map(f => {
                            return <option>{f.name}</option>;
                          })}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center mt-3'>
                      <Button onClick={submitHandler}>Submit</Button>
                    </Col>
                  </Form.Row>
                );
              })}
              <Form.Row>
                <Container className='d-flex align-items-center justify-content-center mt-5'>
                  <Button
                    onClick={() => addCard()}
                    style={{
                      display: "inline",
                      width: "40%",
                      marginRight: "2%"
                    }}
                  >
                    Add Field
                  </Button>
                  <Button
                    onClick={() => {
                      var c = window.confirm(
                        "Are you sure you have made all required arrangements ? "
                      );
                      if (c) history.push("/");
                      else;
                    }}
                  >
                    Complete Alternate Arrangements
                  </Button>
                </Container>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AlternateArrangement;
