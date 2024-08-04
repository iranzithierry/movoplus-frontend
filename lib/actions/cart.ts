'use server';
import { getApiClient } from "../api";
import { CartState } from "@/app/(shopping)/marketplace/product/[uuid]/components/product-options";
import { Product } from "@/api";

/**
 * Fetches the products in the user's cart from the API.
 *
 * @param localStorageCartProducts - The cart state stored in the user's local storage.
 * @returns A Promise that resolves to an array of `Product` objects representing the products in the user's cart.
 * @throws An error if there is a problem fetching the cart products from the API.
 */
const fetchCartProducts = async (localStorageCartProducts: CartState): Promise<Product[]> => {
    try {
        const client = await getApiClient();
        const productIds = localStorageCartProducts?.cartProducts?.map(item => item?.id).join(',');
        if(productIds.length == 0) return []
        const products = await client.products.productsList(undefined, undefined, `[${productIds}]`);
        return products
    } catch (error) {
        throw new Error('Error fetching cart products: ' + error);
    }
};

export { fetchCartProducts }