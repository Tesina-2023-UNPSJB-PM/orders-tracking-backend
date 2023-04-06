import { UserStatus } from './enums/user-status.enum';

export class User {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  lastLogin: Date;
  status: UserStatus;
}
