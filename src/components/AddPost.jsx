import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormPost from "./FormPost";

function AddPost() {
	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
		window.location.reload();
	};
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Aggiungi un post!
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Aggiungi un Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormPost />
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

export default AddPost;
