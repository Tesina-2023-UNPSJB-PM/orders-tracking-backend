import { InvalidDomainException } from '../../../shared/domain/exceptions/invalidDomain.error';
import { Entity } from '../../../shared/domain/entities/entity';

interface SectorProps {
  name: string;
  description?: string;
}

export class Sector extends Entity<SectorProps> {
  private constructor(props: SectorProps) {
    super(props);
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  public static createSector(value: string): Sector {
    if (!value) throw new InvalidDomainException('Name of sector undefined');

    return new Sector({ name: value });
  }
}
