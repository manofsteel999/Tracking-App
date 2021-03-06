import React, { useContext } from "react";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { View } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
	const {
		state: { name, recording, locations },
		startRecording,
		stopRecording,
		changeName,
	} = useContext(LocationContext);
	const [saveTrack] = useSaveTrack();

	return (
		<View>
			<Spacer>
				<Input
					placeholder="Enter Track Name"
					value={name}
					onChangeText={changeName}
				/>
			</Spacer>
			<Spacer>
				{recording ? (
					<Button title="Stop" onPress={stopRecording} />
				) : (
					<Button title="Start recording" onPress={startRecording} />
				)}
			</Spacer>
			<Spacer>
				{!recording && locations.length ? (
					<Button title="Save Recording" onPress={saveTrack} />
				) : null}
			</Spacer>
		</View>
	);
};

export default TrackForm;
