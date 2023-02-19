import { useState } from 'react'
import Link from 'next/link';
import Head from 'next/head'
import { GetStaticProps } from 'next/types';
import { Inter } from '@next/font/google'
import styled from '@emotion/styled'
import { Button, Autocomplete, TextField } from '@mui/material';
import { getShopCategories } from '@/services/shop.service';
import { ShopCategory } from '@/models/shop.model';


const Container = styled.main`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`
const SearchBox = styled.section`
  display: flex;
`

type HomePageArgs = {
  categories: ShopCategory[]
}

export const getStaticProps: GetStaticProps = async () => {
  const categories = await getShopCategories()

  return {
    props: {
      categories
    },
  }
}

export default function Home({ categories }: HomePageArgs) {
  const [shopCategory, setshopCategory] = useState<string>('barber')

  const categoriesOptions = categories.map(category => ({ label: category.name, value: category.slug }))

  const onCategoryChange = (value: string) => {
    if (!value) return;
    setshopCategory(value)
  }
  return (
    <>
      <Head>
        <title>Planigo</title>
        <meta name="description" content="App de reservation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SearchBox>
          <Autocomplete
            disablePortal
            options={categoriesOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, newValue) => {
              return option.value === newValue.value;
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Rechercher par catégorie" />}
            onChange={(event, value) => onCategoryChange(value?.value || "")}

          />

          <Link href={{
            pathname: '/search',
            query: { category: shopCategory },
          }}>
            <Button variant="outlined">Rechercher</Button>
          </Link>
        </SearchBox>
      </Container>
    </>
  )
}