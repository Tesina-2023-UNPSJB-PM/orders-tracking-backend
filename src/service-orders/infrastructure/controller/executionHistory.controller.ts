import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CrudExecutionHistory } from 'src/service-orders/application/useCases/executionHistory/crudExecutionHistory';
import { GetHistoryByExecution } from 'src/service-orders/application/useCases/executionHistory/getHistoryByExecution';
import { ExecutionHistoryRequestDTO } from 'src/service-orders/dto/executionHistory/executionHistoryRequest.dto';
import { ExecutionHistoryResponseDTO } from 'src/service-orders/dto/executionHistory/executionHistoryResponse.dto';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';

@Controller('/tracking-so/execution-history')
export class ExecutionHistoryController {
  constructor(
    private crudExecutionHistory: CrudExecutionHistory,
    private getHistoryByExecution: GetHistoryByExecution,
  ) {}

  @Post()
  create(@Body() req: ExecutionHistoryRequestDTO) {
    this.crudExecutionHistory.create(req);
  }

  @Patch()
  update(@Body() req: ExecutionHistoryRequestDTO) {
    this.crudExecutionHistory.update(req);
  }

  @Delete(':id')
  delete(@Param() paramId: string) {
    const id = this.convertParamToNumber(paramId);
    return this.crudExecutionHistory.delete(id);
  }

  @Get(':id')
  getById(
    @Param('id') paramId: string,
  ): Promise<ExecutionHistoryResponseDTO | null> {
    const id = this.convertParamToNumber(paramId);
    return this.crudExecutionHistory.getById(id);
  }

  @Get()
  getByExecutionId(
    @Query('executionId') id: string,
  ): Promise<ExecutionHistoryResponseDTO[]> {
    const executionId = this.convertParamToNumber(id);
    return this.getHistoryByExecution.run(executionId);
  }

  private convertParamToNumber(id: string): number {
    if (!Number.isInteger(+id))
      throw new InvalidDomainException('The id must be a number');

    return parseInt(id, 10);
  }
}
