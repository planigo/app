import React from "react";
import { Shop } from "@/models/shop.model";
import {
  Paper,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import Link from "next/link";

type ShopCardProps = {
  shop: Shop;
};

const ShopCardItem = ({ shop }: ShopCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://media.gqmagazine.fr/photos/5c613df51109c5dfe39752d1/master/w_1920,h_1280,c_limit/6.%20Prestige%20Barber.jpg"
        title="Image de la boutique"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {shop.name}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {shop.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          href={{
            pathname: "/shops/[id]",
            query: { id: shop.id },
          }}
        >
          <Button variant="outlined">Prendre Rendez-vous</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ShopCardItem;
