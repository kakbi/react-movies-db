import { Link } from 'react-router-dom';
import s from './MovieCard.module.scss';

interface MovieCardProps {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    image?: string;
}

export function MovieCard({
    id,
    title,
    overview,
    popularity,
    image = '/movie-thumb.png',
}: MovieCardProps) {
    return (
        <div className={s.card}>
            <img className={s.thumbnail} src={image} alt="Movie thumbnail" />
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
