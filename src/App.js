import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomeScreen from "./components/Home/HomeScreen";
import PrivateRoute from "./components/Register/PrivateRoute";
import SignIn from "./components/Register/SignIn";
import SignUp from "./components/Register/SignUp";

const App = () => {
	return (
		<BrowserRouter>
			<Header />

			<Routes>
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route
					path="/"
					element={
						<PrivateRoute>
							<HomeScreen />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
