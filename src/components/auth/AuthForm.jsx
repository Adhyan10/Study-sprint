import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const initialLogin = { email: "", password: "" };
const initialSignup = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AuthForm({ mode, onSubmit, error, isLoading }) {
  const [form, setForm] = useState(
    mode === "signup" ? initialSignup : initialLogin,
  );
  const [formError, setFormError] = useState("");

  const isSignup = mode === "signup";
  const title = isSignup ? "Create your account" : "Welcome back";
  const subtitle = isSignup
    ? "Track how you study and improve each week."
    : "Login to continue your focused study plan.";

  const canSubmit = useMemo(() => {
    if (isSignup) {
      return form.name && form.email && form.password && form.confirmPassword;
    }
    return form.email && form.password;
  }, [form, isSignup]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    if (!form.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (isSignup && form.password !== form.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-3xl border border-teal-100 bg-white p-6 shadow-soft sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ocean">
        StudySprint
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink">{title}</h1>
      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {isSignup ? (
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </span>
            <input
              className="field"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Aarav Sharma"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input
            className="field"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </span>
          <input
            className="field"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
          />
        </label>

        {isSignup ? (
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Confirm Password
            </span>
            <input
              className="field"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="********"
            />
          </label>
        ) : null}

        {formError ? (
          <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {formError}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        <button
          className="btn-primary w-full disabled:opacity-50"
          type="submit"
          disabled={!canSubmit || isLoading}
        >
          {isLoading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
        </button>
      </form>

      <p className="mt-5 text-sm text-slate-600">
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <Link
          className="font-semibold text-ocean"
          to={isSignup ? "/login" : "/signup"}
        >
          {isSignup ? "Login" : "Create account"}
        </Link>
      </p>
    </div>
  );
}
