export interface TUser {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  phone: string;
  role: "admin" | "user";
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}
