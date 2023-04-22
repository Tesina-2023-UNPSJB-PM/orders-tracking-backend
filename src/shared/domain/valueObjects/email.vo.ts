import { InvalidDomainException } from '../exceptions/invalidDomain.exception';
import { ValueObject } from './valueObject';
import validator from 'validator';

interface EmailProps {
    value: string;
}

export class Email extends ValueObject<EmailProps> {
    constructor(props: EmailProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static createEmail(value: string): Email {
        const isValidEmail = Email.validateEmail(value);
        if (!isValidEmail)
            throw new InvalidDomainException('Invalid email address');

        return new Email({ value });
    }

    private static validateEmail(value: string) {
        if (!value) false;

        return validator.isEmail(value);
    }
}
