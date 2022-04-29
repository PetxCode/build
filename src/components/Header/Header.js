import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../../base";
import { AuthContext } from "../Register/AuthProvider";
import baby from "./baby.jpeg";
import { collection, doc, getDoc } from "firebase/firestore";
const Header = () => {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const [userData, setUserData] = useState();

	console.log(currentUser?.uid);

	const getUser = async () => {
		const docRef = doc(db, "users", currentUser?.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log("Document data:", docSnap.data());
			setUserData(docSnap.data());
			console.log("userData: ", userData);
		} else {
			console.log("No such document!");
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Container>
			<Wrapper>
				<Navigation>
					<Logo to="/">CodeLab</Logo>
					{currentUser ? <div> Welcome back {userData?.userName}</div> : null}
				</Navigation>
				{currentUser ? (
					<Navigation>
						<Avatar src={currentUser ? userData?.avatar : baby} />
						<Nav1
							onClick={() => {
								signOut(auth);
								navigate("/signin");
							}}
						>
							Log Out
						</Nav1>
					</Navigation>
				) : (
					<Navigation>
						<Nav to="/signin">Sign-in</Nav>
						<Nav to="/signup">Sign-up</Nav>
					</Navigation>
				)}
			</Wrapper>
		</Container>
	);
};

export default Header;

const Nav1 = styled.div`
	text-decoration: none;
	padding: 15px 20px;
	margin: 0 5px;
	transform: scale(1);
	transition: all 350ms;
	color: white;
	border-radius: 3px;

	&.active {
		background-color: rgba(255, 255, 255, 0.5);
	}

	:hover {
		transform: scale(1.04);
		cursor: pointer;
		background-color: rgba(255, 255, 255, 0.3);
	}
`;

const Nav = styled(NavLink)`
	text-decoration: none;
	padding: 15px 20px;
	margin: 0 5px;
	transform: scale(1);
	transition: all 350ms;
	color: white;
	border-radius: 3px;

	&.active {
		background-color: rgba(255, 255, 255, 0.5);
	}

	:hover {
		transform: scale(1.04);
		cursor: pointer;
		background-color: rgba(255, 255, 255, 0.3);
	}
`;

const Avatar = styled.img`
	object-fit: cover;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: orange;
	margin: 0 10px;
	transform: scale(1);
	transition: all 350ms;
	background-color: rgba(255, 255, 255, 0.1);

	:hover {
		transform: scale(1.04);
		cursor: pointer;
		background-color: rgba(255, 255, 255, 0.3);
	}
`;

const Logo = styled(Link)`
	color: white;
	text-decoration: none;
	font-weight: bold;
	font-size: 25px;
	transform: scale(1);
	transition: all 350ms;
	font-style: italic;

	:hover {
		transform: scale(1.04);
		cursor: pointer;
	}
`;

const Navigation = styled.div`
	margin: 0 20px;
	display: flex;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 80px;
	justify-content: space-between;
	align-items: center;
	display: flex;
`;

const Container = styled.div`
	width: 100%;
	height: 80px;
	background-color: #004080;
	color: white;
`;
