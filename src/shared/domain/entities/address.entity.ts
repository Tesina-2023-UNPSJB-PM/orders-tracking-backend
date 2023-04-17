import { Coordinates } from '../valueObjects/coordinates.vo';
import { Entity } from './entity';

interface AddressProps {
    streetName: string;
    streetsNumber: string;
    floor?: string;
    departamentNumber?: string;
    city: string;
    zipCode?: string;
    state: string;
    country: string;
    location: Coordinates;
}

export class Address extends Entity<AddressProps> {
    private constructor(props: AddressProps, id?: number) {
        super(props, id);
    }

    get streetName(): string {
        return this.props?.streetName;
    }

    get streetsNumber(): string {
        return this.props.streetsNumber;
    }

    get floor(): string | undefined {
        return this.props.floor;
    }

    get departamentNumber(): string | undefined {
        return this.props.departamentNumber;
    }

    get city(): string {
        return this.props.city;
    }

    get zipCode(): string | undefined {
        return this.props.zipCode;
    }

    get state(): string {
        return this.props.state;
    }

    get country(): string {
        return this.props.country;
    }

    public createAddress(
        streetName: string,
        streetsNumber: string,
        city: string,
        state: string,
        country: string,
        location: Coordinates,
        floor?: string,
        departamentNumber?: string,
        zipCode?: string,
        id?: number,
    ): Address {
        // Integrity and consistency validation

        return new Address(
            {
                streetName,
                streetsNumber,
                floor,
                departamentNumber,
                city,
                state,
                country,
                zipCode,
                location,
            },
            id,
        );
    }
}
