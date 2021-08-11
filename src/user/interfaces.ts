import { User } from "./entities/user.entity";

export interface UserData {
  name: string;
  email: string;
  token: string;
}

export interface UserRO {
  user: UserData
}
