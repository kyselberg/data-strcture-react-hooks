import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useQueue } from './useQueue';

describe('useQueue', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]));

    expect(result.current.peek).toBe(1);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle empty queue initialization', () => {
    const { result } = renderHook(() => useQueue([]));

    expect(result.current.peek).toBe(null);
    expect(result.current.isEmpty).toBe(true);
  });

  it('should trigger re-render when enqueue is called', () => {
    const { result } = renderHook(() => useQueue([1, 2]));

    act(() => {
      result.current.enqueue(3);
    });

    expect(result.current.peek).toBe(1);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should trigger re-render when dequeue is called', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]));

    act(() => {
      const dequeued = result.current.dequeue();
      expect(dequeued).toBe(1);
    });

    expect(result.current.peek).toBe(2);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle multiple enqueue operations', () => {
    const { result } = renderHook(() => useQueue([1]));

    act(() => {
      result.current.enqueue(2);
      result.current.enqueue(3);
      result.current.enqueue(4);
    });

    expect(result.current.peek).toBe(1);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle multiple dequeue operations', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3, 4]));

    act(() => {
      const first = result.current.dequeue();
      const second = result.current.dequeue();
      expect(first).toBe(1);
      expect(second).toBe(2);
    });

    expect(result.current.peek).toBe(3);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle dequeue on empty queue', () => {
    const { result } = renderHook(() => useQueue([]));

    act(() => {
      const dequeued = result.current.dequeue();
      expect(dequeued).toBe(null);
    });

    expect(result.current.peek).toBe(null);
    expect(result.current.isEmpty).toBe(true);
  });

  it('should handle enqueue and dequeue operations in sequence', () => {
    const { result } = renderHook(() => useQueue([1, 2]));

    act(() => {
      result.current.enqueue(3);
      const first = result.current.dequeue();
      expect(first).toBe(1);
      result.current.enqueue(4);
      const second = result.current.dequeue();
      expect(second).toBe(2);
    });

    expect(result.current.peek).toBe(3);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle complex objects', () => {
    const complexQueue = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];

    const { result } = renderHook(() => useQueue(complexQueue));

    expect(result.current.peek).toEqual({ id: 1, name: 'Alice' });

    act(() => {
      result.current.enqueue({ id: 3, name: 'Charlie' });
    });

    expect(result.current.peek).toEqual({ id: 1, name: 'Alice' });
  });

  it('should handle nested arrays', () => {
    const { result } = renderHook(() => useQueue([[1, 2], [3, 4]]));

    expect(result.current.peek).toEqual([1, 2]);

    act(() => {
      result.current.enqueue([5, 6]);
    });

    expect(result.current.peek).toEqual([1, 2]);
  });

  it('should handle mixed types', () => {
    const { result } = renderHook(() => useQueue([1, 'string', true, null]));

    expect(result.current.peek).toBe(1);

    act(() => {
      result.current.enqueue(123);
    });

    expect(result.current.peek).toBe(1);
  });

  it('should handle single item queue', () => {
    const { result } = renderHook(() => useQueue([1]));

    expect(result.current.peek).toBe(1);
    expect(result.current.isEmpty).toBe(false);

    act(() => {
      const dequeued = result.current.dequeue();
      expect(dequeued).toBe(1);
    });

    expect(result.current.peek).toBe(null);
    expect(result.current.isEmpty).toBe(true);
  });

  it('should handle large queue operations', () => {
    const largeQueue = Array.from({ length: 100 }, (_, i) => i);
    const { result } = renderHook(() => useQueue(largeQueue));

    expect(result.current.peek).toBe(0);
    expect(result.current.isEmpty).toBe(false);

    act(() => {
      // Dequeue first 50 items
      for (let i = 0; i < 50; i++) {
        const dequeued = result.current.dequeue();
        expect(dequeued).toBe(i);
      }
    });

    expect(result.current.peek).toBe(50);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle enqueue after dequeue to empty', () => {
    const { result } = renderHook(() => useQueue([1]));

    act(() => {
      const dequeued = result.current.dequeue();
      expect(dequeued).toBe(1);
      expect(result.current.isEmpty).toBe(true);

      result.current.enqueue(2);
    });

    expect(result.current.peek).toBe(2);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should maintain FIFO order', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]));

    const dequeuedItems: number[] = [];

    act(() => {
      while (!result.current.isEmpty) {
        const item = result.current.dequeue();
        if (item !== null) {
          dequeuedItems.push(item);
        }
      }
    });

    expect(dequeuedItems).toEqual([1, 2, 3]);
    expect(result.current.isEmpty).toBe(true);
    expect(result.current.peek).toBe(null);
  });

  it('should handle string values', () => {
    const { result } = renderHook(() => useQueue(['a', 'b', 'c']));

    expect(result.current.peek).toBe('a');

    act(() => {
      result.current.enqueue('d');
      const dequeued = result.current.dequeue();
      expect(dequeued).toBe('a');
    });

    expect(result.current.peek).toBe('b');
  });

  it('should handle number values', () => {
    const { result } = renderHook(() => useQueue([1.5, 2.7, 3.14]));

    expect(result.current.peek).toBe(1.5);

    act(() => {
      result.current.enqueue(4.2);
      const dequeued = result.current.dequeue();
      expect(dequeued).toBe(1.5);
    });

    expect(result.current.peek).toBe(2.7);
  });
});