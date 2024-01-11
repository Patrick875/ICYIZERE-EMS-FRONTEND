//jshint esversion:9
import { useNavigate } from "react-router-dom";

function BackButton() {
	const navigate = useNavigate();

	return (
		<button
			className="flex items-center gap-2 px-4 py-1 text-sm font-medium rounded rounded-2 bg-sky-900 text-slate-100"
			onClick={() => navigate(-1)}>
			<i className="text-slate-100">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-3 h-3">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
					/>
				</svg>
			</i>
			Back
		</button>
	);
}

export default BackButton;
