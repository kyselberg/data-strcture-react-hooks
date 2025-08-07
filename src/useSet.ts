import { useCallback, useRef, useState } from "react";

const setMethods = ["add", "delete", "clear"];

export const useSet = <T>(defaultValue: T[]) => {
  const [, setVersion] = useState(0);

  const setRef = useRef(new Set(defaultValue));

  const render = useCallback(() => {
    setVersion(v => v + 1);
  }, []);

  const proxyRef = useRef<Set<T>>(new Proxy(setRef.current, {
    get(target, prop: string | symbol) {
      const orig = Reflect.get(target, prop, target);

      if (typeof orig === "function" && setMethods.includes(prop as string)) {
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
