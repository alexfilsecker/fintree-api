export type ErrorInType = 'password' | 'username';

export class MyLoginError extends Error {
  public errorIn: ErrorInType;

  constructor(message: string, errorIn: ErrorInType) {
    super(message);
    this.name = 'LoginError';
    this.errorIn = errorIn;
  }
}
