import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/api/tagTypesList";

export const currencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrency: builder.query({
      query: (query) => {
        return {
          url: `/currency?${query}`
        };
      }
    }),
    getCurrencyById: builder.query({
      query: (id) => `/currency/${id}`
    }),
    getCurrencyOfLoggedInUser: builder.query({
      query: () => `/currency/single-user-currency`
      // providesTags: [ ],
    }),
    addCurrency: builder.mutation({
      query: (info) => {
        return {
          url: "/currency",
          method: "POST",
          body: info
        };
      }
    }),
    editCurrency: builder.mutation({
      query: (info) => {
        return {
          url: `/currency/${info.id}`,
          method: "PATCH",
          body: info
        };
      },
      invalidatesTags: [tagTypes.user]
    }),
    deleteCurrency: builder.mutation({
      query: (id) => {
        return {
          url: `/currency/${id}`,
          method: "DELETE"
        };
      }
    })
  })
});
export const {
  useGetCurrencyQuery,
  useAddCurrencyMutation,
  useDeleteCurrencyMutation,
  useEditCurrencyMutation,
  useGetCurrencyByIdQuery,
  useGetCurrencyOfLoggedInUserQuery
} = currencyApi;
