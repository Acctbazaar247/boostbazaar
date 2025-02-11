import NavbarDashboard from '@/components/admin-dashboard/NavbarDashboard';
import Sidebar from '@/components/admin-dashboard/Sidebar';
import PrivetLayout from '@/components/shared/PrivetLayout';
import { UserRole } from '@/types';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <PrivetLayout
      roles={[UserRole.Admin, UserRole.FinanceAdmin, UserRole.CustomerCare]}
    >
      <NavbarDashboard />
      <section className="bg-dashboardBg md:h-[calc(100dvh-64px)] overflow-hidden md:grid md:grid-cols-[240px_1fr]">
        <Sidebar className="max-md:hidden" />
        <div className="overflow-y-auto p-4 md:p-8">{children}</div>
      </section>
    </PrivetLayout>
  );
};

export default DashboardLayout;
