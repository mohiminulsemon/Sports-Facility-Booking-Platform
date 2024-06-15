export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}
