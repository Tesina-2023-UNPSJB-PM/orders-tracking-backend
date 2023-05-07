import { InvalidDomainException } from '../exceptions/invalidDomain.error';
import { ValueObject } from './valueObject';

interface CoordinatesProps {
    latitude: number;
    longitude: number;
}

export class Coordinates extends ValueObject<CoordinatesProps> {
    private readonly earthRadiusInKilometers = 6378.0;

    private constructor(props: CoordinatesProps) {
        super(props);
    }

    get latitude() {
        return this.props.latitude;
    }

    get longitude() {
        return this.props.longitude;
    }

    public static createCoordinates(lat?: number, lon?: number): Coordinates {
        // Integrity and consistency validation
        if (!lat) throw new InvalidDomainException('Latitude undefined');
        if (!lon) throw new InvalidDomainException('Longitude undefined');

        if (lat < -90 || lat > 90) {
            throw new InvalidDomainException('Latitude should be between -90 and 90');
        }

        if (lon < -180 || lon > 180) {
            throw new InvalidDomainException('Longitude should be between -180 and 180');
        }

        return new Coordinates({ latitude: lat, longitude: lon });
    }

    public distanceInKilometersTo(to: Coordinates): number {
        return 0;
    }
}
