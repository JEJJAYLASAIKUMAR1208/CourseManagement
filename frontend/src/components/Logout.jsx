import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setIsAuth }) {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        setIsAuth(false);
        navigate("/login", { replace: true });
    }, [setIsAuth, navigate]);

    return null;
}
