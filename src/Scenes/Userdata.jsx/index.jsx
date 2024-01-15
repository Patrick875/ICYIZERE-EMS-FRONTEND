import { useState } from "react";
import { useForm } from "react-hook-form";
import instance from "../../API";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useUser } from "../../Context/UserContext";

const Userdata = () => {
	const { register, handleSubmit, reset, watch } = useForm();
	const { user, loginUser, logoutUser } = useUser();
	const newPassword = watch("newPassword");
	const oldPassword = watch("oldPassword");
	const [error, setError] = useState(false);
	const [message, setMessage] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(null);
	console.log("context user", user);
	const handleOnFocus = () => {
		setError(null);
		setSuccess(null);
		setMessage(null);
	};
	const signup = async (data) => {
		setLoading(true);
		if (newPassword !== "" && oldPassword === "") {
			setMessage("The previous password is required for password update");
			setLoading(false);
		} else {
			await instance
				.patch("/update", { ...data, id: user.id })
				.then((res) => {
					setSuccess(true);
					loginUser(res.data.data);
					if (res.data.message === "user updated with credentials") {
						logoutUser();
					}
				})
				.catch((err) => {
					console.log(err);
					setError(true);
					setMessage(err.response.data.message);
				})
				.finally(() => {
					setLoading(false);
					reset();
				});
		}
	};

	return (
		<div className="w-full ">
			{success && (
				<p className="py-3 text-sm text-center text-teal-900 bg-teal-100">
					{" "}
					User updated
				</p>
			)}
			{message && (
				<p className="w-full py-2 text-sm text-center text-pink-700 bg-pink-100 ps-4">
					{message}
				</p>
			)}
			<form
				onSubmit={handleSubmit(signup)}
				className="w-full px-8 pt-2 mx-2 p-9">
				<p className="my-2 text-xs font-bold text-center uppercase">
					User details
				</p>
				<div>
					<label
						htmlFor="id"
						className="block my-2 text-xs font-medium text-gray-700 ">
						First Name
					</label>
					<input
						onFocus={handleOnFocus}
						type="text"
						className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						id="firstName"
						defaultValue={user && user.firstName}
						{...register("firstName")}
					/>
				</div>
				<div>
					<label
						htmlFor="id"
						className="block my-2 text-xs font-medium text-gray-700 ">
						Last Name
					</label>
					<input
						type="text"
						onFocus={handleOnFocus}
						className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						id="lastName"
						defaultValue={user && user.lastName}
						{...register("lastName")}
					/>
				</div>
				<div>
					<label
						htmlFor="id"
						className="block my-2 text-xs font-medium text-gray-700 ">
						Telephone
					</label>
					<input
						type="text"
						onFocus={handleOnFocus}
						className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						id="telephone"
						defaultValue={user && user.tel}
						maxLength={10}
						{...register("tel")}
					/>
				</div>

				<div>
					<label
						htmlFor="id"
						className="block my-2 text-xs font-medium text-gray-700 ">
						Email
					</label>
					<input
						type="email"
						onFocus={handleOnFocus}
						className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						id="email"
						defaultValue={user && user.email}
						{...register("email")}
					/>
				</div>
				<div>
					<label
						htmlFor="id"
						className="block my-2 text-xs font-medium text-gray-700 ">
						Old Password
					</label>
					<input
						type="password"
						onFocus={handleOnFocus}
						className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						id="password"
						{...register("oldPassword")}
					/>
				</div>
				<div>
					<label
						htmlFor="id"
						className="block my-2 text-xs font-medium text-gray-700 ">
						New Password
					</label>
					<input
						type="password"
						onFocus={handleOnFocus}
						className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						id="password"
						{...register("newPassword")}
					/>
				</div>

				<button
					type="submit"
					className=" px-3 py-2 text-xs font-bold text-center text-white rounded-[4px] shadow-lg bg-gradient-to-t from-pink-800 to-pink-900 decoration-none my-7">
					{!loading ? (
						"Update"
					) : (
						<HashLoader color="#fff" loading={loading} size={15} />
					)}
				</button>
			</form>
		</div>
	);
};

export default Userdata;
