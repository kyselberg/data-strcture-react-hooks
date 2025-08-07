import { useArray } from "./useArray";

export const useStack = <T>(defaultValue: T[]) => {
    const array = useArray(defaultValue);

    return {
        push: array.push,
        pop: array.pop,
        peek: array[array.length - 1] as T,
        isEmpty: array.length === 0,
    };
};