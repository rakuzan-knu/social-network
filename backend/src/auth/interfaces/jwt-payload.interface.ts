export interface AccessTokenPayload {
  type: 'access';
  sub: string;
  email: string;
  username: string;
  /** The refresh-token jti this access token belongs to → identifies the current Session. */
  jti: string;
}

export interface RefreshTokenPayload {
  type: 'refresh';
  sub: string;
  jti: string;
}

export interface RequestUser {
  id: string;
  email: string;
  username: string;
  /** jti of the session that minted this access token (used for "this device" detection). */
  sessionJti?: string;
}
