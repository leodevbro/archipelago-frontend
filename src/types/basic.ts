export type TyMailDomain = `@${string}.${string}`;
export type TyMailAddress = `${string}${TyMailDomain}`;

export type TyBasicAuth = {
  email: TyMailAddress;
  password: string;
};
