import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/authSlice";

export default function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    return (
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">

            <div>
                <h1 className="text-lg font-semibold text-gray-900">
                    My tasks
                </h1>

                <p className="text-sm text-gray-400">
                    Keep your day organized
                </p>
            </div>

            <div className="flex items-center gap-4">

                <div className="hidden text-right sm:block">
                    <p className="text-sm font-semibold text-gray-900">
                        {user?.name}
                    </p>

                    <p className="text-xs text-gray-400">
                        {user?.email}
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-200 font-semibold text-gray-800">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <button
                    type="button"
                    onClick={() => dispatch(logout())}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                >
                    Log out
                </button>

            </div>
        </header>
    );
}