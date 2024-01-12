import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const TopBar = ({ setShowSide }) => {
	const navigate = useNavigate();
	const { logoutUser, user } = useUser();
	return (
		<div className="flex items-center justify-between px-0 py-4 bg-white md:p-4 md:justify-end align-content-center">
			<div className="flex items-center justify-between w-full px-2 md:justify-end md:basis-1/2">
				<button
					onClick={() => setShowSide((prev) => !prev)}
					className="p-2 shadow-xl md:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-5 h-5">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
				<div className="flex gap-4 item-center">
					<Link to="user" className="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="block w-6 h-6 ">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							/>
						</svg>

						<p className="px-2 text-xs font-medium">
							{user.firstName + "  " + user.lastName}
						</p>
					</Link>
					<button
						className="flex items-center px-4 py-1 rounded-md bg-slate-900"
						onClick={() => {
							logoutUser();
						}}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-4 h-4 text-white">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
							/>
						</svg>
						<span className="px-1 text-xs text-white align-middle">Logout</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default TopBar;

// import { useNavigate } from "react-router-dom";
// import { useUser } from "../Context/UserContext";

// const TopBar = ({ setShowSide }) => {
//   const navigate = useNavigate();
//   const { logoutUser, user } = useUser();

//   return (
//     <div className="flex items-center justify-between px-0 py-4 bg-white md:p-4 md:justify-end align-content-center">
//       {/* ... existing code ... */}
//       <button
//         onClick={() => setShowSide((prev) => !prev)}
//         className="p-2 shadow-xl md:hidden"
//       >
//         {/* ... existing code ... */}
//       </button>
//     </div>
//   );
// };

// export default TopBar;
