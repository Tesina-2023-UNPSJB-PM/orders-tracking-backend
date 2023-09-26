import {
  Body,
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { CrudExecutionHistory } from 'src/service-orders/application/useCases/executionHistory/crudExecutionHistory';
import { GetHistoryByExecution } from 'src/service-orders/application/useCases/executionHistory/getHistoryByExecution';
import { UploadAttachment } from 'src/service-orders/application/useCases/executionHistory/uploadAttachment';
import { CreateExecutionHistoryDTO } from 'src/service-orders/dto/executionHistory/createExecutionHistory.dto';
import { ExecutionHistoryResponseDTO } from 'src/service-orders/dto/executionHistory/executionHistoryResponse.dto';
import { UpdateExecutionHistoryDTO } from 'src/service-orders/dto/executionHistory/updateExecutionHistory.dto';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';

@Controller('/tracking-so/execution-history')
export class ExecutionHistoryController {
  constructor(
    private crudExecutionHistoryCommand: CrudExecutionHistory,
    private getHistoryByExecutionCommand: GetHistoryByExecution,
    private uploadAttachmentCommand: UploadAttachment,
  ) {}

  @Post()
  create(@Body() req: CreateExecutionHistoryDTO): Promise<number> {
    return this.crudExecutionHistoryCommand.create(req);
  }

  @Patch()
  update(@Body() req: UpdateExecutionHistoryDTO): Promise<void> {
    return this.crudExecutionHistoryCommand.update(req);
  }

  /*@Delete(':id')
  delete(@Param() paramId: string): Promise<void> {
    const id = this.convertParamToNumber(paramId);
    return this.crudExecutionHistoryCommand.delete(id);
  }*/

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ExecutionHistoryResponseDTO })
  getById(
    @Param('id') paramId: string,
  ): Promise<ExecutionHistoryResponseDTO | null> {
    const id = this.convertParamToNumber(paramId);
    return this.crudExecutionHistoryCommand.getById(id);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: ExecutionHistoryResponseDTO })
  getByExecutionId(
    @Query('executionId') id: string,
  ): Promise<ExecutionHistoryResponseDTO[]> {
    const executionId = this.convertParamToNumber(id);
    return this.getHistoryByExecutionCommand.run(executionId);
  }

  @Post(':historyId/attachment')
  @Header('accept', 'text/plain')
  @ApiConsumes('text/plain')
  uploadAttachment(
    @Param('historyId') paramId: string,
    @Body() body: string,
  ): Promise<void> {
    const id = this.convertParamToNumber(paramId);
    return this.uploadAttachmentCommand.run(id, body);
  }

  private convertParamToNumber(id: string): number {
    if (!Number.isInteger(+id))
      throw new InvalidDomainException('The id must be a number');

    return parseInt(id, 10);
  }
}
