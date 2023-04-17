import { Entity } from 'typeorm';

@Entity('ADDRESS')
export class AddressData {
  streetName: string;
  streetsNumber: string;
  floor: string;
  departamentNumber: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
}
