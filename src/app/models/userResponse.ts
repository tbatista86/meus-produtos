import { User } from './user';

export class UserResponse {
  accessToken?: string;
  user!: User;

  constructor(init: Partial<UserResponse>) {
    Object.assign(this, init);
  }
}
