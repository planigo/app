import { GetServerSideProps } from "next/types";
import { getShopsByCategory } from "@/services/shop.service";
import { Shop } from "@/models/shop.model";
import ShopCardItem from "@/components/ShopCardItem";
import { Box } from "@mui/material";

type SearchResultPageArgs = {
  shopsFilteredByCategory: Shop[];
};

export const getServerSideProps: GetServerSideProps<
  SearchResultPageArgs
> = async (context) => {
  const shopCategory = (context.query.category as string) || "";
  const shopsFilteredByCategory = await getShopsByCategory(shopCategory);
  return {
    props: {
      shopsFilteredByCategory,
    },
  };
};

const SearchResultPage = ({
  shopsFilteredByCategory,
}: SearchResultPageArgs) => {
  return (
    <Box
      sx={{
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingbottom: 2,
      }}
    >
      {shopsFilteredByCategory ? (
        shopsFilteredByCategory.map((shop: Shop) => (
          <ShopCardItem key={shop.id} shop={shop} />
        ))
      ) : (
        <p>Pas de Boutique</p>
      )}
    </Box>
  );
};

export default SearchResultPage;
