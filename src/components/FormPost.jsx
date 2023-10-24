import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import useSession from "../useSession";

const FormPost = () => {
	const [validated, setValidated] = useState(false);
	const [file, setFile] = useState(null);
	const [fileAvatar, setFileAvatar] = useState(null);
	const [formData, setFormData] = useState({});
	const session = useSession();
	const onChangeSetFile = (e) => {
		setFile(e.target.files[0]);
	};

	const uploadFile = async (dataFile) => {
		const fileData = new FormData();
		fileData.append("urlFile", dataFile);

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/blogposts/cloudUpload`,
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

	const uploadFileAvatar = async (avatar) => {
		const fileAvatar = new FormData();
		fileAvatar.append("avatar", avatar);

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/blogposts/cloudUpload`,
				{
					method: "POST",
					body: fileAvatar,
				}
			);
			return await response.json();
		} catch (error) {
			console.log(error, "Error during  uploadFileAvatar");
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (file) {
			try {
				const uploadCover = await uploadFile(file);
				let uploadAvatar = null;
				if (fileAvatar) {
					uploadAvatar = await uploadFile(fileAvatar);
				}

				console.log(uploadCover);
				const finalBody = {
					category: formData.category,
					title: formData.title,
					cover: uploadCover.urlFile,
					readTime: {
						value: Number(formData.value),
						unit: formData.unit,
					},
					content: formData.content,
					author: session.id,
				};
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/blogposts/create`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
						body: JSON.stringify(finalBody),
					}
				);
				alert("Post Caricato con successo!!");
				window.location.reload();

				return response.json();
			} catch (error) {
				console.log(error);
			}
		} else {
			alert("Per favore seleziona almeno un file!");
		}
	};

	return (
		<Form
			noValidate
			validated={validated}
			encType="multipart/form-data"
			onSubmit={onSubmit}
		>
			<Row className="mb-3">
				<Form.Group as={Col} md="4" controlId="validationCustom01">
					<Form.Label>Category :</Form.Label>
					<Form.Control
						required
						type="text"
						name="category"
						onChange={(e) =>
							setFormData({
								...formData,
								category: e.target.value,
							})
						}
					/>
				</Form.Group>
				<Form.Group as={Col} md="4" controlId="validationCustom02">
					<Form.Label>Title :</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="title"
						name="title"
						onChange={(e) =>
							setFormData({
								...formData,
								title: e.target.value,
							})
						}
					/>
				</Form.Group>
				<Form.Group as={Col} md="4" controlId="validationCustomUsername">
					<Form.Label>Cover :</Form.Label>
					<Form.Control
						type="file"
						name="cover"
						onChange={onChangeSetFile}
						required
					/>
				</Form.Group>
			</Row>
			<Row className="mb-3">
				<Form.Group as={Col} md="4" controlId="validationCustomUsername">
					<Form.Label>Read Time:</Form.Label>
					<Form.Control
						type="number"
						placeholder="Example: 20"
						name="value"
						onChange={(e) =>
							setFormData({
								...formData,
								value: e.target.value,
							})
						}
					/>
					<Form.Group controlId="formBasicSelect">
						<Form.Label>Select unit :</Form.Label>
						<Form.Control
							type="text"
							placeholder="Example: minuts"
							name="unit"
							onChange={(e) =>
								setFormData({
									...formData,
									unit: e.target.value,
								})
							}
						/>
					</Form.Group>
				</Form.Group>
			</Row>
			<Row>
				<Form.Label>Content :</Form.Label>
				<Form.Control
					className="mb-2"
					type="text"
					name="content"
					onChange={(e) =>
						setFormData({
							...formData,
							content: e.target.value,
						})
					}
					required
				/>
			</Row>
			<Button type="submit">Submit form</Button>
		</Form>
	);
};

export default FormPost;
