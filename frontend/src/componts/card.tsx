import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import type { Product } from "../model/product";
import { useCart } from "../context/Cart/cartContext";
export default function ProductCard({_id,title,image,price,}:Product) {
  const {addToCart} = useCart();
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 300,
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      {/* Wishlist */}

      <IconButton
        sx={{

          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          backgroundColor: "white",

          "&:hover": {
            backgroundColor: "white",
          },
        }}
      >
        <FavoriteBorderIcon />
      </IconButton>

      {/* Discount */}

      <Chip
        label="-20%"
        color="error"
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 2,
          fontWeight: "bold",
        }}
      />

      {/* Product Image */}

      <CardMedia
      
        component="img"
        height="260"
        image={image}
        alt="T-Shirt"
        sx={{
          objectFit: "cover",
          transition: "0.4s",

          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />

      {/* Product Info */}

      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>

        {/* Rating */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <Rating
            value={4.5}
            precision={0.5}
            size="small"
            readOnly
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            (120)
          </Typography>
        </Box>

        {/* Price */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            ${price}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              textDecoration: "line-through",
              color: "text.secondary",
            }}
          >
            ${price * 2}
          </Typography>
        </Box>

        {/* Add To Cart */}

        <Button
          
          fullWidth
          variant="contained"
          startIcon={<ShoppingCartOutlinedIcon />}
          sx={{
            borderRadius: 2,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={() => addToCart(String(_id))}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}