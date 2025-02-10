import {
  useEditSmsPoolOrderMutation,
  useEditSmsPoolOrderStatusMutation,
  useGetSmsPoolByIdQuery,
} from '@/redux/features/smsPoolOrder/smsPoolOrderApi';
import Loading from '../ui/Loading';
import { ISmsPoolOrderDetails } from '@/types';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
interface Props {
  id: number;
  isAdmin?: boolean;
}

const MyNumberDetails = ({ id, isAdmin }: Props) => {
  const { isLoading, isFetching, data, isError, refetch } =
    useGetSmsPoolByIdQuery(id, {});
  const [refundSmsPool, { isLoading: isRefunding }] =
    useEditSmsPoolOrderMutation();
  const [editSmsPoolOrderStatus, { isLoading: isUpdateLoading }] =
    useEditSmsPoolOrderStatusMutation();
  const handleRefund = () => {
    refundSmsPool({ id, status: 'refunded' })
      .unwrap()
      .then(res => {
        toast.success('Refunded Successfully');
      })
      .catch(res => {
        toast.error(res?.data?.message || 'Something went wrong');
      });
  };
  const handleUpdateStatus = (status: string) => {
    editSmsPoolOrderStatus({ id, status })
      .then(res => {
        toast.success('Status Updated Successfully');
      })
      .catch(res => {
        toast.error(res?.data?.message || 'Something went wrong');
      });
  };
  //   call refetch after every 4 second if not error
  useEffect(() => {
    if (!isError && data?.data?.details?.status !== 'refunded') {
      const interval = setInterval(() => {
        refetch();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isError, refetch, data]);
  if (isLoading)
    return (
      <div className="flex justify-center items-center md:w-[500px] min-w-[300px] h-[250px]">
        <Spin size="large" />
      </div>
    );
  if (isError) {
    return (
      <div className="w-[300px] py-4 flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h1 className="text-lg font-semibold mt-2">Error</h1>
        <p>Order Details not found</p>
        <button
          className="bg-primary mt-3 text-[#fff] px-4 py-2 rounded"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  }
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };
  const mainData = data?.data as ISmsPoolOrderDetails;
  return (
    <div className="md:w-[500px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="phone-oder-details-box">
          <div className="phone-oder-details-box-heading">PHONE NUMBER</div>
          <div>{mainData?.details?.phonenumber}</div>
        </div>
        <div className="phone-oder-details-box">
          <div className="phone-oder-details-box-heading">COUNTRY</div>
          <div>{mainData?.details?.short_name}</div>
        </div>
        <div className="phone-oder-details-box">
          <div className="phone-oder-details-box-heading">SERVICE</div>
          <div>{mainData?.details?.service}</div>
        </div>
        <div className="phone-oder-details-box">
          <div className="phone-oder-details-box-heading">STATUS</div>
          {mainData?.details?.status && (
            <span
              className={`inline-block px-2 py-1 rounded text-[#fff] text-sm ${getStatusColor(mainData.details.status as string)}`}
            >
              {mainData?.details?.status}
            </span>
          )}
        </div>
        <div className="phone-oder-details-box">
          <div className="phone-oder-details-box-heading">Code</div>
          <div>
            {mainData?.details?.code === '0' ? (
              <div className="mt-2">
                {mainData?.details?.status === 'refunded' ? (
                  <div>
                    <div>{mainData?.details?.code}</div>
                  </div>
                ) : (
                  <div>
                    <Spin />
                  </div>
                )}
              </div>
            ) : (
              mainData?.details?.code
            )}
          </div>
        </div>
        <div className="phone-oder-details-box">
          <div className="phone-oder-details-box-heading">Full Code</div>
          <div>
            {mainData?.details?.full_code === '0' ? (
              <div className="mt-2">
                {mainData?.details?.status === 'refunded' ? (
                  <div>
                    <div>{mainData?.details?.full_code}</div>
                  </div>
                ) : (
                  <div>
                    <Spin />
                  </div>
                )}
              </div>
            ) : (
              mainData?.details?.full_code
            )}
          </div>
        </div>
      </div>

      {mainData?.details?.status === 'pending' && (
        <div className="text-center py-3">
          Expire in {mainData?.details?.time_left}s
        </div>
      )}
      {mainData?.details?.status === 'pending' &&
        (isRefunding ? (
          <Spin />
        ) : (
          <button
            disabled={isRefunding}
            onClick={handleRefund}
            className="bg-primary mt-4 text-[#fff] px-4 py-2 rounded"
          >
            Refund
          </button>
        ))}
      {isAdmin && (
        <div>
          {mainData?.details?.status !== mainData?.info?.status && (
            <div className="mt-4">
              <h1 className="text-lg font-semibold text-orange-700">
                Status is not updated.
              </h1>
              <p className="text-orange-700">
                Please update the status to {mainData?.details?.status}. The
                status on sms pool is ({mainData?.details?.status}) and on our
                own data base its is ({mainData?.info?.status})
              </p>
              <button
                onClick={() => handleUpdateStatus(mainData?.details?.status)}
                disabled={isUpdateLoading}
                className="bg-primary text-[#fff] mt-2 px-4 py-2 rounded"
              >
                Mark as {mainData?.details?.status}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyNumberDetails;
