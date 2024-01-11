//jshint esversion:9

import { Outlet } from "react-router-dom";
import SideBarNav from "../../Shared/SideBarNav";
import TopBar from "../../Shared/TopBar";
import { useState } from "react";
import useMediaQuery from "../../Hooks/useMediaQuery";

function Admin() {
	const [isOpen, setIsOpen] = useState(false);
	const isAboveSmallScenes = useMediaQuery("(min-width:768px)");

	return (
		<div className="relative grid-cols-8 md:grid w-100 ">
			<SideBarNav isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="col-span-8 md:col-span-6 ">
				<TopBar setShowSide={setIsOpen} />
				<div
					className={`${
						isOpen ? " hidden " : " "
					}min-h-screen px-6  bg-slate-100`}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Admin;

// import { Outlet } from "react-router-dom";
// import SideBarNav from "../../Shared/SideBarNav";
// import TopBar from "../../Shared/TopBar";
// import { useState } from "react";

// function Admin() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative grid grid-cols-8 w-100 ">
//       <SideBarNav isOpen={isOpen} setIsOpen={setIsOpen} />
//       {/* ... existing code ... */}
//       <TopBar setShowSide={setIsOpen} />
//     </div>
//   );
// }

// export default Admin;
