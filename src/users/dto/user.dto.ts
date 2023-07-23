import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserDTO {
  @Exclude()
  private _id: number;
  @Exclude()
  private _firstName: string;
  @Exclude()
  private _lastName: string;
  @Exclude()
  private _email: string;
  @Exclude()
  private _password: string;
  @Exclude()
  private _username: string;
  @Exclude()
  private _enabled: boolean;

  @ApiProperty()
  @Expose()
  get id() {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  @ApiProperty()
  @Expose()
  get firstName() {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  @ApiProperty()
  @Expose()
  get lastName() {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  @ApiProperty()
  @Expose()
  get email() {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  @ApiProperty()
  @Expose()
  get username() {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  @ApiProperty()
  get password() {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  @ApiProperty()
  @Expose()
  get enabled() {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  /*private constructor(username: string) {
    this._username = username;
  }*/

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }

  public static builder(username: string): UserDTOBuilder {
    if (!username) {
      throw new Error('Username indefinido');
    }
    const newUSer = new UserDTO({ username });

    return new UserDTOBuilder(newUSer);
  }
}

class UserDTOBuilder {
  private target: UserDTO;

  constructor(user: UserDTO) {
    this.target = user;
  }

  public id(value: number) {
    this.target.id = value;
    return this;
  }

  public firstName(value: string) {
    this.target.firstName = value;
    return this;
  }

  public lastName(value: string) {
    this.target.lastName = value;
    return this;
  }

  public email(value: string) {
    this.target.email = value;
    return this;
  }

  public username(value: string) {
    this.target.username = value;
    return this;
  }

  public password(value: string) {
    this.target.password = value;
    return this;
  }

  public enabled(value: boolean) {
    this.target.enabled = value;
    return this;
  }

  build(): UserDTO {
    return this.target;
  }
}
