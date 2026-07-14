export type UserRole = "OWNER" | "ADMIN" | "DISPATCHER" | "DRIVER" | "SUPPORT";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  role: UserRole;
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  shortCode: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
