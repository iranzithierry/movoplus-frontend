"use server";
import { fetchCartProducts } from "./cart";
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
        const errorMessage = parseValidationErrors(validatedFields.error.format())
        return {
            errorMessage: errorMessage,
        }
    }

    if (lsCartState?.cartProducts.length > 0) {
        try {
            const products = await fetchCartProducts(lsCartState);
            if (products.length > 0) {
                const checkoutProducts: any[] = [];
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
                    // const { orderCreated, callbackMessage } = createOrder()
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


function parseValidationErrors(errors: any): string {
    if (errors.lsCartState && errors.lsCartState.cartProducts) {
        const cartProducts = errors.lsCartState.cartProducts
        for (const index in cartProducts) {
            if (index !== '_errors') {
                const product = cartProducts[index]
                for (const field in product) {
                    if (field !== '_errors' && product[field]._errors && product[field]._errors.length > 0) {
                        return `The ${toOrdinalSuffix(index + 1)} Product ${field} is required`
                    }
                }
            }
        }
    }
    return "Validation error occurred"
}
const toOrdinalSuffix = (num: string | number) => {
    const int = typeof num !== 'number' ? parseInt(num) : num,
        digits = [int % 10, int % 100],
        ordinals = ['st', 'nd', 'rd', 'th'],
        oPattern = [1, 2, 3, 4],
        tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
    return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
        ? int + ordinals[digits[0] - 1]
        : int + ordinals[3];
};
