import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoutes from "./components/ProtectedRoute";

// ADMIN IMPORTS
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Books from "./pages/admin/Books";
import CreateBook from "./pages/admin/createBook";
import EditBook from "./pages/admin/EditBook";

// USER IMPORTS
import Library from "./pages/user/Library";
import MyLoans from "./pages/user/MyLoans";

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
        {/* ADMIN EDIT BOOK */}
        <Route
          path="/admin/books/edit/:isbn"
          element={
            <ProtectedRoutes>
              <AdminLayout>
                <EditBook />
              </AdminLayout>
            </ProtectedRoutes>
          }
        />

        {/* USER  LIBRARY*/}
        <Route
          path="/library"
          element={
            <ProtectedRoutes role="user">
              <Library />
            </ProtectedRoutes>
          }
        />

        {/* USER   LOANS*/}
          <Route
          path="/my-loans"
          element={
            <ProtectedRoutes role="user">
              <MyLoans />
            </ProtectedRoutes>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
