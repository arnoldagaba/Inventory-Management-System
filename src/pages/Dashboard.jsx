import HeaderSection from "../components/HeaderSection";
import Spinners from "../components/Spinners";
import { useState, useEffect } from "react";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const loadingDuration = 2000; // duration in ms, adjustable as needed

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, loadingDuration);

		// Cleanup timeout if component unmounts before timeout completes
		return () => clearTimeout(timer);
	}, []);

	return loading ? <Spinners /> : <HeaderSection />;
};

export default Dashboard;
