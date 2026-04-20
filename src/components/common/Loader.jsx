export default function Loader({ label = "Loading...", fullPage = false }) {
  return (
    <div
      className={
        fullPage
          ? "grid min-h-screen place-items-center"
          : "grid place-items-center py-10"
      }
    >
      <div className="flex items-center gap-3 rounded-2xl border border-teal-100 bg-white px-4 py-3 shadow-soft">
        <div className="h-3 w-3 animate-pulse rounded-full bg-coral" />
        <p className="text-sm font-semibold text-slate-700">{label}</p>
      </div>
    </div>
  );
}
