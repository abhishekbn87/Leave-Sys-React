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
	FormLabel,
	FormControl,
} from "react-bootstrap";
import Nav from "./Nav";
import { AuthContext } from "../Auth";

const ApplyLeave = () => {
	const [data, setData] = useState({
		from: "",
		to: "",
		type: "",
		reason: "",
		contactAdress: "",
	});

	const [leaveTypes, setLeaveTypes] = useState([]);
	const [showRadio, setShowRadio] = useState(false);
	const [showToDate, setShowToDate] = useState(true);
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);

	const submitHandler = async (e) => {
		e.preventDefault();
		var flag = await axios.get(
			`https://leavesysbit.pythonanywhere.com/api/checkTeaching/${currentUser.email}`
		);
		flag = flag.data;
		setData(data);
		// const differenceInDays = data.to.getTime() - data.from.getTime();
		const url = `https://leavesysbit.pythonanywhere.com/api/apply/${
			currentUser.email
		}/${data.from}/${data.to || data.from}/${data.type}/${data.reason}/${
			data.contactAdress
		}/${!showToDate}`;
		const obj = { data };
		await axios.post(url, data).then((response) => {
			if (response.data == false) {
				alert("Too many leaves applied for mentioned type");
			} else {
				alert("Leave applied successfully");
				console.log(response.data);
				const prop = response.data[2];
				if (flag) {
					history.push("/alternateArrangement", { prop, flag: "teaching" });
				} else {
					history.push("/alternateArrangement", { prop, flag: "nonTeaching" });
				}
			}
		});
	};

	const getOptions = async () => {
		let options = await axios.get(
			`https://leavesysbit.pythonanywhere.com/api/leaveTypes/${currentUser.email}`
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
				className="d-flex justify-content-center align-items-center"
				style={{ marginTop: "2%", padding: "1rem" }}
			>
				<Card className="w-100">
					<Card.Body>
						<Form onSubmit={submitHandler}>
							<FormGroup>
								<Form.Label>From : </Form.Label>
								<Form.Control
									type="date"
									value={data.from}
									required
									onChange={(e) => {
										setData({ ...data, from: e.target.value });
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Form.Label>Type : </Form.Label>
								<Form.Control
									as="select"
									required
									value={data.type}
									onChange={(e) => {
										console.log(e.target.value);
										if (e.target.value == "Casual Leave") setShowRadio(true);
										else {
											setShowRadio(false);
											setShowToDate(true);
										}
										setData({ ...data, type: e.target.value });
									}}
								>
									<option></option>
									{leaveTypes.map((m) => {
										return <option key={m.lid}>{m.description}</option>;
									})}
								</Form.Control>
								{showRadio && (
									<FormGroup
										onChange={(e) => {
											console.log(e.target.value);
											if (e.target.value == "halfDay") setShowToDate(false);
											else setShowToDate(true);
										}}
									>
										<Form.Check
											inline
											label="Full Day"
											type="radio"
											name="subtype"
											value="fullDay"
										/>
										<Form.Check
											inline
											label="Half Day"
											type="radio"
											name="subtype"
											value="halfDay"
										/>
									</FormGroup>
								)}
							</FormGroup>
							{showToDate && (
								<FormGroup>
									<Form.Label>To : </Form.Label>
									<Form.Control
										type="date"
										value={data.to}
										required
										onChange={(e) => {
											setData({ ...data, to: e.target.value });
										}}
										min={data.from}
									/>
								</FormGroup>
							)}

							<FormGroup>
								<Form.Label>Reason :</Form.Label>
								<Form.Control
									type="text"
									required
									value={data.reason}
									onChange={(e) => {
										setData({ ...data, reason: e.target.value });
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Form.Label>Contact Address when on Leave : </Form.Label>
								<Form.Control
									type="text"
									required
									value={data.contactAdress}
									onChange={(e) => {
										setData({ ...data, contactAdress: e.target.value });
									}}
								/>
							</FormGroup>
							<Button
								type="submit"
								style={{ maxWidth: "200px" }}
								className="w-100"
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
