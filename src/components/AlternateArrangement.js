import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
	Container,
	Card,
	Form,
	Button,
	div,
	Row,
	ButtonGroup,
} from "react-bootstrap";
import Nav from "./Nav";
import { AuthContext } from "../Auth";

const AlternateArrangement = () => {
	const { currentUser } = useContext(AuthContext);
	const [isTeaching, setIsTeaching] = useState(false);
	const history = useHistory();
	console.log(currentUser.email);
	console.log(useLocation().state.from_date, useLocation().state.to_date);
	const dates = useLocation().state.prop;

	console.log(useLocation().state.flag);
	console.log(dates);

	const [faculty, setFaculty] = useState([]);

	const getFaculty = async () => {
		let facultyNames = await axios.get(
			`https://leavesysbit.pythonanywhere.com/api/Lecturers/${currentUser.email}`
		);
		facultyNames = facultyNames.data;
		setFaculty(facultyNames);
		var flag = await axios.get(
			`https://leavesysbit.pythonanywhere.com/api/checkTeaching/${currentUser.email}`
		);
		flag = flag.data;
		setIsTeaching(flag);
	};

	useEffect(getFaculty, []);
	console.log(isTeaching);

	const datesArray = [];
	dates.map((m) => {
		datesArray.push(new Date(m));
	});

	console.log(datesArray);

	const [fields, setFields] = useState([{ num: 1, value: null }]);
	const [data, setData] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const dateRef = useRef();
	const semRef = useRef();
	const secRef = useRef();
	const subRef = useRef();
	const timeRef = useRef();
	const facultyRef = useRef();

	const getSubjects = async () => {
		if (semRef.current.value) {
			let response = await axios.get(
				`https://leavesysbit.pythonanywhere.com/api/subjects/${semRef.current.value}`
			);
			response = response.data;
			setSubjects(response);
		}
	};

	const addCard = () => {
		const values = [...fields];
		values.push({ num: values[values.length - 1].num + 1, value: null });
		setFields(values);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (isTeaching) {
			let obj = {
				date: "",
				semester: "",
				section: "",
				subject: "",
				time: "",
				faculty: "",
			};
			obj.date = dateRef.current.value;
			obj.semester = semRef.current.value;
			obj.subject = subRef.current.value;
			obj.time = timeRef.current.value;
			obj.faculty = facultyRef.current.value;
			obj.section = secRef.current.value;
			const url = `https://leavesysbit.pythonanywhere.com/api/alternate/${currentUser.email}/${obj.date}/${obj.semester}/${obj.section}/${obj.subject}/${obj.time}/${obj.faculty}`;
			obj = { obj };
			axios.post(url, obj).then((response) => {
				console.log(response);
				if (response.status == 200)
					alert(
						"Alternate Arrangement done!! We will let " +
							facultyRef.current.value +
							" know"
					);
			});
		} else {
			let obj = {
				date: "",
				time: "",
				faculty: "",
			};
			obj.date = dateRef.current.value;
			obj.time = timeRef.current.value;
			obj.faculty = facultyRef.current.value;
			const url = `https://leavesysbit.pythonanywhere.com/api/nonTeachingAlternate/${currentUser.email}/${obj.date}/${obj.time}/${obj.faculty}`;
			obj = { obj };
			axios.post(url, obj).then((response) => {
				console.log(response);
				if (response.status == 200)
					alert(
						"Alternate Arrangement done!! We will let " +
							facultyRef.current.value +
							" know"
					);
			});
		}
	};

	console.log(data);
	console.log(subjects);
	return (
		<>
			<Nav />
			<Container
				fluid
				className="d-flex justify-content-center align-items-center"
				style={{ marginTop: "5%" }}
			>
				<Card className="w-100 p-3">
					<Card.Body>
						<Form>
							{fields.map((field) => {
								return (
									<section
										style={{
											margin: "1.5rem",
											display: "grid",
											gridTemplateColumns:
												"repeat(auto-fit, minmax(200px, 1fr))",
											gap: "0.5rem",
											padding: "1%",
										}}
										key={field.num}
									>
										<div>
											<Form.Group>
												<Form.Label>Date: </Form.Label>
												<Form.Control as="select" ref={dateRef} required>
													<option></option>
													{datesArray.map((m) => {
														return <option>{m.toDateString()}</option>;
													})}
												</Form.Control>
											</Form.Group>
										</div>

										{isTeaching && (
											<>
												<div>
													<Form.Group>
														<Form.Label>Semester : </Form.Label>
														<Form.Control
															as="select"
															ref={semRef}
															required
															onChange={() => getSubjects()}
														>
															<option></option>
															<option>1</option>
															<option>2</option>
															<option>3</option>
															<option>4</option>
															<option>5</option>
															<option>6</option>
															<option>7</option>
															<option>8</option>
														</Form.Control>
													</Form.Group>
												</div>
											</>
										)}

										{isTeaching && (
											<>
												<div>
													<Form.Group>
														<Form.Label>Section : </Form.Label>
														<Form.Control ref={secRef} required as="select">
															<option>A</option>
															<option>B</option>
															<option>C</option>
														</Form.Control>
													</Form.Group>
												</div>
												<div>
													<Form.Group>
														<Form.Label>Subject : </Form.Label>
														<Form.Control ref={subRef} required as="select">
															<option></option>
															{subjects.map((f) => {
																return (
																	<option>
																		{f.subjectCode} - {f.subject}
																	</option>
																);
															})}
														</Form.Control>
													</Form.Group>
												</div>
											</>
										)}
										<div>
											<Form.Group>
												<Form.Label>Time : </Form.Label>
												<Form.Control as="select" ref={timeRef} required>
													<option></option>
													<option>08:00 - 09:00</option>
													<option>09:00 - 10:00</option>
													<option>10:00 - 11:00</option>
													<option>11:30 - 12:30</option>
													<option>12:30 - 01:30</option>
													<option>02:00 - 03:00</option>
													<option>03:00 - 04:00</option>
													<option>04:00 - 05:00</option>
													<option>08:00 - 11:00</option>
													<option>11:00 - 02:00</option>
													<option>02:00 - 05:00</option>
												</Form.Control>
											</Form.Group>
										</div>

										<div>
											<Form.Group>
												<Form.Label>Faculty : </Form.Label>
												<Form.Control as="select" ref={facultyRef} required>
													<option></option>
													{faculty.map((f) => {
														return <option>{f.name}</option>;
													})}
												</Form.Control>
											</Form.Group>
										</div>
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Button onClick={submitHandler}>Submit</Button>
										</div>
										<hr />
									</section>
								);
							})}

							<section
								style={{
									margin: "1.5rem",
									display: "grid",
									gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
									gap: "0.5rem",
									padding: "1%",
								}}
							>
								<Button onClick={() => addCard()}>Add Field</Button>
								<Button
									onClick={() => {
										var c = window.confirm(
											"Are you sure you have made all required arrangements ? "
										);
										if (c) history.push("/");
										else;
									}}
								>
									Complete Alternate Arrangements
								</Button>
							</section>
						</Form>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default AlternateArrangement;
