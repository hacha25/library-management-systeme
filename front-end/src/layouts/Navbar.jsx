import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const {user, logout} = useAuth();

    return (
        <div className="bg-white p-4 shadow flex justify-between">
            <h1 className="font-bold">Dashboard</h1>

            <div className="flex items-center gap-4">
                <span className="font-bold text-blue-500">{user?.name.toUpperCase()}</span>
                <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1"
                >Logout</button>
            </div>
        </div>
    )
}