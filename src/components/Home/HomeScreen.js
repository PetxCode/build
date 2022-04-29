import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import baby from "../Header/baby.jpeg";
import { AuthContext } from "../Register/AuthProvider";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

import { serverTimestamp } from "firebase/firestore";

import { db, storage, auth } from "../../base";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const [toggle, setToggle] = useState(false);
	const [percentage, setPercentage] = useState("");
	const [msg, setMsg] = useState("");
	const [image, setImage] = useState(baby);
	const [postImage, setPostImage] = useState("");

	const onToggle = () => {
		setToggle(!toggle);
	};

	const handleImage = async (e) => {
		const file = e.target.files[0];
		const save = URL.createObjectURL(file);
		setImage(save);

		const storageRef = ref(storage, "postImage/" + file.name);
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
					setPostImage(downloadURL);
					console.log("This is the Avatar: ", postImage);
				});
			}
		);
	};

	const postPost = async () => {
		const userData = doc(collection(db, "post"));
		await setDoc(userData, {
			msg,
			postImage,
			createAt: serverTimestamp(),
			createBy: currentUser.uid,
		});

		setMsg("");
		setImage("");
		navigate("/");
	};

	return (
		<Container>
			<Wrapper>
				<Post>
					<InputHolder>
						<Picture1 src={image} />
						<input
							type="file"
							id="pix"
							onChange={handleImage}
							style={{ display: "none" }}
						/>
						<InputArea
							placeholder="What's on your mind?"
							value={msg}
							onChange={(e) => {
								setMsg(e.target.value);
							}}
						/>
					</InputHolder>
					<Holder>
						{postImage !== "" ? null : (
							<ButtonLabel htmlFor="pix">Image</ButtonLabel>
						)}
						<Button onClick={postPost}>Post</Button>
					</Holder>
				</Post>
				<Card>
					<PostCard>
						<Picture src={baby} />
						<PostPicture src={baby} />
					</PostCard>
					<Text>
						Styled Components is a CSS-in-JS solution that enables you to create
						React components with a given style very easily. Using
						styled-components with Expo, you can create universal styles that'll
						work the same across web, mobile, and desktop!
					</Text>
					<Holder>
						{toggle ? <Icon /> : <Icon1 />}
						<Button1>comment</Button1>
					</Holder>
				</Card>
			</Wrapper>
		</Container>
	);
};

export default HomeScreen;

const Picture1 = styled.img`
	width: 70px;
	height: 70px;
	border-radius: 50%;
	background-color: red;
	position: absolute;
	right: -40px;
	top: -20px;
	object-fit: cover;
`;
const InputHolder = styled.div`
	position: relative;
`;

const Text = styled.div`
	margin: 20px 20px 0px 20px;
`;

const PostPicture = styled.img`
	width: 100%;
	height: 300px;
	background-color: red;
	border-radius: 5px;
`;
const Picture = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	object-fit: cover;
	background-color: gray;
	position: absolute;
	top: -50px;
	left: 20px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
		rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

const PostCard = styled.div`
	position: relative;
	width: 510px;
	height: 300px;
	background-color: red;
	border-radius: 5px;
`;

const Card = styled.div`
	margin-top: 35px;
	justify-content: center;
	display: flex;
	width: 510px;
	flex-direction: column;
	background-color: lightgray;
	padding-bottom: 30px;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Post = styled.div`
	width: 80%;
	height: 300px;
`;

const ButtonLabel = styled.label`
	padding: 10px 40px;
	background-color: #004080;
	color: white;
	border-radius: 30px;
	transform: scale(1);
	transition: all 350ms;
	margin-top: 10px;

	:hover {
		transform: scale(1.04);
		cursor: pointer;
	}
`;

const Button = styled.div`
	padding: 10px 40px;
	background-color: #004080;
	color: white;
	border-radius: 30px;
	transform: scale(1);
	transition: all 350ms;
	margin-top: 10px;

	:hover {
		transform: scale(1.04);
		cursor: pointer;
	}
`;

const Button1 = styled.div`
	padding: 10px 10px;
	text-align: center;
	width: 100px;
	background-color: #004080;
	color: white;
	border-radius: 5px;
	transform: scale(1);
	transition: all 350ms;
	margin-top: 20px;
	margin-right: 20px;

	:hover {
		transform: scale(1.04);
		cursor: pointer;
	}
`;

const Icon1 = styled(FcLikePlaceholder)`
	font-size: 25px;
	margin-left: 20px;
	transition: all 350ms;
	transform: scale(1);

	:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
`;
const Icon = styled(FcLike)`
	font-size: 25px;
	margin-left: 20px;
	transition: all 350ms;
	transform: scale(1);

	:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
`;

const InputArea = styled.textarea`
	width: 100%;
	height: 150px;
	background-color: rgba(0, 0, 0, 0.1);
	outline: none;
	border: 1px solid silver;
	resize: none;
	border-radius: 3px;
	padding: 10px;

	::placeholder {
		font-family: Poppins;
	}
`;

const Holder = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 600px;
	min-height: 500px;
	height: 100%;
	padding: 30px 0;
	background-color: white;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Container = styled.div`
	width: 100;
	height: 100%;
	min-height: calc(100vh - 80px);
	background-color: lightgray;
	display: flex;
	justify-content: center;
	padding: 40px 0;
`;
