import { Link } from "react-router-dom";
import useFetchData from "../../Hooks/UseFetchData";
import Barcode from "react-barcode";
import { useMemo, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import html2canvas from "html2canvas";
import { FadeLoader } from "react-spinners";

const Item = ({ el }) => {
	const [barcodeDataURL, setBarcodeDataURL] = useState(null);
	const barcodeRef = useRef(null);

	const generateBarcodeDataURL = () => {
		if (barcodeRef.current) {
			html2canvas(barcodeRef.current)
				.then((canvas) => {
					const dataURL = canvas.toDataURL("image/png");
					setBarcodeDataURL(dataURL);

					// Trigger download immediately
					const link = document.createElement("a");
					link.href = dataURL;
					link.download = `barcode_${el.id}.png`;
					link.click();
				})
				.catch((error) => {
					console.error("Error generating barcode PNG:", error);
				});
		}
	};

	return (
		<div
			key={el.id}
			className="my-2 text-xs p-4 flex md:flex-row flex-col items-center md:items-stretch  md:justify-between bg-white w-full rounded-[8px]">
			<div className="flex flex-1 gap-2 md:block ">
				<p className="font-medium">Name</p>
				<p>{el.name}</p>
			</div>
			<div className="flex-1">
				<p className="font-medium text-center md:text-start">Category</p>
				<p>{el.ProductCategory && el.ProductCategory.name}</p>
			</div>
			<div className="flex-1">
				<p className="font-medium text-center md:text-start">
					Category-Barcode
				</p>
				<div
					className="font-medium text-center md:text-start"
					onClick={generateBarcodeDataURL}>
					{barcodeDataURL ? (
						<Link to={barcodeDataURL} download={`barcode_${el.id}.png`}>
							Download Barcode (PNG)
						</Link>
					) : (
						<div ref={barcodeRef} className="cursor-pointer">
							<Barcode
								value={el.ProductCategory && el.ProductCategory.barcode}
								className="barcode"
								format="EAN13"
								height={40}
								fontSize={16}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const AllProducts = () => {
	const { register, watch } = useForm();
	const query = watch("query");
	const { data, loading } = useFetchData("/products");
	const [pageNumber, setPageNumber] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const pagesVisited = pageNumber * itemsPerPage;
	const displayItems =
		data &&
		query === "" &&
		data.slice(pagesVisited, pagesVisited + itemsPerPage).map((el) => {
			return <Item el={el} key={el.id} />;
		});

	const searchResults = useMemo(() => {
		if (query !== "" && data && data.length !== 0) {
			return data
				.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
				.slice(pagesVisited, pagesVisited + itemsPerPage)
				.map((el) => <Item key={el.id} el={el} />);
		} else {
			return [];
		}
	}, [data, query]);
	const pageCount =
		data && query === ""
			? Math.ceil(data.length / itemsPerPage)
			: query !== ""
			? Math.ceil(searchResults.length / itemsPerPage)
			: null;

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};
	const paginationComStyles =
		"text-xs  rounded-sm border border-purple-900 py-1 px-2 ";
	const pagNextPrevStyles =
		paginationComStyles +
		"text-purple-900 hover:text-white hover:bg-purple-900 ";

	return (
		<div className="p-2">
			<div className="flex flex-col justify-between md:flex-row">
				<div className="items-center flex-1 gap-2 md:flex">
					<p className="my-2 font-medium text-center md:my-0 md:text-start">
						All Products
					</p>
					<form className="mx-2 flex items-center gap-3 py-1 px-4 bg-white rounded-[8px] ">
						<HiMagnifyingGlass className="w-4 h-4 text-login-blue " />
						<input
							placeholder="Search"
							className="bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-normal"
							{...register("query")}
						/>
					</form>
				</div>
				<div className="flex items-center justify-end gap-2 my-2 md:justify-normal md:my-0">
					<Link
						to="create"
						className="block px-4 py-1 text-xs text-white rounded-sm bg-sky-800">
						Add Product
					</Link>
				</div>
			</div>
			{loading && (
				<div className="flex items-center justify-center w-full min-h-screen">
					<FadeLoader color="#0C4981" loading={loading} size={16} />
				</div>
			)}
			<div className="mt-2">
				{!loading && data && data.length !== 0 && query === ""
					? displayItems
					: query !== ""
					? searchResults
					: null}
			</div>
			<div className="flex justify-center w-full mt-2">
				{!loading && data && data.length == 0 ? (
					<p className="w-full mt-4 text-xs text-center"> No data available</p>
				) : !data ? null : (
					<ReactPaginate
						previousLinkClassName={`${pagNextPrevStyles} `}
						previousLabel="Previous"
						nextLabel="Next"
						activeLinkClassName="text-white bg-purple-900"
						nextLinkClassName={`${pagNextPrevStyles}`}
						pageCount={pageCount}
						pageLinkClassName={`${paginationComStyles}`}
						onPageChange={changePage}
						containerClassName="rounded-sm p-3 bg-white flex gap-3 items-center "
					/>
				)}
			</div>
		</div>
	);
};

export default AllProducts;
