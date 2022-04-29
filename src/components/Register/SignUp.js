import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import React, { useState } from "react";
import styled from "styled-components";
import { db, storage, auth } from "../../base";
import LinearProgress from "@mui/material/LinearProgress";
import baby from "../Header/baby.jpeg";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate();
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [image, setImage] = useState(baby);
	const [avatar, setAvatar] = useState("");
	const [percentage, setPercentage] = useState("");

	const handleImage = async (e) => {
		const file = e.target.files[0];
		const save = URL.createObjectURL(file);
		setImage(save);

		const storageRef = ref(storage, "userAvatar/" + file.name);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				setPercentage(progress);
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log("File available at", downloadURL);
					setAvatar(downloadURL);
					console.log("This is the Avatar: ", avatar);
				});
			}
		);
	};

	const registerUser = async () => {
		const user = doc(collection(db, "users"));
		await setDoc(user, { userName, email, password, avatar });

		setUserName("");
		setEmail("");
		setPassword("");
	};

	const authUser = async () => {
		const user = await createUserWithEmailAndPassword(auth, email, password);
		console.log(user.user.uid);

		if (user) {
			const userData = doc(collection(db, "users"), user.user.uid);
			await setDoc(userData, { userName, email, password, avatar });
		}
		setUserName("");
		setEmail("");
		setPassword("");

		navigate("/");
	};

	const authUserWithOther = async () => {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		console.log(user);

		if (user) {
			const userData = doc(collection(db, "users"), user.user.uid);
			await setDoc(userData, {
				userName: user.user.displayName,
				email: user.user.email,
				avatar: user.user.photoURL,
			});
		}

		setEmail("");
		setPassword("");

		navigate("/");
	};

	return (
		<Container>
			<Wrapper>
				<Text>Create an Account</Text>
				<Card>
					<Avatar src={image} />
					{percentage > 0 && percentage < 99 ? (
						<div style={{ width: "300px" }}>
							<LinearProgress
								value={Math.floor(percentage)}
								variant="determinate"
							/>
							{Math.floor(percentage)}%
						</div>
					) : null}
					<Label htmlFor="pix">Upload Image</Label>
					<ImageInput type="file" id="pix" onChange={handleImage} />

					<Holder>
						<Input
							placeholder="User Name"
							value={userName}
							onChange={(e) => {
								setUserName(e.target.value);
							}}
						/>
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
						{avatar === "" ? (
							<Button disabled cl="gray">
								Please Wait
							</Button>
						) : (
							<Button onClick={authUser} cl="#004080">
								Register
							</Button>
						)}
						<Button onClick={authUserWithOther} cl="#004080">
							Google
						</Button>
					</Holder>
				</Card>
			</Wrapper>
		</Container>
	);
};

export default SignUp;

const ImageInput = styled.input`
	display: none;
`;

const Text = styled.div`
	font-size: 35px;
	font-weight: bold;
	margin-bottom: 30px;
	color: #004080;
`;

const Label = styled.label`
	padding: 20px 50px;
	background-color: #004080;
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

const Button = styled.button`
	outline: none;
	padding: 20px 50px;
	background-color: ${({ cl }) => cl};
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

const Avatar = styled.img`
	width: 100px;
	height: 100px;
	object-fit: cover;
	border-radius: 50%;
	/* background-color: #004080; */
`;

const Card = styled.div`
	width: 500px;
	min-height: 600px;
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
