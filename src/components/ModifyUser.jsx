import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import useSession from "../useSession";
import "./style.css";

function ModifyUser() {
	const session = useSession();
	const [show, setShow] = useState(false);
	const [file, setfile] = useState(null); //valore del file
	//const [formData, setFormData] = useState({});  valore inpunt
	const [fileAvatar, setFileAvatar] = useState(session.avatar);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onChageSetFile = (e) => {
		setfile(e.target.files[0]);
	};

	const uploadFile = async (dataFile) => {
		const fileData = new FormData();
		fileData.append("avatar", dataFile);

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
			console.log(error, "Error during  uploadFile");
		}
	};

	const OnSubmit = async (e) => {
		e.preventDefault();

		if (file) {
			try {
				const uploadAvatar = await uploadFile(file);
				console.log(uploadAvatar);
				let finalBody = {
					avatar: uploadAvatar,
				};
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/authors/${session.id}/avatar`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						method: "PATCH",
						body: JSON.stringify(finalBody),
					}
				);
				setFileAvatar(finalBody.avatar.avatar);
				return response.json();
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("Seleziona almeno un file");
		}
	};

	return (
		<>
			<div
				className="myAvatar mx-4 MyHover myAvatarPointer"
				onClick={handleShow}
			>
				<img className="myImgAvatar" src={fileAvatar} alt="img_avatar" />
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modifica Avatar</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form encType="multipart/form-data" onSubmit={OnSubmit}>
						<Row className="mb-3">
							<Form.Group as={Col} md="4" controlId="validationCustom01">
								<Form.Label>Avatar :</Form.Label>
								<Form.Control
									type="file"
									name="avatar"
									onChange={onChageSetFile}
									required
								/>
							</Form.Group>
						</Row>
						<Button type="submit">Submit form</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModifyUser;
