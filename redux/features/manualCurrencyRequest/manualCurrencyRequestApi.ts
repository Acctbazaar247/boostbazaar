import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/api/tagTypesList';

export const manualCurrencyRequestApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getManualCurrencyRequests: builder.query({
      query: query => {
        return {
          url: `/manual-currency-request`,
          params: query,
        };
      },
      providesTags: [tagTypes.manualPayment],
    }),
    getManualCurrencyRequestById: builder.query({
      query: id => `/manual-currency-request/${id}`,
    }),
    addManualCurrencyRequest: builder.mutation({
      query: info => {
        return {
          url: '/manual-currency-request',
          method: 'POST',
          body: info,
        };
      },
      invalidatesTags: [tagTypes.manualPayment],
    }),
    editManualCurrencyRequest: builder.mutation({
      query: info => {
        return {
          url: `/manual-currency-request/${info.id}`,
          method: 'PATCH',
          body: info,
        };
      },
      invalidatesTags: [tagTypes.manualPayment],
    }),
    deleteManualCurrencyRequest: builder.mutation({
      query: id => {
        return {
          url: `/manual-currency-request/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [tagTypes.manualPayment],
    }),
  }),
});
export const {
  useGetManualCurrencyRequestsQuery,
  useAddManualCurrencyRequestMutation,
  useDeleteManualCurrencyRequestMutation,
  useEditManualCurrencyRequestMutation,
  useGetManualCurrencyRequestByIdQuery,
} = manualCurrencyRequestApi;
