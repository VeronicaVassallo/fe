import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";
import "./style.css";

import { BsFillBrushFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";

import ModifyCover from "./ModifyCover";
import CommentModal from "./CommentsModal";

const CardBook = (prop) => {
	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
		window.location.reload();
	};
	const handleShow = () => setShow(true);

	//Detele Post
	const deletePost = async () => {
		debugger;
		try {
			const deleteMySiglePost = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/blogposts/${prop._id}`,
				{
					method: "DELETE",
				}
			);
			alert("Il tuo post è stato cancellato con successo!");
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Card as={Col} md="4" xs="12">
			<div
				onClick={deletePost}
				className={`${prop.allowUpdate ? "p-2 trashSize m-1" : "d-none"} `}
			>
				<BsFillTrashFill />
			</div>
			<Card.Body className="myCard d-flex flex-column justify-content-between mb-2">
				<div>
					<BsFillBrushFill
						className={`${prop.allowUpdate ? "mysize" : "d-none"} `}
						onClick={handleShow}
					/>

					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Modifica Cover</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ModifyCover idCard={prop._id} />
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
				<div>
					<div className="myCardImg">
						<img className="myImg" src={prop.cover} alt="img_img" />
					</div>
				</div>
				<div>
					<Card.Title>{prop.title}</Card.Title>
					<Card.Text>Category: {prop.category}</Card.Text>
					<Card.Text>Content: {prop.content}</Card.Text>
					<p>
						Read time: {prop.value} {prop.unit}
					</p>
					<div className="d-flex justify-content-around ">
						<div>Author: {prop.name}</div>
						<div className="myAvatar mx-4">
							<img className="myImgAvatar" src={prop.avatar} alt="img_avatar" />
						</div>
					</div>
				</div>
			</Card.Body>
			<CommentModal _id={prop._id} />
		</Card>
	);
};

export default CardBook;
