//jshint esversion:9
import { Routes, Route } from "react-router-dom";
import Login from "./Scenes/Login";
import ResetPassword from "./Scenes/ResetPassword";
import Admin from "./Scenes/Admin";
import Dashboard from "./Scenes/Dashboard";
import PrivateRoute from "./Scenes/Admin/PrivateRoute";
import CreateCategory from "./Scenes/Dashboard/CreateCategory";
import Products from "./Scenes/Products";
import CreateProduct from "./Scenes/Products/CreateProduct";
import AllProducts from "./Scenes/Products/AllProducts";
import RegisterUser from "./Scenes/RegisterUser";
import Page404 from "./Shared/Page404";
import EditProduct from "./Scenes/Products/EditProduct";
import EditCategory from "./Scenes/Dashboard/EditCategory";

function App() {
	return (
		<div className="w-full">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<RegisterUser />} />
				<Route path="/resetpassword" element={<ResetPassword />} />
				<Route path="/admin" element={<PrivateRoute element={<Admin />} />}>
					<Route index element={<Dashboard />} />
					<Route path="products" element={<Products />}>
						<Route index element={<AllProducts />} />
						<Route path="create" element={<CreateProduct />} />
						<Route path="edit/:id" element={<EditProduct />} />
					</Route>
					<Route path="create" element={<CreateCategory />} />
					<Route path="edit/:id" element={<EditCategory />} />
				</Route>
				<Route path="*" element={<Page404 />} />
			</Routes>
		</div>
	);
}

export default App;
