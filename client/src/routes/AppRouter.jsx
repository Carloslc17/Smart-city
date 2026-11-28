import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PublicOnlyRoute from "../components/PublicOnlyRoute/PublicOnlyRoute";
import AppLayout from "../components/AppLayout/AppLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Traffic from "../pages/Traffic/Traffic";
import AirQuality from "../pages/AirQuality/AirQuality";
import Accidents from "../pages/Accidents/Accidents";
import NotFound from "../pages/NotFound/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      {/* Solo para no autenticados */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Solo para autenticados */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trafico" element={<Traffic />} />
          <Route path="/aire" element={<AirQuality />} />
          <Route path="/seguridad-vial" element={<Accidents />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}