import { useNavigate } from "react-router-dom";
import "./Main.css"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import Profile from "../assets/Ellipse.png";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/auth/login");
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#f8f9fa" }} 
        >
            <div className="text-center">
                <h4 className="text-center">Welcome to </h4>
                <h2 className="text-center un-span mb-4">Unstop</h2>
                <div className="profile-card mx-auto">
                    <img
                        src={Profile}
                        alt="Profile Picture"
                        className="profile-img"
                    />
                    <h5 className="mt-3 mb-1 un-heading">Michael Dam</h5>
                    <p className="text-muted mb-2">example@gmail.com</p>
                    <p className="text-muted">Female</p>
                    <button className="btn logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
