export class CustomerAlreadyExistsException extends Error {
  constructor(customerNumber: string) {
    super(`The customer with the number ${customerNumber} already exists`);
  }
}
