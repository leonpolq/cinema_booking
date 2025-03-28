import React, {useEffect, useState} from 'react';
import {useServerRequest} from "../services/useServerRequest";
import {SessionResponse} from '@cinema/shared';
import {SessionSeats} from './SessionSeats';

export const Bookings: React.FC = () => {
    const {request} = useServerRequest();
    const [sessions, setSessions] = useState<SessionResponse[]>([]);
    const [selectedSession, setSelectedSession] = useState<SessionResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchSessions = async (): Promise<void> => {
            try {
                const responseSessions = await request<SessionResponse[]>(`api/v1/sessions`);

                setSessions(responseSessions);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, [request]);

    const handleSessionClick = (session: SessionResponse) => {
        setSelectedSession(session);
    };

    if (loading) {
        return <div>Loading sessions...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h2>Sessions</h2>
                    <div className="list-group">
                        {sessions.map(session => (
                            <button
                                key={session.id}
                                className={`list-group-item list-group-item-action ${selectedSession?.id === session.id ? 'active' : ''}`}
                                onClick={() => handleSessionClick(session)}
                            >
                                <h5>{session.movie.title}</h5>
                                {
                                    session.movie.description && (
                                        <p>Description: {session.movie.description}</p>
                                    )
                                }
                                <p>Time: {new Date(session.startTime).toLocaleString()}</p>
                                <p>Hall: {session.hall.id}</p>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="col-6">
                    {selectedSession ? (
                        <SessionSeats session={selectedSession}/>
                    ) : (
                        <div>Select a session to view available seats</div>
                    )}
                </div>
            </div>
        </div>
    );
};
