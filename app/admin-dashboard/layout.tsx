import NavbarDashboard from "@/components/admin-dashboard/NavbarDashboard";
import PrivetLayout from "@/components/shared/PrivetLayout";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <PrivetLayout roles={["admin"]}>
      <NavbarDashboard />
      <section className="bg-[#FAFAFA] max-h-[calc(100dvh-64px)] overflow-hidden">
        {children}
      </section>
    </PrivetLayout>
  );
};

export default DashboardLayout;
