import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context } from "../context/AuthContext";

const SigninScreen = () => {
	const { state, signin, clearErrorMessage } = useContext(Context);
	return (
		<View style={styles.container}>
			<NavigationEvents onWillFocus={clearErrorMessage} />
			<AuthForm
				headerText="Sign In to your Account"
				errorMessage={state.errorMessage}
				onSubmit={signin} // Will automatically call this func in authcontext with email and password
				submitButtonText="Sign In"
			/>
			<NavLink
				text="Dont have an account? Sign Up instead"
				routeName="Signup"
			/>
		</View>
	);
};

SigninScreen.navigationOptions = () => {
	return {
		headerShown: false,
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginBottom: 200,
	},
});

export default SigninScreen;
