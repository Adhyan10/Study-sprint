import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-lg rounded-3xl border border-teal-100 bg-white p-8 text-center shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ocean">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-ink">Page not found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The page you requested does not exist.
        </p>
        <Link to="/dashboard" className="btn-primary mt-5 inline-flex">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
