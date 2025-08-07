import { useCallback, useRef, useState } from "react";

const mapMethods = ["set", "delete", "clear"];

export const useMap = <K, V>(defaultValue: [K, V][]) => {
    const [, setVersion] = useState(0);

    const render = useCallback(() => {
        setVersion(v => v + 1);
    }, []);

    const mapRef = useRef(new Map(defaultValue));

    const proxyRef = useRef<Map<K, V>>(new Proxy(mapRef.current, {
        get(target, prop: string | symbol) {
            const orig = Reflect.get(target, prop, target);

            if (typeof orig === "function" && mapMethods.includes(prop as string)) {
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