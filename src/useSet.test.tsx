import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useSet } from './useSet';

describe('useSet', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSet<number>([1, 2, 3]));

    expect(result.current.has(1)).toBe(true);
    expect(result.current.has(2)).toBe(true);
    expect(result.current.has(3)).toBe(true);
    expect(result.current.size).toBe(3);
  });

  it('should handle empty set initialization', () => {
    const { result } = renderHook(() => useSet<number>([]));

    expect(result.current.size).toBe(0);
    expect(result.current.has(1)).toBe(false);
  });

  it('should trigger re-render when add is called', () => {
    const { result } = renderHook(() => useSet<number>([1, 2]));

    act(() => {
      result.current.add(3);
    });

    expect(result.current.has(1)).toBe(true);
    expect(result.current.has(2)).toBe(true);
    expect(result.current.has(3)).toBe(true);
    expect(result.current.size).toBe(3);
  });

  it('should trigger re-render when delete is called', () => {
    const { result } = renderHook(() => useSet<number>([1, 2, 3]));

    act(() => {
      const deleted = result.current.delete(2);
      expect(deleted).toBe(true);
    });

    expect(result.current.has(1)).toBe(true);
    expect(result.current.has(2)).toBe(false);
    expect(result.current.has(3)).toBe(true);
    expect(result.current.size).toBe(2);
  });

  it('should trigger re-render when clear is called', () => {
    const { result } = renderHook(() => useSet<number>([1, 2, 3]));

    act(() => {
      result.current.clear();
    });

    expect(result.current.size).toBe(0);
    expect(result.current.has(1)).toBe(false);
    expect(result.current.has(2)).toBe(false);
    expect(result.current.has(3)).toBe(false);
  });

  it('should handle multiple mutations', () => {
    const { result } = renderHook(() => useSet<number>([1]));

    act(() => {
      result.current.add(2);
      result.current.add(3);
      result.current.delete(1);
      result.current.add(4);
    });

    expect(result.current.size).toBe(3);
    expect(result.current.has(1)).toBe(false);
    expect(result.current.has(2)).toBe(true);
    expect(result.current.has(3)).toBe(true);
    expect(result.current.has(4)).toBe(true);
  });

  it('should handle complex objects', () => {
    const complexSet = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];

    const { result } = renderHook(() => useSet<{ id: number, name: string }>(complexSet));

    expect(result.current.size).toBe(2);

    act(() => {
      result.current.add({ id: 3, name: 'Charlie' });
    });

    expect(result.current.size).toBe(3);
  });

  it('should handle nested arrays', () => {
    const { result } = renderHook(() => useSet<number[]>([[1, 2], [3, 4]]));

    expect(result.current.size).toBe(2);

    act(() => {
      result.current.add([5, 6]);
    });

    expect(result.current.size).toBe(3);
  });

  it('should maintain set reference for non-mutating methods', () => {
    const { result } = renderHook(() => useSet<number>([1, 2, 3]));

    const originalRef = result.current;

    // Non-mutating operations shouldn't trigger re-renders
    const hasOne = result.current.has(1);
    const hasFour = result.current.has(4);
    const keys = Array.from(result.current.keys());
    const values = Array.from(result.current.values());
    const entries = Array.from(result.current.entries());

    expect(hasOne).toBe(true);
    expect(hasFour).toBe(false);
    expect(keys).toEqual([1, 2, 3]);
    expect(values).toEqual([1, 2, 3]);
    expect(entries).toEqual([[1, 1], [2, 2], [3, 3]]);
    expect(result.current).toBe(originalRef);
  });

  it('should handle forEach correctly', () => {
    const { result } = renderHook(() => useSet<number>([1, 2, 3]));

    const callback = vi.fn();

    act(() => {
      result.current.forEach(callback);
    });

    expect(callback).toHaveBeenCalledTimes(3);
    // Check that all values were called, but order may vary
    const calls = callback.mock.calls;
    expect(calls).toHaveLength(3);

    const callArgs = calls.map(call => [call[0], call[1]]);
    expect(callArgs).toContainEqual([1, 1]);
    expect(callArgs).toContainEqual([2, 2]);
    expect(callArgs).toContainEqual([3, 3]);
  });

  it('should handle adding duplicate values', () => {
    const { result } = renderHook(() => useSet<number>([1, 2]));

    act(() => {
      result.current.add(1); // Adding duplicate
    });

    expect(result.current.size).toBe(2);
    expect(result.current.has(1)).toBe(true);
    expect(result.current.has(2)).toBe(true);
  });

  it('should handle deleting non-existent values', () => {
    const { result } = renderHook(() => useSet<number>    ([1, 2]));

    act(() => {
      const deleted = result.current.delete(3);
      expect(deleted).toBe(false);
    });

    expect(result.current.size).toBe(2);
    expect(result.current.has(1)).toBe(true);
    expect(result.current.has(2)).toBe(true);
  });

  it('should handle string values', () => {
    const { result } = renderHook(() => useSet<string>(['a', 'b']));

    act(() => {
      result.current.add('c');
    });

    expect(result.current.has('a')).toBe(true);
    expect(result.current.has('b')).toBe(true);
    expect(result.current.has('c')).toBe(true);
  });

  it('should handle mixed types', () => {
    const { result } = renderHook(() => useSet<number | string | boolean | null>([1, 'string', true, null]));

    expect(result.current.size).toBe(4);
    expect(result.current.has(1)).toBe(true);
    expect(result.current.has('string')).toBe(true);
    expect(result.current.has(true)).toBe(true);
    expect(result.current.has(null)).toBe(true);

    act(() => {
      result.current.add(123);
    });

    expect(result.current.size).toBe(5);
    expect(result.current.has(123)).toBe(true);
  });

  it('should handle entries method', () => {
    const { result } = renderHook(() => useSet<number>([1, 2, 3]));

    const entries = Array.from(result.current.entries());
    expect(entries).toEqual([[1, 1], [2, 2], [3, 3]]);
  });

  it('should handle keys method', () => {
    const { result } = renderHook(() => useSet<number>([1, 2, 3]));

    const keys = Array.from(result.current.keys());
    expect(keys).toEqual([1, 2, 3]);
  });

  it('should handle values method', () => {
    const { result } = renderHook(() => useSet<number>([1, 2, 3]));

    const values = Array.from(result.current.values());
    expect(values).toEqual([1, 2, 3]);
  });
});