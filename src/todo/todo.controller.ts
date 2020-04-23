import { Controller, Get, Param } from '@nestjs/common';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import { get } from 'http';

@Controller('todo')
export class TodoController {
  constructor(readonly todoRepo: TodoService) {}

  @Get()
  public async getAll(): Promise<Todo[]> {
    const items = await this.todoRepo.getAll();
    return Array.from(items);
  }

  @Get('/:id')
  public async getItem(@Param('id') id: string): Promise<Todo> {
    return await this.todoRepo.getItem(id);
  }
}
