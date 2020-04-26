import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  UseGuards,
  Body,
  Post,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import { LoggerInterceptor } from 'src/logger.interceptor';
import { TokenGuard } from 'src/token.guard';

@Controller('todo')
@UseInterceptors(LoggerInterceptor)
@UseGuards(TokenGuard)
export class TodoController {
  constructor(readonly todoRepo: TodoService) {}

  @Get()
  public async getAll(): Promise<Todo[]> {
    const items = await this.todoRepo.getAll();
    return Array.from(items);
  }

  @Get('/:id')
  public async getItem(@Param('id') id: string): Promise<Todo> {
    const item = await this.todoRepo.getItem(id);
    if (!item) {
      throw new NotFoundException('Item not found!');
    }
    return item;
  }

  @Post()
  public async createItem(@Body() newItem: Partial<Todo>): Promise<Todo> {
    const item = await this.todoRepo.createItem(newItem);
    return item;
  }

  @Put('/:id')
  public async updateItem(
    @Body() updateItem: Partial<Todo>,
    @Param('id') id: string,
  ): Promise<Todo> {
    const item = await this.todoRepo.updateItem(id, updateItem);
    return item;
  }
}
