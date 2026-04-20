import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../context/FirebaseAuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function SignupPage() {
  useDocumentTitle("Signup");
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (payload) => {
    setError("");
    setIsLoading(true);

    try {
      signup(payload);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Could not create account right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      mode="signup"
      onSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  );
}
