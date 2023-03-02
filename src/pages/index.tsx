import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button, Autocomplete, TextField, Box, Alert } from "@mui/material";
import { useGetShopsCategoriesQuery } from "@/services/shop.service";

export default function Home() {
  const [shopCategory, setshopCategory] = useState<string>("barber");

  const { isLoading, data: categories = [] } = useGetShopsCategoriesQuery();

  const categoriesOptions = categories.map(category => ({
    label: category.name,
    value: category.slug,
  }));

  const onCategoryChange = (value: string) => {
    if (!value) return;
    setshopCategory(value);
  };

  return (
    <>
      <Head>
        <title>Planigo</title>
        <meta name="description" content="App de reservation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{
        display: "flex",
        height: "80vh",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Autocomplete
          loading={isLoading}
          disablePortal
          options={categoriesOptions}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, newValue) => {
            return option.value === newValue.value;
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Recherche par catégorie" />
          )}
          onChange={(event, value) => onCategoryChange(value?.value || "")}
        />
        <Link
          href={{
            pathname: "/search",
            query: { category: shopCategory },
          }}
        >
          <Button variant="outlined" disabled={isLoading}>
            Rechercher
          </Button>
        </Link>
      </Box>
      <Box sx={{
        textAlign: "right",
        p: 2
      }}>
        <i>Hosted by Nico</i>
      </Box>
    </>
  );
}
