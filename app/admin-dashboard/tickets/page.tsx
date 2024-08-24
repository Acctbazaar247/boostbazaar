"use client";

import AppModal from "@/components/ui/AppModal";
import AppPopover from "@/components/ui/AppPopover";
import AppTable from "@/components/ui/AppTable";
import AppTabs from "@/components/ui/AppTabs";
import {
  useGetTicketsQuery,
  useUpdateTicketMutation,
} from "@/redux/features/dashboard/dashboardApi";
import { cn } from "@/utils/cn";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

enum ETickets {
  open = "open",
  closed = "closed",
  sloved = "sloved",
}

const Page = () => {
  const tabs = [
    { label: "Tickets", value: "tickets" },
    { label: "Opened", value: "open" },
    { label: "Solved", value: "sloved" },
    { label: "Closed", value: "closed" },
  ];

  const statusOptions = [
    {
      status: ETickets.open,
    },
    {
      status: ETickets.closed,
    },
    {
      status: ETickets.sloved,
    },
  ];

  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const ticketQuery = useGetTicketsQuery(
    activeTab === "tickets" ? "" : activeTab
  );

  const [updateTicket] = useUpdateTicketMutation();

  const handleStatusUpdate = async (status: string, id: string) => {
    const updateData = {
      id,
      data: { status },
    };
    await updateTicket(updateData)
      .unwrap()
      .then((res) => {
        toast.success("Status updated successful!", { toastId: 1 });
      })
      .catch((res: any) => {
        return toast.error(res?.data.message || "Something went wrong!", {
          toastId: 1,
        });
      });
  };

  const columns = [
    {
      title: "Complaint",
      dataIndex: "ownBy",
      className: "md:min-w-[150px]",
      render: (ownBy: any, record: any) => {
        return (
          <div className="flex items-center gap-1">
            <img
              src={ownBy?.profileImg}
              alt=""
              className="rounded-full w-10 h-10"
            />
            <div className="text-dark-grey">
              <h3 className=" text-lg">{ownBy?.name}</h3>
              <p>{ownBy?.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Subject",
      dataIndex: "subject",
      className: "min-w-[130px] md:min-w-[150px]",
    },
    {
      title: "Details",
      dataIndex: "message",
      className: "min-w-[120px] md:min-w-[145px]",
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
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[85px]",
      render: (status: any, record: any) => {
        return (
          <div className="flex items-center gap-2">
            <div className="pt-1 flex items-center gap-1">
              <AppPopover
                arrow={true}
                button={
                  <div
                    className={cn(
                      "text-white rounded-full flex items-center gap-1 px-3 cursor-pointer",
                      status === ETickets.open && "bg-primary",
                      status === ETickets.closed && "bg-[#71717A80]",
                      status === ETickets.sloved && "bg-[#058803]"
                    )}
                  >
                    {status}

                    <IoIosArrowDown />
                  </div>
                }
              >
                <div className="flex flex-col items-end text-end">
                  {statusOptions.map(
                    (stat) =>
                      stat.status !== status && (
                        <AppModal
                          key={stat.status}
                          button={
                            <button className="hover:bg-blue-50 w-full">
                              {stat.status}
                            </button>
                          }
                          cancelButtonTitle="No, Don’t"
                          primaryButtonTitle="Yes. Update"
                          primaryButtonAction={() =>
                            handleStatusUpdate(stat.status, record?.id)
                          }
                        >
                          <div className="max-w-80">
                            <p className="text-center text-[#828282] pt-4 text-lg">
                              Are you sure Update status {record?.status} to
                              <span className="text-textDark font-medium">
                                {" "}
                                {stat.status}
                              </span>{" "}
                              from this Tickets list?
                            </p>
                          </div>
                        </AppModal>
                      )
                  )}
                </div>
              </AppPopover>
            </div>
          </div>
        );
      },
    },
    {
      title: "Last Message",
      dataIndex: "createdAt",
      className: "min-w-[120px] md:min-w-[100px]",
      render: (createdAt: string) => {
        return (
          <div className={`flex items-center gap-1 justify-center`}>
            {getTimeAgo(createdAt)} ago
          </div>
        );
      },
    },
  ];

  return (
    <div className="">
      <h1 className="heading pb-4 md:pb-10">Tickets</h1>
      <AppTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <AppTable setPage={setPage} columns={columns} infoQuery={ticketQuery} />
    </div>
  );
};

export default Page;
