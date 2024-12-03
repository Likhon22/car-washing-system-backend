export const cleanAuthToken = (tokenFromCookie: string) => {
  const token = tokenFromCookie.startsWith("Bearer ")
    ? tokenFromCookie.slice(7) // Remove the first 7 characters ("Bearer ")
    : tokenFromCookie;
  return token;
};
