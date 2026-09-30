import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../Store/authSlice";

export default function LoginPage() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function switchMode() {
        setIsSignup(!isSignup);
        setError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            if (isSignup) {
                await dispatch(signup({ name, email, password })).unwrap();
            } else {
                await dispatch(login({ email, password })).unwrap();
            }
            // App.jsx sends the user to "/" once the token is saved
        } catch (err) {
            setError(err.message);
        }
    }

    const inputClass = "rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200";

    return (
        <div className="flex min-h-screen items-center justify-center p-5">
            <form
                onSubmit={handleSubmit}
                className="flex w-100 flex-col gap-6 rounded-xl bg-white p-7 shadow-2xl"
            >
                <div>
                    <h1 className="pb-2 text-center text-5xl font-light">To-do</h1>
                    <p className="text-center text-sm text-gray-500">
                        {isSignup ? "Create an account to save your to-dos" : "Log in to see your to-dos"}
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    {isSignup && (
                        <>
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name..."
                                required
                                className={inputClass}
                            />
                        </>
                    )}

                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email..."
                        required
                        className={inputClass}
                    />

                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isSignup ? "At least 6 characters" : "Enter your password..."}
                        minLength={isSignup ? 6 : undefined}
                        required
                        className={inputClass}
                    />

                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-amber-300 px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-amber-400 disabled:opacity-50"
                >
                    {loading ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
                </button>

                <p className="text-center text-sm text-gray-600">
                    {isSignup ? "Already have an account?" : "New here?"}{" "}
                    <button type="button" onClick={switchMode} className="font-semibold text-amber-600 hover:underline">
                        {isSignup ? "Log in" : "Create an account"}
                    </button>
                </p>
            </form>
        </div>
    )
}