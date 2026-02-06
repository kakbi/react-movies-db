import { fetchNextPage } from "../../reducers/movies";
import { connect } from "react-redux";
import type { RootState } from "../../store";
import { MovieCard } from "./MovieCard";

import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { anonymousUser, AuthContext } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersecionObserver";

function Movies() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;
  const [targerRef, entry] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      dispatch(fetchNextPage());
    }
  }, [dispatch, entry?.isIntersecting, hasMorePages]);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Now playing
      </Typography>

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
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});

const connector = connect(mapStateToProps);

export default connector(Movies);
