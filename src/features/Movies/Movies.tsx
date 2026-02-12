import { useCallback, useContext, useState } from "react";

import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { anonymousUser, AuthContext } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersecionObserver";
import { MoviesFilter } from "./MoviesFilter";
import MovieCard from "./MovieCard";
import {
  useGetConfigurationQuery,
  useGetMoviesQuery,
  type MoviesFilters,
  type MoviesQuery,
} from "../../services/tmdb";

const initialQuery: MoviesQuery = {
  page: 1,
  filters: {},
};

function Movies() {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);
  const movies = data?.results ?? [];
  const hasMorePages = data?.hasMorePages;

  function formatImageUrl(imagePath?: string | null) {
    return imagePath && configuration
      ? `${configuration?.images.base_url}w780${imagePath}`
      : undefined;
  }

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  const [targerRef] = useIntersectionObserver({ onIntersect });

  const handleAddToVaforite = useCallback(
    (id: number): void => {
      alert(
        `Not implemented! Action ${user.name} id adding movie ${id} to favorites.`,
      );
    },
    [user.name],
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 2,
        alignItems: "flex-start",
      }}
    >
      <Box>
        <MoviesFilter
          onApply={(filters) => {
            const moviesFilters: MoviesFilters = {
              keywords: filters.keywords.map((k) => k.id),
              genres: filters.genres,
            };

            setQuery({
              page: 1,
              filters: moviesFilters,
            });
          }}
        />
      </Box>
      <Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!isFetching && !movies?.length && (
            <Typography variant="h6">
              No movies were found that match your query.
            </Typography>
          )}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {movies.map((m, i) => (
              <MovieCard
                key={`${m.id}-${i}`}
                id={m.id}
                title={m.title}
                overview={m.overview}
                popularity={m.popularity}
                enableUserActions={loggedIn}
                image={formatImageUrl(m.backdrop_path)}
                onAddFavorite={handleAddToVaforite}
              />
            ))}
          </Box>
          <Box ref={targerRef} sx={{ height: 1 }}>
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Movies;

// const mapStateToProps = (state: RootState) => ({
//   movies: state.movies.top,
//   loading: state.movies.loading,
// });

// const connector = connect(mapStateToProps);

// export default connector(Movies);
