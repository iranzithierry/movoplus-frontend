import { User } from "@/api";
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"
import { formatDistanceToNow } from 'date-fns';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { CartState } from "@/app/(shopping)/marketplace/product/[uuid]/components/product-options";


function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}



const timeSince = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}



function extractErrorValues(response: any) {
  const values = [];
  for (const key in response) {
    if (Array.isArray(response[key])) {
      values.push(response[key][0].replace("This field", `${key} field`));
    }
  }
  if (values.length == 0) {
    return response
  }
  return values.shift();
}



function pluralize(value: any, key: string) {
  const irregularPlurals: { [key: string]: string } = {
    'child': 'children',
    'person': 'people',
    'man': 'men',
    'woman': 'women',
  }

  if (Array.isArray(value) ? value.length !== 1 : value !== 1) {
    if (irregularPlurals[key]) {
      return irregularPlurals[key]
    } else if (key.endsWith('y') && !['ay', 'ey', 'iy', 'oy', 'uy'].some(ending => key.endsWith(ending))) {
      return key.slice(0, -1) + 'ies'
    } else if (key.endsWith('s') || key.endsWith('x') || key.endsWith('z') || key.endsWith('ch') || key.endsWith('sh')) {
      return key + 'es'
    } else {
      return key + 's'
    }
  } else {
    return key
  }
}



function getColorAttributes(color: string) {
  color = color.toLowerCase();
  if (color === "black") {
    return `bg-gray-900 ring-gray-900`;
  } else if (color === "white") {
    return `bg-white ring-gray-400`;
  } else {
    return `bg-${color}-500 ring-${color}-500`;
  }
}



const formatMoney = (money: number | bigint | string, currency = "RWF") => {
  const format = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol'
  });
  return format.format(parseFloat(money.toString()))
}



type AvatarOptions = "original" | "thumbnail" | "medium_square_crop" | "small_square_crop";
function getUserAvatar(user: User, option: AvatarOptions = 'original') {
  return user?.profile_picture?.[option]
}



function getFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  }
}



function setToLocalStorage(key: string, value: any) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item to localStorage:', error);
    }
  }
}



function deleteFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error deleting item from localStorage:', error);
    }
  }
}

const findLsProductById = (id: string, lsCartState: CartState) => lsCartState.cartProducts.find((product) => product.id === id)
function removeEmptyKeys(obj: any): any {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
      return obj.map(removeEmptyKeys)
          .filter(item => item !== null && item !== undefined && item !== '');
  }
  if (typeof obj === 'object') {
      return Object.fromEntries(
          Object.entries(obj)
              .map(([key, value]): [string, any] => [key, removeEmptyKeys(value)])
              .filter(([key, value]) => value !== null && value !== undefined && value !== '')
      );
  }

  return obj;
}
function formatAmountForStripe(amount: number,currency: string): number {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}


export {
  cn,
  timeSince,
  extractErrorValues,
  pluralize,
  getColorAttributes,
  formatMoney,
  getUserAvatar,
  getFromLocalStorage,
  formatAmountForStripe,
  setToLocalStorage,
  deleteFromLocalStorage,
  findLsProductById,
  removeEmptyKeys
};