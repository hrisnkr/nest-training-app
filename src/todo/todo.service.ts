import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './todo';

@Injectable()
export class TodoService {
  private readonly items = new Map<string, Todo>();

  constructor() {
    for (let i = 0; i < 10; i++) {
      const mockTodo = new Todo();
      this.items.set(mockTodo.id, mockTodo);
    }
  }

  public async getAll(): Promise<IterableIterator<Todo>> {
    return Promise.resolve(this.items.values());
  }

  public async getItem(id: string): Promise<Todo | null> {
    return Promise.resolve(this.items.get(id) ?? null);
  }

  public async createItem(newItem: Partial<Todo>): Promise<Todo> {
    const item = new Todo();
    TodoService.validateInput(item, newItem);
    for (const [key, value] of Object.entries(newItem)) {
      item[key] = value;
    }
    this.items.set(item.id, item);
    return item;
  }

  public async updateItem(id: string, update: Partial<Todo>): Promise<Todo> {
    const item = await this.getItem(id);
    if (!item) throw new NotFoundException(`Item with id ${id} not found!`);
    TodoService.validateInput(item, update);
    for (const [key, value] of Object.entries(update)) {
      item[key] = value;
    }
    return item;
  }

  private static validateInput(item: Todo, update: Partial<Todo>): void {
    for (const key of Object.keys(update)) {
      if (!(key in item) || key === 'id') {
        throw new BadRequestException(`Invalid parameter key ${key}`);
      }
    }
  }
}
