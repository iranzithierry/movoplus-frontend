'use server';
import { getApiClient } from "../api";
import { Product } from "@/api";

interface CreateOrderInstance {
    orderOwnerId:       string
    shipping_price:     string
    shipping_address:   string
    products: {
        id:             string,
        quantity:       string | number,
        color:          string,
        size:           string | number
    }[]
}
const createOrder = async (localStorageCartProducts: CreateOrderInstance): Promise<any> => {
    try {
        const client = await getApiClient();
    } catch (error) {
        throw new Error('Error fetching cart products: ' + error);
    }
};

export { createOrder }