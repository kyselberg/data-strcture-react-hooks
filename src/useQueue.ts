import { useCallback, useRef, useState } from "react";
import { Queue } from "./queue";

export const useQueue = <T>(defaultValue: T[]) => {
    const [, setVersion] = useState(0);

    const render = useCallback(() => {
        setVersion(v => v + 1);
    }, []);

    const queueRef = useRef(new Queue(defaultValue));

    const proxyRef = useRef<Queue<T>>(new Proxy(queueRef.current, {
        get(target, prop: string | symbol, receiver: Queue<T>) {
            const orig = Reflect.get(target, prop, receiver);

            if (typeof orig === "function") {
                return (...args: unknown[]) => {
                    const result = orig.apply(target, args);
                    render();
                    return result;
                };
            }

            return orig;
        }
    }));

    return proxyRef.current
};