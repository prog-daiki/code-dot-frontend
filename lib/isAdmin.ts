export const isAdmin = async (userId?: string | null) => {
  return userId === process.env.ADMIN_USER_ID!;
};
