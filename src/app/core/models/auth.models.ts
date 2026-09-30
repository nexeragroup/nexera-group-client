export interface LoginRequest {
  identifier: string;
  pin: string;
  rememberDevice: boolean;
  deviceId?: string;
}

export interface AuthenticatedWaiter {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  restaurantId: string;
  branchId: string;
  branchName: string;
  permissions: readonly string[];
}

export interface LoginResponse {
  user: AuthenticatedWaiter;
  accessToken?: string;
  expiresIn?: number;
  activeShiftId?: string | null;
}

export interface AuthSession {
  user: AuthenticatedWaiter;
  accessToken?: string;
  /**
   * Always normalize missing activeShiftId to null.
   */
  activeShiftId: string | null;
  /**
   * Absolute expiration timestamp in milliseconds.
   *
   * Example:
   * Date.now() + expiresIn * 1000
   */
  expiresAt?: number;
}
