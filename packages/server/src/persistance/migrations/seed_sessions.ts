import {Migration} from '@mikro-orm/migrations';
import {Movie, MovieSchema} from "../schemas/movie.schema";

export class MovieSessionSeeder extends Migration {
    async up(): Promise<void> {
        const em = this.getEntityManager();

        const movies = [
            {
                title: 'Inception',
                description: 'A mind-bending sci-fi thriller about dream infiltration',
            },
            {
                title: 'The Shawshank Redemption',
                description: 'A powerful story of hope and friendship in prison',
            },
            {
                title: 'Interstellar',
                description: 'An epic space exploration adventure',
            }
        ];

        const insertedMovies = [];
        for (const movieData of movies) {
            const movie = em.create(MovieSchema, movieData as Movie);
            insertedMovies.push(movie);
        }

        const halls = [
            {name: 'Hall A', totalRows: 10, seatsPerRow: 15},
            {name: 'Hall B', totalRows: 12, seatsPerRow: 12},
            {name: 'Hall C', totalRows: 8, seatsPerRow: 18}
        ];

        const insertedHalls = [];
        for (const hallData of halls) {
            const hall = em.create('Hall', hallData);
            insertedHalls.push(hall);
        }

        const currentDate = new Date();
        for (let i = 0; i < insertedMovies.length; i++) {
            const movie = insertedMovies[i];
            const hall = insertedHalls[i];

            for (let j = 0; j < 3; j++) {
                em.create('Session', {
                    movie,
                    hall,
                });
            }
        }

        await em.flush();
    }
}