export class SessionViewDto {
  id!: string;
  deviceName!: string | null;
  ip!: string | null;
  city!: string | null;
  country!: string | null;
  createdAt!: Date;
  lastActiveAt!: Date;
  /** True for the session that owns the access token used on this request. */
  isCurrent!: boolean;
}
