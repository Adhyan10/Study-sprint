import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../context/FirebaseAuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function LoginPage() {
  useDocumentTitle("Login");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (payload) => {
    setError("");
    setIsLoading(true);

    try {
      login(payload);
      const redirectTo = location.state?.from || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Could not login right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      mode="login"
      onSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  );
}
