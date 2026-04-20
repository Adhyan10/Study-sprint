import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/FirebaseAuthContext";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/subjects", label: "Subjects" },
  { to: "/sessions", label: "Sessions" },
  { to: "/insights", label: "Insights" },
];

export default function AppShell({ title, subtitle, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-12 pt-6 sm:px-6">
      <header className="rounded-3xl border border-teal-100 bg-white/95 p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ocean">
              StudySprint
            </p>
            <h1 className="mt-1 text-3xl font-bold text-ink">{title}</h1>
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="text-sm font-medium text-slate-700">
              Hi {user?.name}
            </p>
            <button className="btn-outline" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        <nav className="mt-5 flex flex-wrap gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-ocean text-white"
                    : "border border-teal-100 bg-teal-50/60 text-ocean hover:bg-teal-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mt-6">{children}</main>
    </div>
  );
}
