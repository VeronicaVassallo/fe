import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const ModifyCover = (idCard) => {
	const [id, setId] = useState(idCard); //id del singolo postBlog
	console.log("Quest è l'id del post:", id);
	const [file, setfile] = useState(null); //valore del file

	const onChageSetFile = (e) => {
		setfile(e.target.files[0]);
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

	const OnSubmit = async (e) => {
		debugger;
		e.preventDefault();

		if (file) {
			try {
				const uploadCover = await uploadFile(file);
				console.log(uploadCover);
				const finalBody = {
					cover: uploadCover,
				};
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/blogpost/${id.idCard}/cover`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						method: "PATCH",
						body: JSON.stringify(finalBody),
					}
				);
				window.location.reload();

				return response.json();
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("Seleziona almeno un file");
		}
	};

	return (
		<Form encType="multipart/form-data" onSubmit={OnSubmit}>
			<Row className="mb-3">
				<Form.Group as={Col} md="4" controlId="validationCustom01">
					<Form.Label>Cover: :</Form.Label>
					<Form.Control
						type="file"
						name="cover"
						onChange={onChageSetFile}
						required
					/>
				</Form.Group>
			</Row>
			<Button type="submit">Submit form</Button>
		</Form>
	);
};

export default ModifyCover;
