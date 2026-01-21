import { Link } from 'react-router-dom';
import s from './MovieCard.module.scss';

interface MovieCardProps {
    id: number;
    title: string;
    overview: string;
    popularity: number;
}

export function MovieCard({ id, title, overview, popularity }: MovieCardProps) {
    return (
        <div className={s.card}>
            <img
                className={s.thumbnail}
                src="/movie-thumb.png"
                alt="Movie thumbnail"
            />
            <div className={s.content}>
                <div>
                    <Link to={`/movies/${id}`}>{title}</Link>
                </div>
                <div className={s.overview}>{overview}</div>
                <div className={s.popularity}>{popularity}</div>
            </div>
        </div>
    );
}
