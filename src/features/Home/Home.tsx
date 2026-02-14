import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ py: 3 }}
    >
      © The Movies DB {new Date().getFullYear()}
    </Typography>
  );
}

export default function Home() {
  const { user, isAuthenticated } = useAuth0();

  const greeting = isAuthenticated
    ? `${user?.name}, discover trending movies, explore details and find something great
              to watch tonight.`
    : "Discover trending movies, explore details and find something great to watch tonight.";
  return (
    <>
      <Box
        sx={{
          minHeight: "calc(100vh - 68px)",
          display: "flex",
          alignItems: "center",
          background: (theme) =>
            `linear-gradient(
                            135deg,
                            ${theme.palette.background.default} 0%,
                            ${theme.palette.action.hover} 100%
                        )`,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={6}
            sx={{
              p: { xs: 4, sm: 6 },
              textAlign: "center",
              borderRadius: 4,
              backdropFilter: "blur(6px)",
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              fontWeight={700}
              gutterBottom
            >
              Welcome
            </Typography>

            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              {greeting}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={RouterLink}
                to="/movies"
                variant="contained"
                size="large"
                color="secondary"
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: "1rem",
                }}
              >
                Explore movies
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>

      <Copyright />
    </>
  );
}
