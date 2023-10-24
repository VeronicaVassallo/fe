import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import CardBook from "./CardBook";
import { Col, Row, Container } from "react-bootstrap";
const LatestPost = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const [posts, setPosts] = useState([]);
	const getPosts = async () => {
		debugger;
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/blogposts?page=${currentPage}`
			);
			const data = await response.json();
			setPosts(data);
		} catch (e) {
			console.log(e);
		}
	};
	const handlePagination = (value) => {
		setCurrentPage(value);
	};
	useEffect(() => {
		getPosts();
	}, [currentPage]);
	//c)
	return (
		<>
			<h2 className="text-light">Tutti post</h2>
			<hr className="text-light" />
			<ResponsivePagination
				current={currentPage}
				total={posts && posts.totalPages}
				onPageChange={handlePagination}
			/>
			<Container className="container bg-dark">
				<Row>
					<div className="d-flex flex-wrap">
						{posts &&
							posts.blogposts?.map((post) => {
								return (
									<CardBook
										_id={post._id}
										name={post.author.nome}
										avatar={post.author.avatar}
										title={post.title}
										category={post.category}
										cover={post.cover}
										content={post.content}
										value={post.readTime.value}
										unit={post.readTime.unit}
										allowUpdate={false}
									/>
								);
							})}
					</div>
				</Row>
			</Container>
		</>
	);
};

export default LatestPost;
