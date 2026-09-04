function creditWord(prizeType) {
  return prizeType === "site_credit" ? "Site Credit" : "Cash";
}
function formatMoney(value) {
  const v = Number(value ?? 0) || 0;
  return `£${v % 1 === 0 ? v : v.toFixed(2)}`;
}
function siteCreditLabel(prizeType, value) {
  if (prizeType !== "site_credit") return null;
  const v = Number(value ?? 0) || 0;
  if (v <= 0) return null;
  return `${formatMoney(v)} Site Credit`;
}
export {
  creditWord as c,
  formatMoney as f,
  siteCreditLabel as s
};
