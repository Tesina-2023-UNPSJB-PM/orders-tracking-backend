import { Inject, Injectable } from '@nestjs/common';
import { ExecutionHistoryRepository } from 'src/service-orders/domain/repositories/executionHistoryRepository';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';

@Injectable()
export class UploadAttachment {
  constructor(
    @Inject('ExecutionHistoryRepository')
    private repo: ExecutionHistoryRepository,
  ) {}

  async run(historyId: number, attachment: string): Promise<void> {
    const executionHistory = await this.repo.getById(historyId);

    if (!executionHistory)
      throw new InvalidDomainException(
        `Execution history with id ${historyId} does not exist`,
      );

    executionHistory.attachments = attachment;
    return this.repo.update(executionHistory);
  }
}
