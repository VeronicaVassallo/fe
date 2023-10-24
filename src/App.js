import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./components/Login";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import Success from "./components/Success";

const App = () => {
	return (
		<BrowserRouter className="bg-dark">
			<Routes>
				<Route exact path="/" element={<Login />} />

				<Route element={<ProtectedRoutes />}>
					<Route path="/home" element={<Home />} />
					<Route path="/success/:token" element={<Success />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
export default App;
