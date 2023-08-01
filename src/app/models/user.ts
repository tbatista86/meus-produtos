export class User {
  id!: number | string;
  name!: string;
  email!: string;

  constructor(init: Partial<User>) {
    Object.assign(this, init);
  }
}
