import { Inject, Injectable } from '@nestjs/common';
import { OrderExecution } from '../../domain/entities/orderExecution.entity';
import { EmployeeRepository } from '../../domain/repositories/employeeRepository';
import { SectorRepository } from '../../domain/repositories/sectorRepository';
import { OrderExecutionDTO } from '../../dto/orderExecution.dto';

@Injectable()
export class OrderExecutionFactory {
  constructor(
    @Inject('EmployeeRepository') private employeeRepo: EmployeeRepository,
    @Inject('SectorRepository') private sectorRepo: SectorRepository,
  ) {}

  async createEntity(dto?: OrderExecutionDTO): Promise<OrderExecution | null> {
    if (!dto) {
      return null;
    }
    const employee = await this.employeeRepo.getById(
      dto.executorEmployeId || 0,
    );

    const sector = await this.sectorRepo.getById(dto.assignedSectorId || 0);

    return OrderExecution.create(
      {
        observations: dto.observations,
        executor: employee || undefined,
        assignedSector: sector || undefined,
        assignedTime: dto.assignedTime,
        estimatedResolutionTime: dto.estimatedResolutionTime,
        resolutionTime: dto.resolutionTime,
      },
      dto.id,
    );
  }
}
