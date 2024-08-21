/**
 * 金額を日本円形式でフォーマットする
 * @param price フォーマットする金額（数値）
 * @returns フォーマットされた金額（文字列）
 */
export const formatPrice = (price: number): string => {
  const formatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  });

  return formatter.format(price);
};
