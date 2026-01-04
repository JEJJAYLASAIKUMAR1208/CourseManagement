import { Link } from "react-router-dom";

export default function Navbar({ isAuth, setIsAuth }) {
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    return (
        <nav className="navbar">
            <h2>Course Manager</h2>

            <div>
                {!isAuth ? (
                    <>
                        <Link to="/login"><button>Login</button></Link>
                        <Link to="/register"><button>Register</button></Link>
                    </>
                ) : (
                    <Link to="/login">
                        <button onClick={handleLogout}>Logout</button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
