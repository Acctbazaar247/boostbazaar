import { baseApi } from '@/redux/api/baseApi';
import { tagTypes, tagTypesList } from '@/redux/api/tagTypesList';

export const smsPoolApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSmsPoolOrder: builder.query({
      query: query => {
        return {
          url: `/sms-pool-order`,
          params: query,
        };
      },
      providesTags: [tagTypes.smsPoolOrder],
    }),
    getSmsPoolOrderById: builder.query({
      query: id => `/sms-pool-order/${id}`,
    }),
    addSmsPool: builder.mutation({
      query: info => {
        return {
          url: '/sms-pool-order',
          method: 'POST',
          body: info,
        };
      },
    }),
    editSmsPoolOrder: builder.mutation({
      query: info => {
        return {
          url: `/sms-pool-order/${info.id}`,
          method: 'PATCH',
          body: info,
        };
      },
      invalidatesTags: [tagTypes.smsPoolOrder],
    }),
    editSmsPoolOrderStatus: builder.mutation({
      query: info => {
        return {
          url: `/sms-pool-order/update-status/${info.id}`,
          method: 'PATCH',
          body: info,
        };
      },
      invalidatesTags: [tagTypes.smsPoolOrder],
    }),
    deleteSmsPool: builder.mutation({
      query: id => {
        return {
          url: `/sms-pool-orders/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});
export const {
  useGetSmsPoolOrderQuery,
  useGetSmsPoolOrderByIdQuery,
  useAddSmsPoolMutation,
  useEditSmsPoolOrderMutation,
  useDeleteSmsPoolMutation,
  useEditSmsPoolOrderStatusMutation,
} = smsPoolApi;
