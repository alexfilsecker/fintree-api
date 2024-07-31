export class MyBadQueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadQueryError';
  }
}
