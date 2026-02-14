import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import { AuthSection } from "./AuthSection";
import { useAuth0 } from "@auth0/auth0-react";

export function AppHeader() {
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar position="static">
      <Toolbar>
        <LiveTvOutlinedIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          The Movies Db
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to={"/"}>Home</HeaderLink>

            <HeaderLink to={"/about"}>About</HeaderLink>

            <HeaderLink to="/extra">Extra</HeaderLink>

            {isAuthenticated && (
              <HeaderLink to="/protected">Protected</HeaderLink>
            )}

            <HeaderLink to={"/movies"}>Movies</HeaderLink>
          </nav>
        </Box>
        <AuthSection />
      </Toolbar>
    </AppBar>
  );
}

function HeaderLink({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  return (
    <Link
      component={RouterLink}
      to={to}
      variant="button"
      color="inherit"
      sx={{ my: 1, mx: 1.5 }}
    >
      {children}
    </Link>
  );
}
