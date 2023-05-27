import { InvalidDomainException } from '../../../shared/domain/exceptions/invalidDomain.error';
import { Entity } from '../../../shared/domain/entities/entity';
import validator  from 'validator'

interface SectorProps {
  name: string;
  description?: string;
}

export class Sector extends Entity<SectorProps> {
  private constructor(props: SectorProps, id?: number) {
    super(props, id);
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

  public static create(props: SectorProps, id?: number): Sector {
    if (validator.isEmpty(props.name, { ignore_whitespace: true }))
      throw new InvalidDomainException('Name of sector undefined');

    return new Sector(props, id);
  }
}
