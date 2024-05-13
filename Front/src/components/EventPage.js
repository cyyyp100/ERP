import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function EventPage() {
    const query = useQuery();
    const eventId = query.get('id');
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/api/evenements/${eventId}`)
        .then(response => response.json())
        .then(data => setEvent(data))
        .catch(error => console.error('Error fetching event details:', error));
    }, [eventId]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{event.name}</h1>
            <p>Date: {new Date(event.created).toLocaleDateString()}</p>
            <p>Lieu: {event.lieu}</p>
            <p>Description: {event.description}</p>
            {/* Autres détails de l'événement */}
        </div>
    );
}

export default EventPage;
