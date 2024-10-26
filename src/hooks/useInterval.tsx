import { useEffect, useRef } from 'react';

// NOTE: this hook was inspired by Dan Abramov's article
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

type IntervalFunction = () => unknown | void;

export function useInterval(callback: IntervalFunction, delay?: number | null) {
    const savedCallback = useRef<IntervalFunction | null>(null);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        if (!delay) return;
        const tick = (): void => {
            if (savedCallback.current !== null) {
                savedCallback.current();
            }
        };
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}
