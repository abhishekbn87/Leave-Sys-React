import React, { useState, useContext, useEffect } from "react";
import {
  Contianer,
  Card,
  Image,
  Container,
  Col,
  Button
} from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Nav from "./Nav";
import axios from "axios";
import { AuthContext } from "../Auth";
import { useLocation, useHistory } from "react-router-dom";

import app from "../firebase";

const FacultyDetails = () => {
  const [data, setData] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const fromHOD = useLocation().state;
  const history = useHistory();
  console.log(fromHOD);

  const getData = async () => {
    let response = await axios.get(
      `http://localhost/api/Lecturers/${currentUser.email}`
    );
    response = response.data;
    setData(response);
    const storageRef = app.storage().ref();
    const fileRef = storageRef.listAll().then(function(result) {
      result.items.forEach(function(imageRef) {
        // And finally display them
        imageRef.getDownloadURL().then(response => {
          const key = response.slice(81, response.indexOf("j")).slice(0, -1);
          // console.log(key);
          imgs.push({ fid: key, data: response });
          setImgs(imgs);
        });
      });
    });
  };

  useEffect(getData, []);
  console.log(data);
  // console.log(imgs);

  const getImg = fid => {
    // console.log("Called with " + fid);
    // var i = 0;
    console.log(imgs);
    if (imgs.length !== 0) {
      const test = imgs.map(img => console.log(img));
      // console.log(test);
    }
  };

  return (
    <>
      <Nav />
      <Grid
        container
        spacing={3}
        style={{
          marginTop: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {data.map(m => {
          if (m.fid)
            return (
              <Grid item xs={4} style={{ padding: "1rem" }}>
                <Card
                  style={{
                    backgroundColor: "teal",
                    color: "whitesmoke",
                    padding: "2rem"
                  }}
                >
                  <Card.Body>
                    <Image
                      src={m.url}
                      style={{
                        width: "200px",
                        height: "300px",
                        marginBottom: "4%",
                        marginTop: "4%",
                        objectFit: "cover"
                      }}
                    />
                    <h5 style={{ fontSize: "1.5vw" }}>{m.name}</h5>
                    <p>{m.designation}</p>
                    <p>Email : {m.email}</p>
                    <p>Phone : {m.phone}</p>
                    {fromHOD && (
                      <Button
                        style={{ backgroundColor: "#212529" }}
                        onClick={() => {
                          history.push("/checkLeaves", {
                            flag: true,
                            email: m.email
                          });
                        }}
                      >
                        See Leaves
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Grid>
            );
        })}
      </Grid>
    </>
  );
};

export default FacultyDetails;
