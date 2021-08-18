export interface UserData {
  id: number;
  name: string;
  email: string;
  token: string;
}

export interface UserRO {
  user: UserData
}
