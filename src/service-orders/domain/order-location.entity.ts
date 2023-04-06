import { Address } from './interfaces/address.interface';
import { Coordinate } from './interfaces/coordinate.interface';

export class OrderLocation {
  address: Address;
  coordinate: Coordinate;
  referenceInfo: string;
}
