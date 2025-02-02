export const config = {
  // baseUrl: "http://localhost:5001/api/v1",
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  tawkId: process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID,
  topupMax: 100,
  minAddFund: parseFloat(
    (process.env.NEXT_PUBLIC_MIN_ADD_FUND as string) || '8',
  ),
  increaseRatePercentage: parseFloat(
    process.env.NEXT_PUBLIC_INCREASE_RATE_PERCENTAGE || '',
  ),
  onDevelopment: JSON.parse(process.env.NEXT_PUBLIC_ON_DEVELOPMENT || ''),
  smsPoolServiceChargeInPercentage: parseFloat(
    process.env.NEXT_PUBLIC_SMSPOOL_SERVICE_CHARGE_IN_PERCENTAGE as string,
  ),

  manualDepositMinMoney: parseFloat(
    process.env.NEXT_PUBLIC_MANUAL_DEPOSIT_MIN_MONEY as string,
  ),
  manualDollarRate: parseFloat(
    process.env.NEXT_PUBLIC_MANUAL_DEPOSIT_DOLLAR_RATE as string,
  ),
  isManualDepositActive: JSON.parse(
    process.env.NEXT_PUBLIC_IS_MANUAL_DEPOSIT_ACTIVE as string,
  ),
};
