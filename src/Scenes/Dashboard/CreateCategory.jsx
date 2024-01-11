import { useForm } from "react-hook-form";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import { barnumberGenerator } from "../../Shared/utilFunctions";
import { useRef, useState } from "react";
import instance from "../../API";
import { HashLoader } from "react-spinners";

const CreateCategory = () => {
	const { register, watch, reset, handleSubmit } = useForm();
	const componentRef = useRef();
	const name = watch("name") || "";
	const description = watch("description") || "";
	const barValue = name && name !== "" && barnumberGenerator(name);

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const generateBarcodeDataURL = async () => {
		if (componentRef.current) {
			try {
				const canvas = await html2canvas(componentRef.current);
				const dataURL = canvas.toDataURL("image/png");
				return dataURL;
			} catch (error) {
				console.error("Error generating barcode PNG:", error);
				return null;
			}
		}
		return null;
	};

	const handleBeforePrint = async () => {
		const barcodeDataURL = await generateBarcodeDataURL();

		if (barcodeDataURL) {
			// Trigger download immediately
			const link = document.createElement("a");
			link.href = barcodeDataURL;
			link.download = `barcode_${name}.png`;
			link.click();
		}
		// Perform your submission logic here
		setLoading(true);
		await instance
			.post("/categories", {
				name,
				barcode: `${barValue}`,
				description,
			})
			.then(() => {
				console.log("Submission successful");
			})
			.catch((err) => {
				console.error("Error submitting data:", err);
			})
			.finally(() => {
				setLoading(false);
			});
		reset();
	};

	return (
		<div className="w-full">
			<div className="p-4 mx-auto ">
				<p className="my-2 text-xs text-center">Create category</p>
				<form className="w-full px-8 pt-2 mx-auto bg-white md:w-1/2 p-9">
					<div>
						<label
							htmlFor="id"
							className="block my-2 text-xs font-medium text-gray-700 ">
							Name
						</label>
						<input
							type="text"
							className="w-full px-3 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							id="text"
							{...register("name")}
						/>
					</div>
					<div className="">
						<label
							htmlFor="description"
							className="block my-2 text-xs font-medium text-gray-700 ">
							Description
						</label>
						<textarea
							cols={8}
							rows={4}
							className="w-full px-3 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							id="Description"
							{...register("description")}
						/>
					</div>
					{name && name !== "" && (
						<div>
							<p className="py-3 text-xs font-medium">Generated Barcode</p>
							<div className="flex justify-center w-full" ref={componentRef}>
								<Barcode value={`${barValue}`} format="EAN13" />
							</div>

							<div className="flex justify-center mx-auto my-3">
								<button
									type="button"
									className="w-full px-3 py-1 text-xs text-white bg-pink-900"
									onClick={handleBeforePrint}>
									{!loading ? (
										"Submit & Download Barcode"
									) : (
										<div className="flex justify-center w-full">
											<HashLoader color="#FFFFFF" loading={loading} size={15} />
										</div>
									)}
								</button>
							</div>
						</div>
					)}
				</form>
				{success && (
					<p className="w-full py-5 text-xs font-bold text-center text-teal-900 bg-teal-50">
						{" "}
						Category registered
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

export default CreateCategory;
