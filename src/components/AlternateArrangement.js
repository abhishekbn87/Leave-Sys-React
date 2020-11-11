import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Col,
  ButtonGroup
} from "react-bootstrap";
import Nav from "./Nav";

const AlternateArrangement = () => {
  console.log(useLocation().state.text);
  const [fields, setFields] = useState([{ num: 1, value: null }]);
  const [data, setData] = useState([]);
  const dateRef = useRef();
  const semRef = useRef();
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
    const obj = {
      date: "",
      semester: "",
      subject: "",
      time: "",
      faculty: ""
    };
    obj.date = dateRef.current.value;
    obj.semester = semRef.current.value;
    obj.subject = subRef.current.value;
    obj.time = timeRef.current.value;
    obj.faculty = facultyRef.current.value;
    const values = [...data];
    values.push(obj);
    setData(values);
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
                        <Form.Control ref={dateRef}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Semester : </Form.Label>
                        <Form.Control ref={semRef}></Form.Control>
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
                        <Form.Control ref={timeRef}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Faculty : </Form.Label>
                        <Form.Control ref={facultyRef}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center mt-3'>
                      <Button onClick={submitHandler}>Submit</Button>
                    </Col>
                  </Form.Row>
                );
              })}

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
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AlternateArrangement;
