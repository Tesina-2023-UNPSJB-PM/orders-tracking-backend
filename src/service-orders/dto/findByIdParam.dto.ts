import { IsNumberString } from 'class-validator';

export class FindByIDParam {
  @IsNumberString()
  id: string;
}
