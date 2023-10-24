import LatestPost from "./components/LatestPost";
import NavBar from "./components/NavBar";
import useSession from "./useSession";
import FooterBottom from "./components/Footer";
import ModifyUser from "./components/ModifyUser";
import MyPosts from "./components/Mypost";

function Home() {
	//20
	const session = useSession();
	console.log("nome:", session);

	console.log("la sessione:", session); // questo console conterra tutte le informazioni della session
	return (
		<div className="App bg-dark">
			<NavBar />
			<p className="text-light"> WELCOME {session.nome}</p>
			<ModifyUser />
			<MyPosts />
			<LatestPost />
			<FooterBottom />
		</div>
	);
}

export default Home;
