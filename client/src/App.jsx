import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

export default function App() {
    const token = useSelector(state => state.auth.token);

    return (
        <Routes>
            <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
