import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMap } from './useMap';

describe('useMap', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useMap([['a', 1], ['b', 2]]));

    expect(result.current.get('a')).toBe(1);
    expect(result.current.get('b')).toBe(2);
    expect(result.current.size).toBe(2);
  });

  it('should handle empty map initialization', () => {
    const { result } = renderHook(() => useMap([]));

    expect(result.current.size).toBe(0);
    expect(result.current.get('any')).toBeUndefined();
  });

  it('should trigger re-render when set is called', () => {
    const { result } = renderHook(() => useMap([['a', 1]]));

    act(() => {
      result.current.set('b', 2);
    });

    expect(result.current.get('a')).toBe(1);
    expect(result.current.get('b')).toBe(2);
    expect(result.current.size).toBe(2);
  });

  it('should trigger re-render when delete is called', () => {
    const { result } = renderHook(() => useMap([['a', 1], ['b', 2]]));

    act(() => {
      const deleted = result.current.delete('a');
      expect(deleted).toBe(true);
    });

    expect(result.current.get('a')).toBeUndefined();
    expect(result.current.get('b')).toBe(2);
    expect(result.current.size).toBe(1);
  });

  it('should trigger re-render when clear is called', () => {
    const { result } = renderHook(() => useMap([['a', 1], ['b', 2]]));

    act(() => {
      result.current.clear();
    });

    expect(result.current.size).toBe(0);
    expect(result.current.get('a')).toBeUndefined();
    expect(result.current.get('b')).toBeUndefined();
  });

  it('should handle multiple mutations', () => {
    const { result } = renderHook(() => useMap([['a', 1]]));

    act(() => {
      result.current.set('b', 2);
      result.current.set('c', 3);
      result.current.delete('a');
      result.current.set('d', 4);
    });

    expect(result.current.size).toBe(3);
    expect(result.current.get('a')).toBeUndefined();
    expect(result.current.get('b')).toBe(2);
    expect(result.current.get('c')).toBe(3);
    expect(result.current.get('d')).toBe(4);
  });

  it('should handle complex keys and values', () => {
    const complexMap: [{ id: number }, string][] = [
      [{ id: 1 }, 'value1'],
      [{ id: 2 }, 'value2']
    ];

    const { result } = renderHook(() => useMap<{ id: number }, string>(complexMap));

    expect(result.current.size).toBe(2);

    act(() => {
      result.current.set({ id: 3 }, 'value3');
    });

    expect(result.current.size).toBe(3);
  });

  it('should handle nested objects as values', () => {
    const { result } = renderHook(() => useMap([['user1', { name: 'Alice', age: 30 }]]));

    expect(result.current.get('user1')).toEqual({ name: 'Alice', age: 30 });

    act(() => {
      result.current.set('user2', { name: 'Bob', age: 25 });
    });

    expect(result.current.get('user2')).toEqual({ name: 'Bob', age: 25 });
  });

  it('should maintain map reference for non-mutating methods', () => {
    const { result } = renderHook(() => useMap([['a', 1], ['b', 2]]));

    const originalRef = result.current;

    // Non-mutating operations shouldn't trigger re-renders
    const hasA = result.current.has('a');
    const hasC = result.current.has('c');
    const keys = Array.from(result.current.keys());
    const values = Array.from(result.current.values());
    const entries = Array.from(result.current.entries());

    expect(hasA).toBe(true);
    expect(hasC).toBe(false);
    expect(keys).toEqual(['a', 'b']);
    expect(values).toEqual([1, 2]);
    expect(entries).toEqual([['a', 1], ['b', 2]]);
    expect(result.current).toBe(originalRef);
  });

  it('should handle forEach correctly', () => {
    const { result } = renderHook(() => useMap([['a', 1], ['b', 2]]));

    const callback = vi.fn();

    act(() => {
      result.current.forEach(callback);
    });

    expect(callback).toHaveBeenCalledTimes(2);
    // Check that both entries were called, but order may vary
    const calls = callback.mock.calls;
    expect(calls).toHaveLength(2);

    const callArgs = calls.map(call => [call[0], call[1]]);
    expect(callArgs).toContainEqual([1, 'a']);
    expect(callArgs).toContainEqual([2, 'b']);
  });

  it('should handle updating existing keys', () => {
    const { result } = renderHook(() => useMap([['a', 1]]));

    act(() => {
      result.current.set('a', 10);
    });

    expect(result.current.get('a')).toBe(10);
    expect(result.current.size).toBe(1);
  });

  it('should handle deleting non-existent keys', () => {
    const { result } = renderHook(() => useMap([['a', 1]]));

    act(() => {
      const deleted = result.current.delete('non-existent');
      expect(deleted).toBe(false);
    });

    expect(result.current.size).toBe(1);
    expect(result.current.get('a')).toBe(1);
  });

  it('should handle string keys', () => {
    const { result } = renderHook(() => useMap([['key1', 'value1']]));

    act(() => {
      result.current.set('key2', 'value2');
    });

    expect(result.current.get('key1')).toBe('value1');
    expect(result.current.get('key2')).toBe('value2');
  });

  it('should handle number keys', () => {
    const { result } = renderHook(() => useMap([[1, 'one'], [2, 'two']]));

    act(() => {
      result.current.set(3, 'three');
    });

    expect(result.current.get(1)).toBe('one');
    expect(result.current.get(2)).toBe('two');
    expect(result.current.get(3)).toBe('three');
  });
});