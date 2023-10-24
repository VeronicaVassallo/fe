import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import useSession from "../useSession";

function CommentModal(_id) {
	const [show, setShow] = useState(false);
	const [commentsSiglePost, setCommentsSinglePost] = useState({});
	const session = useSession();

	//dati form
	const [formData, setFormData] = useState({});

	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => {
		setShow(true);
		getAllCommentsFromSiglePost();
	};

	//ritorna i commenti del post specifico
	const getAllCommentsFromSiglePost = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/blogPost/${_id._id}/comments/`
			);
			const data = await response.json();
			setCommentsSinglePost(data);
			console.log("SHOW", commentsSiglePost);
		} catch (error) {
			console.log("commensts: ", error);
		}
	};

	//post data form

	const postFormData = async () => {
		debugger;
		try {
			const finalBody = {
				commentText: formData.commentText,
				rate: formData.rate,
				idBlogPost: _id._id,
				author: session.id,
			};

			const responsePost = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/blogPost/${_id._id}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(finalBody),
				}
			);
			alert("Commento inviato con successo");
			window.location.reload();
			return;
			responsePost.json();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Recensioni
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Aggiungi una Recensione</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<Form.Group as={Col} md="4" controlId="validationCustom02">
							<Form.Label>Valutazione da 1 a 5 :</Form.Label>
							<Form.Control
								required
								type="number"
								name="rate"
								onChange={(e) =>
									setFormData({
										...formData,
										rate: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group as={Col} md="4" controlId="validationCustom01">
							<Form.Label>commento :</Form.Label>
							<Form.Control
								required
								type="text"
								name="commentText"
								onChange={(e) =>
									setFormData({
										...formData,
										commentText: e.target.value,
									})
								}
							/>
						</Form.Group>
					</div>
					<hr />
					<Modal.Title>Recensioni utenti</Modal.Title>

					{commentsSiglePost.payload?.map((post) => {
						return (
							<div>
								<hr />
								<div className="d-flex justify-content-end">
									<div className="mx-5">valutazione: {post.rate} </div>
									<div>Autore : {post.author.nome}</div>

									<div className="myAvatar mx-4">
										<img
											className="myImgAvatar"
											src={post.author.avatar}
											alt="img_avatar"
										/>
									</div>
								</div>
								<p>{post.commentText}</p>
								<hr />
							</div>
						);
					})}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={postFormData}>
						invia commento
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default CommentModal;
