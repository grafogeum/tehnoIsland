import { Canvas } from "@react-three/fiber";
import { SceneContainer } from "./components/SceneContainer";
import { useState } from "react";
import { SoundPlayer } from "./components/SoundPlayer";

const CanvasSizeStyles = {
	width: "800px",
	height: "600px",
	borderRadius: "10px",
	border: "2px solid black",
};

const darkButtonStyle = {
	backgroundColor: "black",
	color: "#fff",
	border: "none",
	padding: "10px",
	borderRadius: "10px",
	margin: "10px",
	fontSize: "2rem",
};

const backgroundStyled = {
	width: "100%",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	// backgroundColor: darkMode ? "#222" : "#fff",
};

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [playSoundSignal, setPlaySoundSignal] = useState(false);
	return (
		<>
			<div
				style={{
					...backgroundStyled,
					backgroundColor: darkMode ? "#222" : "#fff",
				}}
			>
				<button
					style={darkButtonStyle}
					onClick={() => {
						setDarkMode(!darkMode);
						setPlaySoundSignal(!playSoundSignal);
					}}
				>
					☠️ <br />
					{"Click !"}
				</button>
				<SoundPlayer playSoundSignal={playSoundSignal} />
				<Canvas style={CanvasSizeStyles}>
					<spotLight
						color={"#442277"}
						intensity={4}
						angle={0.6}
						penumbra={0.5}
						position={[35, 5, 5]}
						castShadow
						shadow-bias={-0.0001}
					/>
					<spotLight
						color={"#bb8888"}
						intensity={5}
						angle={0.6}
						penumbra={0.5}
						position={[-35, 15, 15]}
						castShadow
						shadow-bias={-0.0001}
					/>
					<SceneContainer darkMode={darkMode} />
				</Canvas>
			</div>
		</>
	);
}

export default App;
