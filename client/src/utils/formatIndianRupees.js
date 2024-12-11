export const formatIndianRupees = (amount=0) => {
  const amountStr = amount.toString();
  return amountStr
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .replace(/(\d+)(?=(\d{2})+\d{3},)/, "$1,");
};
