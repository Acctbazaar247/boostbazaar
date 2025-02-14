'use client';

import { LuLogOut, LuUsers } from 'react-icons/lu';
import {
  IoHomeOutline,
  IoSettingsOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { VscBell } from 'react-icons/vsc';
import { TbUserShield } from 'react-icons/tb';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { logOut } from '@/redux/features/auth/authSlice';
import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation';
import { FaPhone, FaWallet } from 'react-icons/fa';
import { CiWallet } from 'react-icons/ci';
import { FaArrowsDownToPeople } from 'react-icons/fa6';
import { UserRole } from '@/types';

const Sidebar = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const pathname = usePathname();
  let navLinks: any[] = [];

  if (user) {
    if (user.role === 'financeAdmin') {
      navLinks = [
        {
          label: 'SUPPORT',
          navs: [
            {
              icon: <IoTicketOutline />,
              label: 'Tickets',
              path: '/admin-dashboard/tickets',
            },
            {
              icon: <CiWallet></CiWallet>,
              label: 'Transactions',
              path: '/admin-dashboard/transactions',
            },
            {
              icon: <FaArrowsDownToPeople></FaArrowsDownToPeople>,
              label: 'Top up',
              path: '/admin-dashboard/topUpToUser',
            },
            {
              icon: <LuUsers />,
              label: 'Customers',
              path: '/admin-dashboard/customer',
            },
          ],
        },
        {
          label: 'Payments',
          navs: [
            {
              icon: <FaArrowsDownToPeople></FaArrowsDownToPeople>,
              label: 'Manual Payment',
              path: '/admin-dashboard/manage-manual-payment',
            },
          ],
        },
        {
          label: 'SHOP',
          navs: [
            {
              icon: <VscBell />,
              label: 'Orders',
              path: '/admin-dashboard/orders',
            },
            {
              icon: <FaPhone />,
              label: 'Manage Number',
              path: '/admin-dashboard/manage-number',
            },
          ],
        },
        {
          label: '',
          navs: [
            {
              icon: <IoSettingsOutline />,
              label: 'Settings',
              path: '/admin-dashboard/setting',
            },
            {
              icon: <LuLogOut />,
              label: 'Logout',
              path: '',
            },
          ],
        },
      ];
    } else if (user.role === 'customerCare') {
      navLinks = [
        {
          label: 'SUPPORT',
          navs: [
            {
              icon: <IoTicketOutline />,
              label: 'Tickets',
              path: '/admin-dashboard/tickets',
            },
            {
              icon: <CiWallet></CiWallet>,
              label: 'Transactions',
              path: '/admin-dashboard/transactions',
            },

            {
              icon: <LuUsers />,
              label: 'Customers',
              path: '/admin-dashboard/customer',
            },
          ],
        },

        {
          label: 'SHOP',
          navs: [
            {
              icon: <VscBell />,
              label: 'Orders',
              path: '/admin-dashboard/orders',
            },
            {
              icon: <FaPhone />,
              label: 'Manage Number',
              path: '/admin-dashboard/manage-number',
            },
          ],
        },
        {
          label: '',
          navs: [
            {
              icon: <IoSettingsOutline />,
              label: 'Settings',
              path: '/admin-dashboard/setting',
            },
            {
              icon: <LuLogOut />,
              label: 'Logout',
              path: '',
            },
          ],
        },
      ];
    } else if (user.role === UserRole.Admin) {
      navLinks = [
        {
          label: '',
          navs: [
            {
              icon: <IoHomeOutline />,
              label: 'Dashboard',
              path: '/admin-dashboard',
            },
          ],
        },
        {
          label: 'SUPPORT',
          navs: [
            {
              icon: <IoTicketOutline />,
              label: 'Tickets',
              path: '/admin-dashboard/tickets',
            },
            {
              icon: <CiWallet></CiWallet>,
              label: 'Transactions',
              path: '/admin-dashboard/transactions',
            },
            {
              icon: <FaArrowsDownToPeople></FaArrowsDownToPeople>,
              label: 'Top up',
              path: '/admin-dashboard/topUpToUser',
            },
            {
              icon: <LuUsers />,
              label: 'Customers',
              path: '/admin-dashboard/customer',
            },
            {
              icon: <LuUsers />,
              label: 'Admins',
              path: '/admin-dashboard/manage-admin',
            },
          ],
        },
        {
          label: 'Payments',
          navs: [
            {
              icon: <IoTicketOutline />,
              label: 'Manage Bank',
              path: '/admin-dashboard/manage-bank',
            },
            {
              icon: <CiWallet></CiWallet>,
              label: 'Crypto Bank',
              path: '/admin-dashboard/manage-crypto-bank',
            },
            {
              icon: <FaArrowsDownToPeople></FaArrowsDownToPeople>,
              label: 'Manual Payment',
              path: '/admin-dashboard/manage-manual-payment',
            },
          ],
        },
        {
          label: 'SHOP',
          navs: [
            {
              icon: <VscBell />,
              label: 'Orders',
              path: '/admin-dashboard/orders',
            },
            {
              icon: <FaPhone />,
              label: 'Manage Number',
              path: '/admin-dashboard/manage-number',
            },
          ],
        },
        {
          label: '',
          navs: [
            {
              icon: <IoSettingsOutline />,
              label: 'Settings',
              path: '/admin-dashboard/setting',
            },
            {
              icon: <LuLogOut />,
              label: 'Logout',
              path: '',
            },
          ],
        },
      ];
    }
  }

  return (
    <div
      className={cn(
        'md:w-60 shadow-lg overflow-y-auto md:border-r border-dark-grey/50 flex flex-col justify-between md:pt-6 md:pb-12 md:px-8',
        className,
      )}
    >
      {navLinks.map((navLink, index) => (
        <div key={index} className="md:py-4">
          <h3 className="max-sm:hidden text-lg font-medium text-dark-grey pb-4">
            {navLink.label}
          </h3>
          {navLink.navs.map((nav: any, i: number) =>
            nav.label === 'Logout' ? (
              <button
                key={i}
                onClick={() => dispatch(logOut())}
                className="text-black hover:text-red flex items-center gap-3 py-1.5 max-sm:font-normal"
              >
                {nav.icon} {nav.label}
              </button>
            ) : (
              <Link
                key={i}
                href={nav.path}
                className={cn(
                  'text-black hover:text-primary flex items-center gap-3 py-1.5 max-sm:font-normal',
                  pathname === nav.path && 'text-primary',
                )}
              >
                <span className="text-lg">{nav.icon}</span> {nav.label}
              </Link>
            ),
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
