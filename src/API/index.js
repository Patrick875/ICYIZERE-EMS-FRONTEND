import axios from "axios";
import Cookie from "js-cookie";
import { serverUrl } from "../constants";
const instance = axios.create({ baseURL: serverUrl });

instance.interceptors.response.use(
	function (response) {
		if (response.data && response.data.user) {
			Cookie.set("token", response.data.token, { expires: 30 });
			Cookie.set(
				"user",
				JSON.stringify({
					email: response.data.user.email,
					id: response.data.user.id,
					firstName: response.data.user.firstName,
					lastName: response.data.user.lastName,
					tel: response.data.user.tel,
					role: response.data.user.role,
				}),
				{ expires: 30 }
			);
		}
		return response;
	},
	function (error) {
		console.log(error);
		return Promise.reject(error);
	}
);

export default instance;
