import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Admin_login from "./components/Login/Admin_login";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./Pages/Dashboard";
import Addfood from "./Pages/Addfood";
import Listfood from "./Pages/Listfood";
import Managefood from "./Pages/Managefood";
import Orders from "./Pages/Orders";
import Orderdetails from "./Pages/Orderdetails";
import Customers from "./Pages/Customers";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import History from "./Pages/History";
import { isAuthenticated } from "./api";

function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
}

function LoginRoute() {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Admin_login />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<LoginRoute />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-food" element={<Addfood />} />
            <Route path="/list-food" element={<Listfood />} />
            <Route path="/manage-food" element={<Managefood />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<Orderdetails />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
