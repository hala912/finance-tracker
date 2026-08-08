import { Login } from "../Pages/LoginPage/LoginPage";
import { Routes, Route } from "react-router-dom";
import { Signup } from "../Pages/SignupPage/SignupPage";
import TransactionPage from "../Pages/TransactionPage/TransactionPage";
import { ProtectedRoute } from "./ProtectesRoutes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
       
      </Route>
      
       <Route path="/transaction" element={<TransactionPage />} />
    </Routes>
  );
}
