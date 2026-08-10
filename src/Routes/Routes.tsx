import { Login } from "../Pages/LoginPage/LoginPage";
import { Routes, Route } from "react-router-dom";
import { Signup } from "../Pages/SignupPage/SignupPage";
import TransactionPage from "../Pages/TransactionPage/TransactionPage";
import { ProtectedRoute } from "./ProtectesRoutes";
import Dashboard from "../Pages/Dashboard/Dashboard";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
