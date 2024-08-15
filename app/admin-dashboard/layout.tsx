import NavbarDashboard from "@/components/admin-dashboard/NavbarDashboard";
import Sidebar from "@/components/admin-dashboard/Sidebar";
import PrivetLayout from "@/components/shared/PrivetLayout";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <PrivetLayout roles={["admin"]}>
      <NavbarDashboard />
      <section className="bg-[#FAFAFA] max-h-[calc(100dvh-64px)] md:h-[calc(100dvh-64px)] overflow-hidden md:grid md:grid-cols-[300px_1fr]">
        <Sidebar className="max-md:hidden" />
        <div className="overflow-y-auto p-4 md:p-8">{children}</div>
      </section>
    </PrivetLayout>
  );
};

export default DashboardLayout;
