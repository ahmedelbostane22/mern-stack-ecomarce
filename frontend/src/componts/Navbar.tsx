
import * as React from "react";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";

import { useAuth } from "../context/Auth/authContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// ================= SEARCH =================

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.common.white, 0.12),
  border: "1px solid",
  borderColor: alpha(theme.palette.common.white, 0.2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.18),
  },
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(2),
  width: "100%",
  maxWidth: 500,

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

// ================= NAVBAR =================

export default function Navbar() {
  const { isAuthenticated, token, userName , logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    React.useState(false);

  const isMenuOpen = Boolean(anchorEl);

  console.log("token:", token);
  console.log("userName:", userName);
  console.log("isAuthenticated:", isAuthenticated);

  // ================= ACCOUNT MENU =================

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ================= MOBILE MENU =================

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  //======================logout====================
   
  const handelLogout = () => {
    logout();
    navigate("/");
    handleMobileMenuClose();
  };

  // ================= ACCOUNT MENU =================

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem onClick={handleMenuClose}>
        Profile
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        My Orders
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        Settings
      </MenuItem>

      <MenuItem onClick={handelLogout}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#111827",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "72px !important",
            px: {
              xs: 2,
              md: 5,
            },
          }}
        >
          {/* ================= MOBILE MENU ================= */}

          <IconButton
            color="inherit"
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              mr: 1,
            }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          {/* ================= LOGO ================= */}

          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 800,
              letterSpacing: 1,
              cursor: "pointer",
              color: "#fff",
              whiteSpace: "nowrap",
            }}
          >
            CRIZMA
          </Typography>

          {/* ================= SEARCH ================= */}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Search products..."
              inputProps={{
                "aria-label": "search",
              }}
            />
          </Search>

          {/* Push icons to right */}

          <Box sx={{ flexGrow: 1 }} />

          {/* ================= DESKTOP ACTIONS ================= */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {/* Wishlist */}

            <IconButton
              color="inherit"
              aria-label="wishlist"
              sx={{
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.1),
                },
              }}
            >
              <Badge
                badgeContent={2}
                color="error"
              >
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>

            {/* Notifications */}

            <IconButton
              color="inherit"
              aria-label="notifications"
              sx={{
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.1),
                },
              }}
            >
              <Badge
                badgeContent={4}
                color="error"
              >
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>

            {/* Cart */}

            <IconButton
              color="inherit"
              aria-label="shopping cart"
              sx={{
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.1),
                },
              }}
            >
              <Badge
                badgeContent={3}
                color="error"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* ================= ACCOUNT ================= */}

            {isAuthenticated && userName && (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#fff",
                    ml: 1,
                    fontWeight: 500,
                  }}
                >
                  {userName}
                </Typography>

                <IconButton
                  color="inherit"
                  edge="end"
                  aria-label="account"
                  title={userName || "Account"}
                  onClick={handleProfileMenuOpen}
                  sx={{
                    ml: 1,
                    "&:hover": {
                      backgroundColor: alpha("#fff", 0.1),
                    },
                  }}
                >
                  <AccountCircle />
                </IconButton>
              </>
            )} 

            {!isAuthenticated && (
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Box>

          {/* ================= MOBILE CART ================= */}

          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="shopping cart"
            >
              <Badge
                badgeContent={3}
                color="error"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>

        {/* ================= MOBILE SEARCH ================= */}

        <Box
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
            px: 2,
            pb: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              backgroundColor: alpha("#fff", 0.12),
              border: "1px solid",
              borderColor: alpha("#fff", 0.2),
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <InputBase
              placeholder="Search products..."
              sx={{
                color: "white",
                width: "100%",

                "& input": {
                  padding: "10px 10px 10px 45px",
                },
              }}
            />
          </Box>
        </Box>
      </AppBar>

      {/* ================= ACCOUNT MENU ================= */}

      {renderMenu}

      {/* ================= MOBILE MENU ================= */}

      {mobileMenuOpen && (
        <Box
          sx={{
            position: "absolute",
            top: 72,
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            zIndex: 1200,
            boxShadow: 4,

            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
            }}
          >
            <IconButton
              onClick={handleMobileMenuClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <MenuItem onClick={handleMobileMenuClose}>
            Home
          </MenuItem>

          <MenuItem onClick={handleMobileMenuClose}>
            Products
          </MenuItem>

          <MenuItem onClick={handleMobileMenuClose}>
            Categories
          </MenuItem>

          <MenuItem onClick={handleMobileMenuClose}>
            Offers
          </MenuItem>

          <MenuItem onClick={handleMobileMenuClose}>
            Contact
          </MenuItem>
        </Box>
      )}
    </>
  );
}

