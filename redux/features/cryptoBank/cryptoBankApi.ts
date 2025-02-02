import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/api/tagTypesList';
export const cryptoBankApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCryptoBanks: builder.query({
      query: query => {
        return {
          url: `/crypto-bank`,
          params: query,
        };
      },
      providesTags: [tagTypes.cryptoBank],
    }),
    getCryptoBankById: builder.query({
      query: id => `/crypto-bank/${id}`,
    }),
    addCryptoBank: builder.mutation({
      query: info => {
        return {
          url: '/crypto-bank',
          method: 'POST',
          body: info,
        };
      },
      invalidatesTags: [tagTypes.cryptoBank],
    }),
    editCryptoBank: builder.mutation({
      query: info => {
        return {
          url: `/crypto-bank/${info.id}`,
          method: 'PATCH',
          body: info,
        };
      },
      invalidatesTags: [tagTypes.cryptoBank],
    }),
    deleteCryptoBank: builder.mutation({
      query: id => {
        return {
          url: `/crypto-bank/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [tagTypes.cryptoBank],
    }),
  }),
});
export const {
  useGetCryptoBanksQuery,
  useAddCryptoBankMutation,
  useDeleteCryptoBankMutation,
  useEditCryptoBankMutation,
  useGetCryptoBankByIdQuery,
} = cryptoBankApi;
