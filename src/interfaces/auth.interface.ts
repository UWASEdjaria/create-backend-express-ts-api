import { Role } from "@prisma/client";
export interface AuthInterface {
  id:string;
  email: string;
  password: string;
  fullName?: string;
  url: string;
  role: Role;
}
export interface IUserSession {
  id: string;
  email: string;
  role: Role;
}
export interface AuthServiceResponse {
  success: boolean;
  message: string;
  token?: string;
  data?: Partial<AuthInterface>;
  requiresVerification?: boolean;
}