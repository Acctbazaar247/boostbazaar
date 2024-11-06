export const config = {
  // baseUrl: "http://localhost:5001/api/v1",
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  tawkId: process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID,
  topupMax: 100,
  increaseRatePercentage: parseFloat(
    process.env.NEXT_PUBLIC_INCREASE_RATE_PERCENTAGE || ""
  ),
  onDevelopment: JSON.parse(process.env.NEXT_PUBLIC_ON_DEVELOPMENT || "true")
};
