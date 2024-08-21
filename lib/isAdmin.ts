/**
 * 管理者かどうかを判定する
 * @param userId ユーザーID
 * @returns 判定結果
 */
export const isAdmin = async (userId?: string | null): Promise<boolean> => {
  const adminUserId = process.env.ADMIN_USER_ID;
  if (!adminUserId) {
    console.warn("管理者ユーザーIDが設定されていません");
    return false;
  }
  return Boolean(userId) && userId === adminUserId;
};
