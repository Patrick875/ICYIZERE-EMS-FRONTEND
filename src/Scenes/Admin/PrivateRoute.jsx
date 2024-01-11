//jshint esversion:9
import { Navigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

const PrivateRoute = ({ element }) => {
	const { user } = useUser();

	// Redirect to login if user is not authenticated
	if (!user) {
		return <Navigate to="/" />;
	}

	return element;
};
export default PrivateRoute;
