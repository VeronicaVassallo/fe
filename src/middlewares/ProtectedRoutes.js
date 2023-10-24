import { Outlet } from "react-router-dom";

import Login from "../components/Login";

export const isAuth = () => {
	return JSON.parse(localStorage.getItem("loggedInUser")); //ci tornera un true o false se questo "loggedInUser" esiste nel localStorage
};

const ProtectedRoutes = () => {
	const auth = isAuth();

	return auth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
