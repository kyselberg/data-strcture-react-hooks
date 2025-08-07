import { useCallback, useRef, useState } from "react";

const arrayMethods = [
    "pop",
    "push",
    "reverse",
    "shift",
    "unshift",
    "sort",
    "splice",
    "with",
    "copyWithin",
];

export const useArray = <T>(defaultValue: T[]) => {
    const [, setVersion] = useState(0);

    const render = useCallback(() => {
        setVersion(v => v + 1);
    }, []);

    const arrayRef = useRef<T[]>(structuredClone(defaultValue));

    const proxyRef = useRef<T[]>(new Proxy(arrayRef.current, {
        get(target, prop: string | symbol, receiver: T[]) {
            const orig = Reflect.get(target, prop, receiver);

            if (typeof orig === "function" && arrayMethods.includes(prop as string)) {
                return (...args: unknown[]) => {
                    const result = orig.apply(target, args);
                    render();
                    return result;
                };
            }

            if (typeof orig === "function") {
                return orig.bind(target);
            }

            return orig;
        }
    }));

    return proxyRef.current;
};