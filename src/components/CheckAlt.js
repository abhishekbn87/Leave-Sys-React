import React, { useState, useContext, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import Nav from "./Nav";
import axios from "axios";
import { AuthContext } from "../Auth";

const CheckAlt = () => {
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getData = async () => {
    let response1 = await axios.get(
      `https://leavesysbit.pythonanywhere.com/api/fromAlt/${currentUser.email}`
    );
    response1 = response1.data;
    setTo(response1);
    let response2 = await axios.get(
      `https://leavesysbit.pythonanywhere.com/api/toAlt/${currentUser.email}`
    );
    response2 = response2.data;
    setFrom(response2);
  };

  useEffect(getData, []);
  console.log(to);
  return (
    <>
      <Nav />
      <h3 style={{ padding: "1rem", marginTop: "3%" }}>
        Alternate Arrangements assigned by Me
      </h3>
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
              <th>Semester</th>
              <th>Subject</th>
              <th>Time</th>
              <th>Assigned To : email</th>
              <th>Assigned To : </th>
            </tr>
          </thead>
          <tbody>
            {to.map(m => {
              return (
                <tr>
                  <td>{m.date}</td>
                  <td>{m.sem}</td>
                  <td>{m.subject}</td>
                  <td>{m.time}</td>
                  <td>{m.email}</td>
                  <td>{m.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <h3 style={{ padding: "1rem", marginTop: "3%" }}>
        Alternate Arrangements assigned to Me
      </h3>
      <Container
        fluid
        className='d-flex justify-content-center align-items-center'
        style={{ marginTop: "2%", marginBottom: "5%" }}
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
              <th>Semester</th>
              <th>Subject</th>
              <th>Time</th>
              <th>Assigned By : email</th>
              <th>Assigned By : </th>
            </tr>
          </thead>
          <tbody>
            {from.map(m => {
              return (
                <tr>
                  <td>{m.date}</td>
                  <td>{m.sem}</td>
                  <td>{m.subject}</td>
                  <td>{m.time}</td>
                  <td>{m.email}</td>
                  <td>{m.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default CheckAlt;
