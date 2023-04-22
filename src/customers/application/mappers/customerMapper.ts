import { Customer } from '../../../customers/domain/entities/customer.entity';
import { CustomerResponseDTO } from '../../../customers/dto/customer-resp.dto';

export class CustomerMapper {
    public mapToCustomerResponseDTO(
        customerEntity: Customer,
    ): CustomerResponseDTO {
        const result = new CustomerResponseDTO();
        result.id = customerEntity.id;
        result.customerNumber = customerEntity.customerNumber;
        result.documentNumber = customerEntity.documentNumber;
        result.firstName = customerEntity.firstName;
        result.lastName = customerEntity.lastName;
        result.email = customerEntity.email?.value;
        result.phones = customerEntity.phones;
        result.address = customerEntity.address;

        return result;
    }
}
