"use client";

import AnimationWrapper from "@/components/ui/AnimationWrapper";
import AppInfo from "@/components/ui/AppInfo";
import AppTable from "@/components/ui/AppTable";
import AppTabs from "@/components/ui/AppTabs";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetCurrencyRequestQuery,
  useGetOrdersQuery,
} from "@/redux/features/dashboard/dashboardApi";
import { useAppSelector } from "@/redux/hook";
import { useMemo, useState } from "react";
import { FaDollarSign } from "react-icons/fa";

const Page = () => {
  const user = useAppSelector(selectCurrentUser);
  const tabs = [
    { label: "Order", value: "order" },
    { label: "Deposit", value: "deposit" },
  ];
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const orderQueryString = useMemo(() => {
    const info = {
      page,
      orderById: user?.id,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page, user]);

  const currencyQueryString = useMemo(() => {
    const info = {
      page,
      ownById: user?.id,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page, user]);

  const orderQuery = useGetOrdersQuery(orderQueryString);
  const depositQuery = useGetCurrencyRequestQuery(currencyQueryString);

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "japOrderId",
      className: "min-w-[120px] md:min-w-[145px]",
    },
    {
      title: "Category",
      dataIndex: "accountCategory",
      className: "min-w-[130px] md:min-w-[150px]",
    },
    {
      title: "Link",
      dataIndex: "link",
      className: "min-w-[120px] md:min-w-[145px]",
    },
    {
      title: "Service ID",
      dataIndex: "japServiceId",
      className: "min-w-[120px] md:min-w-[145px]",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      className: "min-w-[120px] md:min-w-[145px]",
    },
    {
      title: "Charge",
      dataIndex: "charge",
      className: "min-w-[120px] md:min-w-[145px]",
      render: (charge: number) => {
        return (
          <p className="pl-2 flex  items-center gap-1">
            <FaDollarSign></FaDollarSign> {charge?.toFixed(2)}
          </p>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[120px] md:min-w-[145px]",
    },
  ];

  const depositColumns = [
    {
      title: "Id",
      dataIndex: "id",
      className: "md:min-w-[150px]",
      render: (id: any, record: any) => {
        return <p>{id}</p>;
      },
    },

    {
      title: "Amount",
      dataIndex: "amount",
      className: "min-w-[120px] md:min-w-[145px]",
      render: (id: any, record: any) => {
        return (
          <p className="pl-2 flex  items-center gap-1">
            <FaDollarSign></FaDollarSign> {id?.toFixed(2)}
          </p>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[120px] md:min-w-[145px] text-center",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   className: "md:min-w-[150px]",
    //   render: (status: string) => {
    //     return (
    //       <div className={`flex items-center gap-1`}>
    //         <span
    //           className={cn(
    //             "text-white rounded-full px-3",
    //             status === "open" && "bg-primary",
    //             status === "closed" && "bg-[#71717A80]",
    //             status === "solved" && "bg-[#058803]"
    //           )}
    //         >
    //           {status}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <AnimationWrapper className="container py-12">
      <h1 className="heading ">History</h1>

      <AppTabs
        className="!text-xl"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />

      {activeTab === "deposit" ? null : (
        <div className="  pb-4  ">
          <AppInfo>
            <p>
              {" "}
              Orders are processed within 0 seconds to 24 hours, 
              though some may take 0–7 days or up to 30 days, depending on complexity. 
              If your order does not begin within 24 hours, please contact us via Telegram 
              @acctpanel or email <a href="mailto:support@acctpanel.com">support@acctpanel.com</a>.{" "}
              <a
                className="text-primary underline cursor-pointer"
                href="mailto:support@acctpanel.com "
              >
                support@acctpanel.com
              </a>{" "}
              for assistance.
            </p>
          </AppInfo>
        </div>
      )}

      <AppTable
        setPage={setPage}
        columns={activeTab === "deposit" ? depositColumns : orderColumns}
        infoQuery={activeTab === "deposit" ? depositQuery : orderQuery}
      />
    </AnimationWrapper>
  );
};

export default Page;
