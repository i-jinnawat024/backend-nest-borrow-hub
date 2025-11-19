import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetDocumentListQuery } from './queries/impl/get-document-list.query';
import { GetDocumentQuery } from './queries/impl/get-documnet.query';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { CreateDocumentCommand } from './commands/impl/create-document.command';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { UpdateDocumentCommand } from './commands/impl/update-document.command';
import { BorrowDocumentDto } from './dtos/borrow-document.dto';
import { BorrowDocumentCommand } from './commands/impl/borrow-document.command';
import { ReturnDocumentCommand } from './commands/impl/return-document.command';
import { ReturnDocumentDto } from './dtos/return.document.dto';
import { DeleteDocumentCommand } from './commands/impl/delete-document.command';

@Controller('documents')
export class DocumentController {
  private readonly logger = new Logger(DocumentController.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  getDocument(@Query('id') id: number) {
    return this.queryBus.execute(new GetDocumentQuery(id));
  }

  @Get('document-list')
  getDocumentList() {
    return this.queryBus.execute(new GetDocumentListQuery());
  }

  @Post()
  createDocument(@Body() body: CreateDocumentDto[]) {
    return this.commandBus.execute(new CreateDocumentCommand(body));
  }
  @Put()
  updateDocument(@Body() updateDocumentDto: UpdateDocumentDto) {
    return this.commandBus.execute(
      new UpdateDocumentCommand(updateDocumentDto),
    );
  }
  @Post('borrow')
  borrowDocument(@Body() body: BorrowDocumentDto) {
    return this.commandBus.execute(new BorrowDocumentCommand(body));
  }

  @Put('return')
  returnDocument(@Body() body: ReturnDocumentDto) {
    return this.commandBus.execute(new ReturnDocumentCommand(body));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDocument(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.commandBus.execute(new DeleteDocumentCommand(id));
  }
}
