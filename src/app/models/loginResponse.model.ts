export interface LoginResponseModel{
  token: string;
  refreshToken: string;
  user: {
    email: string,
    firstName: string,
    lastName: string
  }
}
