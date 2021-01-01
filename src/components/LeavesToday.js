import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Container, Card, Table, Button } from "react-bootstrap";
import axios from "axios";
const today = new Date().toISOString().slice(0, 10);
const LeavesToday = () => {
	const [data, setData] = useState([]);
	const [approved, setApproved] = useState([]);
	const getData = async () => {
		let response = await axios.get(
			`https://leavesysbit.pythonanywhere.com/api/today/${today}`
		);
		response = response.data;
		setData(response);
	};

	const clickHandler = async (name, type) => {
		setApproved(false);
		const url = `https://leavesysbit.pythonanywhere.com/api/approve/${name}/${type}/${today}`;
		const postData = { name, type, today };
		await axios.post(url, postData).then((response) => {
			if (response.data) {
				alert("Approved Leave");
				getData();
			}
		});
	};

	useEffect(getData, []);
	console.log(data);
	return (
		<>
			<Nav />
			<h3 style={{ padding: "1rem", textAlign: "center" }}>
				Leaves Applied Today
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
							<th>Applied By</th>
							<th>Type of leave</th>
							<th>Leave applied Till (inclusive)</th>
							<th>Reason</th>
							<th>Approve</th>
						</tr>
					</thead>
					<tbody>
						{data.map((m) => {
							if (m.type)
								return (
									<tr>
										<td>{m.name}</td>
										<td>{m.type}</td>
										<td>{m.date}</td>
										<td>{m.reason}</td>
										{m.approved ? (
											<td>Approved</td>
										) : (
											<td>
												<Button onClick={() => clickHandler(m.name, m.type)}>
													Approve
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

export default LeavesToday;
