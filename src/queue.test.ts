import { beforeEach, describe, expect, it } from 'vitest';
import { Queue, QueueNode } from './queue';

describe('QueueNode', () => {
  it('should create a node with the given value', () => {
    const node = new QueueNode(42);
    expect(node.value).toBe(42);
    expect(node.next).toBe(null);
  });

  it('should allow setting the next node', () => {
    const node1 = new QueueNode(1);
    const node2 = new QueueNode(2);
    node1.next = node2;
    expect(node1.next).toBe(node2);
  });
});

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>([]);
  });

  describe('constructor', () => {
    it('should create an empty queue when no default values provided', () => {
      const emptyQueue = new Queue<number>([]);
      expect(emptyQueue.isEmpty).toBe(true);
      expect(emptyQueue.peek).toBeNull();
    });

    it('should create a queue with default values', () => {
      const queueWithDefaults = new Queue<number>([1, 2, 3]);
      expect(queueWithDefaults.isEmpty).toBe(false);
      expect(queueWithDefaults.peek).toBe(1);
    });

    it('should enqueue all default values in order', () => {
      const queueWithDefaults = new Queue<number>([1, 2, 3]);
      expect(queueWithDefaults.dequeue()).toBe(1);
      expect(queueWithDefaults.dequeue()).toBe(2);
      expect(queueWithDefaults.dequeue()).toBe(3);
      expect(queueWithDefaults.isEmpty).toBe(true);
    });
  });

  describe('enqueue', () => {
    it('should add an item to an empty queue', () => {
      queue.enqueue(42);
      expect(queue.isEmpty).toBe(false);
      expect(queue.peek).toBe(42);
    });

    it('should add multiple items in order', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.peek).toBe(1);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
    });

    it('should maintain FIFO order', () => {
      const items = [10, 20, 30, 40, 50];
      items.forEach(item => queue.enqueue(item));

      items.forEach(item => {
        expect(queue.dequeue()).toBe(item);
      });
    });

    it('should handle string values', () => {
      const stringQueue = new Queue<string>([]);
      stringQueue.enqueue('hello');
      stringQueue.enqueue('world');

      expect(stringQueue.dequeue()).toBe('hello');
      expect(stringQueue.dequeue()).toBe('world');
    });

    it('should handle object values', () => {
      const objectQueue = new Queue<{ id: number; name: string }>([]);
      const obj1 = { id: 1, name: 'Alice' };
      const obj2 = { id: 2, name: 'Bob' };

      objectQueue.enqueue(obj1);
      objectQueue.enqueue(obj2);

      expect(objectQueue.dequeue()).toEqual(obj1);
      expect(objectQueue.dequeue()).toEqual(obj2);
    });
  });

  describe('dequeue', () => {
    it('should return null when dequeuing from empty queue', () => {
      expect(queue.dequeue()).toBe(null);
    });

    it('should return the first item and remove it', () => {
      queue.enqueue(42);
      queue.enqueue(100);

      expect(queue.dequeue()).toBe(42);
      expect(queue.peek).toBe(100);
    });

    it('should handle single item queue', () => {
      queue.enqueue(42);
      expect(queue.dequeue()).toBe(42);
      expect(queue.isEmpty).toBe(true);
      expect(queue.peek).toBeNull();
    });

    it('should maintain order for multiple dequeues', () => {
      const items = [1, 2, 3, 4, 5];
      items.forEach(item => queue.enqueue(item));

      for (let i = 0; i < items.length; i++) {
        expect(queue.dequeue()).toBe(items[i]);
      }

      expect(queue.isEmpty).toBe(true);
    });

    it('should properly update head and tail after dequeuing last item', () => {
      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.isEmpty).toBe(true);
    });
  });

  describe('peek', () => {
    it('should return undefined for empty queue', () => {
      expect(queue.peek).toBeNull();
    });

    it('should return the first item without removing it', () => {
      queue.enqueue(42);
      queue.enqueue(100);

      expect(queue.peek).toBe(42);
      expect(queue.peek).toBe(42); // Should still be the same
      expect(queue.dequeue()).toBe(42); // Should still be able to dequeue
    });

    it('should return the correct value after multiple operations', () => {
      queue.enqueue(1);
      expect(queue.peek).toBe(1);

      queue.enqueue(2);
      expect(queue.peek).toBe(1);

      queue.dequeue();
      expect(queue.peek).toBe(2);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty queue', () => {
      expect(queue.isEmpty).toBe(true);
    });

    it('should return false for non-empty queue', () => {
      queue.enqueue(42);
      expect(queue.isEmpty).toBe(false);
    });

    it('should return true after dequeuing all items', () => {
      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.isEmpty).toBe(false);

      queue.dequeue();
      expect(queue.isEmpty).toBe(false);

      queue.dequeue();
      expect(queue.isEmpty).toBe(true);
    });
  });

  describe('edge cases and complex scenarios', () => {
    it('should handle rapid enqueue/dequeue operations', () => {
      for (let i = 0; i < 100; i++) {
        queue.enqueue(i);
        expect(queue.dequeue()).toBe(i);
      }
      expect(queue.isEmpty).toBe(true);
    });

    it('should handle large number of items', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const largeQueue = new Queue<number>(largeArray);

      for (let i = 0; i < 1000; i++) {
        expect(largeQueue.dequeue()).toBe(i);
      }
      expect(largeQueue.isEmpty).toBe(true);
    });

    it('should handle mixed operations', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.dequeue()).toBe(1);
      queue.enqueue(3);
      expect(queue.dequeue()).toBe(2);
      queue.enqueue(4);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);
      expect(queue.isEmpty).toBe(true);
    });

    it('should handle null and undefined values', () => {
      const nullableQueue = new Queue<null | undefined | number>([]);
      nullableQueue.enqueue(null);
      nullableQueue.enqueue(undefined);
      nullableQueue.enqueue(42);

      expect(nullableQueue.dequeue()).toBe(null);
      expect(nullableQueue.dequeue()).toBe(undefined);
      expect(nullableQueue.dequeue()).toBe(42);
    });
  });
});