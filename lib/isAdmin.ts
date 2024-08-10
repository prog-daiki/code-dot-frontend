export const isAdmin = async (userId?: string | null): Promise<boolean> => {
  const adminUserId = process.env.ADMIN_USER_ID;
  if (!adminUserId) {
    console.warn("管理者ユーザーIDが設定されていません");
    return false;
  }
  return userId === adminUserId;
};
