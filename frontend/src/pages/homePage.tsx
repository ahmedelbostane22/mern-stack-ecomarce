import ProductCard from "../componts/card";
import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import type { Product } from "../model/product";
import {productUrl} from "../constants/api"


const HomePage = () => {



  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
     const fetchProducts = async () => {
      try {
        const response = await fetch(productUrl);
        const data = await response.json();
        console.log(data);
        if(!data){
          throw new Error("Failed to fetch products"); 
        }
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        

      }
     }
     fetchProducts();
    
    }, []);
 

  return (
    <Container sx={{ mt: 10 }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          console.log(product),
          <Grid
            key={product._id ?? product.title}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;