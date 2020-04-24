let counter = 0;

export class Todo {
    public readonly id: string = (counter++).toString(16);
}
