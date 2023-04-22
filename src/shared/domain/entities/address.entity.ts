import { InvalidDomainException } from '../exceptions/invalidDomain.exception';
import { Coordinates } from '../valueObjects/coordinates.vo';
import { Entity } from './entity';

export interface AddressValues {
    description: string;
    city: string;
    zipCode?: string;
    state: string;
    country: string;
    latitude?: number;
    longitude?: number;
}
interface AddressProps {
    description: string;
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

    get description(): string {
        return this.props.description;
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

    get location(): Coordinates {
        return this.props.location;
    }

    public static createAddress(values: AddressValues, id?: number): Address {
        // Integrity and consistency validation
        if (!values)
            throw new InvalidDomainException('Address values undefined');

        Address.validateDescription(values);

        Address.validateCity(values);

        Address.validateState(values);

        Address.validateCountry(values);

        const location = Coordinates.createCoordinates(
            values.latitude,
            values.longitude,
        );
        return new Address(
            {
                description: values.description,
                city: values.city,
                state: values.state,
                country: values.country,
                zipCode: values.zipCode,
                location,
            },
            id,
        );
    }

    private static validateCountry(values: AddressValues) {
        if (!values.country || values.country.trim().length === 0)
            throw new InvalidDomainException('Country undefined');
    }

    private static validateState(values: AddressValues) {
        if (!values.state || values.state.trim().length === 0)
            throw new InvalidDomainException('State undefined');
    }

    private static validateCity(values: AddressValues) {
        if (!values.city || values.city.trim().length === 0)
            throw new InvalidDomainException('City undefined');
    }

    private static validateDescription(values: AddressValues) {
        if (!values.description || values.description.trim().length === 0)
            throw new InvalidDomainException('Address description undefined');
    }
}
