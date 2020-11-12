import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import { Container, Card, Button, Table } from "react-bootstrap";
import { AuthContext } from "../Auth";
import axios from "axios";

const CheckLeaves = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const getData = async () => {
    const url = `http://localhost/api/check/${currentUser.email}`;
    let response = await axios.get(url);
    response = response.data;
    console.log(response);
    setData(response);
  };
  useEffect(getData, []);
  console.log(data);
  return (
    <>
      <Nav />
      <Container
        fluid
        className='d-flex justify-content-center align-items-center'
        style={{ marginTop: "5%" }}
      >
        <Table striped bordered responsive style={{ textAlign: "center" }}>
          <thead
            style={{
              backgroundColor: "rgba(33,37,41,0.9)",
              color: "whitesmoke"
            }}
          >
            <tr>
              <th>Leave applied on</th>
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
    </>
  );
};

export default CheckLeaves;
