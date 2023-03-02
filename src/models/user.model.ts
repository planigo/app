export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "customer" | "owner";
  isEmailVerified: boolean;
};
