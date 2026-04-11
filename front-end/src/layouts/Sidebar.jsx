import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-900 text-white p-4">
            <h2 className="text-xl mb-6">Admin</h2>
            <ul className="space-y-3">
                <li>
                    <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/admin/books">Books</Link>
                </li>
                <li>
                    <Link to="/admin/categories">Categories</Link>
                </li>
                <li>
                    <Link to="/admin/loans">Loans</Link>
                </li>
            </ul>
        </div>
    )
}