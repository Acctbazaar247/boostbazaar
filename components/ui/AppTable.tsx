import { Table } from "antd";
import { ReactNode } from "react";
import AppRenderReduxData from "./AppRenderReduxData";
import AppTableSkeleton from "./AppTableSkeleton";
import "./custom.css";

type TTableProps = {
  columns: any;
  loadingComponent?: ReactNode;
  header?: boolean;
  infoQuery?: any;
  setPage?: (value: number) => void;
};

const AppTable = ({
  header,
  infoQuery,
  columns,
  loadingComponent,
  setPage,
}: TTableProps) => {
  return (
    <div className="overflow-x-auto w-full">
      {infoQuery && (
        <AppRenderReduxData
          loadingComponent={loadingComponent || <AppTableSkeleton />}
          queryData={infoQuery}
          showData={(data) => {
            console.log(data.data);
            return (
              <Table
                showHeader={header}
                columns={columns}
                rowClassName={"bg-[#FAFAFA]"}
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
