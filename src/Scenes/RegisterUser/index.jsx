import { useState } from "react";
import { useForm } from "react-hook-form";
import instance from "../../API";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { HashLoader } from "react-spinners";

const RegisterUser = () => {
	const { register, handleSubmit, reset } = useForm();
	const [error, setError] = useState(false);
	const [message, setMessage] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(null);
	const handleOnFocus = () => {
		setError(null);
		setSuccess(null);
		setMessage(null);
	};
	const signup = async (data) => {
		setLoading(true);
		await instance
			.post("/register", { ...data })
			.then((res) => {
				setSuccess(true);
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
	};

	return (
		<div className="max-h-screen mx-auto ">
			<div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
				<div className="md:w-[30%] w-[80%] shadow-lg  rounded-lg bg-slate-50">
					<div className="flex justify-center w-full my-1">
						<div>
							<img src={Logo} className="block mx-auto w-14 h-14" />
							<p className="pt-2 pb-0 mb-0 text-xs font-medium uppercase">
								CYIZERE GROUP COMPANY LTD
							</p>
							<p className="py-0 my-0 text-xs text-center ">
								Entity Management System
							</p>
						</div>
					</div>

					<form onSubmit={handleSubmit(signup)} className="px-8 pt-2 mx-2 p-9">
						<p className="my-2 text-xs font-bold text-center uppercase">
							create account
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
								id="email"
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
								{...register("email")}
							/>
						</div>
						<div>
							<label
								htmlFor="id"
								className="block my-2 text-xs font-medium text-gray-700 ">
								Password
							</label>
							<input
								type="password"
								onFocus={handleOnFocus}
								className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
								id="password"
								{...register("password")}
							/>
						</div>

						<button
							type="submit"
							className="w-full px-3 py-2 text-xs font-bold text-center text-white rounded-[4px] shadow-lg bg-gradient-to-t from-teal-800 to-teal-900 decoration-none my-7">
							{!loading ? (
								"Register"
							) : (
								<HashLoader color="#fff" loading={loading} size={15} />
							)}
						</button>
						<Link to="/" className="block text-xs text-center text-sky-700 ">
							Login
						</Link>
					</form>
					{success && (
						<p className="w-full py-5 text-xs font-bold text-center text-teal-900 bg-teal-50">
							{" "}
							User registered
						</p>
					)}
					{error && (
						<p className="flex items-center justify-center pb-4 ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 h-5 text-pink-700">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
								/>
							</svg>

							<span className="text-sm text-pink-700 ps-4">{message}</span>
						</p>
					)}
				</div>

				<p className="py-4 text-xs">
					Developed by SANTECH ltd &copy; {new Date().getFullYear()}
				</p>
			</div>
		</div>
	);
};

export default RegisterUser;
