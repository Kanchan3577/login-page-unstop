import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Google from '../assets/google.png'
import Facebook from '../assets/rename.png';
import Image from '../assets/illustration.png';
import "./Main.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  const [username, setUsername] = useState("emilys");
  const [email, setEmail] = useState("example@gmail.com");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username !== "emilys") {
      setError("Invalid username");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
        email,
        expiresInMins: 30,
      });

      localStorage.setItem("authToken", response.data.token);
      navigate("/home");
    } catch (err) {
      alert("Login failed. Please try again.", err)
      setError("Login failed. Please try again.", err);
    }
  };

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        { }
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={Image}
            alt="illustration"
            className="illustration"
          />
        </div>

        {/* Right Section: Login Form */}
        <div className="col-md-6">
          <div className="card border card-unstop shadow p-4">
            <h4 className="text-start">Welcome to </h4>
            <h2 className="text-start un-span mb-4">Unstop</h2>

            <button className="btn social-btn p-2"><img className="social-icon" src={Google}></img>Login with Google</button>
            <button className="btn social-btn p-2 mt-2"><img className="social-icon me-2" src={Facebook}></img>Login with Facebook</button>
            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1 me-4" />
              <span className="text-dark">OR</span>
              <hr className="flex-grow-1 ms-4" />
            </div>


            <form onSubmit={handleLogin} className="form-unstop">
              <div className="form-floating mb-3 position-relative">
                <input
                  type="text"
                  id="username"
                  className="form-control input-unstop"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="unstop-label" htmlFor="username">User name</label>
                <i className="bi bi-person-circle position-absolute top-50 translate-middle-y ms-3"></i>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type="email"
                  id="email"
                  className="form-control input-unstop"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="unstop-label" htmlFor="email">Email</label>
                <i className="bi bi-envelope-fill position-absolute top-50 translate-middle-y ms-3"></i>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control input-unstop"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="unstop-label" htmlFor="password">Password</label>
                <i className="bi bi-key-fill position-absolute top-50 translate-middle-y ms-3"></i>
                <i
                  className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                    } position-absolute top-50 translate-middle-y me-3 eye-icon`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>

              <div className="form-check my-4 d-flex align-items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-check-input"
                />
                <label htmlFor="rememberMe" className="form-check-label ms-2">
                  Remember me
                </label>
                <a href="#" className="ms-auto text-decoration-none">
                  Forgot Password?
                </a>
              </div>

              {error && <p className="text-danger">{error}</p>}

              <button type="submit" className="btn submit-btn w-100 py-3">
                Login
              </button>

              <div className="text-center mt-3">
                <p>
                  Don’t have an account?{" "}
                  <a href="#" className="text-decoration-none">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
