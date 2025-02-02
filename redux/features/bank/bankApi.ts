import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/api/tagTypesList';

export const bankApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBanks: builder.query({
      query: query => {
        return {
          url: `/bank`,
          params: query,
        };
      },
      providesTags: [tagTypes.bank],
    }),
    getBankById: builder.query({
      query: id => `/banks/${id}`,
    }),
    addBank: builder.mutation({
      query: info => {
        return {
          url: '/bank',
          method: 'POST',
          body: info,
        };
      },
      invalidatesTags: [tagTypes.bank],
    }),
    editBank: builder.mutation({
      query: info => {
        return {
          url: `/bank/${info.id}`,
          method: 'PATCH',
          body: info,
        };
      },
      invalidatesTags: [tagTypes.bank],
    }),
    deleteBank: builder.mutation({
      query: id => {
        return {
          url: `/bank/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [tagTypes.bank],
    }),
  }),
});
export const {
  useGetBanksQuery,
  useAddBankMutation,
  useDeleteBankMutation,
  useEditBankMutation,
  useGetBankByIdQuery,
} = bankApi;
