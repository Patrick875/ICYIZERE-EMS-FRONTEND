import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import useMediaQuery from "../Hooks/useMediaQuery";
import { IoIosClose } from "react-icons/io";

const SideBarNav = ({ isOpen, setIsOpen }) => {
	const navigate = useNavigate();
	const isAboveSmallScenes = useMediaQuery("(min-width:768px)");
	const [showside, setShowSide] = useState(true);
	const { pathname } = useLocation();
	const navLinkStyle = ({ isActive }) => {
		return {
			background: isActive ? "#0057AE " : "",
			color: isActive ? "#fafafa" : "#111111",
			borderRadius: isActive ? "0.125rem " : "",
		};
	};
	return (
		<aside
			className={`${
				isOpen ? "" : "hidden "
			}sticky md:block z-100 first-letter:sticky top-0 self-start min-h-screen md:col-span-2 col-span-8 bg-white`}>
			<div className=" flex flex-col min-w-[14vw]">
				<div
					className={`flex  align-top ${
						!isAboveSmallScenes ? "justify-between" : "justify-center"
					}`}>
					<div className="flex justify-center flex-1 my-3 text-white ">
						<div className="flex justify-center w-full my-1 text-black">
							<div onClick={() => navigate("")} className="cursor-pointer">
								<img src={Logo} className="block mx-auto w-14 h-14" />
								<p className="pt-2 pb-0 mb-0 text-xs font-medium uppercase">
									CYIZERE GROUP COMPANY LTD
								</p>
								<p className="py-0 my-0 text-xs text-center ">
									Entity Management System
								</p>
							</div>
						</div>
					</div>
					{!isAboveSmallScenes && (
						<div>
							<button
								className="p-2 mt-2 text-gray-900 hover:text-gray-600"
								onClick={() => {
									setIsOpen(false);
									setShowSide(false);
								}}>
								<IoIosClose className="w-6 h-6 text-slate-400" />
							</button>
						</div>
					)}
				</div>

				<div className="my-3">
					<ul>
						<li>
							<NavLink
								style={
									pathname.includes("/admin") && !pathname.includes("/products")
										? navLinkStyle
										: { color: "#111111" }
								}
								className="flex items-center p-2 "
								onClick={() => (!isAboveSmallScenes ? setIsOpen(false) : null)}
								to="">
								{({ isActive }) => (
									<React.Fragment>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className={`${
												isActive &&
												pathname.includes("/admin") &&
												!pathname.includes("/products")
													? "text-white"
													: "text-gray-900"
											} w-5 h-5`}>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
											/>
										</svg>
										<span className="text-xs ps-2">Categories</span>
									</React.Fragment>
								)}
							</NavLink>
						</li>
						<li>
							<NavLink
								style={navLinkStyle}
								className="flex items-center p-2 "
								to="products"
								onClick={() => (!isAboveSmallScenes ? setIsOpen(false) : null)}>
								{({ isActive }) => (
									<React.Fragment>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className={`${
												isActive ? "text-white" : "text-gray-900"
											} w-5 h-5 `}
											viewBox="0 0 16 16">
											<path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
										</svg>

										<span className="text-xs ps-2">Products</span>
									</React.Fragment>
								)}
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</aside>
	);
};

export default SideBarNav;
// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import Logo from "../assets/logo.png";

// const SideBarNav = ({ isOpen, setIsOpen }) => {
//   const { pathname } = useLocation();
//   const [showside, setShowSide] = useState(true);

//   const navLinkStyle = ({ isActive }) => {
//     return {
//       background: isActive ? "#0057AE " : "",
//       color: isActive ? "#fafafa" : "#111111",
//       borderRadius: isActive ? "0.125rem " : "",
//     };
//   };

//   return (
//     <aside
//       className={`${
//         showside && isOpen ? "" : "hidden "
//       }md:block z-100 first-letter:sticky top-0 self-start min-h-screen md:col-span-2 col-span-8 bg-white`}
//     >
//       {/* ... existing code ... */}
//       <button
//         className="p-2 mt-2 text-gray-900 hover:text-gray-600"
// onClick={() => {
//   setIsOpen(false);
//   setShowSide(false);
// }}
//       >
//         Close Sidebar
//       </button>
//     </aside>
//   );
// };

// export default SideBarNav;
