import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import Nav from "./Nav";
import axios from "axios";
import { AuthContext } from "../Auth";

const CheckAlt = () => {
	const [from, setFrom] = useState([]);
	const [to, setTo] = useState([]);
	const { currentUser } = useContext(AuthContext);
	const [isTeaching, setIsTeaching] = useState(true);
	const history = useHistory();

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
		var flag = await axios.get(
			`https://leavesysbit.pythonanywhere.com/api/checkTeaching/${currentUser.email}`
		);
		flag = flag.data;
		setIsTeaching(flag);
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
				className="d-flex justify-content-center align-items-center"
				style={{ marginTop: "2%" }}
			>
				<Table
					striped
					bordered
					hover
					responsive
					variant="dark"
					style={{
						textAlign: "center",
						border: "2px solid white",
					}}
				>
					<thead
						style={{
							backgroundColor: "rgba(33,37,41,0.9)",
							color: "whitesmoke",
						}}
					>
						<tr>
							<th>Leave applied on (yyyy/mm/dd)</th>
							{isTeaching && <th>Semester</th>}
							{isTeaching && <th>Subject</th>}
							<th>Time</th>
							<th>Assigned To : email</th>
							<th>Assigned To : </th>
							<th>Approve Status</th>
						</tr>
					</thead>
					<tbody>
						{to.map((m) => {
							if (m.date)
								return (
									<tr>
										<td>{m.date}</td>
										{isTeaching && <td>{m.sem}</td>}
										{isTeaching && <td>{m.subject}</td>}
										<td>{m.time}</td>
										<td>{m.email}</td>
										<td>{m.name}</td>
										{m.approved ? (
											<td>
												<a
													href={`https://leavesysbit.pythonanywhere.com/api/downloadAlt/${currentUser.email}/${m.name}/${m.date}/${m.time}`}
													target="_blank"
													download
												>
													<Button>Download Approval</Button>
												</a>
											</td>
										) : (
											<td>Pending....</td>
										)}
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
				className="d-flex justify-content-center align-items-center"
				style={{ marginTop: "2%", marginBottom: "5%" }}
			>
				<Table
					striped
					bordered
					hover
					responsive
					variant="dark"
					style={{
						textAlign: "center",
						border: "2px solid white",
					}}
				>
					<thead
						style={{
							backgroundColor: "rgba(33,37,41,0.9)",
							color: "whitesmoke",
						}}
					>
						<tr>
							<th>Leave applied on (yyyy/mm/dd)</th>
							{isTeaching && <th>Semester</th>}
							{isTeaching && <th>Subject</th>}
							<th>Time</th>
							<th>Assigned By : email</th>
							<th>Assigned By : </th>
							<th>Sign and Approve</th>
						</tr>
					</thead>
					<tbody>
						{from.map((m) => {
							if (m.date)
								return (
									<tr>
										<td>{m.date}</td>
										{isTeaching && <td>{m.sem}</td>}
										{isTeaching && <td>{m.subject}</td>}
										<td>{m.time}</td>
										<td>{m.email}</td>
										<td>{m.name}</td>
										{m.approved ? (
											<td>Signed and Approved</td>
										) : (
											<td>
												<Button
													onClick={() =>
														history.push("/esign", {
															date: m.date,
															time: m.time,
															email: m.email,
														})
													}
												>
													Sign Approval
												</Button>
											</td>
										)}
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
