import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Button,
  Autocomplete,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { formLabelClasses } from "@mui/material";
import { shoppingService } from "../services/Shopping.service";

export default function Home() {
  const [shopCategory, setshopCategory] = useState<string>("barber");

  const { isLoading, data: categories = [] } = shoppingService().useGetShopsCategoriesQuery();

  const categoriesOptions = categories.map((category) => ({
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
        <title>Planigo V2</title>
        <meta name="description" content="App de reservation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          display: "flex",
          height: "100vh",
          gap: 4,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            background:
              "url('http://static1.squarespace.com/static/57912c0d5016e13dde25d448/t/63c5738117ba6f0bf8020d8e/1673884545065/IMG_4321.JPG?format=1500w')",
            backgroundSize: "cover",
            width: "100%",
            height: "100vh",
            filter: "brightness(0.5)",
            zIndex: -1,
            "&::after": {
              content: '""',
              position: "absolute",
              width: "100%",
              height: "100%",
              backdropFilter: "blur(10px)",
              pointerEvents: "none",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            marginTop: 40,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: 44,
              textAlign: "center",
              width: 750,
            }}
          >
            Réservez ce que vous voulez où vous que vous soyez
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Autocomplete
              loading={isLoading}
              disablePortal
              options={categoriesOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, newValue) => {
                return option.value === newValue.value;
              }}
              sx={{
                width: 300,
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Recherche par catégorie"
                  sx={{
                    backgroundColor: "white",
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                  }}
                  InputLabelProps={{
                    sx: {
                      [`&.${formLabelClasses.focused}`]: {
                        display: "none",
                      },
                    },
                  }}
                />
              )}
              onChange={(event, value) => onCategoryChange(value?.value || "")}
            />
            <Box
              sx={{
                backgroundColor: "white",
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                width: 150,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                href={{
                  pathname: "/search",
                  query: { category: shopCategory },
                }}
              >
                <Button
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: 1,
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#2D2E2E",
                    },
                  }}
                >
                  Rechercher
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

