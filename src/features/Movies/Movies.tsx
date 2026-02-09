import { fetchNextPage, resetMovies } from "../../reducers/movies";
import { connect } from "react-redux";
import type { RootState } from "../../store";
import { MovieCard } from "./MovieCard";

import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Box, Container, LinearProgress } from "@mui/material";
import { anonymousUser, AuthContext } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersecionObserver";
import { MoviesFilter, type Filters } from "./MoviesFilter";

function Movies() {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<Filters>();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  const [targerRef, entry] = useIntersectionObserver();

  useEffect(() => {
    dispatch(resetMovies());
  }, [dispatch]);

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      const moviesFilters = filters
        ? {
            keywords: filters.keywords.map((k) => k.id),
            genres: filters?.genres,
          }
        : undefined;

      dispatch(fetchNextPage(moviesFilters));
    }
  }, [dispatch, entry?.isIntersecting, filters, hasMorePages]);

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
          onApply={(f) => {
            dispatch(resetMovies());
            setFilters(f);
          }}
        />
      </Box>
      <Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
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
            {movies.map((m) => (
              <MovieCard
                key={m.id}
                id={m.id}
                title={m.title}
                overview={m.overview}
                popularity={m.popularity}
                enableUserActions={loggedIn}
                image={m.image}
              />
            ))}
          </Box>
          <Box ref={targerRef} sx={{ height: 1 }}>
            {loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});

const connector = connect(mapStateToProps);

export default connector(Movies);
