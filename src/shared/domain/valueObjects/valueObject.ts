import { shallowEqualObjects } from 'shallow-equal';

interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
    public readonly props: T;

    protected constructor(props: T) {
        this.props = Object.freeze(props);
    }

    public equals(vo?: ValueObject<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }

        if (vo.props === undefined) {
            return false;
        }

        return shallowEqualObjects(this.props, vo.props);
    }
}