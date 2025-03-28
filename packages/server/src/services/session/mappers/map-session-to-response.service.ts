import {SessionResponse} from "@cinema/shared";
import {Session} from "../../../persistance/schemas/session.schema";

export function mapSessionToResponseServiceCreator() {
    return (session: Session): SessionResponse => {
        return {
            id: session.id,
            movie: {
                id: session.movie.id,
                title: session.movie.title,
                description: session.movie.description,
            },
            hall: {
                id: session.hall.id,
                totalRows: session.hall.totalRows,
                seatsPerRow: session.hall.seatsPerRow,
            },
            startTime: session.startTime,
        }
    }
}