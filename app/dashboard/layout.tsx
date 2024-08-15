import NavbarUser from "@/components/dashboard/NavbarUser";
import PrivetLayout from "@/components/shared/PrivetLayout";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <PrivetLayout>
      <NavbarUser />
      <section className="max-h-[calc(100dvh-72px)] overflow-x-hidden overflow-y-auto">
        {children}
      </section>
    </PrivetLayout>
  );
};

export default DashboardLayout;
