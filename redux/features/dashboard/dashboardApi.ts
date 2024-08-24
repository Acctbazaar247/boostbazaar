import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

const userDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    createTicket: builder.mutation({
      query: (ticketData) => ({
        url: "/ticket",
        method: "POST",
        body: ticketData,
      }),
      // invalidatesTags: [tagTypes.review],
    }),

    sendInvitation: builder.mutation({
      query: (referral) => ({
        url: "/referral/send-invitation",
        method: "POST",
        body: referral,
      }),
      // invalidatesTags: [tagTypes.review],
    }),

    getTickets: builder.query({
      query: (filterOptions) => ({
        url: `/ticket${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),

    getServices: builder.query({
      query: () => ({
        url: `/service`,
        method: "GET",
      }),
      // providesTags: [tagTypes.dashboard],
    }),
    getCurrency: builder.query({
      query: () => ({
        url: `/currency-request`,
        method: "GET",
      }),
      // providesTags: [tagTypes.dashboard],
    }),
    getMainBalance: builder.query({
      query: () => ({
        url: `/currency/single-user-currency`,
        method: "GET",
      }),
      // providesTags: [tagTypes.dashboard],
    }),
    getAdminOverview: builder.query({
      query: () => ({
        url: `/users/admin/overview`,
        method: "GET",
      }),
      // providesTags: [tagTypes.dashboard],
    }),

    getDepositHistory: builder.query({
      query: (id) => ({
        url: `/currency?ownById=${id}`,
        method: "GET",
      }),
      // providesTags: [tagTypes.dashboard],
    }),
    getSpendHistory: builder.query({
      query: () => ({
        url: `/users/info/spend`,
        method: "GET",
      }),
      // providesTags: [tagTypes.dashboard],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
      // invalidatesTags: [tagTypes.review],s
    }),
    currencyRequest: builder.mutation({
      query: (currency) => ({
        url: `/currency-request/${currency.method}`,
        method: "POST",
        body: currency.data,
      }),
      // invalidatesTags: [tagTypes.review],s
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useCreateTicketMutation,
  useGetTicketsQuery,
  useSendInvitationMutation,
  useGetServicesQuery,
  useCreateOrderMutation,
  useCurrencyRequestMutation,
  useGetMainBalanceQuery,
  useGetDepositHistoryQuery,
  useGetCurrencyQuery,
  useGetAdminOverviewQuery,
  useGetSpendHistoryQuery,
} = userDashboardApi;
