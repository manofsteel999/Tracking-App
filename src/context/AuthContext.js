import AsyncStorage from "@react-native-community/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
	switch (action.type) {
		case "add_error":
			return { ...state, errorMessage: action.payload };
		case "signup":
			return { errorMessage: "", token: action.payload };
		default:
			return state;
	}
};

const signup = (dispatch) => {
	return async ({ email, password }) => {
		try {
			const response = await trackerApi.post("/signup", {
				email,
				password,
			});
			await AsyncStorage.setitem("token", response.data.token);
			dispatch({ type: "signup", payload: response.data.token });
			navigate("TrackList");
		} catch (err) {
			dispatch({
				type: "add_error",
				payload: "Could not signup due to some error",
			});
		}
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signup },
	{ token: null, errorMessage: "" }
);
