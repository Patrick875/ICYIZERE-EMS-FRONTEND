//jshint esversion:9

//app context
import { createContext, useContext, useState } from "react";
import Cookie from "js-cookie";
const UserContext = createContext();
const QrContext = createContext();

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
export const useQR = () => {
	const context = useContext(QrContext);
	if (!context) {
		throw new Error("QR must be used within a QRProvider");
	}
	return context;
};

export const UserProvider = ({ children }) => {
	let storedUser =
		Cookie.get("user") != null ? JSON.parse(Cookie.get("user")) : null;
	const [user, setUser] = useState(storedUser);

	const loginUser = (userData) => {
		setUser(userData);
	};
	const logoutUser = async () => {
		storedUser = null;
		setUser(null);
		await Cookie.remove("user");
		await Cookie.remove("token");
	};

	return (
		<UserContext.Provider value={{ user, loginUser, logoutUser }}>
			{children}
		</UserContext.Provider>
	);
};
