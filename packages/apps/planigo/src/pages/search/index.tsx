import { useRouter } from 'next/router'
import { Box, CircularProgress } from "@mui/material";
import { shoppingService } from "../../services/Shopping.service";
import { Shop } from "@planigo/core/lib/shopping/domain/models/Shop.model";
import ShopCardItem from "../../components/shop/ShopCardItem";

const SearchResultPage = () => {
    const router = useRouter()
    const shopCategory: string = (router.query.category as string) || ""
    const { isLoading, data: shopsByCategory } = shoppingService().useGetShopsByCategoryQuery(shopCategory);
   
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
            {isLoading
                ? <CircularProgress
                    color="info"
                    size="lg"
                    value={30}
                />
                : shopsByCategory ? (
                    shopsByCategory.map((shop: Shop) => (
                        <ShopCardItem key={shop.id} shop={shop} />
                    ))
                ) : (
                    <p>Pas de Boutique</p>
                )
            }
        </Box>
    );
};

export default SearchResultPage;
