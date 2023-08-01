export class UserRequest {
  name!: string;
  email!: string;
  password!: string;

  constructor(init: Partial<UserRequest>) {
    Object.assign(this, init);
  }
}
