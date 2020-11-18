import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import { Container, Card, Button, Table } from "react-bootstrap";
import { AuthContext } from "../Auth";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CheckLeaves = () => {
  const [data, setData] = useState([]);
  const loggedUser = useContext(AuthContext);
  const [remaining, setRemaining] = useState([]);
  var currentUser;
  const prop = useLocation().state;
  prop ? (currentUser = prop) : ({ currentUser } = loggedUser);
  const getData = async () => {
    const url = `http://localhost/api/check/${currentUser.email}`;
    const url2 = `http://localhost/api/remainingLeaves/${currentUser.email}`;
    let response = await axios.get(url);
    response = response.data;
    console.log(response);
    setData(response);
    let response2 = await axios.get(url2);
    response2 = response2.data;
    setRemaining(response2);
  };
  useEffect(getData, []);
  console.log(data);
  return (
    <>
      <Nav />
      <h3 style={{ padding: "1rem", textAlign: "center" }}>Applied Leaves</h3>
      <Container
        fluid
        className='d-flex justify-content-center align-items-center'
        style={{ marginTop: "2%" }}
      >
        <Table
          striped
          bordered
          hover
          responsive
          variant='dark'
          style={{
            textAlign: "center",
            opacity: "75%",
            border: "2px solid white"
          }}
        >
          <thead
            style={{
              backgroundColor: "rgba(33,37,41,0.9)",
              color: "whitesmoke"
            }}
          >
            <tr>
              <th>Leave applied on (yyyy/mm/dd)</th>
              <th>Number of days</th>
              <th>Type of leave</th>
              <th>Reason</th>
              <th>Contact Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map(m => {
              return (
                <tr>
                  <td>{m.from_date}</td>
                  <td>{m.nodays}</td>
                  <td>{m.leavetype}</td>
                  <td>{m.reason}</td>
                  <td>{m.contact}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <h3 style={{ padding: "1rem", marginTop: "10%", textAlign: "center" }}>
        Remaining Leaves
      </h3>
      <Container
        fluid
        className='d-flex justify-content-center align-items-center'
        style={{ marginTop: "2%" }}
      >
        <Table
          striped
          bordered
          responsive
          hover
          variant='dark'
          style={{ textAlign: "center", marginBottom: "5%", opacity: "75%" }}
        >
          <thead
            style={{
              backgroundColor: "rgba(33,37,41,0.9)",
              color: "whitesmoke"
            }}
          >
            <tr>
              <th>Leave Type</th>
              <th>Max number of leaves for that type</th>
              <th>Remaining number of leaves</th>
            </tr>
          </thead>
          <tbody>
            {remaining.map(m => {
              return (
                <tr>
                  <td>{m.description}</td>
                  <td>{m.max_leaves}</td>
                  <td>{m.remaining_leaves}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default CheckLeaves;
