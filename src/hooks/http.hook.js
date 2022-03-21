import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {

        setloading(true);

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            setloading(false);
            return data;

        } catch (e) {
            setloading(false);
            seterror(e.message);
            throw e;
        }

    }, []);

    const clearError = useCallback(() => seterror(null), []);

    return { loading, request, error, clearError };
}
