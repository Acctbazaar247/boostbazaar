export enum tagTypes {
  user = 'user',
  review = 'review',
  dashboard = 'dashboard',
  ticket = 'ticket',
  bank = 'bank',
  cryptoBank = 'cryptoBank',
  manualPayment = 'manualPayment',
  smsPoolOrder = 'smsPoolOrder',
}

export const tagTypesList = Object.values(tagTypes);
