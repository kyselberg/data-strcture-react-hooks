import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useStack } from './useStack';

describe('useStack', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useStack([1, 2, 3]));

    expect(result.current.peek).toBe(3);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle empty stack initialization', () => {
    const { result } = renderHook(() => useStack([]));

    expect(result.current.peek).toBe(undefined);
    expect(result.current.isEmpty).toBe(true);
  });

  it('should trigger re-render when push is called', () => {
    const { result } = renderHook(() => useStack([1, 2]));

    act(() => {
      result.current.push(3);
    });

    expect(result.current.peek).toBe(3);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should trigger re-render when pop is called', () => {
    const { result } = renderHook(() => useStack([1, 2, 3]));

    act(() => {
      const popped = result.current.pop();
      expect(popped).toBe(3);
    });

    expect(result.current.peek).toBe(2);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle multiple push operations', () => {
    const { result } = renderHook(() => useStack([1]));

    act(() => {
      result.current.push(2);
      result.current.push(3);
      result.current.push(4);
    });

    expect(result.current.peek).toBe(4);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle multiple pop operations', () => {
    const { result } = renderHook(() => useStack([1, 2, 3, 4]));

    act(() => {
      const first = result.current.pop();
      const second = result.current.pop();
      expect(first).toBe(4);
      expect(second).toBe(3);
    });

    expect(result.current.peek).toBe(2);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle pop on empty stack', () => {
    const { result } = renderHook(() => useStack([]));

    act(() => {
      const popped = result.current.pop();
      expect(popped).toBe(undefined);
    });

    expect(result.current.peek).toBe(undefined);
    expect(result.current.isEmpty).toBe(true);
  });

  it('should handle push and pop operations in sequence', () => {
    const { result } = renderHook(() => useStack([1, 2]));

    act(() => {
      result.current.push(3);
      const popped = result.current.pop();
      expect(popped).toBe(3);
      result.current.push(4);
      const popped2 = result.current.pop();
      expect(popped2).toBe(4);
    });

    expect(result.current.peek).toBe(2);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle complex objects', () => {
    const complexStack = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];

    const { result } = renderHook(() => useStack(complexStack));

    expect(result.current.peek).toEqual({ id: 2, name: 'Bob' });

    act(() => {
      result.current.push({ id: 3, name: 'Charlie' });
    });

    expect(result.current.peek).toEqual({ id: 3, name: 'Charlie' });
  });

  it('should handle nested arrays', () => {
    const { result } = renderHook(() => useStack([[1, 2], [3, 4]]));

    expect(result.current.peek).toEqual([3, 4]);

    act(() => {
      result.current.push([5, 6]);
    });

    expect(result.current.peek).toEqual([5, 6]);
  });

  it('should handle mixed types', () => {
    const { result } = renderHook(() => useStack([1, 'string', true, null]));

    expect(result.current.peek).toBe(null);

    act(() => {
      result.current.push(123);
    });

    expect(result.current.peek).toBe(undefined);
  });

  it('should handle single item stack', () => {
    const { result } = renderHook(() => useStack([1]));

    expect(result.current.peek).toBe(1);
    expect(result.current.isEmpty).toBe(false);

    act(() => {
      const popped = result.current.pop();
      expect(popped).toBe(1);
    });

    expect(result.current.peek).toBe(undefined);
    expect(result.current.isEmpty).toBe(true);
  });

  it('should handle large stack operations', () => {
    const largeStack = Array.from({ length: 100 }, (_, i) => i);
    const { result } = renderHook(() => useStack(largeStack));

    expect(result.current.peek).toBe(99);
    expect(result.current.isEmpty).toBe(false);

    act(() => {
      // Pop last 50 items
      for (let i = 0; i < 50; i++) {
        const popped = result.current.pop();
        expect(popped).toBe(99 - i);
      }
    });

    expect(result.current.peek).toBe(49);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle push after pop to empty', () => {
    const { result } = renderHook(() => useStack([1]));

    act(() => {
      const popped = result.current.pop();
      expect(popped).toBe(1);
      expect(result.current.isEmpty).toBe(true);

      result.current.push(2);
    });

    expect(result.current.peek).toBe(2);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should maintain LIFO order', () => {
    const { result } = renderHook(() => useStack([1, 2, 3]));

    const poppedItems: number[] = [];

    act(() => {
      while (!result.current.isEmpty) {
        const item = result.current.pop();
        if (item !== undefined) {
          poppedItems.push(item);
        }
      }
    });

    expect(poppedItems).toEqual([3, 2, 1]);
    expect(result.current.isEmpty).toBe(true);
    expect(result.current.peek).toBe(undefined);
  });

  it('should handle string values', () => {
    const { result } = renderHook(() => useStack(['a', 'b', 'c']));

    expect(result.current.peek).toBe('c');

    act(() => {
      result.current.push('d');
      const popped = result.current.pop();
      expect(popped).toBe('d');
    });

    expect(result.current.peek).toBe('c');
  });

  it('should handle number values', () => {
    const { result } = renderHook(() => useStack([1.5, 2.7, 3.14]));

    expect(result.current.peek).toBe(3.14);

    act(() => {
      result.current.push(4.2);
      const popped = result.current.pop();
      expect(popped).toBe(4.2);
    });

    expect(result.current.peek).toBe(3.14);
  });

  it('should handle push multiple items and verify LIFO behavior', () => {
    const { result } = renderHook(() => useStack<number>([]));

    act(() => {
      result.current.push(1);
      result.current.push(2);
      result.current.push(3);
    });

    expect(result.current.peek).toBe(3);

    act(() => {
      const first = result.current.pop();
      const second = result.current.pop();
      const third = result.current.pop();

      expect(first).toBe(3);
      expect(second).toBe(2);
      expect(third).toBe(1);
    });

    expect(result.current.isEmpty).toBe(true);
    expect(result.current.peek).toBe(undefined);
  });

  it('should handle empty stack operations', () => {
    const { result } = renderHook(() => useStack<number>([]));

    expect(result.current.isEmpty).toBe(true);
    expect(result.current.peek).toBe(undefined);

    act(() => {
      const popped = result.current.pop();
      expect(popped).toBe(undefined);
    });

    expect(result.current.isEmpty).toBe(true);
    expect(result.current.peek).toBe(undefined);
  });
});