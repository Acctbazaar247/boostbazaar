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
        url: `/ticket${filterOptions ? `?status=${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.ticket],
    }),

    updateTicket: builder.mutation({
      query: (orderData) => ({
        url: `/ticket/${orderData.id}`,
        method: "PATCH",
        body: orderData.data,
      }),
      invalidatesTags: [tagTypes.ticket],
    }),

    getServices: builder.query({
      query: () => ({
        url: `/service`,
        method: "GET",
      }),
      // providesTags: [tagTypes.dashboard],
    }),
    getCurrencyRequest: builder.query({
      query: (query) => ({
        url: `/currency-request${query ? `?${query}` : ""}`,
        method: "GET",
      }),
      // providesTags: [tagTypes.dashboard],
    }),
    getTableCurrencyRequest: builder.query({
      query: (query) => ({
        url: `/currency-request${query ? `?${query}` : ""}`,
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
    getOrders: builder.query({
      query: (query) => ({
        url: `/order${query ? `?${query}` : ""}`,
        method: "GET",
      }),
      // providesTags: [tagTypes.dashboard],
    }),
    getableOrders: builder.query({
      query: (query) => ({
        url: `/order${query ? `?${query}` : ""}`,
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
    getProfile: builder.query({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
      // providesTags: [tagTypes.dashboard],
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
  useGetCurrencyRequestQuery,
  useGetAdminOverviewQuery,
  useGetSpendHistoryQuery,
  useGetOrdersQuery,
  useUpdateTicketMutation,
  useGetProfileQuery,
  useGetTableCurrencyRequestQuery,
  useGetableOrdersQuery,
} = userDashboardApi;
