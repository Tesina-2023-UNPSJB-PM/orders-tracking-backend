import * as bcrypt from 'bcrypt';

export class HashingUtil {
  private saltRounds = 10;

  public generateHash(value: string): string {
    return bcrypt.hashSync(value, this.saltRounds);
  }

  public isMatch(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
