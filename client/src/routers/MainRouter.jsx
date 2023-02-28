import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { WaitPage } from "../pages/Wait/WaitPage";

export const MainRouter = () => {
  const { status } = useAuth();

  if (status === "checking") {
    return <WaitPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
