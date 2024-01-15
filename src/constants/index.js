import instance from "../API";

export const serverUrl = "https://icyizere-ems-server.onrender.com/api/v1";
export const localServerUrl = "http://localhost:5000/api/v1";
export const deleteProduct = async (id, setData, url, item) => {
	const dataCat = { catId: id };
	const dataProd = { prodId: id };
	const dataSub = item === "Product" ? dataProd : dataCat;
	await instance
		.post(`${url}`, dataSub)
		.then(() => {
			setData((prev) => prev.filter((item) => item.id !== id));
		})
		.catch((err) => {
			console.log(err);
		});
};
