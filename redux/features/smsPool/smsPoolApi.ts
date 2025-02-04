import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/api/tagTypesList';

export const smsPoolApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSmsPools: builder.query({
      query: () => {
        return {
          url: `/sms-pool`,
        };
      },
    }),
    getSmsPoolCountryByService: builder.query({
      query: service => {
        return {
          url: `/sms-pool/${service}`,
        };
      },
    }),
    getSmsPoolById: builder.query({
      query: id => `/sms-pools/${id}`,
    }),
    addSmsPool: builder.mutation({
      query: info => {
        return {
          url: '/sms-pools',
          method: 'POST',
          body: info,
        };
      },
    }),
    editSmsPool: builder.mutation({
      query: info => {
        return {
          url: `/sms-pools/${info._id}`,
          method: 'PATCH',
          body: info,
        };
      },
    }),
    deleteSmsPool: builder.mutation({
      query: id => {
        return {
          url: `/sms-pools/${id}`,
          method: 'DELETE',
        };
      },
    }),
    buySmsPool: builder.mutation({
      query: info => {
        return {
          url: '/sms-pool/order',
          method: 'POST',
          body: info,
        };
      },
      invalidatesTags: [tagTypes.smsPoolOrder],
    }),
  }),
});
export const {
  useGetSmsPoolsQuery,
  useAddSmsPoolMutation,
  useDeleteSmsPoolMutation,
  useEditSmsPoolMutation,
  useGetSmsPoolByIdQuery,
  useGetSmsPoolCountryByServiceQuery,
  useBuySmsPoolMutation,
} = smsPoolApi;
