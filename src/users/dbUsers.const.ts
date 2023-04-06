import { UserStatus } from './domain/enums/user-status.enum';

export const dbUsers = [
  {
    userId: 1,
    firstName: 'Isaias Matias',
    lastName: 'Arza',
    username: 'mati23',
    password: '1234',
    lastLogin: new Date('2023-02-01'),
    status: UserStatus.Active,
  },
  {
    userId: 2,
    firstName: 'Julian',
    lastName: 'Alvarez',
    username: 'juli504',
    password: 'pepe21',
    lastLogin: new Date('2022-12-25'),
    status: UserStatus.Active,
  },
  {
    userId: 1,
    firstName: 'Papu',
    lastName: 'Gomez',
    username: 'papu25',
    password: 'tete',
    lastLogin: new Date('2022-12-25'),
    status: UserStatus.Active,
  },
];
