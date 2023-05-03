export class NonExistentCustomer extends Error {
  constructor(customerNumber: string) {
    super(`The customer with the number ${customerNumber} non exists`);
  }
}
