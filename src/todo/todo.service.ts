import { Injectable } from '@nestjs/common';
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

    public async getItem(id: string): Promise<Todo | null>{
        return Promise.resolve(this.items.get(id) ?? null);
    }

}
