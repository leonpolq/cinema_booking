import {useUser} from "../contexts/UserContext";
import {useCallback} from "react";

export function useServerRequest() {
    const {token} = useUser();

    const request = useCallback(
        <T>(url: string, payload: Partial<RequestInit> = {}) => {
            return fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
                ...payload,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    ...(payload.headers || {})
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch bookings');
                    }

                    return response.json() as T;
                });
        },
        [token]
    )

    return {
        request
    };
}