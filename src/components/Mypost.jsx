import React, { useState, useEffect } from "react";
import useSession from "../useSession";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import CardBook from "./CardBook";
import { Row, Container } from "react-bootstrap";

const MyPosts = () => {
	const [currentPageMyPost, setCurrentPageMyPost] = useState(1);
	const [myPostsData, setMyPostData] = useState(null);
	const session = useSession();
	console.log("My DATA:", myPostsData);

	const getPosts = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/blogposts/${session.id}?page=${currentPageMyPost}` //B)
			);
			const data = await response.json();
			setMyPostData(data);
		} catch (e) {
			console.log(e);
		}
	};
	const handlePagination = (value) => {
		setCurrentPageMyPost(value);
	};
	useEffect(() => {
		getPosts();
	}, [currentPageMyPost]);
	return (
		<>
			<h2 className="text-light">I mie Post</h2>
			<hr className="text-light" />
			<ResponsivePagination
				current={currentPageMyPost}
				total={myPostsData && myPostsData.totalPages}
				onPageChange={handlePagination}
			/>
			<Container className="container">
				<Row>
					<div className="d-flex flex-wrap">
						{myPostsData &&
							myPostsData.blogposts?.map((post) => {
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
										allowUpdate={true}
									/>
								);
							})}
					</div>
				</Row>
			</Container>
		</>
	);
};

export default MyPosts;
