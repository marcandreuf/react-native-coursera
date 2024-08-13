import { useRef, useEffect } from "react";

export function useNoInitialEffect(effect, dependencies = []) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) isInitialMount.current = false;
        else return effect();
    }, dependencies);
}
