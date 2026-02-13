import { Container, LinearProgress, Box } from "@mui/material";
import { useState } from "react";
import {
  type EpisodesQuery,
  useGetEpisodesQuery,
} from "../../services/rickandmorty";
import { Pager } from "./Pager";
import { EpisodeCard } from "./EpisodeCard";

const defaultQuery = { page: 1 };

export function Extra() {
  const [query, setQuery] = useState<EpisodesQuery>(defaultQuery);
  const { data, isFetching } = useGetEpisodesQuery(query);

  return (
    <Container sx={{ py: 3 }} maxWidth="xl">
      <Pager
        current={query.page}
        onNext={() => setQuery((q) => ({ ...q, page: q.page + 1 }))}
        onPrev={() => setQuery((q) => ({ ...q, page: q.page - 1 }))}
      />

      {isFetching && <LinearProgress sx={{ mb: 2 }} />}

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
        }}
      >
        {data?.results.map((e) => (
          <Box key={e.episode}>
            <EpisodeCard
              name={e.name}
              episode={e.episode}
              airDate={e.air_date}
              characters={e.characters}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
