import React, { useContext, useState, useEffect } from "react";
import { Navbar, Button, Image } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import app from "../firebase";
import { AuthContext } from "../Auth";
import logo from "../assets/Leave-Sys_Logo.png";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Nav = () => {
	const { currentUser } = useContext(AuthContext);
	const history = useHistory();
	const url = `https://leavesysbit.pythonanywhere.com/api/nav/${currentUser.email}`;
	const [name, setName] = useState(null);
	const [img, setImg] = useState(null);

	const getName = async () => {
		var navData = await axios.get(url);
		navData = navData.data;
		setName(navData[0].name);
		setImg(navData[0].url);
	};

	useEffect(getName, [name, img]);
	return (
		<Router>
			<Navbar
				bg="dark"
				variant="dark"
				className="d-flex justify-content-center align-items-center"
			>
				<Image
					src={logo}
					style={{
						marginRight: "1rem",
						cursor: "pointer",
						borderRadius: "5%",
						width: "5vw",
						height: "auto",
					}}
					onClick={() => history.push("/")}
				/>
				<p style={{ color: "whitesmoke", fontSize: "2vw", marginTop: "1rem" }}>
					Signed In as : {name}
				</p>
				<Navbar.Collapse className="justify-content-end">
					<Image
						src={img}
						style={{
							width: "7vw",
							height: "7vw",
							marginRight: "1rem",
							borderRadius: "50%",
							objectFit: "cover",
						}}
					/>
					<Button
						onClick={() => app.auth().signOut()}
						style={{ marginRight: "0.5rem", fontSize: "1vw" }}
					>
						Sign Out
					</Button>
				</Navbar.Collapse>
			</Navbar>
		</Router>
	);
};

export default Nav;
