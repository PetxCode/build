import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../../base";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const authUser = async () => {
		await signInWithEmailAndPassword(auth, email, password);

		setEmail("");
		setPassword("");

		navigate("/");
	};
	return (
		<Container>
			<Wrapper>
				<Text>Login your Account</Text>
				<Card>
					<Holder>
						<Input
							placeholder="Email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<Input
							placeholder="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<Button onClick={authUser}>Sign in</Button>
					</Holder>
				</Card>
			</Wrapper>
		</Container>
	);
};

export default SignIn;

const Text = styled.div`
	font-size: 35px;
	font-weight: bold;
	margin-bottom: 30px;
	color: red;
`;

const Button = styled.div`
	padding: 20px 50px;
	background-color: red;
	margin-top: 30px;
	color: white;
	border-radius: 3px;

	transform: scale(1);
	transition: all 350ms;

	:hover {
		transform: scale(1.04);
		cursor: pointer;
	}
`;

const Holder = styled.div`
	margin: 20px 0;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
`;
const Input = styled.input`
	width: 300px;
	height: 40px;
	border-radius: 3px;
	border: 1px solid silver;
	margin: 10px 0;
	outline: none;
	padding: 0 10px;

	::placeholder {
		font-family: Poppins;
	}
`;

const Avatar = styled.div`
	width: 150px;
	height: 150px;
	object-fit: cover;
	border-radius: 50%;
	background-color: #004080;
`;

const Card = styled.div`
	width: 500px;
	min-height: 400px;
	border-radius: 5px;
	border: 1px solid silver;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
	min-height: calc(100vh - 80px);
	display: flex;
	justify-content: center;
	align-items: center;
`;
