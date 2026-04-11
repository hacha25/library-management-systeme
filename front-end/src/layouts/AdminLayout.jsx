import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-200">
      {/* SIDEBAR */}
      <Sidebar />
      {/* CONTENT */}
      <div className="flex flex-1 flex-col">
        <Navbar />
        <div className="p-6">
            {children}
        </div>
      </div>
    </div>
  );
}
