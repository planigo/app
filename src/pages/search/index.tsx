import { GetServerSideProps } from "next/types";
import { getShopsByCategory } from "@/services/shop.service";
import { Shop } from "@/models/shop.model";
import ShopCardItem from "@/components/ShopCardItem";

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
    <>
      {shopsFilteredByCategory ? (
        shopsFilteredByCategory.map((shop: Shop) => (
          <ShopCardItem key={shop.id} shop={shop} />
        ))
      ) : (
        <p>Pas de Boutique</p>
      )}
    </>
  );
};

export default SearchResultPage;
