import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import jwt_decode from "jwt-decode";
import LatestPost from "./LatestPost";
import FooterBottom from "./Footer";
import { useEffect, useState } from "react";
import useSession from "../useSession";

function Success() {
	const session = useSession();
	const { token } = useParams(); //visualizzo il token
	const decoded = jwt_decode(token); // mi decodifica i dati contenuti dentro il token
	//console.log("token:", token);
	console.log("Decoded:", decoded);

	const [startData, setStartData] = useState(false);

	const authorGit = {
		nome: decoded.username,
		cognome: decoded.username,
		email: "NULL",
		password: "NULL",
		dataDiNascita: "NULL",
		avatar: decoded.photos[0].value,
		idGit: decoded.id,
	};
	///authors/create/github

	const getDataGit = async () => {
		debugger;
		try {
			const responseGit = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/authors/create/github`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(authorGit),
				}
			);
			const data = await responseGit.json();
			session.id = data.authorGit.idGit;
			setStartData(true);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getDataGit();
	}, []);

	return (
		<div className="bg-dark">
			<NavBar />
			<div className="bg-dark">
				<p>Welcome {decoded.username}</p>
				<div className="myAvatar mx-4 MyHover">
					<img
						className="myImgAvatar"
						src={decoded.photos[0].value}
						alt="img_avatar"
					/>
				</div>
			</div>
			{startData ? <LatestPost /> : <></>}
			<FooterBottom />
		</div>
	);
}

export default Success;
