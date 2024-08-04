"use server";
import { fetchCartProducts } from "./cart";
import { redirect } from "next/navigation";
import { createCheckoutSession } from "./stripe";
import { CheckoutFormSchema, CheckoutFormState } from "../definitions/checkout";
import { findLsProductById, formatAmountForStripe, removeEmptyKeys } from "../utils";
import { CartState } from "@/app/(shopping)/marketplace/product/[uuid]/components/product-options";

export async function checkout(state: any, formData: FormData): Promise<CheckoutFormState> {
    const lsCartState: CartState = JSON.parse(formData.get('ls-cart-state') as string)

    const validatedFields = CheckoutFormSchema.safeParse({
        lsCartState: lsCartState
    });
    if (!validatedFields.success) {
        return {
            errorMessage: "Oops! It looks like your cart is empty.<BRK>Please add items before proceeding to checkout.",        
        };
    }

    const checkoutProducts: any[] = [];
    if (lsCartState?.cartProducts.length > 0) {
        try {
            const products = await fetchCartProducts(lsCartState);
            if (products.length > 0) {
                products.forEach((product) => checkoutProducts.push({
                    quantity: findLsProductById(product.id, lsCartState)?.quantity,
                    price_data: {
                        currency: "RWF",
                        product_data: {
                            name: product.name,
                            images: product.images.map(image => image?.image?.medium),
                            description: product.description,

                        },
                        unit_amount: formatAmountForStripe(parseInt(product.price), "RWF"),
                    }
                }))
                try {
                    // TODO:
                    // const { orderCreated, callbackMessage} = createOrder()
                    // if (orderCreated) {
                        const { url } = await createCheckoutSession(removeEmptyKeys(checkoutProducts))
                        return {
                            checkoutSessionUrl: url
                        }
                        // }
                } catch (error: any) {
                    console.error(error.message)
                    return {
                        errorMessage: error.message,
                    };
                }
            }
            return {
                errorMessage: "We apologize, but there seems to be an issue with the products in your cart.<BRK>Some items may be corrupted or no longer available."
            };
        }
        catch (error: any) {
            console.error(error.message);
            return {
                errorMessage: error.message,
            };
        }
    }
    return {
        errorMessage: "Oops! It looks like your cart is empty.<BRK>Please add items before proceeding to checkout.",        
    };
}
