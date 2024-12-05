import { useRef } from "react";

const useDebounce = <T extends (...args: any[]) => void>(callback: T, delay: number): T => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedFunction = ((...args: Parameters<T>) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => callback(...args), delay);
    }) as T;

    return debouncedFunction;
};

export default useDebounce;