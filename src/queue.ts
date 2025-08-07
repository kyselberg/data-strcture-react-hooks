export class QueueNode<T> {
    private _value: T;
    private _next: QueueNode<T> | null;

    constructor(value: T) {
        this._value = value;
        this._next = null;
    }

    get value() {
        return this._value;
    }

    get next() {
        return this._next;
    }

    set next(next: QueueNode<T> | null) {
        this._next = next;
    }
}

export class Queue<T> {
    private head: QueueNode<T> | null = null;
    private tail: QueueNode<T> | null = null;

    constructor(defaultValue: T[]) {
        this.head = null;
        this.tail = null;

        defaultValue.forEach(value => this.enqueue(value));
    }

    enqueue(value: T) {
        const node = new QueueNode(value);

        if (this.head === null) {
            this.head = node;
            this.tail = node;
            return;
        }

        if (this.tail) {
            this.tail.next = node;
            this.tail = node;
        }
    }

    dequeue() {
        if (!this.head) {
            return null;
        }

        const value = this.head.value;
        this.head = this.head.next;

        if (!this.head) {
            this.tail = null;
        }

        return value;
    }

    get peek() {
        return this.head?.value ?? null;
    }

    get isEmpty() {
        return this.head === null;
    }
}
