"use client";
import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Box,
  Container,
  createTheme,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import React from "react";
import { TITLE, useIsMounted } from "@/utils/common";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartContextProvider from "@/utils/CartContext";
import Cart from "./components/Cart";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff2ba5",
    },
  },
});

const ElevationScroll = (props: { children: React.ReactElement }) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const Template = ({ children }: { children?: React.ReactNode }) => {
  const [openLeftDrawer, setOpenLeftDrawer] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const toggleLeftDrawer = (open: boolean) => (event: React.SyntheticEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setOpenLeftDrawer(open);
  };
  const toggleCartDrawer = (open: boolean) => (event: React.SyntheticEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setOpenCartDrawer(open);
  };
  const mounted = useIsMounted();

  return (
    <ThemeProvider theme={theme}>
      <CartContextProvider>
        <Drawer open={openLeftDrawer} onClose={toggleLeftDrawer(false)}>
          <Box sx={{ width: 250 }}>
            <List>
              <ListItemButton component={Link} href={"/"}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
              
              <ListItemButton component={Link} href={"/"}>
                <ListItemIcon>
                  <SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText primary="Game" />
              </ListItemButton>

              <ListItemButton component={Link} href={"/"}>
                <ListItemIcon>
                  <QueryStatsIcon />
                </ListItemIcon>
                <ListItemText primary="Statistic" />
              </ListItemButton>

              <ListItemButton component={Link} href={"/"}>
                <ListItemIcon>
                  <EmojiEventsIcon />
                </ListItemIcon>
                <ListItemText primary="Leaderboard" />
              </ListItemButton>

              <ListItemButton component={Link} href={"/"}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About us" />
              </ListItemButton>

            </List>
          </Box>
        </Drawer>
        <Drawer
          open={openCartDrawer}
          onClose={toggleCartDrawer(false)}
          anchor={"right"}
        >
          <Box sx={{ width: 450 }}>
            <Cart />
          </Box>
        </Drawer>
        <ElevationScroll>
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleLeftDrawer(true)}
                sx={{ mr: 2, p: 1.5 }}
              >
                <MenuIcon />
              </IconButton>
              <Container>
                <Typography
                  variant="h4"
                  component={Link}
                  href="/"
                  sx={{
                    flexGrow: 1,
                    alignItems: "center",
                    display: "flex",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {TITLE}
                </Typography>
              </Container>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleCartDrawer(true)}
                // sx={{ mr: 2, p: 1.5 }}
              >
                <ShoppingCartIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Box sx={{ mt: 12, mb: 6 }}>
          <Container>{mounted && children}</Container>
        </Box>
      </CartContextProvider>
    </ThemeProvider>
  );
};

export default Template;
