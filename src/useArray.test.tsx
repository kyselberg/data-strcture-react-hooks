import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useArray } from './useArray';

describe('useArray', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    expect(result.current).toEqual([1, 2, 3]);
    expect(result.current.length).toBe(3);
  });

  it('should handle empty array initialization', () => {
    const { result } = renderHook(() => useArray([]));

    expect(result.current).toEqual([]);
    expect(result.current.length).toBe(0);
  });

  it('should trigger re-render when push is called', () => {
    const { result } = renderHook(() => useArray([1, 2]));

    act(() => {
      result.current.push(3);
    });

    expect(result.current).toEqual([1, 2, 3]);
    expect(result.current.length).toBe(3);
  });

  it('should trigger re-render when pop is called', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      const popped = result.current.pop();
      expect(popped).toBe(3);
    });

    expect(result.current).toEqual([1, 2]);
    expect(result.current.length).toBe(2);
  });

  it('should trigger re-render when shift is called', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      const shifted = result.current.shift();
      expect(shifted).toBe(1);
    });

    expect(result.current).toEqual([2, 3]);
    expect(result.current.length).toBe(2);
  });

  it('should trigger re-render when unshift is called', () => {
    const { result } = renderHook(() => useArray([2, 3]));

    act(() => {
      result.current.unshift(1);
    });

    expect(result.current).toEqual([1, 2, 3]);
    expect(result.current.length).toBe(3);
  });

  it('should trigger re-render when splice is called', () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4, 5]));

    act(() => {
      const spliced = result.current.splice(1, 2, 6, 7);
      expect(spliced).toEqual([2, 3]);
    });

    expect(result.current).toEqual([1, 6, 7, 4, 5]);
    expect(result.current.length).toBe(5);
  });

  it('should trigger re-render when reverse is called', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.reverse();
    });

    expect(result.current).toEqual([3, 2, 1]);
  });

  it('should trigger re-render when sort is called', () => {
    const { result } = renderHook(() => useArray([3, 1, 2]));

    act(() => {
      result.current.sort();
    });

    expect(result.current).toEqual([1, 2, 3]);
  });

  it('should trigger re-render when with is called', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      const newArray = result.current.with(1, 5);
      expect(newArray).toEqual([1, 5, 3]);
    });

    // Original array should remain unchanged
    expect(result.current).toEqual([1, 2, 3]);
  });

  it('should trigger re-render when copyWithin is called', () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4, 5]));

    act(() => {
      result.current.copyWithin(0, 3);
    });

    expect(result.current).toEqual([4, 5, 3, 4, 5]);
  });

  it('should handle multiple mutations', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.push(4);
      result.current.push(5);
      result.current.pop();
      result.current.unshift(0);
    });

    expect(result.current).toEqual([0, 1, 2, 3, 4]);
  });

  it('should maintain array reference for non-mutating methods', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    const originalRef = result.current;

    // Non-mutating operations shouldn't trigger re-renders
    const slice = result.current.slice(0, 2);
    const indexOf = result.current.indexOf(2);
    const includes = result.current.includes(3);

    expect(slice).toEqual([1, 2]);
    expect(indexOf).toBe(1);
    expect(includes).toBe(true);
    expect(result.current).toBe(originalRef);
  });

  it('should handle complex objects', () => {
    const complexArray = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];

    const { result } = renderHook(() => useArray(complexArray));

    expect(result.current).toEqual(complexArray);

    act(() => {
      result.current.push({ id: 3, name: 'Charlie' });
    });

    expect(result.current).toHaveLength(3);
    expect(result.current[2]).toEqual({ id: 3, name: 'Charlie' });
  });

  it('should handle nested arrays', () => {
    const nestedArray = [[1, 2], [3, 4]];
    const { result } = renderHook(() => useArray(nestedArray));

    expect(result.current).toEqual(nestedArray);

    act(() => {
      result.current.push([5, 6]);
    });

    expect(result.current).toHaveLength(3);
    expect(result.current[2]).toEqual([5, 6]);
  });
});