import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../Api";

const UserRegistration = () => {
	const navigate = useNavigate();
	
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = { username, email, password };
		
		try {
			const response = await registerUser(formData);
			toast.success("User registered successfully!");
			navigate("/login"); // Redirect to login page after successful registration
		} catch (error) {
			console.error("Registration error:", error);
			toast.error("Registration failed. Please try again.");
		}
	};

	return (
		<div>
			<div className="container min-vh-100 d-flex justify-content-center align-items-center">
				<form onSubmit={handleSubmit}>
					<h3>Please sign up here</h3>

					<div className="mb-3">
						<label htmlFor="username" className="form-label">
							Username
						</label>
						<input
							type="text"
							name="username"
							value={username}
							className="form-control"
							id="username"
							placeholder="Enter Username"
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={email}
							className="form-control"
							id="email"
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={password}
							className="form-control"
							id="password"
							placeholder="Enter your password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<button className="btn btn-primary" type="submit">
						Register
					</button>

					<Link to="/login" className="btn btn-primary px-4 mx-2">
						<i className="fas fa-sign-in-alt text-warning"></i>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default UserRegistration;
