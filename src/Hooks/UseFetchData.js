//jshint esversion:9
import { useState, useEffect } from "react";
import instance from "../API";

const useFetchData = (url) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await instance.get(url);
				if (response.data && response.data.data) {
					setData(response.data.data);
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
};

export default useFetchData;
