import { User } from './user';

export class LoginResposnse {
  accessToken!: string;
  user!: User;

  constructor(init: Partial<LoginResposnse>) {
    Object.assign(this, init);
  }
}
