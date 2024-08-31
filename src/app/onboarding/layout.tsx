export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-onboard min-h-screen bg-cover bg-center">{children}</div>
  );
}
