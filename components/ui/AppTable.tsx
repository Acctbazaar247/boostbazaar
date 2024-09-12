import { Table } from "antd";
import { ReactNode } from "react";
import AppRenderReduxData from "./AppRenderReduxData";
import AppTableSkeleton from "./AppTableSkeleton";
import "./custom.css";
import { cn } from "@/utils/cn";

type TTableProps = {
  columns: any;
  loadingComponent?: ReactNode;
  header?: boolean;
  infoQuery?: any;
  setPage?: (value: number) => void;
  rowClassName?: any;
};

const AppTable = ({
  header,
  infoQuery,
  columns,
  loadingComponent,
  rowClassName,
  setPage,
}: TTableProps) => {
  return (
    <div className="overflow-x-auto w-full">
      {infoQuery && (
        <AppRenderReduxData
          loadingComponent={loadingComponent || <AppTableSkeleton />}
          queryData={infoQuery}
          showData={(data) => {
            // console.log(data);
            return (
              <Table
                showHeader={header}
                columns={columns}
                rowClassName={
                  rowClassName ? (data) => cn("", rowClassName(data)) : cn("")
                }
                dataSource={
                  Array.isArray(data?.data) ? data?.data : [data?.data]
                }
                rowKey="id"
                pagination={
                  setPage
                    ? {
                        onChange: (value) => setPage(value),
                        pageSize: data?.meta?.limit,
                        total: data?.meta?.total,
                        current: data?.meta?.page,
                        showSizeChanger: false,
                      }
                    : false
                }
              />
            );
          }}
        />
      )}
    </div>
  );
};

export default AppTable;
