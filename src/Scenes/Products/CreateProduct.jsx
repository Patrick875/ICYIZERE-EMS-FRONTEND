import { useForm } from "react-hook-form";
import useFetchData from "../../Hooks/UseFetchData";
import instance from "../../API";
import { useState } from "react";
import { HashLoader } from "react-spinners";

const CreateProduct = () => {
	const { register, handleSubmit, reset } = useForm();
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);
	const [message, setMessage] = useState(null);
	const { data } = useFetchData("/categories");
	const createProduct = async (data) => {
		setLoading(true);
		await instance
			.post("/products", data)
			.then(() => {
				setSuccess(true);
			})
			.catch((err) => {
				setError(true);
				setMessage(err.response.data.message);
			})
			.finally(() => {
				setLoading(false);
				reset();
			});
	};
	const handleOnFocus = () => {
		setError(null);
		setMessage(null);
		setSuccess(null);
	};
	return (
		<div className="w-full ">
			<div className="p-4 mx-auto">
				<p className="my-2 text-xs text-center">Create product</p>
				<form
					onSubmit={handleSubmit(createProduct)}
					className="w-full px-8 pt-2 mx-auto bg-white md:w-1/2 p-9">
					<div>
						<label
							htmlFor="id"
							className="block my-2 text-xs font-medium text-gray-700 ">
							Name
						</label>
						<input
							type="text"
							required
							onFocus={handleOnFocus}
							className="w-full px-3 py-1 text-xs border border-gray-500 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							id="text"
							{...register("name")}
						/>
					</div>
					<div className="">
						<label
							htmlFor="description"
							className="block my-2 text-xs font-medium text-gray-700 ">
							Category
						</label>
						<select
							className="w-full py-1 text-xs border border-gray-500 rounded-sm"
							defaultValue={""}
							onFocus={handleOnFocus}
							{...register("category")}>
							<option value="">Select category</option>
							{data &&
								data.length !== 0 &&
								data.map((el) => (
									<option value={el.id} key={el.id}>
										{el.name}
									</option>
								))}
						</select>
					</div>

					<button
						className={`w-full px-4 py-1 my-3 text-xs ${
							loading ? "text-white bg-pink-200" : "text-white bg-pink-900"
						} rounded-sm`}>
						{!loading ? (
							"Submit"
						) : (
							<HashLoader color="#FFDDDD" loading={loading} size={15} />
						)}
					</button>
				</form>
				{success && (
					<p className="w-full py-5 text-xs font-bold text-center text-teal-900 bg-teal-50">
						{" "}
						Product registered
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
		</div>
	);
};

export default CreateProduct;
