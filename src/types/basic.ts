// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TyAny = any;

export type TyMailDomain = `@${string}.${string}`;
export type TyMailAddress = `${string}${TyMailDomain}`;

export type TyBasicAuth = {
  email: TyMailAddress;
  password: string;
};
