import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";

import Register from "./Register";
import FooterBottom from "./Footer";

/*)con questa funzione prendo i valori degli inpunt e li mette 
dentro lo stato loginData*/
const Login = () => {
	const [loginData, setLoginData] = useState({});
	const [login, setLogin] = useState(null);
	const navigate = useNavigate();

	const handleInpuntChange = (e) => {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value,
		});
	};
	//al submit della pagina fai partire la fetch della post
	//mi trasformo in una stringa i dati di loginData
	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/login`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(loginData),
				}
			);
			const data = await response.json();
			// se effettivamente abbiamo il token, mettimi nello localstorage il token e mi porti alla home
			if (data.token) {
				localStorage.setItem("loggedInUser", JSON.stringify(data.token));
				return navigate("/home");
			}

			setLogin(data);
		} catch (error) {
			console.log("Error:", error);
		}
	};

	const redirectForLoginWithGithub = () => {
		window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
	};

	return (
		<>
			<Container fluid className="bg-dark myPadding">
				<Row>
					<Form className="bg-dark text-light" onSubmit={onSubmit}>
						<h1 className="text-center bg-dark pt-5 Mytitle">EpicBlog</h1>
						<Row className="mb-3">
							<h3>Login Page</h3>
							<Form.Group as={Col} md="4" controlId="validationCustom01">
								<Form.Label>E-mail: </Form.Label>
								<Form.Control
									type="email"
									placeholder="email"
									name="email"
									required
									onChange={handleInpuntChange}
								/>
								<Form.Label>Password :</Form.Label>
								<Form.Control
									type="password"
									name="password"
									required
									onChange={handleInpuntChange}
								/>
							</Form.Group>
						</Row>
						<Button className="m-2" type="submit">
							Login!
						</Button>
						<Register />
						<Button
							className="m-2"
							onClick={() => redirectForLoginWithGithub()}
						>
							Login with Github!
						</Button>
					</Form>
				</Row>
				<FooterBottom />
			</Container>
		</>
	);
};

export default Login;
