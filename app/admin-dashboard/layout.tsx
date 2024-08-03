import NavbarDashboard from "@/components/admin-dashboard/NavbarDashboard";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <NavbarDashboard />
      <section className="bg-[#FAFAFA] max-h-[calc(100dvh-64px)] overflow-hidden">
        {children}
      </section>
    </>
  );
};

export default DashboardLayout;
