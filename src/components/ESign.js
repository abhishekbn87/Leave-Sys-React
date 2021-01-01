import React, { useState, useRef, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import SignaturePad from "react-signature-canvas";
import "../components/signature.css";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import { Button, Container, Card } from "react-bootstrap";
import Nav from "./Nav";
import axios from "axios";
import { AuthContext } from "../Auth";

const ESign = () => {
	const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url
	const [isOpen, setIsOpen] = useState(false);
	const props = useLocation().state;
	const [date, setDate] = useState(null);
	const [time, setTime] = useState(null);
	const [email, setEmail] = useState(null);
	const history = useHistory();

	useEffect(() => {
		setDate(props.date);
		setTime(props.time);
		setEmail(props.email);
	}, []);
	console.log(date, time, email);
	// console.log(imageURL);

	const sigCanvas = useRef({});

	/* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
	const clear = () => sigCanvas.current.clear();

	/* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
	const save = async () => {
		const canvas = sigCanvas.current.getCanvas();
		setImageURL(canvas.toDataURL("image/png"));
		await axios
			.post(`https://leavesysbit.pythonanywhere.com/api/sign`, {
				email: email,
				date: date,
				time: time,
				url: imageURL,
			})
			.then((res) => {
				console.log(res.data);
				if (res.data == "error") alert("Something went wrong Try saving again");
				else {
					alert("Signed succesfully");
					setIsOpen(!isOpen);
					history.push("/checkAlt");
				}
			});
	};

	return (
		<>
			<Nav />
			<h3
				style={{
					textAlign: "center",
					margin: "1rem",
				}}
			>
				E-sign
			</h3>
			<Container
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				fluid
			>
				<Card className="w-100 d-flex align-items-center justify-content-center">
					<Card.Body>
						<Button
							style={{
								width: "5rem",
							}}
							onClick={() => setIsOpen(!isOpen)}
						>
							Sign
						</Button>
						{isOpen && (
							<div className="popup-box">
								<div className="box">
									<SignaturePad
										ref={sigCanvas}
										canvasProps={{
											className: "signatureCanvas",
										}}
									/>
									<section
										style={{
											display: "grid",
											marginTop: "1rem",
											gridTemplateColumns:
												"repeat(auto-fit, minmax(240px, 1fr))",
											gap: "1rem",
										}}
									>
										<Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
										<Button onClick={save}>Save</Button>
										<Button onClick={clear}>Clear</Button>
									</section>
								</div>
							</div>
						)}
						<br />
						<br />
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default ESign;
