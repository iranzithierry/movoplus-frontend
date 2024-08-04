"use client";

import { toast } from "sonner";
import { Product } from "@/api";
import { useAuth } from "./auth-context";
import { LS_NAMES } from "@/lib/constants/config";
import { fetchCartProducts } from "@/lib/actions/cart";
import { getFromLocalStorage, setToLocalStorage } from "@/lib/utils";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartState } from "@/app/(shopping)/marketplace/product/[uuid]/components/product-options";

interface GlobalContextType {
  totalCartItems: number;
  cartProducts: Product[];
  localStorageCartProducts: CartState;
  removeFromCart: (productId: string) => void;
  setTotalCartItems: React.Dispatch<React.SetStateAction<number>>;
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  refreshCartedProducts: (serverProducts?: boolean) => Promise<void>,
  setLocalStorageCartProducts: React.Dispatch<React.SetStateAction<CartState>>;
  addToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [localStorageCartProducts, setLocalStorageCartProducts] = useState<CartState>({ cartProducts: [] });

  /**
   * Removes a product from the cart and updates the local storage and state accordingly.
   *
   * @param productId - The ID of the product to remove from the cart.
   * @returns void
   */
  const removeFromCart = useCallback((productId: string) => {
    setLocalStorageCartProducts(prevState => {
      const newState: CartState = {
        cartOwnerId: prevState?.cartOwnerId,
        cartProducts: prevState?.cartProducts?.filter(item => item?.id !== productId)
      };
      setToLocalStorage(LS_NAMES.CART_STATE, newState);
      return newState;
    });
    setTotalCartItems(prevState => prevState - 1);
    setCartProducts(prevProducts => prevProducts.filter(product => product?.id !== productId));

    /**
     * Not recommended to add {setTotalCartItems}
     */
  }, [setTotalCartItems]);


  /**
   * Adds a product to the user's cart, updating the local storage and state accordingly.
   *
   * @param product - The product to add to the cart.
   * @param selectedColor - The color of the product selected by the user.
   * @param selectedSize - The size of the product selected by the user.
   * @returns void
   */
  const addToCart = (product: Product, selectedColor: string, selectedSize: string) => {
    const currentCartState: CartState = getFromLocalStorage(LS_NAMES.CART_STATE) || { cartProducts: [] };
    const existingProduct = currentCartState.cartProducts.some(item => item?.id === product.id);

    if (!existingProduct) {
      currentCartState.cartOwnerId = user?.id;
      currentCartState.cartProducts.push({
        id: product.id,
        quantity: 1,
        color: selectedColor,
        size: selectedSize
      });
      setToLocalStorage(LS_NAMES.CART_STATE, currentCartState);
      toast.success('Product added to cart!');
    } else {
      if (currentCartState.cartOwnerId === user?.id) {
        toast.info('Product already in cart');
      } else {
        currentCartState.cartOwnerId = user?.id
        setToLocalStorage(LS_NAMES.CART_STATE, currentCartState)
        toast.success('Cart ownership updated')
      }
    }
    setTotalCartItems(currentCartState.cartProducts.length);
  };


  /**
   * Refreshes the cart products stored in local storage and optionally fetches updated cart products from the server.
   *
   * @param serverProducts - If true, the function will fetch updated cart products from the server and update the cart state.
   * @returns void
   */
  const refreshCartedProducts = useCallback(async (serverProducts: boolean = false) => {
    const storedLocalCartState: CartState = getFromLocalStorage(LS_NAMES.CART_STATE);
    setLocalStorageCartProducts(storedLocalCartState);
    if (storedLocalCartState?.cartOwnerId === user?.id || !storedLocalCartState?.cartOwnerId) {
      if (serverProducts && storedLocalCartState?.cartProducts.length > 0) {
        try {
          const products = await fetchCartProducts(storedLocalCartState);
          setCartProducts(products);
        }
        catch (error: any) {
          console.error(error.message);
        }
      }
      setTotalCartItems(storedLocalCartState?.cartProducts.length ?? 0);
    }
  }, [user?.id]);


  useEffect(() => {
    refreshCartedProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <GlobalContext.Provider value={{
      addToCart,
      refreshCartedProducts,
      cartProducts,
      totalCartItems,
      removeFromCart,
      setCartProducts,
      setTotalCartItems,
      localStorageCartProducts,
      setLocalStorageCartProducts,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within an GlobalProvider");
  }
  return context;
};