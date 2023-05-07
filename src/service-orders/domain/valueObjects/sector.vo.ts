import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';
import { ValueObject } from '../../../shared/domain/valueObjects/valueObject';

interface SectorProps {
  name: string;
}

export class Sector extends ValueObject<SectorProps> {
  private constructor(props: SectorProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  public static createSector(value: string): Sector {
    if (!value) throw new InvalidDomainException('Name of sector undefined');

    return new Sector({ name: value });
  }
}
