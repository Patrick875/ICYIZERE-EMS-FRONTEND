import { useForm, Controller } from "react-hook-form";
import useFetchData from "../../Hooks/UseFetchData";
import instance from "../../API";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";

const EditProduct = () => {
	const { register, handleSubmit, reset, control } = useForm();
	const { id } = useParams();
	const handleOnFocus = () => {
		setSubmitError(null);
		setMessage(null);
		setSuccess(null);
	};
	const { data, error, loading } = useFetchData(`/products/${id}`);
	const [success, setSuccess] = useState(null);
	const [submitError, setSubmitError] = useState(null);
	const [submitLoading, setSubmitLoading] = useState(null);
	const [message, setMessage] = useState(null);
	const { data: categories } = useFetchData("/categories");

	const updateProduct = async (submit) => {
		let submitData =
			submit.name === "" ? { ...submit, name: data.name } : { ...data };
		setSubmitLoading(true);
		await instance
			.patch("/products", { ...submitData, prodId: data.id })
			.then(() => {
				setSuccess(true);
			})
			.catch((err) => {
				setSubmitError(true);
				setMessage(err.response.data.message);
			})
			.finally(() => {
				setSubmitLoading(false);
				reset();
			});
	};
	console.log("fetched data", data);
	return (
		<div className="w-full ">
			<div className="p-4 mx-auto">
				<p className="my-2 text-xs font-bold text-center">Update product</p>
				{loading && (
					<p className="my-4 text-xs text-center">Fetching product .....</p>
				)}
				{!error ? (
					<form
						onSubmit={handleSubmit(updateProduct)}
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
								defaultValue={data && data.name}
								{...register("name")}
							/>
						</div>
						<div className="">
							<label
								htmlFor="description"
								className="block my-2 text-xs font-medium text-gray-700 ">
								Category
							</label>
							{categories && data && (
								<Controller
									name="category"
									control={control}
									render={({ field }) => {
										const options = categories.map((cat) => ({
											value: cat.id,
											label: cat.name,
										}));
										const defaultValue = options.filter(
											(op) => op.value === data.category
										)[0];
										const indexOfSelected = options.indexOf(defaultValue);
										console.log("def", indexOfSelected);
										return (
											<Select
												className="text-xs"
												options={options}
												value={options.find((c) => c.id === field.value)} // Set the selected option based on field value
												onChange={(selectedOption) =>
													field.onChange(selectedOption.value)
												}
												defaultValue={defaultValue}
											/>
										);
									}}
									rules={{ required: true }}
								/>
							)}
						</div>

						<button
							className={`w-full px-4 py-1 my-3 text-xs ${
								submitLoading
									? "text-white bg-pink-200"
									: "text-white bg-pink-900"
							} rounded-sm`}>
							{!submitLoading ? (
								"Submit"
							) : (
								<HashLoader color="#FFDDDD" loading={submitLoading} size={15} />
							)}
						</button>
					</form>
				) : (
					<p className="text-xs text-center ">Error getting category</p>
				)}

				{success && (
					<p className="w-full py-5 text-xs font-bold text-center text-teal-900 bg-teal-50">
						{" "}
						Success
					</p>
				)}
				{submitError && (
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

export default EditProduct;
