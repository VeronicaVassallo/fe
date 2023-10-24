import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FooterBottom = () => {
	return (
		<Container fluid className=" bg-dark pt-5 text-light mb-auto">
			<Row>
				<Col lg="4">
					<h5 className="title">Links</h5>
					<ul>
						<li className="list-unstyled">
							<a href="#!">Link 1</a>
						</li>
						<li className="list-unstyled">
							<a href="#!">Link 2</a>
						</li>
						<li className="list-unstyled">
							<a href="#!">Link 3</a>
						</li>
						<li className="list-unstyled">
							<a href="#!">Link 4</a>
						</li>
					</ul>
				</Col>
				<Col lg="4">
					<h5 className="title">Links</h5>
					<ul>
						<li className="list-unstyled">
							<a href="#!">Link 1</a>
						</li>
						<li className="list-unstyled">
							<a href="#!">Link 2</a>
						</li>
						<li className="list-unstyled">
							<a href="#!">Link 3</a>
						</li>
						<li className="list-unstyled">
							<a href="#!">Link 4</a>
						</li>
					</ul>
				</Col>
				<Col lg="4">
					<h5 className="title">Links</h5>
					<ul>
						<li className="list-unstyled">
							<a href="#!">Link 1</a>
						</li>
						<li className="list-unstyled">
							<a href="#!">Link 2</a>
						</li>
						<li className="list-unstyled">
							<a href="#!">Link 3</a>
						</li>
						<li className="list-unstyled">
							<a href="#!">Link 4</a>
						</li>
					</ul>
				</Col>
			</Row>
		</Container>
	);
};

export default FooterBottom;
