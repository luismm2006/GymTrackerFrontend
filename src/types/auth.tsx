export interface LoginInputs {
    username: string;
    password: string;
}
export interface RegisterInputs{
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface JwtPayload {
  id: number;
  username: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}