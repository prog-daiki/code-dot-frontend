export const isAdmin = async (
  userId?: string | null,
): Promise<boolean> => {
  const adminUserId = process.env.ADMIN_USER_ID;
  if (!adminUserId) {
    console.warn(
      "ADMIN_USER_ID is not set in environment variables",
    );
    return false;
  }
  return userId === adminUserId;
};
