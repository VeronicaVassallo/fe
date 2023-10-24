import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function Register() {
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [show, setShow] = useState(false);
	const [fileAvatar, setFileAvatar] = useState(null);
	const [formData, setFormData] = useState({});

	const onChangeSetFile = (e) => {
		setFileAvatar(e.target.files[0]);
	};

	const uploadFileAvatar = async (avatar) => {
		const fileData = new FormData();
		fileData.append("avatar", avatar);

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/authors/cloudUpload`,
				{
					method: "POST",
					body: fileData,
				}
			);
			return await response.json();
		} catch (error) {
			console.log(error, "Error during  uploadFileAvatar");
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (fileAvatar) {
			try {
				let uploadAvatar = null;
				if (fileAvatar) {
					uploadAvatar = await uploadFileAvatar(fileAvatar);
				}
				const finalBody = {
					nome: formData.nome,
					cognome: formData.cognome,
					email: formData.email,
					password: formData.password,
					dataDiNascita: formData.dataDiNascita,
					avatar: uploadAvatar.avatar,
				};
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/authors/create`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
						body: JSON.stringify(finalBody),
					}
				);
				sendEmail();
				return response.json();
			} catch (error) {
				console.log(error);
			}
		} else {
			console.error("Per favore seleziona almeno un file!");
		}
	};

	//invia la mail alla registrazione

	const sendEmail = async () => {
		try {
			const send = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/send-email`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({
						from: "noreply@epicBlog.com",
						to: formData.email,
						subject: "EpicBlog",
						text: "Bevenuto su EpicBlog",
					}),
				}
			);
			alert("Registrazione inviata con successo!");
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				New user!
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Registrati</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={onSubmit}>
						<Row className="mb-3">
							<Form.Group as={Col} md="4" controlId="validationCustom00">
								<Form.Label>Nome: </Form.Label>
								<Form.Control
									type="text"
									name="nome"
									onChange={(e) =>
										setFormData({
											...formData,
											nome: e.target.value,
										})
									}
									required
								/>
								<Form.Label>Surname: </Form.Label>
								<Form.Control
									type="text"
									name="cognome"
									onChange={(e) =>
										setFormData({
											...formData,
											cognome: e.target.value,
										})
									}
									required
								/>
								<Form.Label>E-mail: </Form.Label>
								<Form.Control
									type="text"
									name="email"
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
									required
								/>
								<Form.Label>Password :</Form.Label>
								<Form.Control
									type="text"
									name="password"
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
									}
									required
								/>
							</Form.Group>
						</Row>
						<Row className="mb-3">
							<Form.Group as={Col} md="4" controlId="validationCustom02">
								<Form.Label>Date of birth: </Form.Label>
								<Form.Control
									type="text"
									name="dataDiNascita"
									onChange={(e) =>
										setFormData({
											...formData,
											dataDiNascita: e.target.value,
										})
									}
									required
								/>
								<Form.Label>Avatar: </Form.Label>
								<Form.Control
									type="file"
									name="avatar"
									onChange={onChangeSetFile}
									required
								/>
							</Form.Group>
						</Row>
						<Button type="submit">Login!</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Register;
