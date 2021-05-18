import React, { useContext } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
	const {
		state: { currentLocation, locations },
	} = useContext(LocationContext);
	// console.log(currentLocation);
	if (!currentLocation) {
		return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
	}
	initialLocation = {
		longitude: 80.91518663688433,
		latitude: 26.84542004155964,
	};
	return (
		<MapView
			style={styles.map}
			initialRegion={{
				...initialLocation,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			}}
			region={{
				...currentLocation.coords, // dont remove region prop as advised by the instructor
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			}}
		>
			<Circle
				center={currentLocation.coords}
				radius={20}
				strokeColor="rgba(158,158,255,1.0)"
				fillColor="rgba(158,158,255,0.3)"
			/>
			<Polyline coordinates={locations.map((loc) => loc.coords)} />
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		height: 300,
	},
});

export default Map;
