import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

// Mengambil User dari SESSION
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  };

  return session.user;
};

// Tentukan ROLE yg dimiliki oleh User
export async function hasRole(role: string) {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  };

  return user.role === role;
};