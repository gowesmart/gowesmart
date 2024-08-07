export default function TableDashboard({ title, children }) {
  return (
    <div className="size-full space-y-5 rounded-md border border-accent p-5">
      <h1 className="text-xl font-semibold">{title}</h1>
      {children}
    </div>
  );
}
