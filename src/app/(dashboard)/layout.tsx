import { LayoutHeader } from "./(components)/layout-header";
import { Navbar } from "./(components)/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-row">
      <Navbar />
      <div className="flex-1">
        <LayoutHeader />
        {children}
      </div>
    </div>
  );
}
