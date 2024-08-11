/**
 * 金額をフォーマットする
 * @param price 金額
 * @returns フォーマットされた金額
 */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(price);
};
