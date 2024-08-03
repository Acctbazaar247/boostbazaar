import NavbarUser from "@/components/dashboard/NavbarUser";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <NavbarUser />
      <section className="max-h-[calc(100dvh-72px)] overflow-x-hidden overflow-y-auto">
        {children}
      </section>
    </>
  );
};

export default DashboardLayout;
