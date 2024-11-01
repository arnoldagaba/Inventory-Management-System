import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../Api";
import imagePicture from "../assets/images/Login 2.avif";

// Reusable Input Component
const FormInput = ({ label, type, value, onChange, placeholder, required }) => (
	<div className="mb-3">
		<label className="form-label">{label}</label>
		<input
			type={type}
			value={value}
			className="form-control"
			placeholder={placeholder}
			onChange={onChange}
			required={required}
		/>
	</div>
);

const UserLogin = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Email format validation
	const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate email format
		if (!isValidEmail(email)) {
			toast.error("Please enter a valid email address.");
			return;
		}

		const formData = { email, password };

		// Send login request to Strapi
		try {
			const response = await loginUser(formData);
			console.log(response);
			toast.success("User logged in successfully!");
			localStorage.setItem("token", response.jwt); // Store JWT token
			
			navigate("/admin"); // Navigate to admin page after login
		} catch (error) {
			console.error("Login error:", error);
			toast.error("Failed to login. Please check your credentials.");
		}
	};

	return (
		<>
			<div className="container my-5 py-5">
				<div className="row">
					<div className="col-md-6">
						<form onSubmit={handleSubmit}>
							<h3 className="text-uppercase fs-2 text-primary fw-bold">
								Please login here
							</h3>

							<FormInput
								label="Email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								required
							/>

							<FormInput
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								required
							/>

							<button className="btn btn-primary" type="submit">
								Login
							</button>
							<Link to="/register" className="btn btn-outline-primary mx-3">
								Sign-Up
							</Link>
						</form>
					</div>

					<div className="col-md-6 d-flex align-items-center justify-content-center">
						<img
							src={imagePicture}
							alt="Login"
							className="d-none d-md-block w-75 rounded"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserLogin;
