import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoutes from "./components/ProtectedRoute";

// ADMIN IMPORTS
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Books from "./pages/admin/Books";
import CreateBook from "./pages/admin/createBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoutes>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoutes>
          }
        />
        {/* ADMIN BOOKS */}
        <Route
          path="/admin/books"
          element={
            <ProtectedRoutes>
              <AdminLayout>
                <Books />
              </AdminLayout>
            </ProtectedRoutes>
          }
        />
        {/* ADMIN CREATE BOOK */}
        <Route
          path="/admin/books/create"
          element={
            <ProtectedRoutes>
              <AdminLayout>
                <CreateBook />
              </AdminLayout>
            </ProtectedRoutes>
          }
        />

        {/* USER */}
        <Route
          path="/home"
          element={
            <ProtectedRoutes role="user">
              <h1>User Library</h1>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
