import { useState, useEffect } from "react";
import { watchPositionAsync, Accuracy } from "expo-location";
import * as Location from "expo-location";

export default (shouldTrack, callback) => {
	const [err, setErr] = useState(null);

	useEffect(() => {
		let subscriber;
		const startWatching = async () => {
			try {
				const {
					granted,
				} = await Location.requestForegroundPermissionsAsync();
				if (!granted) {
					throw new Error("Location Permission not granted");
				}
				subscriber = await watchPositionAsync(
					{
						accuracy: Accuracy.BestForNavigation,
						timeInterval: 1000, // this is somewhat buggy so used  that mocklocation file to genenerate fake locations in 1 sec interval
						distanceInterval: 10,
					},
					callback
				);
			} catch (e) {
				setErr(e);
			}
		};
		if (shouldTrack) {
			startWatching();
		} else {
			if (subscriber) {
				subscriber.remove();
			}

			subscriber = null;
		}
		return () => {
			if (subscriber) {
				subscriber.remove();
			}
		};
	}, [shouldTrack, callback]);

	return [err];
};
